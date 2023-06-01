import { MyNftContainer, ToolBar } from "./myNft.style";
import DotLight from "../../../assets/images/icon/three-dot-light.svg";
import DotDark from "../../../assets/images/icon/three-dot-dark.svg";
import { ThemeContext } from "../../../app/App";
import { useContext, useEffect, useRef, useState } from "react";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import filterDark from "../../../assets/images/icon/filterDark.png";
import filterLight from "../../../assets/images/icon/filterLight.png";
import sweepDark from "../../../assets/images/icon/balaisDark.png";
import sweepLight from "../../../assets/images/icon/balaisLight.png";
import searchDark from "../../../assets/images/icon/loupeDark.png";
import searchLight from "../../../assets/images/icon/loupeLight.png";
import ensvision from "../../../assets/images/icon/ensvision.png";
import arrowDown from "../../../assets/images/icon/arrow-down.png";
import arrowDownLight from "../../../assets/images/icon/arrow-down-light.png";
import { useEthereum } from "../../../context/ethereumProvider";

export const MyNft = (props) => {
  const currentTheme = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState({ filter: false, sweep: false });
  const modalRef = useRef(null);
  const selectRef = useRef(null);
  const [selected, setSelected] = useState("Price Low to High");
  const [open, setOpen] = useState(false);
  const { ethereumState } = useEthereum();
  const [collection, setCollection] = useState([]);
  const openModal = (e, current) => {
    setModalOpen((prevModal) => {
      if (prevModal === current) {
        return 0;
      }
      return current;
    });
  };
  const handleClickOutside = (event) => {
    setIsOpen((prevIsOpen) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        return false;
      }
      return prevIsOpen;
    });
    setOpen((prevOpen) => {
      if (prevOpen && selectRef.current && !selectRef.current.contains(event.target)) {
        return false;
      }
      return prevOpen;
    });
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const optionAction = (action) => {
    console.log(action);
  };
  useEffect(() => {
    if (modalOpen > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [modalOpen]);

  useEffect(() => {
    if (!ethereumState.provider || !ethereumState.contract) return;

    const fetchData = async () => {
      const address = await ethereumState.provider.getSigner().getAddress();
      console.log(address);
      const userNFTs = await ethereumState.contract.getUserOwnedNFTs(address);
      setCollection(userNFTs);
      console.log(userNFTs);
    };

    fetchData();
  }, [ethereumState]);
  return (
    <MyNftContainer filter={activeButton.filter} market={props.market} sweep={activeButton.sweep} openSelect={open}>
      <div className="filter-group">
        <div className="filter-search">
          {!props.market && (
            <div className="button-group">
              <button className="button link-ens">
                <a target="blank" href="https://ens.vision/">
                  <img src={ensvision} alt="" />
                </a>
              </button>
              <button className="button filter" onClick={() => setActiveButton({ ...activeButton, filter: activeButton.filter ? false : true })}>
                <img src={props.theme === "Light Theme" ? filterDark : filterLight} alt="" />
              </button>
            </div>
          )}
          <div className="search-contenair">
            <img src={props.theme === "Dark Theme" ? searchDark : searchLight} alt="" />
            <input type="text" placeholder="search..." />
          </div>
        </div>
        {props.market && (
          <div style={{ marginBottom: "20px" }}>
            <div className="button-group">
              <button className="button link-ens">
                <a target="blank" href="https://ens.vision/">
                  <img src={ensvision} alt="" />
                </a>
              </button>
              <button className="button filter" onClick={() => setActiveButton({ ...activeButton, filter: activeButton.filter ? false : true })}>
                <img src={props.theme === "Light Theme" ? filterDark : filterLight} alt="" />
              </button>
              <button className="button sweep" onClick={() => setActiveButton({ ...activeButton, sweep: activeButton.sweep ? false : true })}>
                <img src={props.theme === "Light Theme" ? sweepDark : sweepLight} alt="" />
              </button>
            </div>
            <div ref={selectRef} className="filter-select" onClick={() => setOpen(open ? false : true)}>
              <div className="visible">
                <span className="filter-selection">{selected}</span>
                <div className="icon">
                  <img style={{ width: "15px" }} src={props.theme === "Dark Theme" ? arrowDownLight : arrowDown} alt="" />
                </div>
              </div>
              <div className="filter-option">
                <div
                  onClick={(e) => {
                    setSelected(e.target.innerText);
                    setOpen(false);
                  }}
                >
                  {" "}
                  Price Low to High
                </div>
                <div
                  onClick={(e) => {
                    setSelected(e.target.innerText);
                    setOpen(false);
                  }}
                >
                  Price High to Low
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container-nft">
        {collection.map((element, index) => (
          <div className="myNft" key={index}>
            <img alt="" src={props.img} />
            <ToolBar market={props.market} open={modalOpen === index + 1 && isOpen ? true : false}>
              <div>
                <p>Number Runner #1234</p>
                <p>Pow</p>
              </div>
              <button className="buy-action">Buy</button>
              <div className="price">
                <img alt="" className="leftText" src={props.theme === "Dark Theme" ? eth : ethDark} /> <span>1.19</span>
              </div>
              <button className="modal-button">
                <img alt="" onClick={(e) => openModal(e, index + 1)} src={currentTheme.theme.name === "Dark Theme" ? DotLight : DotDark} />
              </button>
              {modalOpen === index + 1 && isOpen && (
                <div ref={modalRef} className="modal-option">
                  <ul>
                    <li className="option" onClick={() => optionAction("stacker")}>
                      Stacker
                    </li>
                    <li className="option" onClick={() => optionAction("sell")}>
                      Sell
                    </li>
                    <li className="option" onClick={() => optionAction("burn")}>
                      Burn
                    </li>
                  </ul>
                </div>
              )}
            </ToolBar>
          </div>
        ))}
      </div>
    </MyNftContainer>
  );
};