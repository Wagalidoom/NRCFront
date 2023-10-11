import styled from "styled-components";

export const AboutStyleWrapper = styled.section`
  .show-more{
    color:${props => props.theme.colors.text};
    position:relative;
    left:5px;
    color:#1D9BF0 !important;
    font-weight:700;
  }

  i{
    font-size: 13px;
  }
  
  .show-more:hover{
    cursor:pointer;
  }
  .text-content {
    margin-bottom: 100px;
    width: 100%;
    margin: auto;
    max-width: 600px;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-left: 1px solid ${props => props.theme.colors.border};
    border-right: 1px solid ${props => props.theme.colors.border};
    padding: 12px 16px;
    position:relative;
  }

  .min-height{
    min-height: 1000px;
  }

  .content-no-padding{
    margin-bottom: 0 !important;
    width: 100%;
    margin: auto;
    max-width: 600px;
    padding-top: 12px;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-left: 1px solid ${props => props.theme.colors.border};
    border-right: 1px solid ${props => props.theme.colors.border};
    position:relative;
  }
  
  .text-content:last-child{
    padding-bottom:100px;
  }
  @media screen and (max-width: 600px){
    .text-content {
        margin-bottom: 100px;
        width: 100%;
        margin: auto;
        max-width: 600px;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid ${props => props.theme.colors.border};
    }

    .content-no-padding{
      margin-bottom: 100px !important;
    }
  }

  .QuitThread {
    z-index: 1;
    position: fixed;
    color: ${props => props.theme.colors.text};
    top: 0;
    left: 0;
    right: 0;
    width: 600px;
    margin: 0 auto;
    height: 53px;
    backdrop-filter: blur(12px);
    background-color: ${props => props.theme.name === "Dark Theme" ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.85)'} ;
  }
  .barreObliqueBasse {
    border-bottom-style: solid;
    border-bottom-color: ${props => props.theme.colors.border};
    border-bottom-width: 1px;
    margin: 20px 0;
  }
  .QuitThread > img {
    cursor: pointer;
    transition-duration: 0.2s;
    border-radius: 40px;
    width: 37px;
    margin-right: 20px;
  }
  .QuitThread > img:hover {
    background-color: rgba(247, 247, 247, 0.1);
    color: white;
    cursor: pointer;
  }
  .barreOblique {
    width: 2px;
    background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(51,54,57)':'rgb(207, 217, 222)'};
    margin-top: 4px;
    height: 100%;
    margin-bottom: 4px;
    margin-left: auto;
    margin-right: auto;
    -webkit-box-align: stretch;
    -webkit-box-direction: normal;
    -webkit-box-orient: vertical;
    box-sizing: border-box;
  }
  .contentLogo {
    margin-right: 12px;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 555px) {
      .paddingOpensea {
        padding-bottom: 12px !important;
      }
    }
  .paddingOpensea {
    padding-bottom: 65px;
  }
  .contentBanner, .contentBannerWithText {
    margin-top: 12px;
    max-height: 506px;
  }
  .contentBannerFaq {
    margin-top: 12px;
    max-height: 1000px !important;
  }
  .contentBanner > img {
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 20px;
  }
  .contentBannerWithText > a > div > img {
    border: 1px solid ${props => props.theme.colors.border};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .contentBannerWithText > a > .TextcontentBanner {
    border: 1px solid ${props => props.theme.colors.border};
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 10px 16px;
  }
  .logo {
    width: 65px;
  }
  .logoImg {
    width: 80px;
    border-radius: 50%;
  }
  .flex {
    display: flex;
  }
  .title {
    margin-bottom: 2px;
    color: ${props => props.theme.colors.text};
    font-weight: bold;
  }
  .retweet {
    margin-left: 54px;
    margin-bottom: 4px;
    color: rgb(139,152,165);
    display: flex;
    align-items: center;
    font-size: 13px;
  }
  .account {
    color: rgb(113, 118, 123);
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    min-width: 0px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

.barreBleuMarket {
font-style: normal;
    font-weight: 400;
    font-size: 12px;
    height: 3px;
    line-height: 22px;
    text-align: center;
    color: #ffffff;
    background-color: rgb(29,155,240);
    border-radius: 9999px;
    width:100%;
}
  .description {
    font-size: 14px;
    line-height: 18px;
    color: ${props => props.theme.colors.text};
  }
  .nft-title{
    color:${props => props.theme.colors.text}
  }
  .retweetImg {
    height: 1.25em;
    margin-right: 5px;
  }
  section {
    max-width: 600px;
    margin: auto;
  }
  .banniereNft {
    width: 49.5%;
    inset: 0px;
    height: 100%;
    flex-grow: 1;
    align-items: stretch;
    border: 0 solid black;
    box-sizing: border-box;
    flex-basis: auto;
    flex-direction: column;
    flex-shrink: 0;
    margin: 1px;
    min-height: 0px;
    min-width: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 0px;
    position: relative;
    z-index: 0;
  }
  .bigButton {
    width: 48%;
    background-color: rgb(239, 243, 244);
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    border-style: solid;
    border: 0;
    font-size: 15px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(15, 20, 25);
    font-weight: 700;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    padding: 7px 13px;
  }
  .banniereNft > img {
    width: 100%;
  }
  .separator{
    border: none; 
    height: 2px;
    background-color: ${props => props.theme.name === "Light Theme" ? 'Black': 'White'};
    margin:0;
    width: 100%; 
    position: absolute; 
    left: 0;
  }

  .separator-limit{
    border: none; 
    height: 2px; 
    background-color: ${props => props.theme.colors.border};
    margin:0;
    width: 100%; 
    position: absolute; 
    left: 0;

  }
  
  .sub-nav-market {
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    border-bottom:3px solid ${props => props.theme.colors.border};
    @media screen and (max-width:400px){
      width:80%;
    }
  }
  
  .list{
    position:relative;
    width:600px;
    width:inherit;
}
.list > li:last-child{
  padding :12px 14px;
}

.list > li{
    padding:4px 16px;
    display:flex;
}
.holder-infos{
    position:relative;
    display:flex;
    align-items:center;
    color:${props => props.theme.colors.text};
    font-weight:700;
    width:100%;
}
.holder-name > p{
    margin-bottom:0px;
    color:${props => props.theme.colors.text};
}
.holder-name > p:last-of-type{
    color:grey;
}
.holder-name{
    position:relative;
    top: -1px;
}
.holder-nft{
    width:80px;
}

.list > li:hover{
    background:${props => props.theme.colors.hover};
    cursor:pointer;
}
`;
  
export const SubNavLink = styled.div`
cursor: pointer;
color:${props => props.active ? props.theme.colors.text : 'grey'};
font-size: 14px;
text-align: center;
font-weight: 700;
div{
  visibility:${props => props.active ? 'visible':'hidden'};
}
`
