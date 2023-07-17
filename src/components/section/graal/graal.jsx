import validate from "../../../assets/images/Valide.png";
import novalidate from "../../../assets/images/Non_Valide.png";
import { GraalContainer } from "./graal.style";
import { useEffect, useState } from "react";
import {
  ENSsubgraph,
  contractAddress,
  useEthereum,
} from "../../../context/ethereumProvider";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
import Axios from "axios";
import { isClub, stringToHex } from "../../../helper";
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
  const [node, setNode] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  const { address, mintSpecial } = useEthereum();
  const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);
  const { data: burnCount, error: burnCountError } = useContractRead(
    contract,
    "getBurnedCount",
    [address]
  );
  const { data: burnCounterCount, error: burnCounterCountError } =
    useContractRead(contract, "getBurnedCounterCount", [address]);

  const {
    data: tokenIdOfNode,
    isLoading,
    error: tokenIdOfNodeError,
  } = useContractRead(contract, "getTokenIdOfNode", [node]);

  useEffect(() => {
    props.data.mint[1].type == "burn"
      ? setBurn(burnCount > props.data.mint[1].value)
      : setBurn(burnCounterCount > props.data.mint[1].value);
  }, [burnCount, burnCounterCount]);

  useEffect(() => {
    if (props.data.mint[0].value == 0) {
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
    if (props.data.mint[0].value == 1) {
      setStack(has999 || has10k);
      if (has10k) {
        setStackedId(id10k);
      }
      if (has999) {
        setStackedId(id999);
      }
    }
    if (props.data.mint[0].value == 2) {
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
          // console.log(userOwnedENS);
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
        nftminteds(first: 300, where: {tokenId_gte: "${props.data.inf}", tokenId_lte: "${props.data.sup}"}) {
          id
          tokenId
        }
      }
      `;

      let mintCount;

      try {
        await Axios.post(ENSsubgraph, { query: ENSquery }).then((result) => {
          mintCount = Object.values(result.data.data)[0];
          console.log(mintCount);
        });
      } catch (error) {
        console.log(error);
      }
      if (mintCount) {
        setCount(mintCount.length);
      }
    };

    fetchMint();
  }, []);

  useEffect(() => {
    if (ensDomains.length > 0) {
      const [currentDomain, ...rest] = ensDomains;
      setNode(currentDomain.hash);
      setCurrentEnsName(currentDomain.name);
      setEnsDomains(rest);
    }
  }, [ensDomains]);

  useEffect(() => {
    if (tokenIdOfNode && Number(tokenIdOfNode) !== 0) {
      if (!has100k) {
        setHas100k(isClub(currentEnsName, 9));
        setId100k(Number(tokenIdOfNode));
      }
      if (!has10k) {
        setHas10k(isClub(currentEnsName, 8));
        setId10k(Number(tokenIdOfNode));
      }
      if (!has999) {
        setHas999(isClub(currentEnsName, 7));
        setId999(Number(tokenIdOfNode));
      }
      console.log(
        currentEnsName,
        Number(tokenIdOfNode),
        has999,
        has10k,
        has100k
      );
    }
  }, [tokenIdOfNode, currentEnsName]);

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
          <button
            className="bigButton"
            onClick={() => {
              if (stack && burn) {
                console.log(stackedId);
                mintSpecial(props.data.type, stackedId);
              }
            }}
          >
            Mint
          </button>
        </div>
      </div>
      <div className="graal-desc">
        <div className="graal-condition">
          <div>
            <img alt="" src={stack ? validate : novalidate} />
          </div>
          <div>{props.data.mint[0].text}</div>
        </div>
        <div className="graal-condition">
          <div>
            <img alt="" src={burn ? validate : novalidate} />
          </div>
          <div>{props.data.mint[1].text}</div>
        </div>
      </div>
    </GraalContainer>
  );
};
