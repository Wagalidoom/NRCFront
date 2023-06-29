import styled from "styled-components";

export const KingAuctionContainer = styled.div`
font-size: 14px;
color: ${props => props.theme.colors.text};
.countdown-container{
    display:flex;
    justify-content:center;
    width:100%;
    margintTop:8px;
}


.king-container > .figure-nft >img{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    width:100%;
}
.king-container{
    display:flex;
    flex-wrap:wrap;
    margin-top:30px;
}
.king-container > .figure-nft{
    width:49%;
    border-radius:5px;
    box-shadow: ${props => props.theme.name === "Dark Theme" ? 'rgb(0, 0, 0) 0px 2px 4px, rgb(0, 0, 0) 0px 7px 13px -3px, rgb(0, 0, 0) 0px -3px 0px inset' : 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' };
    background:${props => props.theme.name === "Dark Theme" ?'rgb(30, 39, 50)' : 'rgb(247, 249, 249)'};
}
.king-container > .figure-nft:first-of-type{
    margin-right:2%;
}
.king-infos{
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
    padding-left:10px;
    padding-right:10px;
    padding-bottom:4px;
}
.king-infos > .nft-title{
    margin-bottom:0px;
}
.king-infos > div > img{
    height:18px;
}
.king-infos>div>span{
    position:relative;
    top:1px;
}
.king-actions{
    width:100%;
    height:80px;
    border-radius:5px;
    position:relative;
    margin-top:60px;   
}
.king-price{
    width: auto;
    font-size: 26px;
    font-weight: 700;
    position: absolute;
    left:50%;
    transform: translate(-50%,-100%);
    box-shadow:rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding-left:12px;
    padding-right:12px;
    background:${props => props.theme.name === "Dark Theme" ?'rgb(30, 39, 50)' : 'rgb(247, 249, 249)'};
    border-radius:5px;  
}
.king-price  > img{
    height:26px;
    position:relative;
    top:-2px;
}
.king-selector {
    display: flex;
    height: 100%;
    width: 100%;
    margin-top: 16px;
  }
  .king-option {
    font-size: 30px;
    height: inherit;
    width: 50%;
    border: 1px solid ${props => props.theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

  }

  .king-option:last-of-type{
    border-bottom-color:${props => props.theme.name === "Light Theme" ? 'black': props.theme.colors.border};
    border-right-color:${props => props.theme.name === "Light Theme" ? 'black': props.theme.colors.border};
    border-top-color:${props => props.theme.name === "Light Theme" ? 'black': props.theme.colors.border};
  }
  .actions {
    width: 100%;
    display: flex;
    margin-top: 34px;
    border-radius: 5px;
    justify-content: center;
  }
.payment{
    border: 1px solid white;
    width: 100%;
    display: flex;
    margin-top: 80px; 
    padding-left:5px;
    padding-right:5px;
}
  .graph {
    margin-top: 32px;
    width: 100%;
    height: 400px;
    color: white;
    text-align: center;
    border: 1px;
}   
.switch {
    position: absolute;
    left:50%;
    top:calc(50% + 16px);
    transform:translate(-50%,-50%);
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border:${props => props.theme.name === 'Light Theme' ? '1px solid rgb(239, 243, 244)':'none'};
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 25px;
    width: 25px;
    left: 4px;
    bottom: 4px;
    background-color: black;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  
  .input-switch:checked + .slider {
    background-color:black;
  }
  
  
  .input-switch:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color:white;
  }
  .action-btn{
    color:white;
    text-align:center;
    font-size:23px;
    width:40%;
    background:#1D9BF0;
    padding:8px 10px;
    border:none;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;  
    transition-duration: 0.4s;
    border-radius:5px;
  }
  .action-btn:active{
    scale:0.95;
    transition:
  }
  .action-btn:after{
    scale:0.8;
  }
  .action-btn:first-of-type{
    margin-right:20px;
  }

  @media screen and (max-width: 430px) {
    .king-container > .banniereNft:first-child{
        margin-bottom:20px;
    }
    .king-option{
        font-size:20px;
    }
}
@media screen and (min-width: 430px) and (max-width:500px) {
    .king-option{
        font-size:24px;
    }
}
@media screen and (max-width:430px){
  >div:last-of-type{
    margin-bottom:15px;
  }
  .king-infos{display:flex;flex-direction:column;margin-bottom:6px}
  .king-infos > div > img{
    height:18px;
  }
}
`