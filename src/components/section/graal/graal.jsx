import validate from "../../../assets/images/Valide.png";
import novalidate from "../../../assets/images/Non_Valide.png";
import { GraalContainer } from "./graal.style";
import { useEffect, useState } from "react";
import { useEthereum } from "../../../context/ethereumProvider";

export const Graal = (props) => {
  const [ensName, setEnsName] = useState("");
  const [burn, setBurn] = useState(0);
  const [burnCounter, setBurnCounter] = useState(0);
  const { ethereumState } = useEthereum();

  useEffect(() => {
    if (!ethereumState.provider || !ethereumState.contract) {
      setEnsName("");
      setBurn(0);
      setBurnCounter(0);
      return;
    }

    const fetchData = async () => {
      const address = await ethereumState.provider.getSigner().getAddress();
      const burnCount = await ethereumState.contract.getBurnedCount(address);
      const burnCounterCount = await ethereumState.contract.getBurnedCounterCount(address);
      setBurn(burnCount.toString());
      setBurnCounter(burnCounterCount);
    };

    fetchData();
  }, [ethereumState]);

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
            <img alt="" src={props.data.mint[1].type == "burn" ? burn > props.data.mint[1].value ? validate : novalidate : burnCounter > props.data.mint[1].value ? validate : novalidate } />
          </div>
          <div>{props.data.mint[1].text}</div>
        </div>
      </div>
    </GraalContainer>
  );
};
