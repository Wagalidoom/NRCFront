import { isMobile } from "react-device-detect";
import GlobalStyles from "../assets/styles/GlobalStyles";
import Layout from "../common/layout";
import banner from "../assets/images/banner.gif";
import flou from "../assets/images/flou.png";
import bishop from "../assets/images/bishop.png";
import queen from "../assets/images/Queen.png";
import rook from "../assets/images/Rook.png";
import knight from "../assets/images/Knight.png";
import fleche from "../assets/images/fleche.png";
import flecheDark from "../assets/images/flecheDark.png";
import profileDark from "../assets/images/icon/profileDark.png";
import profileLight from "../assets/images/icon/profileLight.png";
import profileLightSelect from "../assets/images/icon/profileLightSelect.png";
import profileDarkSelect from "../assets/images/icon/profileDarkSelect.png";
import marketDark from "../assets/images/icon/marketDark.png";
import marketLight from "../assets/images/icon/marketLight.png";
import marketLightSelect from "../assets/images/icon/marketLightSelect.png";
import marketDarkSelect from "../assets/images/icon/marketDarkSelect.png";
import kingAuctionDark from "../assets/images/icon/auctionDark.png";
import kingAuctionLight from "../assets/images/icon/auctionLight.png";
import kingAuctionDarkSelect from "../assets/images/icon/auctionDarkSelect.png";
import kingAuctionLightSelect from "../assets/images/icon/auctionLightSelect.png";
import flecheHaut from "../assets/images/flecheHaut.png";
import logoSite from "../assets/images/rookIcon.png";
import logoSiteLight from "../assets/images/home.png";
import homeLight from "../assets/images/icon/homeLight.png";
import homeDark from "../assets/images/icon/homeDark.png";
import homeDarkSelect from "../assets/images/icon/homeDarkSelect.png";
import homeLightSelect from "../assets/images/icon/homeLightSelect.png";
import eth from "../assets/images/eth.png";
import logo from "../assets/images/logo.png";
import logoDark from "../assets/images/logoDark.png";
import localisation from "../assets/images/localisation.png";
import {
  BannerV1Wrapper,
  NavLink,
  NavSpan,
  SectionNav,
} from "../components/section/banner/v1/Banner.style";
import calendar from "../assets/images/calendar.png";
import NavWrapper from "../components/section/header/v1/Header.style";
import epingle from "../assets/images/epingle.png";
import emojiThread from "../assets/images/emojiThread.png";
import ens from "../assets/images/ens.jpg";
import groupe from "../assets/images/groupe.JPEG";
import retweet from "../assets/images/retweet.png";
import pawnLogo from "../assets/images/themeSombre/pawn.png";
import bannerPawn from "../assets/images/banniere/pion.gif";
import kingLogo from "../assets/images/themeSombre/king.png";
import bannerKing from "../assets/images/banniere/roi.gif";
import mainRoi from "../assets/images/mainRoi.png";
import bishopLogo from "../assets/images/themeSombre/bishop.png";
import bannerBishop from "../assets/images/banniere/fou.gif";
import knightLogo from "../assets/images/themeSombre/knight.png";
import bannerKnight from "../assets/images/banniere/cavalier.gif";
import rookLogo from "../assets/images/themeSombre/rook.png";
import bannerRook from "../assets/images/banniere/rook.gif";
import queenLogo from "../assets/images/themeSombre/queen.png";
import bannerQueen from "../assets/images/banniere/reine.gif";
import gasIcon from "../assets/images/gas_icon.png";
import tableau from "../assets/images/tableau.JPEG";
import tableau2 from "../assets/images/tableau2.JPEG";
import duo1 from "../assets/images/duo1.png";
import duo2 from "../assets/images/duo2.png";
import horloge from "../assets/images/horloge.png";
import faqGif from "../assets/images/faq.png";
import contrat from "../assets/images/contrat.png";
import tag from "../assets/images/tag.png";
import pawn5185 from "../assets/images/5185.png";
import soldat from "../assets/images/soldat.png";
import {
  AboutStyleWrapper,
  SubNavLink,
} from "../components/section/about/v1/About.style";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../app/App";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import { RightSection } from "../components/section/rightSection/rightSection";
import { Graal } from "../components/section/graal/graal";
import { KingAuction } from "../components/section/kingAuction/kingAuction";
import { MyNft } from "../components/section/myNft/myNft";
import { Analyctic } from "../components/section/analyctic/analyctic";
import { Activity } from "../components/section/activity/activity";
import ethDark from "../assets/images/ethDark.png";
import iconLink from "../assets/images/icon/link.png";
import emojiDoigt from "../assets/images/icon/emojiDoigt.png";
import { contractAddress, useEthereum } from "../context/ethereumProvider";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import {
  ConnectWallet,
  useContract,
  useContractRead,
} from "@thirdweb-dev/react";
import { ColorPicker } from "../components/section/colorPicker/ColorPicker";
import { Mint } from "../components/section/mint/Mint";
import { PriceSelector } from "../components/section/priceSelector/PriceSelector";
import { EnsSelector } from "../components/section/ensSelector/EnsSelector";
import { NUMBERRUNNERCLUB_ABI } from "../ressources/abi";
import { getNftType, nftTypeToString } from "../helper";
import { Sweep } from "../components/section/sweep/Sweep";
import { BurnValidator } from "../components/section/burnValidator/BurnValidator";
import { RevealKingHand } from "../components/section/RevealKingHand/RevealKingHand";
import { Chessboard } from "../components/section/chessboard/Chessboard";
import { KillValidator } from "../components/section/killValidator/KillValidator";
const namehash = require("eth-ens-namehash");

const HomeV1 = () => {
  const [link, changePageLink] = useState(true);
  const [linkMarket, changePageLinkMarket] = useState(true);
  const [linkProfile, changePageLinkProfile] = useState(true);
  const [thread, threadLink] = useState(true);
  const [faq, faqLink] = useState(true);
  const [gasPrice, setGasPrice] = useState(0);
  const [hashtag, setHashTag] = useState("Club");
  const currentTheme = useContext(ThemeContext);
  const {
    isMintColorPickerOpen,
    isKingColorPickerOpen,
    isMintOpen,
    isPriceSelectorOpen,
    isSweepOpen,
    isBurnSweepOpen,
    isEnsSelectorOpen,
    isKingEnsSelectorOpen,
    isKillOpen,
    isBurnOpen,
    isKingHandOpen,
    mintPawn,
    getTotalMinted,
    getCurrentSupply,
    getVolume,
    getPrizePool,
    address,
    account,
    getEnsName,
    getEnsProfilePicture,
    getGasPrice,
  } = useEthereum();
  const [totalMinted, setTotalMinted] = useState(0);
  const [currentSupply, setCurrentSupply] = useState(0);
  const [volume, setVolume] = useState(0);
  const [prizePool, setPrizePool] = useState(0);
  const [ensName, setEnsName] = useState("");
  const [ensUrl, setEnsUrl] = useState("");
  const [more, setMore] = useState({
    topHolders: false,
    activity: false,
    page: null,
  });
  const [posScroll, setPosScroll] = useState({ pos: 0, back: false });
  const scrollRef = useRef(null);
  const changePage = (link) => {
    changePageLink(link);
    if (link === "market") {
      changePageMarket("items");
    }
    if (link === "profile") {
      changePageProfile("my_nft");
    }
  };

  const { contract } = useContract(contractAddress, NUMBERRUNNERCLUB_ABI);

  const { data: tokenIdOfName } = useContractRead(
    contract,
    "getTokenIdOfName",
    [ensName]
  );

  useEffect(() => {
    const fetchEns = async () => {
      const name = await getEnsName();
      if (name) {
        setEnsName(name.replace(".eth", ""));
        const url = await getEnsProfilePicture(name);
        const prefix = "eip155:1/erc721:" + contractAddress + "/";
        if (url) {
          if (url.startsWith(prefix)) {
            const tokenId = url.slice(prefix.length);
            setEnsUrl(
              `https://ipfs.io/ipfs/QmSFBCFdM6wrd7ZDoojNC8wUVxpXRYXvxTAqpiHPWudz1F/${tokenId}.png`
            );
          }
        }
      }
    };

    if (address) {
      fetchEns();
    } else {
      setEnsName("");
      setEnsUrl("");
    }
  }, [address, account, getEnsName, getEnsProfilePicture]); 

  useEffect(() => {
    const tokenId = Number(tokenIdOfName);
    const nftType = getNftType(tokenId);
    const club = nftTypeToString(nftType);
    console.log(tokenId);
    tokenId ? setHashTag("@NR" + club) : setHashTag("@TheNRClub");
    
  }, [tokenIdOfName]);

  useEffect(() => {
    if (
      window.innerWidth > 600 &&
      scrollRef.current &&
      window.scrollY > scrollRef.current.offsetHeight
    ) {
      window.scrollTo({
        top: scrollRef.current.offsetHeight,
        behavior: "instant",
      });
    } else if (
      scrollRef.current &&
      window.scrollY > scrollRef.current.offsetHeight
    ) {
      window.scrollTo({
        top: scrollRef.current.offsetHeight - 60,
        behavior: "instant",
      });
    }
  }, [link, linkProfile, linkMarket]);

  const changePageMarket = (linkMarket) => {
    changePageLinkMarket(linkMarket);
  };

  useEffect(() => {
    const fetchData = async () => {
      const newGasPrice = await getGasPrice();
      setGasPrice(newGasPrice);
    };

    fetchData();
  }, [getGasPrice]);

  useEffect(() => {
    const fetchData = async () => {
      const total = await getTotalMinted();
      const currentSupply = await getCurrentSupply();
      const prizePool = await getPrizePool();
      const volume = await getVolume();
      setTotalMinted(total.toString());
      setCurrentSupply(currentSupply.toString());
      setPrizePool(prizePool.toString());
      setVolume(volume.toString());
    };

    fetchData();
  }, [getTotalMinted, getCurrentSupply, getPrizePool, getVolume]);

  const changePageProfile = (linkProfile) => {
    changePageLinkProfile(linkProfile);
  };

  const showThread = (thread) => {
    if (thread === "open") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    threadLink(thread);
  };
  const showFaq = (faq) => {
    if (faq === "open") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    faqLink(faq);
  };

  const changeTheme = () => {
    if (currentTheme.theme.name === "Light Theme") {
      localStorage.setItem("theme", "Dark Theme");
      currentTheme.setTheme(darkTheme);
    } else {
      localStorage.setItem("theme", "Light Theme");
      currentTheme.setTheme(lightTheme);
    }
  };
  const remonter = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openMore = (value, position) => {
    setPosScroll(position);
    setMore(value);
  };
  useEffect(() => {
    if (posScroll.back === true) {
      window.scrollTo({ top: posScroll.pos, behavior: "instant" });
      setPosScroll({ ...posScroll, back: false });
    }
  }, [posScroll]);
  useEffect(() => {
    if (more.activity || more.topHolders) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [more]);
  return (
    <Layout>
      <GlobalStyles />
      <BannerV1Wrapper ref={scrollRef}>
        {isMintColorPickerOpen ? <ColorPicker /> : null}
        {isKingColorPickerOpen ? <ColorPicker king="true" /> : null}
        {isMintOpen ? <Mint /> : null}
        {isPriceSelectorOpen ? <PriceSelector /> : null}
        {isSweepOpen ? <Sweep market="true" /> : null}
        {isBurnSweepOpen ? <Sweep /> : null}
        {isEnsSelectorOpen ? <EnsSelector /> : null}
        {isKingEnsSelectorOpen ? <EnsSelector king="true" /> : null}
        {isKillOpen ? <KillValidator /> : null}
        {isBurnOpen ? <BurnValidator /> : null}
        {isKingHandOpen ? <RevealKingHand /> : null}
        <RightSection
          more={more}
          openFunction={openMore}
          actualPage={link}
          subPage={linkProfile}
          theme={currentTheme.theme.name}
        />
        <div
          style={{
            position: "fixed",
            bottom:
              thread === "open" ||
              faq === "open" ||
              more.topHolder ||
              more.activity
                ? "5px"
                : "55px",
            right: "10px",
            zIndex: "10",
          }}
        >
          {isMobile && (
            <img
              alt=""
              src={flecheHaut}
              onClick={() => remonter()}
              style={{ maxWidth: "60px", cursor: "pointer" }}
            />
          )}
        </div>
        <div className="menuLeftContent">
          <div className="homeLeftLogo">
            <img
              src={
                currentTheme.theme.name === "Dark Theme"
                  ? logoSite
                  : logoSiteLight
              }
              alt=""
            />
          </div>
          <SectionNav onClick={() => changePage("home")}>
            <NavLink active={link === "home" || link === true ? true : false}>
              {link === "home" || link === true ? (
                <img
                  alt=""
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? homeLightSelect
                      : homeDarkSelect
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                />
              ) : (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? homeLight
                      : homeDark
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                  alt=""
                />
              )}
              <NavSpan>Home</NavSpan>
            </NavLink>
          </SectionNav>
          <SectionNav onClick={() => changePage("buy")}>
            <NavLink active={link === "buy" ? true : false}>
              {link === "buy" ? (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? kingAuctionLightSelect
                      : kingAuctionDarkSelect
                  }
                  style={{ maxWidth: "36px", paddingRight: "10px" }}
                  alt=""
                />
              ) : (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? kingAuctionLight
                      : kingAuctionDark
                  }
                  style={{ maxWidth: "36px", paddingRight: "10px" }}
                  alt=""
                />
              )}
              <NavSpan style={{ left: "5px" }}>King's Auction</NavSpan>
            </NavLink>
          </SectionNav>
          <SectionNav onClick={() => changePage("market")}>
            <NavLink active={link === "market" ? true : false}>
              {link === "market" ? (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? marketLightSelect
                      : marketDarkSelect
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                  alt=""
                />
              ) : (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? marketLight
                      : marketDark
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                  alt=""
                />
              )}

              <NavSpan style={{ position: "relative", top: "3px" }}>
                Market
              </NavSpan>
            </NavLink>
          </SectionNav>
          <SectionNav onClick={() => changePage("profile")}>
            <NavLink active={link === "profile" ? true : false}>
              {link === "profile" ? (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? profileLightSelect
                      : profileDarkSelect
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                  alt=""
                />
              ) : (
                <img
                  src={
                    currentTheme.theme.name === "Dark Theme"
                      ? profileLight
                      : profileDark
                  }
                  style={{ maxWidth: "40px", paddingRight: "10px" }}
                  alt=""
                />
              )}
              <NavSpan>Profile</NavSpan>
            </NavLink>
          </SectionNav>
          <SectionNav style={{ padding: "0" }}>
          <w3m-button className="connectWallet" balance="hide" />
            <ConnectWallet
              modalTitle="Connect a wallet"
              className="connectionButtonSideMenu"
              modalTitleIconUrl={""}
              style={{
                width: "170px",
                backgroundColor: "rgb(29, 155, 240)",
                color: "white",
                height: "43px",
                fontSize: "22px !important",
              }}
            />
          </SectionNav>
        </div>
        {thread !== "open" &&
          faq !== "open" &&
          !more.topHolders &&
          !more.activity && (
            <div className="text-content" id="full">
              <div className="banner-container">
                <img id="banner" src={banner} alt="" />
                <div id="bannerMobile" className="banner-mobile">
                  <img
                    src={flou}
                    style={{ width: "100%", height: "100%" }}
                    alt=""
                  />
                  <div id="bannerName" className="title-page">
                    <span style={{ textShadow: "2px 2px 0px #000000" }}>
                      Number Runner Club
                    </span>
                  </div>
                </div>
                <div className="logo" id="logo">
                  {ensUrl === "" ? (
                    <>
                      <img
                        src={
                          currentTheme.theme.name === "Light Theme"
                            ? logoDark
                            : logo
                        }
                        className="logoImg"
                        id="logoImg"
                        alt=""
                      />
                    </>
                  ) : (
                    <img className="ensImg" src={ensUrl} alt="" />
                  )}
                </div>
              </div>
              <div className="contentButton">
                <button
                  className="smallButton langButton"
                  id="themeButton"
                  onClick={() => changeTheme()}
                >
                  {currentTheme.theme.name === "Dark Theme" ? (
                    <WbSunnyIcon />
                  ) : (
                    <NightsStayIcon />
                  )}
                </button>
                <button
                  id="mint"
                  style={
                    currentTheme.theme.name === "Light Theme"
                      ? {
                          color: "white",
                          backgroundColor: "black",
                        }
                      : {}
                  }
                  className="bigButton"
                  onClick={mintPawn}
                >
                  Mint
                </button>
                <ConnectWallet
                  modalTitle="Connect a wallet"
                  modalTitleIconUrl={""}
                  className="connectionButton"
                  btnTitle="Connect"
                />
              </div>
              <div className="description">
                <div id="name" className="name">
                  {ensName === "" ? (
                    <>
                      <strong>Number Runner Club</strong>{" "}
                      <div
                        style={{ display: "inline-flex", alignItems: "top" }}
                      >
                        <img
                          alt="twitter tag"
                          style={{ width: "18px" }}
                          src={tag}
                        />
                      </div>
                    </>
                  ) : (
                    ensName+".eth"
                  )}
                </div>
                <div className="pieces">
                  {address === undefined ? <>@TheNRClub</> : hashtag}
                </div>
                <div className="text">
                  Number Runner Club is a deflationary collection of 10.000 PFP
                  NFTs for{" "}
                  <span style={{ color: "rgb(29, 155, 240)" }}>
                    #ENSDomains
                  </span>{" "}
                  | <span style={{ color: "rgb(29, 155, 240)" }}>#999club</span>{" "}
                  • <span style={{ color: "rgb(29, 155, 240)" }}>#10kClub</span>{" "}
                  •{" "}
                  <span style={{ color: "rgb(29, 155, 240)" }}>#100kClub</span>{" "}
                  | No Royalties* |
                </div>
                <div className="text" style={{ position: "relative" }}>
                  For more information{" "}
                  <img
                    src={emojiDoigt}
                    style={{
                      width: "1em",
                      position: "relative",
                      left: "5px",
                      top: "3px",
                    }}
                    alt=""
                  />
                </div>
                <div className="textJoined">
                  <img
                    src={localisation}
                    className="calendarImg"
                    style={{ marginRight: "5px" }}
                    alt=""
                  />
                  <span style={{ marginRight: "20px" }}>Chessboard</span>
                  <img
                    src={iconLink}
                    className="calendarImg"
                    style={{ marginRight: "5px" }}
                    alt=""
                  />
                  <a
                    href=""
                    style={{ color: "rgb(29, 155, 240)" }}
                  >
                    available soon
                  </a>
                  <div style={{ marginTop: "14px" }}>
                    <img
                      src={calendar}
                      className="calendarImg"
                      style={{ marginRight: "5px" }}
                      alt=""
                    />
                    Joined in June 2022
                    <img
                      alt="gas icon"
                      src={gasIcon}
                      style={{
                        marginLeft: "20px",
                        marginRight: "5px",
                        height: "1em",
                        top: "-2px",
                        position: "relative",
                      }}
                    />
                    {Math.trunc(Number(gasPrice) * 10 ** -9)} Gwei
                    <div></div>
                  </div>
                </div>
                <div className="textOther">
                  <span className="textWhite">{totalMinted}</span> Mint{" "}
                  <span className="textWhite leftText">
                    {totalMinted - currentSupply}
                  </span>{" "}
                  Burn{" "}
                  <img
                    alt=""
                    className="leftText"
                    style={{ height: "16px", marginBottom: "2px" }}
                    src={
                      currentTheme.theme.name === "Dark Theme" ? eth : ethDark
                    }
                  />
                  <span className="textWhite">
                    {(Number(volume) * 10 ** -18).toFixed(3)}
                  </span>{" "}
                  Volume{" "}
                  <img
                    alt=""
                    className="leftText"
                    style={{ height: "16px", marginBottom: "2px" }}
                    src={
                      currentTheme.theme.name === "Dark Theme" ? eth : ethDark
                    }
                  />
                  <span className="textWhite">
                    {(Number(prizePool) * 10 ** -18).toFixed(3)}
                  </span>{" "}
                  Pool{" "}
                </div>
              </div>
            </div>
          )}
      </BannerV1Wrapper>
      <NavWrapper>
        {thread !== "open" &&
          faq !== "open" &&
          !more.topHolders &&
          !more.activity && (
            <div className="container">
              <div id="navbar" className="bithu_menu_sect">
                <div
                  className="bithu_menu_right_sect bithu_v1_menu_right_sect"
                  id="scroll-nav"
                >
                  <div className="bithu_menu_list" style={{ height: "100%" }}>
                    <ul style={{ height: "100%" }}>
                      <li
                        onClick={() => changePage("home")}
                        className="navbar-link"
                      >
                        <div
                          style={{
                            color:
                              link === "home" ||
                              link === "" ||
                              typeof link === "boolean"
                                ? null
                                : "grey",
                          }}
                        >
                          Home
                          {(link === "home" ||
                            link === "" ||
                            typeof link === "boolean") && (
                            <div className="barreBleu"></div>
                          )}
                        </div>
                      </li>
                      <li
                        onClick={() => changePage("buy")}
                        className="navbar-link"
                      >
                        <div style={{ color: link === "buy" ? null : "grey" }}>
                          King's Auction
                          {link === "buy" && <div className="barreBleu"></div>}
                        </div>
                      </li>
                      <li
                        onClick={() => changePage("market")}
                        className="navbar-link"
                      >
                        <div
                          style={{ color: link === "market" ? null : "grey" }}
                        >
                          Market
                          {link === "market" && (
                            <div className="barreBleu"></div>
                          )}
                        </div>
                      </li>
                      <li
                        onClick={() => changePage("profile")}
                        className="navbar-link"
                      >
                        <div
                          style={{ color: link === "profile" ? null : "grey" }}
                        >
                          Profile
                          {link === "profile" && (
                            <div className="barreBleu"></div>
                          )}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mobile-menu">
                <div className="mobile-link" onClick={() => changePage("home")}>
                  {link === "home" || link === true ? (
                    <img
                      alt=""
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? homeLightSelect
                          : homeDarkSelect
                      }
                    />
                  ) : (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? homeLight
                          : homeDark
                      }
                      alt=""
                    />
                  )}
                </div>
                <div className="mobile-link" onClick={() => changePage("buy")}>
                  {link === "buy" ? (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? kingAuctionLightSelect
                          : kingAuctionDarkSelect
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? kingAuctionLight
                          : kingAuctionDark
                      }
                      alt=""
                    />
                  )}
                </div>
                <div
                  className="mobile-link"
                  onClick={() => changePage("market")}
                >
                  {link === "market" ? (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? marketLightSelect
                          : marketDarkSelect
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? marketLight
                          : marketDark
                      }
                      alt=""
                    />
                  )}
                </div>
                <div
                  className="mobile-link"
                  onClick={() => changePage("profile")}
                >
                  {link === "profile" ? (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? profileLightSelect
                          : profileDarkSelect
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        currentTheme.theme.name === "Dark Theme"
                          ? profileLight
                          : profileDark
                      }
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>
          )}
      </NavWrapper>
      <AboutStyleWrapper>
        {more.topHolders && (
          <div className="content-no-padding">
            <div className="QuitThread text-content">
              <img
                onClick={() =>
                  openMore(
                    { ...more, topHolders: false, activity: false, page: null },
                    { ...posScroll, back: true }
                  )
                }
                src={
                  currentTheme.theme.name === "Light Theme"
                    ? flecheDark
                    : fleche
                }
                alt=""
              />
              <span>Top Holders</span>
            </div>
            <div
              style={{ marginTop: "calc(53px - 16px)" }}
              className="min-height"
            >
              <Analyctic />
            </div>
          </div>
        )}
        {more.activity && (
          <div className="text-content">
            <div className="QuitThread text-content">
              <img
                onClick={() =>
                  openMore(
                    { ...more, topHolders: false, activity: false, page: null },
                    { ...posScroll, back: true }
                  )
                }
                src={
                  currentTheme.theme.name === "Light Theme"
                    ? flecheDark
                    : fleche
                }
                alt=""
              />
              <span>Activity</span>
            </div>
            <div
              style={{ marginTop: "calc(53px - 16px)" }}
              className="min-height"
            >
              <Activity theme={currentTheme.theme.name} />
            </div>
          </div>
        )}
        {(link === "home" || link === "" || typeof link === "boolean") &&
          !more.topHolders &&
          !more.activity && (
            <div>
              {faq !== "open" && (
                <div className="text-content" id="contentFirst">
                  {thread !== "open" && (
                    <div>
                      <div className="retweet">
                        <img src={epingle} className="retweetImg" alt="" />{" "}
                        <strong>Pinned Post</strong>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            <span>
                              How does the Number Runner Club v1 work, and more
                              importantly, how do you become a member ?
                            </span>
                            <br />
                            <br />A thread{" "}
                            <img
                              src={emojiThread}
                              className="retweetImg"
                              alt=""
                              style={{ marginRight: "0" }}
                            />
                            :<br />
                            <div className="contentBanner">
                              <img src={soldat} alt="" />
                            </div>
                            {thread !== "open" && (
                              <div
                                onClick={() => showThread("open")}
                                style={{
                                  marginTop: "15px",
                                  color: "rgb(29, 155, 240)",
                                  cursor: "pointer",
                                }}
                              >
                                <strong
                                  onClick={() =>
                                    openMore(more, {
                                      ...posScroll,
                                      pos: window.scrollY,
                                    })
                                  }
                                >
                                  Show this thread
                                </strong>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {thread === "open" && (
                    <>
                      <div className="QuitThread text-content">
                        <img
                          onClick={() => {
                            showThread("close");
                            openMore(more, { ...posScroll, back: true });
                          }}
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? flecheDark
                              : fleche
                          }
                          alt=""
                        />
                        <span>Thread</span>
                      </div>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            marginTop: "53px",
                          }}
                        >
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div
                            className="title"
                            style={{ marginTop: "7px", marginLeft: "7px" }}
                          >
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <br />
                            <span className="account">@TheNRClub</span>
                          </div>
                        </div>
                        <div style={{ marginTop: "11px" }}>
                          <div className="description">
                            <span>
                              How does the Number Runner Club v1 work, and more
                              importantly, how do you become a member ?
                            </span>
                            <br />
                            <br />A thread{" "}
                            <img
                              src={emojiThread}
                              className="retweetImg"
                              alt=""
                              style={{ marginRight: "0" }}
                            />
                            :<br />
                            <div
                              className="contentBanner"
                              style={{ maxHeight: "600px" }}
                            >
                              <img src={soldat} alt="" />
                            </div>
                            {thread !== "open" && (
                              <div
                                onClick={() => showThread("open")}
                                style={{
                                  marginTop: "15px",
                                  color: "rgb(29, 155, 240)",
                                  cursor: "pointer",
                                }}
                              >
                                <strong
                                  onClick={() =>
                                    openMore(more, {
                                      ...posScroll,
                                      pos: window.scrollY,
                                    })
                                  }
                                >
                                  Show this thread
                                </strong>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="barreObliqueBasse"></div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            [1] Namely: The Number Runner Club V1 is a
                            deflationary collection of 10,000 PFP NFTs thought
                            for Ethereum Name Service (ENS) domain names.
                            <div className="contentBanner">
                              <img
                                src={ens}
                                alt=""
                                style={{ marginBottom: "21px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            On Ethereum Name Service (ENS), there are several
                            "domain name clubs", all different from each other.
                            Everyone can use a logic based on numbers, letters,
                            emojis...
                            <br />
                            <br />
                            Example: A holder of an address like abc.eth is
                            considered a member of the 3Letter Club.
                            <br />
                            <br />
                            Each club offers its insiders the opportunity to
                            form very specific social groups. Groups dedicated
                            to communities, centers of interest, very particular
                            uses.
                            <br />
                            <br />
                            Want to join a club yourself? All you have to do is
                            register one of these famous ENS domain names on the
                            official website:{" "}
                            <a
                              style={{ color: "rgb(29, 155, 240)" }}
                              target="_blank"
                              rel="noreferrer"
                              href="https://ens.domains/"
                            >
                              ens.domains
                            </a>
                            . And if it is no longer available online, you can
                            of course purchase it on the secondary market.
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            Number Runner Club V1 is for holders of Ethereum
                            Name Service (ENS) domain names from the following
                            clubs :<br />
                            <br />- <strong>999Club</strong>; name with 3
                            digits: 000 to 999.eth
                            <br />- <strong>10kClub</strong>; name with 4
                            digits: 0000 to 9999.eth
                            <br />- <strong>100kClub</strong>; name with 5
                            digits: 00000 to 99999.eth
                            <div className="contentBanner">
                              <img
                                src={groupe}
                                alt=""
                                style={{ marginBottom: "21px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            [2] The ambition of Number Runner Club V1 is simple:
                            to build a community that is structured, recognized
                            and able to adapt to changes in the market. All in a
                            playful way.
                            <br />
                            <br />
                            Ultimately, the club wants to allow the emergence of
                            a product where long-term owners will not be seen as
                            mere investors but will be placed at the center of
                            the project.
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            [3] How does the Number Runner Club V1 NFT
                            collection work?
                            <br />
                            <br />
                            The Number Runner Club V1 is a deflationary
                            collection of 10,000 NFT PFPs with 6 levels of
                            rarity:
                            <br />
                            <br />
                            - KING: 2 NFTs out of 10,000
                            <br />
                            - QUEEN : 10 NFTs out of 10,000
                            <br />
                            - ROOK : 50 NFTs out of 10,000
                            <br />
                            - KNIGHT : 100 NFTs out of 10,000
                            <br />
                            - BISHOP: 200 NFTs out of 10,000
                            <br />- PAWN: 9638 NFTs out of 10,000
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            Future holders will have to meet certain conditions
                            or perform certain actions in order to qualify for
                            the different levels of rarity of the NFTs in the
                            collection.
                            <br />
                            <br />
                            Each Number Runner Club V1 NFT allows you to
                            preserve your 999Club, 10kClub or 100kClub Ethereum
                            Name Service (ENS) domain name and receive rewards
                            redistributed in Ethereum (ETH).
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            Each NFT from the collection generates rewards on
                            the Number Runner Club V1 smart contract that can
                            only be claimed in 3 specific cases :<br />
                            - Sell your NFT.
                            <br />
                            - Burn your NFT.
                            <br />- Or wait until the collection reaches 999
                            NFTs remaining in circulation
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            In addition to individual rewards, a general prize
                            pool will be reserved for the holders of the
                            remaining 999 NFTs of Number Runner Club V1. The
                            prize pool will be equally redistributed among the
                            999 NFT.
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={pawnLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The Pawn</strong>{" "}
                          <span className="account">@NRPawn</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « The basic, indispensable, but terribly
                          underestimated element. »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 9638 items :</strong>
                        <br />
                        - 4819 white pawns
                        <br />
                        - 4819 black pawns
                        <br />
                        <br />
                        <strong>Who can mint and stack?</strong>
                        <br />
                        <br />
                        - 999Club, 10kClub and 100kClub holders
                        <br />
                        <br />
                        They share 100% of the transaction fees, but the rate
                        gradually decreases to 40% as new categories of NFT has
                        been stacked.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Burn tax: 20% (50% Holders | 50% Pool)
                      </div>
                      <div className="contentBanner">
                        <img src={bannerPawn} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={kingLogo} className="logoImg" alt="" />
                      </div>
                      <div className="barreOblique"></div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The King</strong>{" "}
                          <span className="account">@NRKing</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « The Lord of the place. Central point of the device.
                          To possess it is to rule. »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 2 items</strong>
                        <br />
                        - 1 white king
                        <br />
                        - 1 black king
                        <br />
                        <br />
                        The Kings will be the only NFTs in the collection to be
                        sold as a Dutch auction.
                        <br />
                        <br />
                        n.b. This method places the first bidding threshold
                        deliberately above the actual price of the NFT and
                        allows the latter to fall gradually until the NFT finds
                        a buyer.
                        <br />
                        <br />
                        <strong>Who can bid?</strong>
                        <br />
                        <br />
                        - 999Club holders
                        <br />
                        <br />
                        The two kings share 20% of the transaction fees.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Impossible burn of the King
                      </div>
                      <div className="contentBanner">
                        <img
                          src={bannerKing}
                          alt=""
                          style={{ marginBottom: "21px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={kingLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The King</strong>{" "}
                          <span className="account">@NRKing</span>
                        </span>
                      </div>
                      <div className="description">
                        The proceeds of the king auction are redistributed among
                        10 holders who discover the hand of the king on one of
                        the pieces they have minted. To prevent cheating, the
                        king's hands are encrypted and are only revealed when
                        all the nfts have been minted.
                        <br />
                        <br />
                        Nevertheless, a reveal function allows you to know if
                        you have a king's hand in your possession if you decide
                        to burn a nft before it is sold out. 0.01 eth will be
                        used to activate the function. The pot of one of the
                        king's burn hands "unintentionally" is redistributed to
                        the prize pool.
                      </div>
                      <div className="contentBanner">
                        <img src={mainRoi} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={bishopLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The Bishop</strong>{" "}
                          <span className="account">@NRBishop</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « The free electron. Capable of anything, and
                          especially at any time! »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 200 items :</strong>
                        <br />
                        - 100 white bishops
                        <br />
                        - 100 black bishops
                        <br />
                        <br />
                        <strong>How do you mint a Bishop ?</strong>
                        <br />
                        <br />
                        - Have already Stacked an NFT of the collection with an
                        address of 999Club, 10kClub
                        <br />
                        - Burn 10 counters that you mint or buy on the secondary
                        market
                        <br />
                        <br />
                        <strong>How do you stack a Bishop ?</strong>
                        <br />
                        <br />
                        Have a domain name available of 999Club or 10kClub to
                        stack the Bishop.
                        <br />
                        <br />
                        The Bishops share 10% of the transaction fees.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Burn tax: 15% (50% Holders | 50% Pool)
                      </div>
                      <div className="contentBanner">
                        <img src={bannerBishop} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={knightLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The Knight</strong>{" "}
                          <span className="account">@NRKnight</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « The wisest hunter. Fast, precise, deadly. »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 100 items :</strong>
                        <br />
                        - 50 white knights
                        <br />
                        - 50 black knights
                        <br />
                        <br />
                        <strong>How do you mint a Knight ?</strong>
                        <br />
                        <br />
                        - Have already Stacked an NFT of the collection with an
                        address of 999Club, 10kClub
                        <br />
                        - Burn 10 counters of the opponent's color bought on the
                        secondary market
                        <br />
                        <br />
                        <strong>How do you stack a Knight ?</strong>
                        <br />
                        <br />
                        Have a domain name available of 999Club, 10kClub to
                        stack the Knight.
                        <br />
                        <br />
                        The Knights share 10% of the transaction fees.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Burn tax: 15% (50% Holders | 50% Pool)
                      </div>
                      <div className="contentBanner">
                        <img src={bannerKnight} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={rookLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The Rook</strong>{" "}
                          <span className="account">@NRRook</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « The great guardian of the place. Nothing escapes
                          him. Absolutely nothing. »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 50 items :</strong>
                        <br />
                        - 25 white rooks
                        <br />
                        - 25 black rooks
                        <br />
                        <br />
                        <strong>How do you mint a Rook ?</strong>
                        <br />
                        <br />
                        - Have already Stacked an NFT of the collection with an
                        address of 999Club, 10kClub
                        <br />
                        - Burn 15 counters of the opponent's color bought on the
                        secondary market
                        <br />
                        <br />
                        <strong>How do you stack a Rook ?</strong>
                        <br />
                        <br />
                        Have a domain name available of 999Club, 10kClub
                        palindrome to stack the Rook.
                        <br />
                        <br />
                        The Rooks share 10% of the transaction fees.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Burn tax: 15% (50% Holders | 50% Pool)
                      </div>
                      <div className="contentBanner">
                        <img src={bannerRook} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>Number Runner Club has reposted</strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={queenLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        <span>
                          <strong>The Queen</strong>{" "}
                          <span className="account">@NRQueen</span>
                        </span>
                      </div>
                      <div className="description">
                        <i style={{ fontSize: "14px" }}>
                          « She is the grand dame of the place and keeps order
                          in the game. To defy it is to perish. »
                        </i>
                        <br />
                        <br />
                        <strong>Supply of 10 items :</strong>
                        <br />
                        - 5 white queens
                        <br />
                        - 5 black queens
                        <br />
                        <br />
                        <strong>How do you mint a Queen ?</strong>
                        <br />
                        <br />
                        - Have already Stacked an NFT from the collection with a
                        999Club address
                        <br />
                        - Burn 15 counters of the opponent's color bought on the
                        secondary market
                        <br />
                        <br />
                        <strong>How do you stack a Queen ?</strong>
                        <br />
                        <br />
                        Have a domain name available of 999Club to stack the
                        Queen.
                        <br />
                        <br />
                        The Queens share 10% of the transaction fees.
                        <br />
                        <br />
                        - Sales tax: 20% (50% Holders | 50% Pool)
                        <br />- Burn tax: 15% (50% Holders | 50% Pool)
                      </div>
                      <div className="contentBanner">
                        <img src={bannerQueen} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>Final prize pool</strong> <br />
                        <br />
                        Only the NFTs stacked with a 999Club or a 10Kclub have
                        access to the final prize pool. <sup>2</sup>
                        <br />
                        <br />
                        <sup>2</sup>{" "}
                        <i>
                          The collection has ended and you're not in these
                          clubs?
                          <br />
                          Don't worry, it's not too late to join these clubs and
                          claim your prize !
                          <br />
                        </i>
                      </div>
                      <div className="contentBanner">
                        <img src={tableau} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>Is the collection sold out?</strong> <br />
                        <br />
                        The aftermarket is a new opportunity to reap the
                        benefits of the project. Acquire a pawn, a bishop, a
                        knight, a rook, a queen or, even better, a king. And
                        become a member of the Number Runner Club to protect
                        your number!
                      </div>
                      <div className="contentBanner">
                        <img src={tableau2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>ENS transfer</strong> <br />
                        <br />
                        If you become the new owner of a digit already used in
                        the collection, you're also the new owner of his Number
                        Runner ! <br />
                        <br />
                        The rewards stacked can now be claimed thanks to your
                        digit.
                        <br />
                        <br />
                        Note:{" "}
                        <i>
                          You can find the rewards of your digit in Market
                          &rarr; Analytics
                        </i>
                      </div>
                      <div className="contentBanner">
                        <img src={duo2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>Burn opponent color</strong>
                        <br />
                        <br />
                        <u>Burning options on chessboard:</u>
                        <br />
                        <br />
                        <strong>When all NFTS are minted;</strong>
                        <br />
                        <br />
                        <strong>- NFT unstacked:</strong>
                        <br />
                        0.1eth + 10% of the rewards for the burner
                        <br />
                        <br />
                        <strong>- NFT listed:</strong>
                        <br /> 0.2eth + 10% of the rewards for the burner
                        <br />
                        <br />
                        <strong>- NFT stacked with a 100kClub:</strong>
                        <br /> 0.3eth + 10% of the rewards for the burner
                        <br />
                        <br />
                        The owner of the NFT burn will be taxed 15% of his
                        rewards.
                        <br />
                        <br />
                        The burn taxes will be refund for holder of the last 999
                        NFTs.
                      </div>
                      <div className="contentBanner">
                        <img src={duo1} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content">
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>Expiration date</strong> <br />
                        <br />
                        Each stacked NFT merges with your number, then for its
                        expiration date!
                        <br />
                        <br />
                        Make sure you renew it before it expired and prove it on
                        your profile, or your NFT will be added to the
                        chessboard and risk being burned by others for free.
                        <br />
                        <br />
                        The owner of the NFT burn will be taxed 15% of his
                        rewards.
                      </div>
                      <div className="contentBanner">
                        <img src={horloge} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && (
                <div className="text-content">
                  {faq !== "open" && (
                    <div className="flex" id="faqBloc">
                      <div className="contentLogo">
                        <div className="logo">
                          <img
                            src={
                              currentTheme.theme.name === "Light Theme"
                                ? logoDark
                                : logo
                            }
                            className="logoImg"
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <div className="title">
                          Number Runner Club{" "}
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "top",
                            }}
                          >
                            <img
                              alt="twitter tag"
                              style={{ width: "18px" }}
                              src={tag}
                            />
                          </div>{" "}
                          <span className="account">@TheNRClub</span>
                          <br />
                        </div>
                        <div className="description">
                          <div className="contentBanner contentBannerFaq">
                            <img src={faqGif} alt="" />
                          </div>
                          <div
                            onClick={() => showFaq("open")}
                            style={{
                              marginTop: "15px",
                              color: "rgb(29, 155, 240)",
                              cursor: "pointer",
                            }}
                          >
                            <strong
                              onClick={() =>
                                openMore(more, {
                                  ...posScroll,
                                  pos: window.scrollY,
                                })
                              }
                            >
                              Show the FAQ
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {faq === "open" && (
                    <div>
                      <div className="QuitThread text-content">
                        <img
                          onClick={() => {
                            showFaq("close");
                            openMore(more, { ...posScroll, back: true });
                          }}
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? flecheDark
                              : fleche
                          }
                          alt=""
                        />
                        <span>FAQ</span>
                      </div>
                      <div id="faqBloc" style={{ marginTop: "53px" }}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div
                            className="title"
                            style={{ marginTop: "7px", marginLeft: "7px" }}
                          >
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>
                            <br />
                            <span className="account">@TheNRClub</span>
                          </div>
                        </div>
                        <div style={{ marginTop: "11px" }}>
                          <div className="description">
                            <div
                              className="contentBanner"
                              style={{ maxHeight: "600px" }}
                            >
                              <img src={faqGif} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="barreObliqueBasse"></div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                            <br />
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            <strong>
                              How much does the mint of a Number Runner cost ?
                            </strong>
                            <br />
                            <br />
                            The mint of a Number Runner is at 0,1 eth :<br />
                            - 0.05 eth is redistributed to holders (50% Holders |
                            50% Pool)
                            <br />- 0.05 eth for the team
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            <strong>Why didn't you turn to freemint ?</strong>
                            <br />
                            <br />
                            Because the power of the community will make the
                            project a success.
                            <br />
                            <br />
                            The Number Runner Club wants to reward early owners
                            and those who commit to the project. Number Runner
                            Club V1 does not receive royalties on NFT sales.
                            Mint is therefore essential to support the project
                            and help it develop.
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                          <div className="barreOblique"></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div
                            className="description"
                            style={{ marginBottom: "21px" }}
                          >
                            <strong>How to Stack my Number Runner?</strong>
                            <br />
                            <br />
                            Go to the “my profile” tab and let us guide you.
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="contentLogo">
                          <div className="logo">
                            <img
                              src={
                                currentTheme.theme.name === "Light Theme"
                                  ? logoDark
                                  : logo
                              }
                              className="logoImg"
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club{" "}
                            <div
                              style={{
                                display: "inline-flex",
                                alignItems: "top",
                              }}
                            >
                              <img
                                alt="twitter tag"
                                style={{ width: "18px" }}
                                src={tag}
                              />
                            </div>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            <strong>
                              What will happen once there is no more 999 Number
                              Runner in circulation?
                            </strong>
                            <br />
                            <br />
                            Once the collection reaches 999 Number Runner in
                            circulation, holders will be able to withdraw their
                            rewards tax-free as noted above. They will also be
                            able to reclaim their shares of the overall prize
                            pool.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="text-content" style={{marginBottom: "20px"}}>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img
                          src={
                            currentTheme.theme.name === "Light Theme"
                              ? logoDark
                              : logo
                          }
                          className="logoImg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        Number Runner Club{" "}
                        <div
                          style={{ display: "inline-flex", alignItems: "top" }}
                        >
                          <img
                            alt="twitter tag"
                            style={{ width: "18px" }}
                            src={tag}
                          />
                        </div>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      <div className="description">
                        <strong>The Smart-Contracts, in detail...</strong>
                        <br />
                        <br />
                        Transparency and reliability... These are the key words
                        of the project. To convince yourself of this, you can
                        now consult the smart contract developed for the needs
                        of the Number Runner Club.
                        <br />
                        Here you will find all the information about the
                        operation and the internal mechanics of the concept.
                      </div>
                      <div className="contentBannerWithText">
                        <a
                          href="https://github.com/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div>
                            <img src={contrat} alt="" />
                          </div>
                          <div className="TextcontentBanner">
                            <div
                              style={{
                                color: "rgb(139,152,165)",
                                fontSize: "14px",
                              }}
                            >
                              https://github.com/
                            </div>
                            <div
                              style={{
                                color:
                                  currentTheme.theme.name === "Dark Theme"
                                    ? "white"
                                    : "rgb(15, 20, 25)",
                                fontSize: "14px",
                              }}
                            >
                              Let's build from here · GitHub
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        {link === "buy" && !more.topHolders && !more.activity && (
          <div className="text-content">
            <KingAuction theme={currentTheme.theme.name} />
          </div>
        )}
        {link === "market" && !more.topHolders && !more.activity && (
          <div className="content-no-padding min-height">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div className="sub-nav-market">
                <SubNavLink
                  active={
                    linkMarket === "items" ||
                    linkMarket === "" ||
                    typeof linkMarket === "boolean"
                      ? true
                      : false
                  }
                  onClick={() => changePageMarket("items")}
                >
                  Marketplace
                  {(linkMarket === "items" ||
                    linkMarket === "" ||
                    typeof linkMarket === "boolean") && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkMarket === "activity" ? true : false}
                  onClick={() => changePageMarket("activity")}
                >
                  Activity
                  {linkMarket === "activity" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkMarket === "analyctic" ? true : false}
                  onClick={() => changePageMarket("analyctic")}
                >
                  Analytics
                  {linkMarket === "analyctic" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
              </div>
            </div>
            {(linkMarket === "items" ||
              linkMarket === "" ||
              typeof linkMarket === "boolean") && (
              <div className="description">
                <MyNft
                  theme={currentTheme.theme.name}
                  market={true}
                  img={pawn5185}
                />
              </div>
            )}
            {linkMarket === "activity" && (
              <Activity theme={currentTheme.theme.name} />
            )}
            {linkMarket === "analyctic" && <Analyctic />}
          </div>
        )}

        {link === "profile" && !more.topHolders && !more.activity && (
          <div className="text-content min-height">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div className="sub-nav-market">
                <SubNavLink
                  active={linkProfile === "my_nft" ? true : false}
                  onClick={() => changePageProfile("my_nft")}
                >
                  Collection
                  {linkProfile === "my_nft" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkProfile === "graal" ? true : false}
                  onClick={() => changePageProfile("graal")}
                >
                  Graals
                  {linkProfile === "graal" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkProfile === "chessboard" ? true : false}
                  onClick={() => changePageProfile("chessboard")}
                >
                  Chessboard
                  {linkProfile === "chessboard" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
              </div>
            </div>
            {linkProfile === "graal" && (
              <div style={{ marginTop: "30px" }}>
                <hr
                  style={{
                    position: "relative",
                    marginBottom: "20px",
                    width: "calc(100% + 32px)",
                    left: "-16px",
                  }}
                  className="separator-limit"
                />
                <Graal
                  img={bishop}
                  data={{
                    type: 4,
                    supply: 200,
                    inf: 162,
                    sup: 361,
                    name: "The Bishop",
                    mint: [
                      {
                        type: "stack",
                        value: 0,
                        text: "Have already Stacked an NFT of the collection with an address of 999Club, 10kClub or 100kClub",
                      },
                      {
                        type: "burn",
                        value: 10,
                        text: "Burn 10 counters that you mint or buy on the secondary market",
                      },
                    ],
                  }}
                />
                <hr className="separator" />
                <Graal
                  img={knight}
                  data={{
                    type: 3,
                    supply: 100,
                    inf: 62,
                    sup: 161,
                    name: "The Knight",
                    mint: [
                      {
                        type: "stack",
                        value: 1,
                        text: "Have already Stacked an NFT of the collection with an address of 999Club, 10kClub",
                      },
                      {
                        type: "burnOpponent",
                        value: 10,
                        text: "Burn 10 counters of the opponent's color bought on the secondary market",
                      },
                    ],
                  }}
                />
                <hr className="separator" />
                <Graal
                  img={rook}
                  data={{
                    type: 2,
                    supply: 50,
                    inf: 12,
                    sup: 61,
                    name: "The Rook",
                    mint: [
                      {
                        type: "stack",
                        value: 1,
                        text: "Have already Stacked an NFT of the collection with an address of 999Club, 10kClub",
                      },
                      {
                        type: "burnOpponent",
                        value: 15,
                        text: "Burn 15 counters of the opponent's color bought on the secondary market",
                      },
                    ],
                  }}
                />
                <hr className="separator" />
                <Graal
                  img={queen}
                  data={{
                    type: 1,
                    supply: 10,
                    inf: 2,
                    sup: 11,
                    name: "The Queen",
                    mint: [
                      {
                        type: "stack",
                        value: 2,
                        text: "Have already Stacked an NFT from the collection with a 999Club address",
                      },
                      {
                        type: "burnOpponent",
                        value: 15,
                        text: "Burn 15 counters of the opponent's color bought on the secondary market",
                      },
                    ],
                  }}
                />
                <hr
                  style={{
                    position: "relative",
                    marginBottom: "20px",
                    width: "calc(100% + 32px)",
                    left: "-16px",
                  }}
                  className="separator-limit"
                />
              </div>
            )}
            {linkProfile === "my_nft" && (
              <div className="description">
                <MyNft
                  theme={currentTheme.theme.name}
                  market={false}
                  img={pawn5185}
                />
              </div>
            )}
            {linkProfile === "chessboard" && (
              <div className="description">
                <Chessboard
                  theme={currentTheme.theme.name}
                  market={false}
                  img={pawn5185}
                />
              </div>
            )}
          </div>
        )}
      </AboutStyleWrapper>
    </Layout>
  );
};

export default HomeV1;
