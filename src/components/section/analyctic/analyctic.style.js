import styled from "styled-components";

export const AnalycticContainer = styled.div`
position:relative;
border-radius:10px;
background:${props => props.theme.name === "Dark Theme" ? 'rgb(30, 39, 50)' : 'rgb(247, 249, 249)'};

.title{
    font-size:20px;
    padding:12px 16px;
    margin-bottom:0px;
    font-weight:500;
}
.list{
    width:100%;
}
.list > li{
    width:calc(100% + 20px);
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
.holder-data{
    position:absolute;
    right:10px;
    padding:6px 5px;
    display:flex;
    align-items:center;
    overflow: hidden;
    border-radius: 100px;
    color:${props => props.theme.name === "Dark Theme" ? "black" : "white"};
    background-color:${props => props.theme.name === "Dark Theme" ? "white" : "black"};
}
.list > li:hover{
    cursor:pointer;
}
.list > li:last-child {
    display:flex;
    justify-content:center;
    font-weight:700;
    }
`