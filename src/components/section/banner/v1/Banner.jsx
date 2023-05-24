import Button from "../../../../common/button";
import {BannerV1Wrapper} from "./Banner.style";
import { FaWallet } from "react-icons/fa";

import banner from "../../../../assets/images/banner.gif";
import logo from "../../../../assets/images/logo.png";
import calendar from "../../../../assets/images/calendar.png";

import { useEffect } from "react";

const Banner = () => {

  useEffect(() =>{},[])
  return (
    <BannerV1Wrapper>
      <div className="content">
        <div className="name leftName">
          NRCLUB
        </div>
        <div className="pieces leftName">
          10.000 items
        </div>
      </div>
      <div class="content">
        <img src={banner} />
        <div class="logo">
          <img src={logo} class="logoImg" />
        </div>
        <div className="contentButton">
          <button className="smallButton">
            EN
          </button>
          <div style={{position: "relative"}}>
            <button className="smallButton">
              Dark Theme
            </button>
            <div className="change" style={{display: "none"}}>
              <div className="contentChange">
                Dark Theme
              </div>
              <div className="contentChange">
                Light Theme
              </div>
            </div>
          </div>
          <button className="bigButton">Connect</button>
        </div>
        <div className="description">
          <div className="name">
            Number Runner Club <sup>v1/</sup>
          </div>
          <div className="pieces">
            @TheNRClub
          </div>
          <div className="text">
            Number Runner Club is a deflationary collection of 10.000 PFP NFTs for #ENSDomains | #999club • #10kClub • #100kClub | No Royalties* |
          </div>
          <div className="textJoined">
            <img src={calendar} className="calendarImg" />
            Joined in June 2022
          </div>
          <div className="textOther">
            <span className="textWhite">250</span> Mint <span className="textWhite leftText">101</span> Burn <span className="textWhite leftText">27</span> Volume <span className="textWhite leftText">5</span> Pool
          </div>
        </div>
      </div>
    </BannerV1Wrapper>
  );
};

export default Banner;
