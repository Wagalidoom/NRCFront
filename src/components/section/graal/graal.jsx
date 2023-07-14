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
  const [ensName, setEnsName] = useState("");
  const [ensList, setEnsList] = useState("");
  const [ensDomains, setEnsDomains] = useState([]);
  const [currentEnsName, setCurrentEnsName] = useState(null);
  const [has999, setHas999] = useState(false);
  const [has10k, setHas10k] = useState(false);
  const [has100k, setHas100k] = useState(false);
  const [node, setNode] = useState(
    "0x0000000000000000000000000000000000000000000000000000000000000000"
  );
  const { address } = useEthereum();
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
    if (ensDomains.length > 0) {
      const [currentDomain, ...rest] = ensDomains;
      setNode(currentDomain.hash);
      setCurrentEnsName(currentDomain.name);
      setEnsDomains(rest);
    }
  }, [ensDomains]);

  useEffect(() => {
    if (tokenIdOfNode && Number(tokenIdOfNode) !== 0) {
      if (!has999) {
        setHas999(isClub(currentEnsName, 7));
      }
      if (!has10k) {
        setHas10k(isClub(currentEnsName, 8));
      }
      if (!has100k) {
        setHas100k(isClub(currentEnsName, 9));
      }
      console.log(currentEnsName, tokenIdOfNode.toString(), has999, has10k, has100k);
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
        <div className="graal-supply">10/{props.data.supply}</div>
        <div className="graal-action">
          <button className="bigButton">Mint</button>
        </div>
      </div>
      <div className="graal-desc">
        <div className="graal-condition">
          <div>
            <img alt="" src={novalidate} />
          </div>
          <div>{props.data.mint[0].text}</div>
        </div>
        <div className="graal-condition">
          <div>
            <img
              alt=""
              src={
                props.data.mint[1].type == "burn"
                  ? burnCount > props.data.mint[1].value
                    ? validate
                    : novalidate
                  : burnCounterCount > props.data.mint[1].value
                  ? validate
                  : novalidate
              }
            />
          </div>
          <div>{props.data.mint[1].text}</div>
        </div>
      </div>
    </GraalContainer>
  );
};
