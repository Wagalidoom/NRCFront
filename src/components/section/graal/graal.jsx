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

export const Graal = (props) => {
  const [ensName, setEnsName] = useState("");
  const [ensList, setEnsList] = useState("");
  const { address } = useEthereum();
  const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);
  const { data: burnCount, error: burnCountError } = useContractRead(
    contract,
    "getBurnedCount",
    [address]
  );
  const { data: burnCounterCount, error: burnCounterCountError } =
    useContractRead(contract, "getBurnedCounterCount", [address]);

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
          console.log(userOwnedENS);
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
