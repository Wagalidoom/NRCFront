import styled from 'styled-components'

export const RightSectionContainer = styled.div`
position: fixed;
left:50%;
transform:translateX(calc(-50% + 330px + 50%));
width:300px;
padding-top:20px;
height:100vh;
padding-bottom:100px;
overflow:hidden;
p{
font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;

}
@media screen and (max-width: 1280px) {
    display:none;
}
@media screen and (min-width: 1350px) {
    width:320px;
}
@media screen and (min-width: 1380px) {
    width:350px;
}
>div{
    background:${props => props.theme.name === "Dark Theme" ?'rgb(30, 39, 50)' : 'rgb(247, 249, 249)'};
    color:${props => props.theme.colors.text};
    width:100%;
    border-radius:16px;
}
.list{
    padding-left:0px;
    width:inherit;
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
.holder-data{
    position:absolute;
    right:10px;
    padding:6px 18px;
    border-radius: 100px;
    color:${props => props.theme.name === "Dark Theme" ? "black": "white"};
    background-color:${props => props.theme.name === "Dark Theme" ? "white": "black"};
}
.list > li:hover{
    background:${props => props.theme.colors.hover};
    cursor:pointer;
}
.list > li:hover:last-child{
    border-bottom-left-radius:16px;   
    border-bottom-right-radius:16px;   
}
.list > li:last-child > div{
    color:#1D9BF0 !important;   
    font-weight:700;
}
.list > li:last-child{
    padding :12px 14px;
}

.top-holder{
    margin-bottom:18px;
    font-weight:700;
    display:${props => props.showHolder ? 'none' :'block'};
}
.title{
    font-size:20px;
    padding:12px 16px;
    margin-bottom:0px;
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-weight:700;
}
.activity-show:hover{
    background:${props => props.theme.colors.hover};
    cursor:pointer;
}
.activity-show{
    padding:12px 16px;
    color:#1D9BF0 !important;  
    border-bottom-right-radius:16px;
    border-bottom-left-radius:16px; 
    font-weight:700;
    height:calc(100% + 2px);
    position:relative;
    top:-2px;
}
.activity-container{
    display:${props => props.showActivity ? 'none' :'block'};
}
`