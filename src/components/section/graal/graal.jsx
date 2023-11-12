import validate from "../../../assets/images/Valide.png";
import novalidate from "../../../assets/images/Non_Valide.png";
import { GraalContainer } from "./graal.style";
import { useEffect, useState } from "react";
import {
  ENSsubgraph,
  NRCsubgraph,
  contractAddress,
  useEthereum,
} from "../../../context/ethereumProvider";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
import Axios from "axios";
import { isClub } from "../../../helper";
import ReactLoading from "react-loading";
import { Button } from "@mui/material";
const namehash = require("eth-ens-namehash");

export const Graal = (props) => {
  const [ensList, setEnsList] = useState("");
  const [ensDomains, setEnsDomains] = useState([]);
  const [currentEnsName, setCurrentEnsName] = useState(null);
  const [has999, setHas999] = useState(false);
  const [has10k, setHas10k] = useState(false);
  const [has100k, setHas100k] = useState(false);
  const [id999, setId999] = useState(-1);
  const [id10k, setId10k] = useState(-1);
  const [id100k, setId100k] = useState(-1);
  const [stackedId, setStackedId] = useState(-1);
  const [burn, setBurn] = useState(false);
  const [stack, setStack] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState(
    ""
  );
  const [state, setState] = useState("");
  const [active, setActive] = useState("");
  const { address, mintSpecial, mintLoading } = useEthereum();
  const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);
  const { data: burnCount, error: burnCountError } = useContractRead(
    contract,
    "getBurnedCount",
    [address]
  );
  const { data: burnCounterCount, error: burnCounterCountError } =
    useContractRead(contract, "getBurnedCounterCount", [address]);

  const {
    data: tokenIdOfName,
    isLoading,
    error: tokenIdOfNameError,
  } = useContractRead(contract, "getTokenIdOfName", [name]);

  useEffect(() => {
    props.data.mint[1].type === "burn"
      ? setBurn(burnCount >= props.data.mint[1].value)
      : setBurn(burnCounterCount >= props.data.mint[1].value);
  }, [burnCount, burnCounterCount]);

  useEffect(() => {
    if (props.data.mint[0].value === 0) {
      setStack(has999 || has10k || has100k);
      if (has100k) {
        setStackedId(id100k);
      }
      if (has10k) {
        setStackedId(id10k);
      }
      if (has999) {
        setStackedId(id999);
      }
    }
    if (props.data.mint[0].value === 1) {
      setStack(has999 || has10k);
      if (has10k) {
        setStackedId(id10k);
      }
      if (has999) {
        setStackedId(id999);
      }
    }
    if (props.data.mint[0].value === 2) {
      setStack(has999);
      setStackedId(id999);
    }
  }, [has999, has10k, has100k]);

  useEffect(() => {
    const fetchEnsName = async () => {
      let ENSquery = `
    {
      domains(where: {registrant: "${address.toLowerCase()}"}) {
        name
      }
    }
      `;

      let userOwnedENS;

      try {
        await Axios.post(ENSsubgraph, { query: ENSquery }).then((result) => {
          userOwnedENS = Object.values(result.data.data)[0];
        });
      } catch (error) {
        console.log(error);
      }

      setEnsList(userOwnedENS);
    };

    if (address) {
      fetchEnsName();
    }
  }, [address]);

  useEffect(() => {
    if (ensList.length > 0) {
      const domainNames = ensList.map((domain) => {
        return { hash: namehash.hash(domain.name), name: domain.name };
      });
      setEnsDomains(domainNames);
    }
  }, [ensList]);

  useEffect(() => {
    const fetchMint = async () => {
      let ENSquery = `
      {
        nfts {
          id
        }
      }
      `;

      let mintCount;

      try {
        await Axios.post(NRCsubgraph, { query: ENSquery }).then((result) => {
          mintCount = Object.values(result.data.data)[0];
          console.log(result);
        });
      } catch (error) {
        console.log(error);
      }
      if (mintCount) {
        const filteredMintCount = mintCount.filter((nft) => {
          const id = parseInt(nft.id);
          return id >= props.data.inf && id <= props.data.sup;
        });
        setCount(filteredMintCount.length);
      }
    };

    fetchMint();
  }, []);

  useEffect(() => {
    if (ensDomains.length > 0) {
      const [currentDomain, ...rest] = ensDomains;
      setName(currentDomain.name.replace(".eth", ""));
      setCurrentEnsName(currentDomain.name);
      setEnsDomains(rest);
    }
  }, [ensDomains]);

  useEffect(() => {
    if (tokenIdOfName && Number(tokenIdOfName) !== 0) {
      if (!has100k) {
        setHas100k(isClub(currentEnsName, 9));
        setId100k(Number(tokenIdOfName));
      }
      if (!has10k) {
        setHas10k(isClub(currentEnsName, 8));
        setId10k(Number(tokenIdOfName));
      }
      if (!has999) {
        setHas999(isClub(currentEnsName, 7));
        setId999(Number(tokenIdOfName));
      }
      console.log(
        currentEnsName,
        Number(tokenIdOfName),
        has999,
        has10k,
        has100k
      );
    }
  }, [tokenIdOfName, currentEnsName]);

  return (
    <GraalContainer>
      <div className="graal-img">
        <div>
          <img alt="" src={props.img} style={{ borderRadius: "5px" }} />
        </div>
        <div className="graal-title">
          <span>{props.data.name}</span>
        </div>
        <div className="graal-supply">
          {count}/{props.data.supply}
        </div>
        <div className="graal-action">
          <Button
            className="bigButton"
            style={{ textTransform: "none" }}
            onClick={async () => {
              if (stack && burn) {
                setActive(props.data.name);
                await mintSpecial(props.data.type, stackedId);
                setState("success");
              }
            }}
          >
            {mintLoading && (active === props.data.name) ? (
              <ReactLoading
                className="spin"
                type={"spin"}
                color={"rgb(29, 155, 240)"}
                height={22}
                width={22}
              />
            ) : state === "success" && (active === props.data.name) ? (
              <img
                style={{ width: "18px", marginRight: "8px" }}
                src={validate}
              />
            ) : (
              <>Mint</>
            )}
          </Button>
        </div>
      </div>
      <div className="graal-desc">
        <div className="graal-condition">
          <div>
            <img alt="" src={stack ? validate : novalidate} />
          </div>
          <div style={{ wordBreak: "keep-all" }}>{props.data.mint[0].text}</div>
        </div>
        <div className="graal-condition">
          <div>
            <img alt="" src={burn ? validate : novalidate} />
          </div>
          <div style={{ wordBreak: "keep-all" }}>{props.data.mint[1].text}</div>
        </div>
      </div>
    </GraalContainer>
  );
};
