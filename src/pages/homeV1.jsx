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
import groupe from "../assets/images/groupe.png";
import coffre from "../assets/images/coffre.png";
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
import tableau from "../assets/images/tableau.png";
import tableau2 from "../assets/images/tableau2.png";
import faqGif from "../assets/images/faq.png";
import contrat from "../assets/images/contrat.png";
import discord from "../assets/images/discord.jpg";
import pawn5185 from "../assets/images/5185.png";
import soldat from "../assets/images/soldat.png";
import {
  AboutStyleWrapper,
  SubNavLink,
} from "../components/section/about/v1/About.style";
import React from "react";
import { ThemeContext } from "../app/App";
import { lightTheme, darkTheme } from "../assets/styles/themes";
import { RightSection } from "../components/section/rightSection/rightSection";
import { Graal } from "../components/section/graal/graal";
import { KingAuction } from "../components/section/kingAuction/kingAuction";
import { MyNft } from "../components/section/myNft/myNft";
import { Analyctic } from "../components/section/analyctic/analyctic";
import { Activity } from "../components/section/activity/activity";
import ethDark from "../assets/images/ethDark.png";
import cavalier from "../assets/images/icon/IconCavalier-Blanc.png";
import iconLink from "../assets/images/icon/link.png";
import emojiDoigt from "../assets/images/icon/emojiDoigt.png";
import { useEthereum } from "../context/ethereumProvider";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import { ColorPicker } from "../components/section/colorPicker/ColorPicker";
import { Mint } from "../components/section/mint/Mint";

const HomeV1 = () => {
  const [link, changePageLink] = React.useState(true);
  const [linkMarket, changePageLinkMarket] = React.useState(true);
  const [linkProfile, changePageLinkProfile] = React.useState(true);
  const [thread, threadLink] = React.useState(true);
  const [faq, faqLink] = React.useState(true);
  const [listThemeLast, showListThemeLinkLast] = React.useState(true);
  const [listLang, showListLangLink] = React.useState(true);
  const [listLangLast, showListLangLinkLast] = React.useState(true);
  const [mobile, changeMobile] = React.useState(true);
  const currentTheme = React.useContext(ThemeContext);
  const [more, setMore] = React.useState({
    topHolders: false,
    activity: false,
    page: null,
  });
  const [posScroll, setPosScroll] = React.useState({ pos: 0, back: false });
  const langRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  const changePage = (link) => {
    changePageLink(link);
    if (link === "market") {
      changePageMarket("items");
    }
    if (link === "profile") {
      changePageProfile("home");
    }
  };
  React.useEffect(() => {
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
  const showListLang = (listLang, last) => {
    showListLangLink(listLang);
    showListLangLinkLast(last);
  };
  const remonter = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const m = (v1, v2) => {
    if (
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      changeMobile(v1);
    } else {
      changeMobile(v2);
    }
  };

  const { connectWallet } = useEthereum();
  const { mintPawn, isColorPickerOpen, isMintOpen } = useEthereum();

  const openMore = (value, position) => {
    setPosScroll(position);
    setMore(value);
  };
  React.useEffect(() => {
    if (posScroll.back === true) {
      window.scrollTo({ top: posScroll.pos, behavior: "instant" });
      setPosScroll({ ...posScroll, back: false });
    }
  }, [posScroll]);
  const clickOutside = (event) => {
    if (
      langRef.current &&
      !langRef.current.contains(event.target) &&
      listLang === "open"
    ) {
      showListLangLink(listLangLast);
      showListLangLinkLast("open");
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", clickOutside, true);
    return () => {
      document.removeEventListener("click", clickOutside, true);
    };
  });
  React.useEffect(() => {
    if (more.activity || more.topHolders) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [more]);
  return (
    <Layout>
      <GlobalStyles />
      <BannerV1Wrapper ref={scrollRef}>
        <RightSection
          more={more}
          openFunction={openMore}
          actualPage={link}
          subPage={linkProfile}
          theme={currentTheme.theme.name}
        />
        <div
          onLoad={() => m("yes", "no")}
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
              <NavSpan>Chessboard</NavSpan>
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
            <button
              className="bigButton"
              style={{
                width: "170px",
                backgroundColor: "rgb(29, 155, 240)",
                color: "white",
                height: "43px",
                fontSize: "18px",
              }}
              onClick={connectWallet}
            >
              Connect
            </button>
          </SectionNav>
        </div>
        {thread !== "open" &&
          faq !== "open" &&
          !more.topHolders &&
          !more.activity && (
            <div className="content" id="full">
              {isColorPickerOpen ? <ColorPicker /> : null}
              {isMintOpen ? <Mint /> : null}
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
                </div>
              </div>
              <div className="contentButton">
                <div ref={langRef} style={{ position: "relative" }}>
                  {listLang !== "open" && (
                    <button
                      className="smallButton"
                      onClick={() =>
                        showListLang("open", listLang, listThemeLast)
                      }
                    >
                      {listLang === "FR" && <div>FR</div>}
                      {(listLang === "EN" || listLang === true) && (
                        <div>EN</div>
                      )}
                      {listLang === "ES" && <div>ES</div>}
                    </button>
                  )}
                  {listLang === "open" && (
                    <div className="change">
                      {(listLangLast === "EN" || listLangLast === true) && (
                        <div
                          className="contentChange contentChangeActual"
                          onClick={() => showListLang("EN", listLang)}
                        >
                          EN
                        </div>
                      )}
                      {listLangLast !== "EN" && listLangLast !== true && (
                        <div
                          className="contentChange"
                          onClick={() => showListLang("EN", listLang)}
                        >
                          EN
                        </div>
                      )}
                      {listLangLast === "FR" && (
                        <div
                          className="contentChange contentChangeActual"
                          onClick={() => showListLang("FR", listLang)}
                        >
                          FR
                        </div>
                      )}
                      {listLangLast !== "FR" && (
                        <div
                          className="contentChange"
                          onClick={() => showListLang("FR", listLang)}
                        >
                          FR
                        </div>
                      )}
                      {listLangLast === "ES" && (
                        <div
                          className="contentChange contentChangeActual"
                          onClick={() => showListLang("ES", listLang)}
                        >
                          ES
                        </div>
                      )}
                      {listLangLast !== "ES" && (
                        <div
                          className="contentChange"
                          onClick={() => showListLang("ES", listLang)}
                        >
                          ES
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ position: "relative" }}>
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
                </div>
                {/* <Web3Button
      contractAddress="0xE0245C35171C8665AeeaAc7BB8A63BBDe341E468"
      contractAbi={NUMBERRUNNERCLUB_ABI}
      action={async (contract) => {
        const hasColorChosen = await contract.getUserColor(address);
        if (hasColorChosen === 0) {
          setIsColorPickerOpen(true);
          console.log("display choose color component");
        }
        else {
          const mint = await contract.mint(5, { value: ethers.utils.parseEther("0.2") }); // mint a Pawn
          console.log(mint);
        }
      }}
    >
      Mint
    </Web3Button> */}

                <button
                  style={
                    currentTheme.theme.name === "Light Theme"
                      ? {
                          color: "white",
                          backgroundColor: "black",
                          marginRight: "12px",
                        }
                      : { marginRight: "12px" }
                  }
                  className="bigButton"
                  onClick={mintPawn}
                >
                  Mint
                </button>
                {/* <ConnectWallet style={currentTheme.theme.name === "Light Theme" ? { color: "white", backgroundColor: "black" } : null} className="bigButton" btnTitle="Connect"></ConnectWallet> */}
                <button
                  style={
                    currentTheme.theme.name === "Light Theme"
                      ? { color: "white", backgroundColor: "black" }
                      : null
                  }
                  className="bigButton"
                  onClick={connectWallet}
                >
                  Connect
                </button>
              </div>
              <div className="description">
                <div id="name" className="name">
                  <strong>Number Runner Club</strong> <sup>v1/</sup>
                </div>
                <div className="pieces">@TheNRClub</div>
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
                  Join the NFTYChat{" "}
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
                    href="https://nftychat.xyz/"
                    style={{ color: "rgb(29, 155, 240)" }}
                  >
                    nftychat.xyz
                  </a>
                  <div style={{ marginTop: "14px" }}>
                    <img
                      src={calendar}
                      className="calendarImg"
                      style={{ marginRight: "5px" }}
                      alt=""
                    />
                    Joined in June 2022
                  </div>
                </div>
                <div className="textOther">
                  <img
                    alt=""
                    className="leftText"
                    style={{ height: "16px", marginBottom: "2px" }}
                    src={
                      currentTheme.theme.name === "Dark Theme" ? eth : ethDark
                    }
                  />
                  <span className="textWhite">250</span> Mint{" "}
                  <span className="textWhite leftText">
                    <img
                      alt=""
                      className="leftText"
                      style={{ height: "16px", marginBottom: "2px" }}
                      src={
                        currentTheme.theme.name === "Dark Theme" ? eth : ethDark
                      }
                    />
                    101
                  </span>{" "}
                  Burn{" "}
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
                          Chessboard
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
          <div className="content">
            <div className="QuitThread content">
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
            <ul className="list" style={{ marginTop: "calc(53px - 16px)" }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                (element, index) => (
                  <li key={index}>
                    <div className="holder-infos">
                      <span>{element} :</span>
                      <div className="holder-nft">
                        <img alt="" src={cavalier} />
                      </div>
                      <div className="holder-name">
                        <p>777.eth</p>
                        <p>@NRKing</p>
                      </div>
                      <div className="holder-data">700</div>
                    </div>
                  </li>
                )
              )}
            </ul>
            <div className="show-more">Show more</div>
          </div>
        )}
        {more.activity && (
          <div className="content">
            <div className="QuitThread content">
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
            <div style={{ marginTop: "calc(53px - 16px)" }}>
              <Activity theme={currentTheme.theme.name} />
            </div>
          </div>
        )}
        {(link === "home" || link === "" || typeof link === "boolean") &&
          !more.topHolders &&
          !more.activity && (
            <div>
              {faq !== "open" && (
                <div className="content" id="contentFirst">
                  {thread !== "open" && (
                    <div>
                      <div className="retweet">
                        <img src={epingle} className="retweetImg" alt="" />{" "}
                        <strong>
                          {(listLang === "EN" ||
                            listLang === true ||
                            listLangLast === "EN" ||
                            listLangLast === true) &&
                            "Pinned Post"}
                          {(listLang === "FR" || listLangLast === "FR") &&
                            "Article Epinglé"}
                          {(listLang === "ES" || listLangLast === "ES") &&
                            "Puesto Fijo"}
                        </strong>
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
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          <div className="description">
                            {(listLang === "EN" ||
                              listLang === true ||
                              (listLang === "open" && listLangLast === true) ||
                              (listLang === "open" &&
                                listLangLast === "EN")) && (
                              <span>
                                How does the Number Runner Club v1 work, and
                                more importantly, how do you become a member ?
                              </span>
                            )}
                            {(listLang === "FR" ||
                              (listLang === "open" &&
                                listLangLast === "FR")) && (
                              <span>
                                Comment fonctionne le Number Runner Club v1, et
                                surtout, comment en devenir l'un des membres ?
                              </span>
                            )}
                            {(listLang === "ES" ||
                              (listLang === "open" &&
                                listLangLast === "ES")) && (
                              <span>
                                ¿ Cómo funciona el Number Runner Club v1 y, lo
                                que es más importante, cómo me convierto en
                                miembro ?
                              </span>
                            )}
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
                      <div className="QuitThread content">
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
                          className="contentLogo"
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
                            Number Runner Club <sup>v1/</sup>
                            <br />
                            <span className="account">@TheNRClub</span>
                          </div>
                        </div>
                        <div style={{ marginTop: "11px" }}>
                          <div className="description">
                            {(listLang === "EN" ||
                              listLang === true ||
                              (listLang === "open" && listLangLast === true) ||
                              (listLang === "open" &&
                                listLangLast === "EN")) && (
                              <span>
                                How does the Number Runner Club v1 work, and
                                more importantly, how do you become a member ?
                              </span>
                            )}
                            {(listLang === "FR" ||
                              (listLang === "open" &&
                                listLangLast === "FR")) && (
                              <span>
                                Comment fonctionne le Number Runner Club v1, et
                                surtout, comment en devenir l'un des membres ?
                              </span>
                            )}
                            {(listLang === "ES" ||
                              (listLang === "open" &&
                                listLangLast === "ES")) && (
                              <span>
                                ¿ Cómo funciona el Number Runner Club v1 y, lo
                                que es más importante, cómo me convierto en
                                miembro ?
                              </span>
                            )}
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
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "92%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              [1] Namely: The Number Runner Club V1 is a
                              deflationary collection of 10,000 PFP NFTs thought
                              for Ethereum Name Service (ENS) domain names.
                              <div className="contentBanner">
                                <img src={ens} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              [1] A savoir : Le Number Runner Club V1 est une
                              collection déflationniste de 10.000 PFP NFTs
                              pensée pour les noms de domaine d’Ethereum Name
                              Service (ENS).
                              <br />
                              <div className="contentBanner">
                                <img src={ens} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              [1] A saber: El Number Runner Club V1 es una
                              colección deflacionaria de 10.000 PFP NFTs
                              diseñada para los nombres de dominio de Ethereum
                              Name Service (ENS).
                              <div className="contentBanner">
                                <img src={ens} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "89%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              On Ethereum Name Service (ENS), there are several
                              "domain name clubs", all different from each
                              other. Everyone can use a logic based on numbers,
                              letters, emojis...
                              <br />
                              <br />
                              Example: A holder of an address like abc.eth is
                              considered a member of the 3Letter Club.
                              <br />
                              <br />
                              Each club offers its insiders the opportunity to
                              form very specific social groups. Groups dedicated
                              to communities, centers of interest, very
                              particular uses.
                              <br />
                              <br />
                              Want to join a club yourself? All you have to do
                              is register one of these famous ENS domain names
                              on the official website:{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://ens.domains/"
                              >
                                ens.domains
                              </a>
                              . And if it is no longer available online, you can
                              of course purchase it on the secondary market.
                              <br />
                              <br />
                              Far from being a mere fad, the concept convinces
                              the major players in the market. Thus, the main
                              NFT marketplaces of the moment quickly decided to
                              adopt the use to categorize domain names.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Sur Ethereum Name Service (ENS), il existe
                              plusieurs « clubs de noms de domaine », tous
                              différents les uns des autres. Chacun peut
                              reprendre une logique basée sur des chiffres, des
                              lettres, des emojis...
                              <br />
                              <br />
                              Exemple : Un détenteur d’une adresse comme abc.eth
                              est considéré comme faisant partie du club des
                              3Lettres.
                              <br />
                              <br />
                              Chaque club offre à ses initiés la possibilité de
                              former des groupes sociaux très spécifiques. Des
                              groupes dédiés à des communautés, des centres
                              d'intérêts, des usages bien particuliers.
                              <br />
                              <br />
                              Envie de rejoindre un club par vous même? Il vous
                              suffit d'enregistrer l'un de ces fameux noms de
                              domaine ENS sur le site officiel :{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://ens.domains/"
                              >
                                ens.domains
                              </a>
                              . Et s'il n'est plus disponible en direct, vous
                              pouvez naturellement en faire l'acquisition sur le
                              marché secondaire.
                              <br />
                              <br />
                              Loin d'être une simple lubie, le concept convainc
                              les grands acteurs du marché. Ainsi, les
                              principales marketplaces NFT du moment ont
                              rapidement décidé d'en adopter l'usage pour
                              catégoriser les noms de domaine.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              En Ethereum Name Service (ENS), hay varios "clubes
                              de nombres de dominio", todos diferentes entre sí.
                              Cualquiera puede usar una lógica basada en
                              números, letras, emojis...
                              <br />
                              <br />
                              Ejemplo: Un titular de una dirección como abc.eth
                              es considerado miembro del club de las 3 Letras.
                              <br />
                              <br />
                              Cada club ofrece a sus iniciados la posibilidad de
                              formar grupos sociales muy específicos. Grupos
                              dedicados a comunidades, intereses, costumbres muy
                              particulares.
                              <br />
                              <br />
                              ¿Quieres unirte a un club por tu cuenta? Solo
                              tiene que registrar uno de los nombres de dominio
                              de ENS en el sitio web oficial:{" "}
                              <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://ens.domains/"
                              >
                                ens.domains
                              </a>
                              . Y si ya no está disponible en vivo, puede
                              comprarlo en el mercado secundario.
                              <br />
                              <br />
                              Lejos de ser una simple lujuria, el concepto
                              convence a los grandes actores del mercado. Por
                              ejemplo, los principales mercados NFT del momento
                              decidieron rápidamente adoptar el uso de NFT para
                              categorizar los nombres de dominio.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "93%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
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
                                <img src={groupe} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Le Number Runner Club V1 s’adresse aux détenteurs
                              des noms de domaine d’Ethereum Name Service (ENS),
                              des clubs suivants :<br />
                              <br />- <strong>999Club</strong>; nom avec 3
                              chiffres: 000 à 999.eth
                              <br />- <strong>10kClub</strong>; nom avec 4
                              chiffres: 0000 à 9999.eth
                              <br />- <strong>100kClub</strong>; nom avec 5
                              chiffres: 00000 à 99999.eth
                              <div className="contentBanner">
                                <img src={groupe} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              Number Runner Club V1 está dirigido a los
                              titulares de nombres de dominio de Ethereum Name
                              Service (ENS), de los siguientes clubes :<br />
                              <br />- <strong>999Club</strong>; nombre con 3
                              dígitos: 000 a 999.eth
                              <br />- <strong>10kClub</strong>; nombre con 4
                              dígitos: 0000 a 9999.eth
                              <br />- <strong>100kClub</strong>; nombre con 5
                              dígitos: 00000 a 99999.eth
                              <div className="contentBanner">
                                <img src={groupe} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "69%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              [2] The ambition of Number Runner Club V1 is
                              simple: to build a community that is structured,
                              recognized and able to adapt to changes in the
                              market. All in a playful way.
                              <br />
                              <br />
                              Ultimately, the club wants to allow the emergence
                              of a product where long-term owners will not be
                              seen as mere investors but will be placed at the
                              center of the project.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              [2] L'ambition du Number Runner Club V1 est simple
                              : construire une communauté structurée, reconnue
                              et capable de s’adapter à l’évolution du marché.
                              Le tout, de façon ludique.
                              <br />
                              <br />
                              En point d'orgue, le club veut permettre
                              l'émergence d'un produit où les détenteurs de long
                              terme ne seront pas vus comme de simples
                              investisseurs mais seront placés au centre du
                              projet.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              [2] La ambición del Number Runner Club V1 es
                              simple: construir una comunidad estructurada,
                              reconocida y capaz de adaptarse a los cambios del
                              mercado. Todo, de una manera divertida.
                              <br />
                              <br />
                              Como punto culminante, el club quiere permitir la
                              aparición de un producto en el que los titulares a
                              largo plazo no se vean como meros inversores, sino
                              que se sitúen en el centro del proyecto.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "78%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
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
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              [3] Comment fonctionne la collection NFT du Number
                              Runner Club V1 ?<br />
                              <br />
                              Le Number Runner Club V1 est une collection
                              déflationniste de 10.000 PFP NFTs avec 6 niveaux
                              de rareté :<br />
                              <br />
                              - ROI : 2 NFTs sur 10.000
                              <br />
                              - DAME : 10 NFTs sur 10.000
                              <br />
                              - TOUR : 50 NFTs sur 10.000
                              <br />
                              - CAVALIER : 100 NFTs sur 10.000
                              <br />
                              - FOU : 200 NFTs sur 10.000
                              <br />- PION : 9638 NFTs sur 10.000
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              [3] ¿Cómo funciona la colección NFT del Number
                              Runner Club V1?
                              <br />
                              <br />
                              El Number Runner Club V1 es una colección
                              deflacionaria de 10.000 PFP NFTs con 6 niveles de
                              rareza:
                              <br />
                              <br />
                              - REY: 2 NFTs de 10.000
                              <br />
                              - DAME: 10 NFTs de 10.000
                              <br />
                              - TORRE: 50 NFTs de 10.000
                              <br />
                              - CABALLERO: 100 NFTs de 10.000
                              <br />
                              - LOCO: 200 NFTs de 10.000
                              <br />- PEON : 9638 NFTs de 10.000
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "73%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              Future holders will have to meet certain
                              conditions or perform certain actions in order to
                              qualify for the different levels of rarity of the
                              NFTs in the collection.
                              <br />
                              <br />
                              Each Number Runner Club V1 NFT allows you to
                              preserve your 999Club, 10kClub or 100kClub
                              Ethereum Name Service (ENS) domain name and
                              receive rewards redistributed in Ethereum (ETH).
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Les futurs détenteurs devront remplir certaines
                              conditions ou effectuer certaines actions pour
                              pouvoir prétendre aux différents niveaux de rareté
                              des NFTs de la collection.
                              <br />
                              <br />
                              Chaque NFT du Number Runner Club V1 permet de
                              préserver son nom de domaine d'Ethereum Name
                              Service (ENS) du 999Club, 10kClub ou 100kClub et
                              ainsi recevoir des récompenses redistribuées en
                              Ethereum (ETH).
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              Los futuros poseedores tendrán que cumplir
                              determinadas condiciones o realizar determinadas
                              acciones para tener derecho a los distintos
                              niveles de escasez de las NFT de la colección.
                              <br />
                              <br />
                              Cada Number Runner Club V1 NFT le permite
                              conservar su nombre de dominio 999Club, 10kClub o
                              100kClub Ethereum Name Service (ENS) y recibir
                              recompensas redistribuidas en Ethereum (ETH).
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "61%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              Each NFT from the collection generates rewards on
                              the Number Runner Club V1 smart contract that can
                              only be claimed in 3 specific cases :<br />
                              - Sell your NFT.
                              <br />
                              - Burn his NFT.
                              <br />- Or wait until the collection reaches 999
                              NFTs remaining in circulation
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Chaque NFT de la collection accumule des
                              récompenses sur le smart-contrat du Number Runner
                              Club V1 qui ne peuvent être récupérées que dans 3
                              cas spécifiques :<br />
                              - Vendre son NFT
                              <br />
                              - Burn son NFT
                              <br />- Ou attendre que la collection atteigne 999
                              NFTs restant en circulation
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              Cada NFT de la colección acumula en smart-contract
                              del Number Runner Club V1 que sólo se puede
                              recuperar en 3 casos concretos :<br />- Vender su
                              NFT
                              <br />
                              - Quemar su NFT
                              <br />- O esperar a que la colección alcance los
                              999 NFTs restantes en circulación
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "70%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              Each holder will have four choices:
                              <br />- Keep your rewards in Ethereum (ETH)
                              <br />- Renew a domain name once a year, for a
                              maximum of 1 year.
                              <br />- Buy one or more NFTs from the collection
                              if the amount of its rewards allows it.{" "}
                              <sup>1</sup>
                              <br />- Buy one or more digits domain names if the
                              amount of your rewards allows it. <sup>2</sup>
                              <br />
                              <br />
                              <sup>1</sup>{" "}
                              <i>
                                These digits domain names remain in the holder's
                                prize. Such holder may recover his or her
                                number(s) if he sells, burns or when the cape of
                                999 NFTs in circulation is reached.
                              </i>
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                {" "}
                                A 16% tax of the buying price is applied at the
                                transaction. The holder may be refunded if he
                                owns one of the last 999 NFTs from the
                                collection.
                              </i>
                              <br />
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Chaque détenteur aura quatre choix :
                              <br />- Conserver ses récompenses en Ethereum
                              (ETH)
                              <br />- Renouveler un nom de domaine en chiffre
                              une fois par an, sur une durée de 1 an maximum.
                              <br />- Acheter un ou plusieurs NFT de la
                              collection si le montant de ses récompenses le
                              permet. <sup>1</sup>
                              <br />- Acheter un ou plusieurs noms de domaines
                              en chiffres si le montant de ses récompenses le
                              permet <sup>2</sup>
                              <br />
                              <br />
                              <sup>1</sup>{" "}
                              <i>
                                Ces chiffres restent dans la cagnotte du
                                détenteur. Ledit détenteur peut récupérer son ou
                                ses chiffres s'il vend, burn ou lorsque le cap
                                des 999 NFTs en circulation est atteint.
                              </i>
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                Une taxe de 16% du prix d'achat est retenue au
                                moment de la transaction. Le détenteur pourra
                                les récupérer s'il détient un des 999 NFTs
                                restant en circulation.
                              </i>
                              <br />
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              Cada poseedor tendrá cuatro opciones :
                              <br />- Mantener sus recompensas en Ethereum (ETH)
                              <br />- Renovar un nombre de dominio numérico una
                              vez al año, durante un máximo de 1 año.
                              <br />- Compre uno o varios nombres de dominio
                              numéricos si el importe de sus recompensas se lo
                              permite. <sup>1</sup>
                              <br />- Compre uno o varios NFT de la colección si
                              el importe de sus recompensas se lo permite.{" "}
                              <sup>2</sup>
                              <br />
                              <br />
                              <sup>1</sup>{" "}
                              <i>
                                Estos números permanecen en el gatito del
                                titular. Los titulares pueden recuperar su(s)
                                número(s) si venden, queman o cuando alcanzan
                                los 999 NFT en circulación.
                              </i>
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                Se deduce un impuesto del 16% del precio de
                                compra en el momento de la transacción. El
                                titular puede recuperarlos si posee uno de los
                                999 NFT que quedan en circulación.
                              </i>
                              <br />
                            </div>
                          )}
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
                          <div
                            className="barreOblique"
                            style={{ height: "35%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              In addition to individual rewards, a general prize
                              pool will be reserved for the holders of the
                              remaining 999 NFTs of Number Runner Club V1. The
                              prize pool will be equally redistributed among the
                              999 NFT.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              En plus des récompenses individuelles, une
                              cagnotte générale sera réservée aux holders des
                              999 NFT restant du Number Runner Club V1. Cette
                              dernière sera redistribué équitablement entre les
                              999 NFT.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              Además de las recompensas individuales, se
                              reservará una bolsa de premios general para los
                              titulares de los 999 NFT restantes del Club de
                              Corredores Numerarios V1. Este se redistribuirá
                              equitativamente entre los 999 NFT.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              Number Runner Club V1 manages the overall prize
                              pool in two ways :<br />
                              <br />
                              - Keeps the pot in Ethereum (ETH)
                              <br />- Buys or resells domain names in digits
                              <sup>2</sup>
                              <br />
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                Holders with the rarest NFTs will have a voting
                                right on these transactions. They may refuse
                                them if they feel that they are not in the
                                interest of the community.
                              </i>
                              <br />
                              <div className="contentBanner">
                                <img src={coffre} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              Le Number Runner Club V1 gère la cagnotte générale
                              de deux manières :<br />
                              <br />
                              - Conserve la cagnotte en Ethereum (ETH)
                              <br />- Achète ou revend des noms de domaines en
                              chiffres <sup>2</sup>
                              <br />
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                Les détenteurs avec les NFTs les plus rares
                                auront un droit de vote sur ces transactions.
                                <br />
                                Ils pourront les refuser si ils jugent qu’elles
                                ne sont pas dans l’intérêt de la communauté.
                              </i>
                              <br />
                              <div className="contentBanner">
                                <img src={coffre} alt="" />
                              </div>
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              El Number Runner Club V1 gestiona el premio mayor
                              de dos maneras :<br />
                              <br />
                              - Conserva el dinero en Ethereum (ETH)
                              <br />- Compra o revende nombres de dominio en
                              dígitos <sup>2</sup>
                              <br />
                              <br />
                              <sup>2</sup>{" "}
                              <i>
                                {" "}
                                Los tenedores con las NFT más raras tendrán
                                derecho a voto en estas transacciones.
                              </i>
                              <br />
                              <div className="contentBanner">
                                <img src={coffre} alt="" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The Pawn</strong>{" "}
                            <span className="account">@NRPawn</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>Le Pion</strong>{" "}
                            <span className="account">@NRPawn</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>El peón</strong>{" "}
                            <span className="account">@NRPawn</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>
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
                          They share 65% of the transaction fees, but the rate
                          gradually decreases to 5% once the special NFTs have
                          all been minted.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />- Burn tax: 25% (50% Holders | 50% Pool)
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « L'élément de base, indispensable, mais
                            terriblement sous-estimé. »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 9638 items :</strong>
                          <br />
                          - 4819 pions blancs
                          <br />
                          - 4819 pions noirs
                          <br />
                          <br />
                          <strong>Qui peut mint et stacker ?</strong>
                          <br />
                          <br />
                          - Détenteurs du 999Club, 10kClub et 100kClub
                          <br />
                          <br />
                          Ils se partagent 65% des frais de transaction, mais le
                          taux diminue progressivement pour atteindre 5% une
                          fois que les NFTs spéciaux ont été tous mint.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />- Taxe sur le Burn: 25% (50% Holders | 50%
                          Cagnotte)
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>
                            « El elemento básico, indispensable, pero
                            terriblemente subestimado. »
                          </i>
                          <br />
                          <br />
                          <strong>Suministro de 9638 artículos :</strong>
                          <br />
                          - 4819 peones blancos
                          <br />
                          - 4819 peones negros
                          <br />
                          <br />
                          <strong>¿Quién puede mint y stacker?</strong>
                          <br />
                          <br />
                          - Titulares del 999Club, 10kClub y 100kClub
                          <br />
                          <br />
                          Ellos comparten el 65% de las tarifas de transacción,
                          pero la tasa disminuye gradualmente a 5% una vez que
                          los NFTs especiales han sido todos mint.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />- Impuesto sobre el burn: 25% (50% Holders | 50%
                          Bote)
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerPawn} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={kingLogo} className="logoImg" alt="" />
                      </div>
                      <div
                        className="barreOblique"
                        style={{ height: "96%" }}
                      ></div>
                    </div>
                    <div>
                      <div className="title">
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The King</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>Le Roi</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>El Rey</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>
                            « The Lord of the place. Central point of the
                            device. To possess it is to rule. »
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
                          The Kings will be the only NFTs in the collection to
                          be sold as a Dutch auction.
                          <br />
                          <br />
                          n.b. This method places the first bidding threshold
                          deliberately above the actual price of the NFT and
                          allows the latter to fall gradually until the NFT
                          finds a buyer.
                          <br />
                          <br />
                          <strong>Who can bid?</strong>
                          <br />
                          <br />
                          - 999Club holders and 10kClub palindrome holders
                          <br />
                          <br />
                          The two kings share 35% of the transaction fee.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />
                          - Impossible burn of the King.
                          <br />
                          <br />
                          The kings have the right to vote on the purchase and
                          sale of numbers from the pool.
                          <br />
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « Le Seigneur des lieux. Point central du
                            dispositif. Le posséder, c'est régner. »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 2 items :</strong>
                          <br />
                          - 1 roi blanc
                          <br />
                          - 1 roi noir
                          <br />
                          <br />
                          Les Rois seront les seuls NFTs de la collection à être
                          vendus sous forme d’enchère hollandaise.
                          <br />
                          <br />
                          n.b. Cette méthode place le premier seuil des enchères
                          volontairement au dessus du prix réel du NFT et permet
                          à ce dernier de baisser progressivement jusqu'à ce que
                          le NFT trouve preneur.
                          <br />
                          <br />
                          <strong>Qui peut enchérir ?</strong>
                          <br />
                          <br />
                          - Détenteurs du 999Club et les détendeurs de
                          palindromes du 10kClub
                          <br />
                          <br />
                          Les deux rois se partagent 35% sur les frais de
                          transaction.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />
                          - Burn impossible du Roi.
                          <br />
                          <br />
                          Les rois ont le droit de vote sur les achats et ventes
                          de chiffres de la cagnotte.
                          <br />
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>
                            « El Señor de los lugares. Punto central del
                            dispositivo. Poseerlo es gobernar. »
                          </i>
                          <br />
                          <br />
                          <strong>Suministro de 2 artículos</strong>
                          <br />
                          - 1 rey blanco
                          <br />
                          - 1 rey negro
                          <br />
                          <br />
                          Los Reyes serán los únicos NFTs de la colección que se
                          venderán en subasta holandesa.
                          <br />
                          <br />
                          n.b. Este método sitúa el primer umbral de las
                          subastas por encima del precio real del NFT y permite
                          que el NFT descienda progresivamente hasta que el NFT
                          encuentre un comprador.
                          <br />
                          <br />
                          <strong>¿Quién puede pujar?</strong>
                          <br />
                          <br />
                          - Los poseedores del 999Club y los relajadores de
                          palíndromos del 10kClub
                          <br />
                          <br />
                          Los dos reyes comparten 35% de los costos de
                          transacción.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />
                          - Burn imposible del Rey.
                          <br />
                          <br />
                          Los reyes tienen el derecho de voto en la compra y
                          venta de figuras del premio mayor.
                          <br />
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerKing} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flexMargin">
                    <div className="contentLogo">
                      <div className="logo">
                        <img src={kingLogo} className="logoImg" alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="title">
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The King</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>Le Roi</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>El Rey</strong>{" "}
                            <span className="account">@NRKing</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          The proceeds of the king auction are redistributed
                          among 10 holders who discover the hand of the king on
                          one of the pieces they have minted. <sup>3</sup>
                          <br />
                          <br />
                          <sup>3</sup>{" "}
                          <i>
                            To prevent cheating, the king's hands are encrypted
                            and are only revealed when all the nfts have been
                            minted. Nevertheless, a reveal function allows you
                            to know if you have a king's hand in your possession
                            if you decide to burn a nft before it is sold out.
                            10% of your prize pool will then be redistributed to
                            activate the function. The pot of one of the king's
                            burn hands "unintentionally" is redistributed to the
                            other king's hands.
                          </i>
                          <div className="contentBanner">
                            <img src={mainRoi} alt="" />
                          </div>
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          Le produit de la vente aux enchères des rois est
                          redistribué entre 10 détenteurs qui découvrent la main
                          du roi sur l’un des pions qu’ils ont mint.{" "}
                          <sup>3</sup>
                          <br />
                          <br />
                          <sup>3</sup>{" "}
                          <i>
                            Pour éviter toute triche, les mains du roi sont
                            cryptées et ne sont révélées que lorsque tout les
                            nfts ont été mint. Néanmoins, une fonction de reveal
                            permet de savoir si vous avez en votre possession
                            une main du roi si vous décidiez de burn un nft
                            avant que ce soit sold out. 10% de votre cagnotte
                            seront alors redistribués pour activer la fonction.
                            La cagnotte d’une main du roi burn « sans faire
                            exprès » est redistribuée aux autres mains du roi.
                          </i>
                          <div className="contentBanner">
                            <img src={mainRoi} alt="" />
                          </div>
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          El producto de la subasta de los reyes se distribuye
                          entre 10 poseedores que descubren la mano del rey en
                          una de las fichas que han acuñado.<sup>3</sup>
                          <br />
                          <br />
                          <sup>3</sup>{" "}
                          <i>
                            Para evitar cualquier engaño, las manos del rey
                            están codificadas y no se revelan hasta que todos
                            los nfts han sido mintidos. Sin embargo, una función
                            de reveal te permite saber si tienes una mano del
                            rey si decides quemar un nft antes de que se agote.
                            El 10% de su premio será entonces redistribuido para
                            activar la función. El premio de una mano del rey
                            quemado “sin intención” se redistribuye a las demás
                            manos del rey.
                          </i>
                          <div className="contentBanner">
                            <img src={mainRoi} alt="" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The Bishop</strong>{" "}
                            <span className="account">@NRBishop</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>Le Fou</strong>{" "}
                            <span className="account">@NRBishop</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>El Loco</strong>{" "}
                            <span className="account">@NRBishop</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>
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
                          - Have already Stacked an NFT of the collection with
                          an address of 999Club, 10kClub or 100kClub
                          <br />
                          - Burn 10 counters that you mint or buy on the
                          secondary market.
                          <br />
                          <br />
                          <strong>How do you stack a Bishop ?</strong>
                          <br />
                          <br />
                          Have a domain name available of 999Club, 10kClub or
                          100kClub palindrome to stack the bishop.
                          <br />
                          <br />
                          The bishop receives 10% of the transaction fees.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />- Burn tax: 25% (50% Holders | 50% Pool)
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « L'électron libre. Capable de tout, et surtout à
                            n'importe quel moment ! »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 200 items :</strong>
                          <br />
                          - 100 fous blancs
                          <br />
                          - 100 fous noirs
                          <br />
                          <br />
                          <strong>Comment mint un Fou ?</strong>
                          <br />
                          <br />
                          - Avoir déjà Stacké un NFT de la collection avec une
                          adresse du 999Club, 10kClub ou 100kClub
                          <br />
                          - Burn 10 pions que vous aurez mint ou acheté sur le
                          marché secondaire.
                          <br />
                          <br />
                          <strong>Comment stacker un Fou?</strong>
                          <br />
                          <br />
                          Avoir un nom de domaine disponible du 999Club, 10kClub
                          ou 100kClub palindrome pour stacker le fou.
                          <br />
                          <br />
                          Le fou reçoit 10% des frais de transactions.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />- Taxe sur le Burn: 25% (50% Holders | 50%
                          Cagnotte)
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>
                            « El electrón libre. ¡Capaz de todo, y sobre todo en
                            todos momentos ! »
                          </i>
                          <br />
                          <br />
                          <strong>Suministro de 200 artículos :</strong>
                          <br />
                          - 100 locos blancos.
                          <br />
                          - 100 locos negros.
                          <br />
                          <br />
                          <strong>¿Cómo miente un loco?</strong>
                          <br />
                          <br />
                          - Tener ya apilado un NFT de la colección con una
                          dirección de 999Club, 10kClub o 100kClub
                          <br />
                          - Quemar 10 fichas que tendrá mint o comprado en el
                          mercado secundario.
                          <br />
                          <br />
                          <strong>¿Cómo se apila un loco?</strong>
                          <br />
                          <br />
                          Disponga de un nombre de dominio del palíndromo
                          999Club, 10kClub o 100kClub para apilar el loco.
                          <br />
                          <br />
                          El loco recibe 10% de las tarifas de transacción.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />- Impuesto sobre el burn: 25% (50% Holders | 50%
                          Bote) // à compléter
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerBishop} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The Knight</strong>{" "}
                            <span className="account">@NRKnight</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>Le Cavalier</strong>{" "}
                            <span className="account">@NRKnight</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>El Jinete</strong>{" "}
                            <span className="account">@NRKnight</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>« The wisest hunter. Fast, precise, deadly. »</i>
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
                          - Have already Stacked an NFT of the collection with
                          an address of 999Club, 10kClub
                          <br />
                          - Burn 10 counters of the opponent's color bought on
                          the secondary market
                          <br />
                          <br />
                          <strong>How do you stack a Knight ?</strong>
                          <br />
                          <br />
                          Have a domain name available of 999Club, 10kClub to
                          stack the Knight.
                          <br />
                          <br />
                          The knight receives 12.5% of the transaction fee.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />- Burn tax: 30% (50% Holders | 50% Pool)
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « Le chasseur le plus avisé. Rapide, précis, mortel.
                            »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 100 items :</strong>
                          <br />
                          - 50 cavaliers blancs
                          <br />
                          - 50 cavaliers noirs
                          <br />
                          <br />
                          <strong>Comment mint un Cavalier ?</strong>
                          <br />
                          <br />
                          - Avoir déjà Stacké un NFT de la collection avec une
                          adresse du 999Club, 10kClub
                          <br />
                          - Burn 10 pions de la couleur adverse acheté sur le
                          marché secondaire
                          <br />
                          <br />
                          <strong>Comment stacker un Cavalier?</strong>
                          <br />
                          <br />
                          Avoir un nom de domaine disponible du 999Club, 10kClub
                          pour stacker le Cavalier.
                          <br />
                          <br />
                          Le cavalier reçoit 12.5% des frais de transactions.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />- Taxe sur le Burn: 30% (50% Holders | 50%
                          Cagnotte)
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>« El cazador más sabio. Rápido, preciso. »</i>
                          <br />
                          <br />
                          <strong>Suministro de 100 artículos :</strong>
                          <br />
                          - 50 jinetes blancos
                          <br />
                          - 50 jinetes negros
                          <br />
                          <br />
                          <strong>¿Cómo miente un jinete?</strong>
                          <br />
                          <br />
                          - Tener ya apilado un NFT de la colección con una
                          dirección de 999Club, 10kClub
                          <br />
                          - Quemar 10 piezas del color contrario comprado en el
                          mercado secundario
                          <br />
                          - Tener otra dirección del 999Club, 10kClub para
                          apilar el jinete que el poseedor recibirá.
                          <br />
                          <br />
                          El jinete recibe 12.5% de las tarifas de transacción.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />- Impuesto sobre el burn: 30% (50% Holders | 50%
                          Bote) // à compléter
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerKnight} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The Rook</strong>{" "}
                            <span className="account">@NRRook</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>La Tour</strong>{" "}
                            <span className="account">@NRRook</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>La Torre</strong>{" "}
                            <span className="account">@NRRook</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>
                            « The great guardian of the place. Nothing escapes
                            him. Absolutely nothing... »
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
                          - Have already Stacked an NFT of the collection with
                          an address of 999Club, 10kClub
                          <br />
                          - Burn 15 counters of the opponent's color bought on
                          the secondary market
                          <br />
                          <br />
                          <strong>How do you stack a Rook ?</strong>
                          <br />
                          <br />
                          Have a domain name available of 999Club, 10kClub
                          palindrome to stack the Rook.
                          <br />
                          <br />
                          The rook receives 15% of the transaction fees.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />- Burn tax: 35% (50% Holders | 50% Pool)
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « Le grand gardien des lieux. Rien ne lui échappe.
                            Absolument rien... »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 50 items :</strong>
                          <br />
                          - 25 tours blanches
                          <br />
                          - 25 tours noires
                          <br />
                          <br />
                          <strong>Comment mint une Tour ?</strong>
                          <br />
                          <br />
                          - Avoir déjà Stacké un NFT de la collection avec une
                          adresse du 999Club, 10kClub
                          <br />
                          - Burn 15 pions de la couleur adverse acheté sur le
                          marché secondaire
                          <br />
                          <br />
                          <strong>Comment stacker une Tour?</strong>
                          <br />
                          <br />
                          Avoir un nom de domaine disponible du 999Club, 10kClub
                          palindrome pour stacker la Tour.
                          <br />
                          <br />
                          La tour reçoit 15% des frais de transactions.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />- Taxe sur le Burn: 35% (50% Holders | 50%
                          Cagnotte)
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>
                            « El gran guardián de los lugares. No se le escapa
                            nada. Absolutamente nada... »
                          </i>
                          <br />
                          <br />
                          <strong>Suministro de 50 artículos :</strong>
                          <br />
                          - 25 torres blancas
                          <br />
                          - 25 torres negras
                          <br />
                          <br />
                          <strong>¿Cómo miente una torre?</strong>
                          <br />
                          <br />
                          - Tener ya apilado un NFT de la colección con una
                          dirección de 999Club, 10kClub
                          <br />
                          - Quemar 15 piezas del color contrario comprado en el
                          mercado secundario
                          <br />
                          - Tener otra dirección del 999Club, palíndromo 10kClub
                          para apilar la torre que el titular recibirá.
                          <br />
                          <br />
                          La torre recibe 15% de las tarifas de transacción.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />- Impuesto sobre el burn: 35% (50% Holders | 50%
                          Bote) // à compléter
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerRook} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        {(listLang === "EN" ||
                          listLang === true ||
                          (listLang === "open" && listLangLast === true) ||
                          (listLang === "open" && listLangLast === "EN")) && (
                          <span>
                            <strong>The Queen</strong>{" "}
                            <span className="account">@NRQueen</span>
                          </span>
                        )}
                        {(listLang === "FR" ||
                          (listLang === "open" && listLangLast === "FR")) && (
                          <span>
                            <strong>La Reine</strong>{" "}
                            <span className="account">@NRQueen</span>
                          </span>
                        )}
                        {(listLang === "ES" ||
                          (listLang === "open" && listLangLast === "ES")) && (
                          <span>
                            <strong>La Reina</strong>{" "}
                            <span className="account">@NRQueen</span>
                          </span>
                        )}
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <i>
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
                          - Have already Stacked an NFT from the collection with
                          a 999Club address
                          <br />
                          - Burn 15 counters of the opponent's color bought on
                          the secondary market
                          <br />
                          <br />
                          <strong>How do you stack a Queen ?</strong>
                          <br />
                          <br />
                          Have a domain name available of 999Club to stack the
                          Queen.
                          <br />
                          <br />
                          The queen receives 22. 5% of the transaction fees.
                          <br />
                          <br />
                          - Sales tax: 16% (50% Holders | 50% Pool)
                          <br />
                          - Burn tax: 35% (50% Holders | 50% Pool)
                          <br />
                          <br />
                          The queen has the right to vote on the purchase and
                          sale of figures in the pool.
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <i>
                            « Grande dame des lieux, c'est elle qui fait régner
                            l'ordre dans le jeu. La défier, c'est périr. »
                          </i>
                          <br />
                          <br />
                          <strong>Supply de 10 items :</strong>
                          <br />
                          - 5 dames blanches
                          <br />
                          - 5 dames noires
                          <br />
                          <br />
                          <strong>Comment mint une Dame ?</strong>
                          <br />
                          <br />
                          - Avoir déjà Stacké un NFT de la collection avec une
                          adresse du 999Club
                          <br />
                          - Burn 15 pions de la couleurs adverses acheté sur le
                          marché secondaire
                          <br />
                          <br />
                          <strong>Comment stacker une Dame?</strong>
                          <br />
                          <br />
                          Avoir un nom de domaine disponible du 999Club pour
                          stacker la Dame.
                          <br />
                          <br />
                          La dame reçoit 22.5% des frais de transactions.
                          <br />
                          <br />
                          - Taxe sur la vente: 16% (50% Holders | 50% Cagnotte)
                          <br />
                          - Taxe sur le Burn: 35% (50% Holders | 50% Cagnotte)
                          <br />
                          <br />
                          La Dame à un droit de vote sur les achats et ventes de
                          chiffres de la cagnotte.
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <i>
                            « Gran dama del lugar, ella es la que mantiene el
                            orden en el juego. Desafiarla es morir. »
                          </i>
                          <br />
                          <br />
                          <strong>Suministro de 10 artículos :</strong>
                          <br />
                          - 5 reinas blancas
                          <br />
                          - 5 reinas negras
                          <br />
                          <br />
                          <strong>¿Cómo miente una reina?</strong>
                          <br />
                          <br />
                          - Tener ya apilado un NFT de la colección con una
                          dirección del 999Club
                          <br />
                          - Quemar 15 piezas de los colores opuestos comprados
                          en el mercado secundario
                          <br />
                          - Obtener otra dirección del 999Club para estacionar a
                          la reina que va a recibir.
                          <br />
                          <br />
                          La reina recibe el 22.5% de las tarifas de
                          transacción.
                          <br />
                          <br />
                          - Impuesto sobre las ventas: 16% (50% Holders | 50%
                          Bote)
                          <br />
                          - Impuesto sobre el burn: 35% (50% Holders | 50% Bote)
                          <br />
                          <br />
                          La reina tiene derecho a votar en las compras y ventas
                          de figuras de la caja registradora // à compléter
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={bannerQueen} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        Number Runner Club <sup>v1/</sup>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          Only 999Club and 10Kclub holders have access to the
                          final prize pool. <sup>4</sup>
                          <br />
                          <br />
                          <sup>4</sup>{" "}
                          <i>
                            The collection has ended and you're not in these
                            clubs?
                            <br />
                            Don't worry, you still can swap the 100k domain of
                            your NFT for a 999Club or 10Kclub within the next 7
                            days.
                            <br />
                          </i>
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          Seul les détenteurs du 999Club et du 10Kclub ont accès
                          à la cagnotte finale. <sup>4</sup>
                          <br />
                          <br />
                          <sup>4</sup>{" "}
                          <i>
                            La collection est terminé est vous n'êtes pas dans
                            ces clubs? <br />
                            Ne vous inquiétez pas vous aurez 7 jours pour swaper
                            votre domaine du 100k par un domaine du 999Club ou
                            du 10Kclub pour votre NFT.
                          </i>
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          Solo los poseedores del 999Club y del 10Kclub tienen
                          acceso al premio final. <sup>4</sup>
                          <br />
                          <br />
                          <sup>4</sup>{" "}
                          <i>
                            ¿Se ha acabado la recaudación y no perteneces a uno
                            de estos clubes? <br />
                            No te preocupes, tendrás 7 días para cambiar tu
                            dominio 100k por un dominio 999Club o 10Kclub por tu
                            NFT.
                          </i>{" "}
                          // à compléter
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={tableau} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
                  <div>
                    <div className="retweet">
                      <img src={retweet} className="retweetImg" alt="" />{" "}
                      <strong>
                        {" "}
                        {(listLang === "EN" ||
                          listLang === true ||
                          listLangLast === "EN" ||
                          listLangLast === true) &&
                          "You have reposted"}
                        {(listLang === "FR" || listLangLast === "FR") &&
                          "Vous avez reposté"}
                        {(listLang === "ES" || listLangLast === "ES") &&
                          "Ha vuelto a publicar"}
                      </strong>
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
                        Number Runner Club <sup>v1/</sup>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <strong>Is the collection sold out?</strong> <br />
                          <br />
                          The aftermarket is a new opportunity to reap the
                          benefits of the project. Acquire a pawn, a bishop, a
                          knight, a rook, a queen or, even better, a king. And
                          become a member of the Number Runner Club to protect
                          your number!
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <strong>La collection est sold out?</strong> <br />
                          <br />
                          Le marché secondaire est une nouvelle chance de
                          profiter des avantages du projet. Faites l'acquisition
                          d'un pion, d'un fou, d'une tour, d'une reine ou, mieux
                          encore, d'un roi. Et devenez un des membres du Number
                          Runner Club pour préserver votre chiffre !
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <strong>¿La colección está agotada?</strong> <br />
                          <br />
                          El mercado secundario es una nueva oportunidad para
                          aprovechar los beneficios del proyecto. Compra un
                          peón, un alfil, una torre, una reina o, mejor aún, un
                          rey. Y hazte miembro del Club del Corredor Numérico
                          para conservar tu número!
                        </div>
                      )}
                      <div className="contentBanner">
                        <img src={tableau2} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && (
                <div className="content">
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
                          Number Runner Club <sup>v1/</sup>{" "}
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
                      <div className="QuitThread content">
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
                        <div
                          className="contentLogo"
                          style={{ display: "flex", width: "100%" }}
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
                            Number Runner Club <sup>v1/</sup>
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
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "59%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                            <br />
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              <strong>
                                How much does the mint of a Number Runner cost ?
                              </strong>
                              <br />
                              <br />
                              The mint of a Number Runner is at 0,2 eth :<br />
                              - 0.1 eth is redistributed to holders (50% Holders
                              | 50% Pool)
                              <br />- 0.1 eth for the team
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              <strong>
                                Combien coûte le mint d’un Number Runner ?
                              </strong>
                              <br />
                              <br />
                              Le mint d’un Number Runner est à 0,2 eth :<br />
                              - 0,1 eth est redistribué aux holders (50% Holders
                              | 50% Cagnotte)
                              <br />- 0,1 eth pour la team
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              <strong>
                                ¿Cuánto cuesta la menta de un Number Runner?
                              </strong>
                              <br />
                              <br />
                              La mint de un Number Runner es de 0,2 e :<br />
                              - 0,1 eth se redistribuye a los poseedores (50%
                              Holders | 50% Bote)
                              <br />- 0,1 eth para el equipo
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "72%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              <strong>Why didn't you turn to freemint ?</strong>
                              <br />
                              <br />
                              Because the power of the community will make the
                              project a success.
                              <br />
                              <br />
                              The Number Runner Club wants to reward early
                              owners and those who commit to the project. Number
                              Runner Club V1 does not receive royalties on NFT
                              sales. Mint is therefore essential to support the
                              project and help it develop.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              <strong>
                                Pourquoi ne pas s'être tourné vers le freemint ?
                              </strong>
                              <br />
                              <br />
                              Parce que la puissance de la communauté fera le
                              succès du projet.
                              <br />
                              <br />
                              Le Number Runner Club veut récompenser les early
                              détenteurs et ceux qui s'engagent dans le projet.
                              Le Number Runner Club V1 ne reçoit pas de
                              royalties sur les ventes de NFTs. Le mint est donc
                              indispensable pour soutenir le projet et l'aider à
                              se développer.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              <strong>
                                ¿Por qué no se volvió hacia el freemint ?
                              </strong>
                              <br />
                              <br />
                              Porque el poder de la comunidad hará que el
                              proyecto tenga éxito.
                              <br />
                              <br />
                              El Club Number Runner quiere premiar a los
                              primeros ganadores y a aquellos que se comprometen
                              con el proyecto. El Number Runner Club V1 no
                              recibe regalías por las ventas de NFTs. Por lo
                              tanto, la menta es indispensable para apoyar el
                              proyecto y ayudarlo a desarrollarse.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                          <div
                            className="barreOblique"
                            style={{ height: "44%" }}
                          ></div>
                        </div>
                        <div>
                          <div className="title">
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              <strong>How to Stack my Number Runner?</strong>
                              <br />
                              <br />
                              Go to the “my profile” tab and let us guide you.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              <strong>
                                Comment Stacker mon Number Runner ?
                              </strong>
                              <br />
                              <br />
                              Rendez-vous sur l’onglet « mon profil » et laissez
                              vous guider.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              <strong>¿Cómo apilar mi Number Runner?</strong>
                              <br />
                              <br />
                              Vaya a la pestaña “Mi perfil” y déjese guiar.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flexMargin">
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
                            Number Runner Club <sup>v1/</sup>{" "}
                            <span className="account">@TheNRClub</span>
                          </div>
                          {(listLang === "EN" ||
                            listLang === true ||
                            (listLang === "open" && listLangLast === true) ||
                            (listLang === "open" && listLangLast === "EN")) && (
                            <div className="description">
                              <strong>
                                What will happen once there is no more 999
                                Number Runner in circulation?
                              </strong>
                              <br />
                              <br />
                              Once the collection reaches 999 Number Runner in
                              circulation, holders will be able to withdraw
                              their rewards tax-free as noted above. A new
                              version of the Number Runner Club will then be
                              launched.
                              <br />
                              <br />
                              At that moment, holders will be able to exchange
                              their NFTs for a new pass that will give them
                              shares of the new project equal to the ETH they
                              have accumulated. But they will also be able to
                              choose to reclaim their shares of the overall
                              prize pool. To do so, they will have to pay a tax
                              of 35%.
                            </div>
                          )}
                          {(listLang === "FR" ||
                            (listLang === "open" && listLangLast === "FR")) && (
                            <div className="description">
                              <strong>
                                Que se passera t il une fois qu’il ne reste plus
                                999 Number Runner en circulation ?
                              </strong>
                              <br />
                              <br />
                              Lorsque la collection aura atteint 999 Number
                              Runner en circulation, les détenteurs pourront
                              retirer leurs récompenses sans taxe comme indiqué
                              plus haut. Une nouvelle version du Number Runner
                              Club sera alors lancée.
                              <br />
                              <br />A ce moment précis, les détenteurs pourrons
                              échanger leurs NFTs contre un nouveau pass qui
                              leur donnera des parts du nouveau projet à hauteur
                              des ETH qu’ils auront accumulés. Mais ils pourront
                              également choisir de récupérer leurs parts de la
                              cagnotte générale. Pour cela, ils devront
                              s'acquitter d'une taxe de 35%.
                            </div>
                          )}
                          {(listLang === "ES" ||
                            (listLang === "open" && listLangLast === "ES")) && (
                            <div className="description">
                              <strong>
                                ¿Qué pasará cuando el 999 Number Runner deje de
                                estar en circulación?
                              </strong>
                              <br />
                              <br />
                              Una vez que la colección haya alcanzado los 999
                              Number Runner en circulación, los poseedores
                              podrán retirar sus recompensas libres de impuestos
                              como se indicó anteriormente. Se lanzará una nueva
                              versión del Club Number Runner.
                              <br />
                              <br />
                              En ese momento, los titulares podrán canjear sus
                              NFTs por un nuevo pase que les dará una parte del
                              nuevo proyecto equivalente a los ETH que hayan
                              acumulado. Pero también pueden optar por recuperar
                              su parte del premio mayor. Para ello, tendrán que
                              pagar un impuesto del 35%.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content paddingOpensea">
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
                        Number Runner Club <sup>v1/</sup>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <strong>The Smart-Contracts, in detail...</strong>
                          <br />
                          <br />
                          Transparency and reliability... These are the key
                          words of the project. To convince yourself of this,
                          you can now consult the smart contract developed for
                          the needs of the Number Runner Club.
                          <br />
                          Here you will find all the information about the
                          operation and the internal mechanics of the concept.
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <strong>Les Smart-contrats, en détail...</strong>
                          <br />
                          <br />
                          Transparence et fiabilité... Voici les maîtres mots du
                          projet. Pour vous en convaincre, vous pouvez dès à
                          présent consulter le smart-contrat développé pour les
                          besoins du Number Runner Club.
                          <br />
                          Vous y trouverez toutes les informations relatives au
                          fonctionnement et aux mécaniques internes au concept.
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <strong>
                            Los contratos inteligentes, en detalle...
                          </strong>
                          <br />
                          <br />
                          Transparencia y fiabilidad... Estas son las palabras
                          clave del proyecto. Para convencerte de ello, ya
                          puedes consultar el contrato inteligente desarrollado
                          para el Number Runner Club.
                          <br />
                          Aquí encontrará toda la información sobre el
                          funcionamiento y los mecanismos internos del concepto.
                        </div>
                      )}
                      <div className="contentBannerWithText">
                        <a
                          href="https://opensea.io/fr"
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
                              https://opensea.io/fr
                            </div>
                            <div style={{ color: "white", fontSize: "14px" }}>
                              OpenSea, the largest NFT marketplace
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {thread !== "open" && faq !== "open" && (
                <div className="content">
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
                        Number Runner Club <sup>v1/</sup>{" "}
                        <span className="account">@TheNRClub</span>
                      </div>
                      {(listLang === "EN" ||
                        listLang === true ||
                        (listLang === "open" && listLangLast === true) ||
                        (listLang === "open" && listLangLast === "EN")) && (
                        <div className="description">
                          <strong>
                            An alternative to Discord, simpler, more
                            confidential, more secure
                          </strong>
                          <br />
                          <br />
                          Together, we have the opportunity to forge the
                          strongest Web 3.0 community on Ethereum Name Service.
                          Let's meet on NFTYChat and start building our
                          environment.
                          <br />
                          <br />
                          Compared to Discord, NFTYChat is an alternative of
                          choice. Simple to use, it does not require a user name
                          and even less a password. Everything is at stake with
                          your Wallet. One last point: only Number Runner Club
                          holders will be able to access the various salons on
                          offer.
                        </div>
                      )}
                      {(listLang === "FR" ||
                        (listLang === "open" && listLangLast === "FR")) && (
                        <div className="description">
                          <strong>
                            Une alternative à Discord, plus simple, plus
                            confidentielle, plus sécurisée
                          </strong>
                          <br />
                          <br />
                          Ensemble, nous avons l'opportunité de forger la
                          communauté Web 3.0 la plus solide sur Ethereum Name
                          Service. Retrouvons-nous sur NFTYChat et commençons à
                          bâtir notre environnement.
                          <br />
                          <br />
                          Face à Discord, NFTYChat est une alternative de choix.
                          Simple d'utilisation, il ne nécessite aucun nom
                          d'utilisateur et encore moins de mot de passe. Tout se
                          joue avec votre Wallet. Un dernier point : seuls les
                          holders de Number Runner Club pourront accéder aux
                          différents salons proposés.
                        </div>
                      )}
                      {(listLang === "ES" ||
                        (listLang === "open" && listLangLast === "ES")) && (
                        <div className="description">
                          <strong>
                            Una alternativa a Discord, más simple, más
                            confidencial, más segura
                          </strong>
                          <br />
                          <br />
                          Juntos, tenemos la oportunidad de forjar la comunidad
                          Web 3.0 más sólida en Ethereum Name Service.
                          Reunámonos en NFTYChat y comencemos a construir
                          nuestro entorno.
                          <br />
                          <br />
                          Frente a Discord, NFTYChat es una alternativa de
                          elección. Fácil de usar, no requiere ningún nombre de
                          usuario y mucho menos contraseña. Todo se juega con su
                          Wallet. Un último punto: solo los holders del Number
                          Runner Club podrán acceder a las diferentes ferias que
                          se ofrecen.
                        </div>
                      )}
                      <div
                        className="contentBannerWithText"
                        style={{ marginBottom: "30px" }}
                      >
                        <a
                          href="https://nftychat.xyz/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <div>
                            <img src={discord} alt="" />
                          </div>
                          <div className="TextcontentBanner">
                            <div
                              style={{
                                color: "rgb(139,152,165)",
                                fontSize: "14px",
                              }}
                            >
                              https://nftychat.xyz/
                            </div>
                            <div style={{ color: "white", fontSize: "14px" }}>
                              The best way to connect with your web3 frens
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
          <div className="content">
            <KingAuction
              lang={listLang}
              theme={currentTheme.theme.name}
              lastLang={listLangLast}
            />
          </div>
        )}
        {link === "market" && !more.topHolders && !more.activity && (
          <div className="content">
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div className="sub-nav">
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
                  Collection
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
                  Analyctics
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
          <div className="content">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div className="sub-nav">
                <SubNavLink
                  active={
                    linkProfile === "home" ||
                    linkProfile === "" ||
                    typeof linkProfile === "boolean"
                      ? true
                      : false
                  }
                  onClick={() => changePageProfile("home")}
                >
                  Home
                  {(linkProfile === "home" ||
                    linkProfile === "" ||
                    typeof linkProfile === "boolean") && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkProfile === "graal" ? true : false}
                  onClick={() => changePageProfile("graal")}
                >
                  Graal
                  {linkProfile === "graal" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
                <SubNavLink
                  active={linkProfile === "my_nft" ? true : false}
                  onClick={() => changePageProfile("my_nft")}
                >
                  My NFT
                  {linkProfile === "my_nft" && (
                    <div className="barreBleuMarket"></div>
                  )}
                </SubNavLink>
              </div>
            </div>
            {(linkProfile === "home" ||
              linkProfile === "" ||
              typeof linkProfile === "boolean") && (
              <div>
                <div
                  className="description"
                  style={{
                    paddingLeft: "10%",
                    paddingRight: "8%",
                    fontSize: "16px",
                    marginTop: "32px",
                    textAlign: "justify",
                  }}
                >
                  <div style={{ fontWeight: "700", marginBottom: "16px" }}>
                    Mauris non ipsum finibus
                  </div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  porttitor augue ac leo rhoncus, et rhoncus nisl accumsan.
                  Maecenas efficitur consectetur augue. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Aliquam ac ante ut enim
                  aliquet auctor. Mauris ultrices condimentum justo, vel feugiat
                  sapien malesuada pulvinar. Suspendisse consectetur semper
                  rhoncus. Sed ac tristique sem. Donec mattis odio vitae dui
                  elementum vehicula. Donec a gravida quam. Cras nec sem tellus.
                  Maecenas sit amet imperdiet libero. Quisque at diam vehicula,
                  tempus velit ac, sollicitudin ante. Nam ultricies neque
                  tristique neque mattis, a elementum urna ultricies. Vestibulum
                  ullamcorper tellus vel purus elementum sagittis ut imperdiet
                  enim. Suspendisse ultricies ultricies turpis, et placerat erat
                  pulvinar sed. Duis lorem ligula, pretium et cursus quis,
                  rutrum at orci. Mauris non ipsum finibus, volutpat nisl a,
                  mattis magna. Nulla facilisi. Sed condimentum scelerisque sem,
                  vitae faucibus quam ultrices vel. Quisque ac purus vulputate
                  neque ultricies porta. Nulla vitae ante dolor. Fusce id sapien
                  et lacus condimentum pulvinar et eget est. Curabitur et
                  ultrices orci, sit amet bibendum tellus. Nulla commodo rutrum
                  fermentum. Integer cursus, urna vitae laoreet molestie, erat
                  felis mattis tortor, ut vulputate nisi mi sed enim. In
                  vehicula, leo ut convallis hendrerit, turpis ligula porta
                  orci, vitae consequat lacus diam vitae leo. Vestibulum semper
                  lorem vitae risus elementum, faucibus gravida elit fringilla.
                  Donec pulvinar viverra pulvinar. Ut mi ex, vehicula vitae
                  risus in, convallis faucibus nibh
                </div>
              </div>
            )}
            {linkProfile === "graal" && (
              <div style={{ marginTop: "30px" }}>
                <hr
                  style={{
                    position: "relative",
                    marginBottom: "20px",
                    width: "calc(100% + 32px)",
                    left: "-16px",
                  }}
                  className="separator"
                />
                <Graal
                  img={bishop}
                  data={{
                    supply: 200,
                    name: "The Bishop",
                    mint: 
                    [
                      {
                        type: "stack",
                        value: 1,
                        text: "Have already Stacked an NFT of the collection with an address of 999Club, 10kClub or 100kClub",
                      },
                      {
                        type: "burn",
                        value: 15,
                        text: "Burn 10 counters that you mint or buy on the secondary market.",
                      },
                    ]
                  }}
                />
                <hr className="separator" />
                <Graal
                  img={knight}
                  data={{
                    supply: 100,
                    name: "The Knight",
                    mint: [
                      {
                        type: "stack",
                        value: 1,
                        text: "Have already Stacked an NFT of the collection with an address of 999Club, 10kClub",
                      },
                      {
                        type: "burnOpponent",
                        value: 15,
                        text: "Burn 10 counters of the opponent's color bought on the secondary market",
                      },
                    ],
                  }}
                />
                <hr className="separator" />
                <Graal
                  img={rook}
                  data={{
                    supply: 50,
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
                    supply: 10,
                    name: "The Queen",
                    mint: [
                      {
                        type: "stack",
                        value: 1,
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
              </div>
            )}
            {linkProfile === "my_nft" && (
              <div className="description">
                <MyNft market={false} img={pawn5185} />
              </div>
            )}
          </div>
        )}
      </AboutStyleWrapper>
    </Layout>
  );
};

export default HomeV1;
