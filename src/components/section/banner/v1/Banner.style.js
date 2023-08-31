import styled from "styled-components";

export const NavLink = styled.a`
padding:10px 20px 10px 10px;
border-radius: 40px;
display:flex !important;
align-items:center !important;
display:inline-block !important;
span{
  font-weight:${props => props.active ? "700" : "500"};
}
`

export const NavSpan = styled.span`
font-weight:400;
font-size:20px;
position:relative;
top:2px;
color:${props => props.theme.colors.text};
`
export const SectionNav = styled.div`
position: relative;
transition-duration: 0.2s;
margin-top: 20px;
font-size: 20px;
height:auto;
&:hover{
  cursor:pointer;
  a{
    background-color: ${props => props.theme.colors.hover};
    width:auto;
  }
}
`

export const BannerV1Wrapper = styled.section`
  #logoImg{
    @media screen and (max-width:600px){
      width:80px;
      transform:translate(-50%,-18%);
      left:30%;
    }
  }
  
  .banner-container{
    width:599px;
    height:200px;
    
  }

  i{
    font-size: 13px;
  }

  .banner-container > img{
    width:100%;
    height:100%;
  }
  .title-page{
    position: absolute;
    height: 140px;
    top:0px;
    width: 100%;
    z-index: 10;
  }
  .title-page > span{
    position: absolute;
    bottom: 15px;
    font-size: 18px;
    font-weight: 700;
    left: 10px;
    color:white;
  }
  .banner-mobile{
overflow:hidden;
    visibility:hidden;
    height: 140px;
    position: fixed;
    top: -80px;
    margin-top:0px;
    z-index: 1;
    width: 100%;
    max-width:599px;    
  }
  .banner-mobile > img{
    width:100%;
    height:100%;
  }
  .content {
    max-width: 600px;
    margin: auto;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-left: 1px solid ${props => props.theme.colors.border};
    border-right: 1px solid ${props => props.theme.colors.border};
    position: relative;
  }
  @media screen and (max-width: 600px){
    .content {
        max-width: 600px;
        margin: auto;
        border-top: 1px solid  ${props => props.theme.colors.border};
        border-left: 0;
        border-right: 0;
        position: relative;
    }
  }

  .css-1k4oq5h{
    font-weight: 700;
  }


  .tw-connected-wallet{
    padding: 0;

  }

  .tw-connected-wallet__balance{
    display: none;
  }

  .tw-connected-wallet__address{
    font-weight: 700;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(15, 20, 25)' : 'white'};
  }

  .menuLeftContent {
        display: none;
        height: 500px;
        position: fixed;
        padding: 15px;
        color: ${props => props.theme.colors.text};
    }
  @media screen and (min-width: 1160px){
    .menuLeftContent {
        display: block;
    }
  }
  .menuLeftContent {
    left: calc(100% - 81vw);
  }
  @media screen and (max-width: 1670px){
    .menuLeftContent {
        left: calc(100% - 83vw);
    }
  }
  @media screen and (max-width: 1580px){
    .menuLeftContent {
        left: calc(100% - 85vw);
    }
  }
  @media screen and (max-width: 1490px){
    .menuLeftContent {
        left: calc(100% - 87vw);
    }
  }
  @media screen and (max-width: 1400px){
    .menuLeftContent {
        left: calc(100% - 89vw);
    }
  }
  @media screen and (max-width: 1340px){
    .menuLeftContent {
        left: calc(100% - 91vw);
    }
  }
  @media screen and (max-width: 1270px){
    .menuLeftContent {
        left: calc(100% - 96vw);
    }
  }
  .homeLeftLogo {
    position: relative;
    transition-duration: 0.2s;
    border-radius: 40px;
    width:55px;
    padding:5px;
  }
  .homeLeftLogo:hover{
    background-color:rgba(29,155,240,0.1);
    cursor:pointer;
  }
  .logo {
    // top: 164px;
    // background:red;
    transform:translateY(-50%);
    border-radius: 10%;
    left: 20px;
    position: absolute;
    width:100px;
    height:100px;
  }
  // @media screen and (max-width: 580px) {
  //     .logo {
  //       top: 150px;
  //     }
  // }
  // @media screen and (max-width: 545px) {
  //     .logo {
  //       top: 135px;
  //     }
  // }
  // @media screen and (max-width: 490px) {
  //     .logo {
  //       top: 115px;
  //     }
  // }
  // @media screen and (max-width: 430px) {
  //     .logo {
  //       top: 110px;
  //       width: 85px;
  //     }
  // }
  // @media screen and (max-width: 400px) {
  //     .logo {
  //       top: 100px;
  //     }
  // }
  // @media screen and (max-width: 375px) {
  //     .logo {
  //       top: 95px;
  //       left: 10px;
  //     }
  // }
  .logoImg {
    width: 100px;
    border-radius: 50%;
    background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(21,32,43)' : 'white'};
    position:absolute;
    bottom:0px;
    left:50%;
    transform:translateX(-50%);
  }
  .ensImg {
    width: 100px;
    border-radius: 10%;
    position:absolute;
    bottom:0px;
    left:50%;
    transform:translateX(-50%);
    background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(21,32,43)' : 'white'};
    border: ${props => props.theme.name === 'Dark Theme' ? 'solid 7px rgb(21, 32, 43)' : 'solid 7px rgb(250, 250, 250)'}
  }
  .leftName {
    padding-left: 75px;
  }
  .description {
    margin-top: 75px;
    padding: 0 20px;
  }
  .name {
    color: ${props => props.theme.colors.text};
    font-size: 20px;
    line-height: 24px;
    padding-top: 9px;
  }
  .pieces {
    color: rgb(139, 152, 165);
    font-size: 14px;
    line-height: 16px;
    padding-bottom: 9px;
  }
  select {
    max-width: 100px;
    width: 100%;
  }
  .connexion {
    position: absolute;
    bottom: -70px;
    right: 400px;
    width: 100px;
  }
  .container {
    max-width: 1500px;
  }
  .text {
    font-size: 14px;
    line-height: 18px;
    color: ${props => props.theme.colors.text};
  }
  .textJoined {
    color: rgb(139, 152, 165);
    font-size: 14px;
    line-height: 18px;
    padding-top: 10px;
  }
  .textOther {
    color: rgb(139, 152, 165);
    font-size: 14px;
    line-height: 18px;
    padding-top: 10px;
  }
  .leftText {
    padding-left: 5px;
  }
  .textWhite {
    color: ${props => props.theme.colors.text};
  }
  .calendar {
    margin-right: 4px;
    color: rgb(139, 152, 165);
    height: 1.25em;
    max-width: 100%;
    margin-left: -3px;
  }
  .calendarImg {
    height: 1em;
    position:relative;
    top:-2px;
  }
  .contentButton {
    padding-top: 12px;
    padding-right: 12px;
    float: right;
    display: flex;
  }

  .connectionButton{
    min-width: 100px !important;
    background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(239, 243, 244)' : 'rgb(21,32,43)'};
    border-radius: 50px;
    font-size: 14px;
    color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(15, 20, 25)' : 'white'};
    font-weight: 700;
    display: flex;
    justify-content: center;
    border:none;
  }

  .connectionButtonSideMenu{
    min-width: 100px !important;
    border-radius: 50px;
    font-size: 16px;
    color: white;
    font-weight: 700;
    display: flex;
    justify-content: center;
    border:none;
  }

  .connectionButtonSideMenu .tw-connected-wallet__address{
    font-size: 20px;
    font-weight: 700;
    border:none;
    color: white;

  }

  .bigButton {
    min-width: 60px !important;
    width: 60px;
    background-color: ${props => props.theme.name === 'Dark Theme' ? 'rgb(239, 243, 244)' : 'rgb(21,32,43)'};
    border-radius: 50px;
    font-size: 14px;
    color: rgb(15, 20, 25);
    font-weight: 700;
    border:none;
  }
  .tw-connected-wallet > div:nth-child(1) {
    display: none !important;
}
.tw-connected-wallet > img {
    display: none !important;
}
.tw-connected-wallet > div > div {
  display: none !important;
}
  .smallButton {
    position:relative;
    z-index:0;
    border: 1px solid rgb(83, 100, 113);
    margin-right: 12px;
    min-width: 36px;
    min-height: 36px;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 9999px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;   
    color: ${props => props.theme.colors.text};  
    box-sizing: border-box;
    font-weight: 700;
  }

  #mint{
    margin-right: 12px;
  }

  .langButton{
    border-color:${props => props.theme.name === 'Light Theme' ? 'rgb(21, 32, 43)' : 'rgb(239, 243, 244)'};
    color:${props => props.theme.name === 'Light Theme' ? 'rgb(21, 32, 43)' : 'rgb(239, 243, 244)'};
  }
  .change {
    z-index: 0;
    position: absolute;
    background-color: ${props => props.theme.name === "Dark Theme" ? 'rgba(21,32,43,1.00)' : 'rgb(247, 249, 249)'};
    border-radius: 4px;
    top: -1px;
    left:-48px;
    border-radius:40px;
    border:1px solid rgb(83, 100, 113);
    width:36px;
    display:flex;
    flex-direction:column;
    align-items:center; 
  }
  .contentChange {
    transition-duration: 0.2s;
    cursor: pointer;
    border-radius: 45px;
    background-color: rgba(0, 0, 0, 0);
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font-weight: 400;
    font-size: 14px;
    font-weight:700;  
  }
  .contentChange:first-child{
    margin-top:8px;
  }
  .contentChange:not(:last-child){
    margin-bottom:10px;
  }
  .contentChange:last-child{
    margin-bottom:8px;
  }
  .contentChange:hover {
    color: rgba(247, 247, 247, 0.4);
    // color: ${props => props.theme.colors.hover}
  }
  .contentChangeActual {
    // background-color: rgb(30, 39, 50);
  }

  @media screen and (max-width:400px){
    .smallButton{
      margin-right: 4px;
      padding-left:2px;
      padding-right:2px;
    }

    #mint{
      margin-right: 4px;
    }
  }
  @media screen and (max-width:600px){
    .banner-container{
      height:140px;
      width:100vw;
      transition:
    }
    .logo{
      transform:translateY(-30%);
    }
  }
`;
