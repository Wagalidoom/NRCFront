import styled from "styled-components";

export const CountdownContainer = styled.div`
display:flex;
background:${props => props.theme.name === "Dark Theme" ?'rgb(30, 39, 50)' : 'rgb(247, 249, 249)'};
color:${props => props.theme.colors.text};
padding-top:2px;
width:auto;
justify-content:center;
border-radius:8px;
padding-left:16px;
padding-right:16px;
padding-bottom:2px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;    
>div{
text-align:center;
}
>div:not(:last-child){
    margin-right:24px;
}
.unity{
    color:${props => props.theme.colors.text};
    font-weight:700;
    font-size:20px;
    @media screen and (max-width: 420px) {
        font-size:16px;
    }
}
.number{
    font-weight:700;
    font-size:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height:40px;
    @media screen and (max-width: 420px) {
        font-size:36px;
        line-height:36px;
    }
}
`