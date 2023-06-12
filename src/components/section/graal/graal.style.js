import styled from "styled-components";

export const GraalContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  justify-content:space-around;
  margin-bottom: 20px;
  height:auto;
  &:not(:first-of-type){
    margin-top:40px;
  }
  .graal-img{
    width:30%;
    display:flex;
    flex-direction:column;
  }
  .graal-title{
    text-align:center;
    margin-top:8px;
  }
  .graal-title >span{
    font-size:22px;
    color:${props => props.theme.colors.text};
    font-weight:700;
  }

.graal-supply {
  color: grey;
  text-align: center;
}

.graal-action > button{
    padding:5px;
    width:100%;
    border-radius:5px;
    background:${props => props.theme.name === 'Light Theme' ? 'black' : 'white'} !important;
    color:${props => props.theme.name === 'Light Theme' ? 'white' : 'black'} !important;
    height:31px;
    font-size;18px;
    margin-top:10px;
}
.graal-desc {
    width: 62%;
}
  
.graal-condition {
    display: flex;
}

.graal-condition div:first-child {
    width: 20px;
  }
.graal-condition img {
    width: 100%;
}
.graal-condition div:last-child {
    color: ${props => props.theme.colors.text};
    width: calc(100% - 30px);
    position: relative;
    top: -2px;
    margin-left: 10px;
    font-size: 16px;
    word-break:break-all;
  }
  .graal-condition:not(:first-of-type) {
    margin-top: 10px;
  }
  @media screen and (max-width:600px){
    justify-content:start;
    .graal-desc{
        margin-left:calc(30% + 15px)
    }
   }

   @media screen and (max-width:410px){
    .graal-title > span{
        font-size:18px; 
    }
    .graal-condition div:last-child {
      font-size:14px;
    }
   }
` 