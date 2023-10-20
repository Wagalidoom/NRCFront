import styled from "styled-components";

export const KingAuctionContainer = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
  .countdown-container {
    display: flex;
    justify-content: center;
    width: 100%;
    marginttop: 8px;
  }

  .toolBar{
    width:100%;
display:flex;
flex-direction:column;
justify-content:space-between;
position:relative;
color:${props => props.theme.colors.text};
background: ${props => props.theme.name === "Dark Theme" ? 'rgba(48,60,67,0.8)' : 'rgb(247,249,249)'};
border-bottom-left-radius:5px;
border-bottom-right-radius:5px;
  }

  .myNft{
    width:49%;
    overflow:hidden;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
    color:${props => props.theme.colors.text};
    background: ${props => props.theme.name === "Dark Theme" ? 'rgba(48,60,67,0.8)' : 'rgb(247,249,249)'};
    position: relative;
    box-shadow: ${props => props.theme.name === "Dark Theme" ? 'rgb(0, 0, 0) 0px 2px 4px, rgb(0, 0, 0) 0px 7px 13px -3px, rgb(0, 0, 0) 0px -3px 0px inset' : 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'};
}
.myNft > img{
    width:100%;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
}

.container-nft{
    width:100%;
    display:flex;
    margin-top: 25px;
    flex-wrap:wrap;
    justify-content:space-between;
}

@media screen and (max-width:572px){
    justify-content:normal;
    .myNft{
        width:49%;
    }
    .myNft > img{
        width:100%;
        height:auto;
    }
}
  .king-actions {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .king-price {
    width: 150px;
    height: 42px;
    margin-top: 34px;
    font-size: 26px;
    font-weight: 700;
    left: 50%;
    border: 2px solid rgb(29, 155, 240);
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
  }

  .cylon{
    padding-bottom: 146px;

  }
  .king-price > img {
    height: 26px;
    position: relative;
  }
  .king-selector {
    display: flex;
    height: 100%;
    width: 100%;
    margin-top: 16px;
  }

  .data {
    display: grid;
    grid-template-columns: 50% 50%;
    height: 100%;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.border};
    margin-top: 34px;
    padding-top: 12px;
  }

  .king-option {
    font-size: 30px;
    height: inherit;
    width: 50%;
    border: 1px solid ${(props) => props.theme.colors.border};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .king-option:last-of-type {
    border-bottom-color: ${(props) =>
        props.theme.name === "Light Theme" ? "black" : props.theme.colors.border};
    border-right-color: ${(props) =>
        props.theme.name === "Light Theme" ? "black" : props.theme.colors.border};
    border-top-color: ${(props) =>
        props.theme.name === "Light Theme" ? "black" : props.theme.colors.border};
  }
  .actions {
    width: 100%;
    display: flex;
    margin-top: 17px;
    justify-content: center;
  }

  label {
    border: 2px #ccc solid;
    border-radius: .5em;
    // width: 200px;
    display: inline-flex;
    // align-items: center;
    overflow: hidden;
 }
 
 label:before {
    content: attr(data-currency);
    width: 25px;
    padding: .5em 0;
    background: #e6e6e8;
    text-align: center;
    font: inherit;
    border-right: inherit;
 }
 
 input {
    border: 0;
    color: "black";
    font: inherit;
 }

  .switch {
    position: absolute;
    left: 50%;
    top: calc(50% + 16px);
    transform: translate(-50%, -50%);
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
    border: ${(props) =>
        props.theme.name === "Light Theme"
            ? "1px solid rgb(239, 243, 244)"
            : "none"};
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
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
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  .input-switch:checked + .slider {
    background-color: black;
  }

  .input-switch:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    background-color: white;
  }
  .action-btn {
    color: white;
    text-align: center;
    font-size: 23px;
    width: 150px;
    background: #1d9bf0;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    transition-duration: 0.4s;
    border-radius: 5px;
  }

  @media screen and (max-width: 430px) {
    .king-option {
      font-size: 20px;
    }

    .data{
      grid-template-columns: 100%;
    }
  }
  @media screen and (min-width: 430px) and (max-width: 500px) {
    .king-option {
      font-size: 24px;
    }
  }
  @media screen and (max-width: 430px) {
    > div:last-of-type {
      margin-bottom: 15px;
    }
  }
`;
