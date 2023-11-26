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
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";
import Axios from "axios";
import { isClub } from "../../../helper";
import ReactLoading from "react-loading";
import { Button } from "@mui/material";
import { useContractRead } from "wagmi";

export const Graal = (props) => {
  const [stackedId, setStackedId] = useState(-1);
  const [burn, setBurn] = useState(false);
  const [stack, setStack] = useState(false);
  const [count, setCount] = useState(0);
  const [active, setActive] = useState("");
  const { address, shortState, setShortState, mintSpecial, mintLoading, has10k, has999, id10k, id999 } =
    useEthereum();

  const { data: burnCount } = useContractRead({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "getBurnedCount",
    args: [address],
  });

  const { data: burnCounterCount } = useContractRead({
    address: contractAddress,
    abi: NUMBERRUNNERCLUB_ABI,
    functionName: "getBurnedCounterCount",
    args: [address],
  });

  useEffect(() => {
    if (shortState === "success") {
      setTimeout(() => {
        setShortState("false");
      }, 3000);
    }
  }, [shortState]);

  useEffect(() => {
    props.data.mint[1].type === "burn"
      ? setBurn(burnCount >= props.data.mint[1].value)
      : setBurn(burnCounterCount >= props.data.mint[1].value);
  }, [burnCount, burnCounterCount]);

  useEffect(() => {
    console.log(has999);
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
  }, []);

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
                mintSpecial(props.data.type, stackedId);
              }
            }}
          >
            {mintLoading && active === props.data.name ? (
              <ReactLoading
                className="spin"
                type={"spin"}
                color={"rgb(29, 155, 240)"}
                height={22}
                width={22}
              />
            ) : shortState === "success" && active === props.data.name ? (
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
