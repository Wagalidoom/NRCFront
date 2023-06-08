import styled,{keyframes} from "styled-components"
const fadein = keyframes`
from{
    opacity:0;
    visibility:hidden
}
to{
    opacity:1;
    visibility:visible
}
`
export const MyNftContainer = styled.div`
display:flex;
flex-wrap: wrap;
max-height: inherit;
justify-content:space-around;
.filter-group{
    width:100%;
}
.filter-group > div:last-of-type{
    width:100%;
    display:flex;
    justify-content:center;
}
.button-group{
    display:inline-block;
}

.filter-search{
    width:100%;
    display:flex;
    justify-content:center;
    margin-bottom:20px;
}
.search-contenair{
    width:${props => props.market ? '80%': '60%'};
    position:relative;
}
.search-contenair> img{
    width:16px;
    position:absolute;
    left:8px;
    top:50%;
    transform:translateY(-50%);
}
.search-contenair>input{
    width:100%;
    height:38px;
    border:1px solid ${props => props.theme.colors.border};
    border-radius:5px;
    color:${props => props.theme.colors.text};
    background:transparent;
    padding-left:30px;
}
.search-contenair>input:focus{
    outline:none;
    border:1px solid ${props => props.theme.name === 'Dark Theme' ? 'rgb(239, 243, 244)':'rgb(48, 60, 67)'}
}
.search-contenair>input::-webkit-search-cancel-button{
    background:purple;
    width:200px;
}
.button{
    border:none;
    border-radius:5px;
    border:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    margin-right:10px;
}
.filter , .sweep{
    padding:8px 12px;
}
.filter{
    background: ${props => props.theme.name === 'Dark Theme' ? props.filter ? 'rgb(5,5,5)' :'rgb(30,39,50)' : props.filter ?  '#8EA3BE':'#afafaf'  }
}
.sweep{
    background: ${props => props.theme.name === 'Dark Theme' ? props.sweep ? 'rgb(5,5,5)' :'rgb(30,39,50)' : props.sweep ?  '#8EA3BE' :'#afafaf' }
}
.link-ens{
    padding:2.3px 7px;
}
.filter > img , .sweep > img{
    height:30px;
    width:18px;
    height:18px;
}
.link-ens >a> img{
    width:30px;
}
.filter-select{
    width:35%;
    height:38px;
    display:inline-block;
    @media screen and (max-width:500px){
        width:48%
    }
    position:relative;
    color:${props => props.theme.colors.text}; 
    background:${props => props.theme.name === 'Dark Theme' ? 'rgb(30,39,50)' : 'rgb(239,243,244)'};
    
}
.visible{
    border:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    width:100%;
    height:100%;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    border-bottom-left-radius:${props => props.openSelect ? '0px': '5px'};
    border-bottom-right-radius:${props => props.openSelect ? '0px': '5px'};
    z-index:2;
    position:relative;
}
.filter-select:hover{
cursor:pointer;
}
.filter-selection{
    position:relative;
    top:50%;
    transform:translateY(-50%);
    display:inline-block;
    padding-left:5px;
    font-weight:700;
    @media screen and (max-width:380px){
        font-size:12px;
    }
}
.filter-option{
    width:100%;
    height:auto;
    position:relative;
    top:-10px;
    padding-top:12px;
    border-left:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    border-right:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    border-bottom:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    display:${props => props.openSelect ? 'block' : 'none'};    
    background:${props => !props.filter && props.theme.name === 'Dark Theme' ? 'rgb(30,39,50)' : 'rgb(239,243,244)'};
    border-bottom-right-radius:5px;
    border-bottom-left-radius:5px;
    z-index:1;
}
.filter-option >div{
    padding-left:5px;
    // padding-bottom:6px;
    height:24px;
    font-weight:700;
    display:flex;
    align-items:center;
    @media screen and (max-width:380px){
        font-size:12px;
    }   
}

.filter-option >div:hover{
    cursor:pointer;
    background:${props => props.theme.colors.hover};
}

.icon{
    position: absolute;
    top:0px;
    right: 0px;
    cursor: pointer;
    border-left:1px solid ${props => props.theme.name === "Light Theme" ?'#afafaf' :'#afafaf' };
    height:100%;
    width:38px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom-left-radius:${props => props.openSelect ? '0px':'5px'};
    border-top-left-radius:${props => props.openSelect ? '0px':'5px'};
}
p{
    font-family: TwitterChirp, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.myNft{
    width:49%;
    margin-bottom:20px;
    overflow:hidden;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;

    box-shadow: ${props => props.theme.name === "Dark Theme" ? 'rgb(0, 0, 0) 0px 2px 4px, rgb(0, 0, 0) 0px 7px 13px -3px, rgb(0, 0, 0) 0px -3px 0px inset' : 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' };
}
.myNft > img{
    width:100%;
    border-top-left-radius:10px;
    border-top-right-radius:10px;

}
.container-nft{
    min-height: 250px;
    width:100%;
    display:flex;
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
`
export const ToolBar =styled.div`
width:100%;
height:${props => props.market ? '89px' :'60px'};
display:flex;
flex-direction:column;
justify-content:space-around;
position:relative;
padding-top:${props => props.market ? '0px' : '2px'}
color:${props => props.theme.colors.text};
background: ${props => props.theme.name === "Dark Theme" ? 'rgba(48,60,67,0.8)':'rgb(247,249,249)' };
padding-left:10.5px;
padding-right:10.5px;
border-bottom-left-radius:5px;
border-bottom-right-radius:5px;
padding-top:5px;
.modal-button {
    position:absolute;
    right:15px;
    bottom:16px;
    display:${props => props.market ? 'none': 'block'};
    background:transparent;
    border:1px solid ${props => props.theme.name === "Dark Theme" ? 'grey' : 'rgba(0,0,0,0.6)'};
    width:30px;
    height:12px;
    border-radius:99999px;
}
.modal-button> img{
    width:20px;
    position:absolute;
    top:-5px;
    left:4px;
}
> img:hover{
    cursor:pointer;
}
.buy-action{
    background:#1D9BF0;
    border:none;
    border-radius:5px;
    color:white;
    display:${props => props.market ?'flex' : 'none'};
    justify-content:center;
    align-items:center;
    position:absolute;
    bottom:6px;
    right:10.5px;
    font-size:16px;
    cursor:default;
    padding:6px 16px!important;
    line-height:16px;
}
>div:first-of-type{
    // background:${props => props.market ? 'transparent' : 'red'};
    position:relative;
    top:-6px;
}
>div> p{
    line-height:16px;
    color:${props => props.theme.colors.text};
}
>div>p:first-of-type{
    font-weight:700;
    font-size:20px;
    margin-bottom:8px;
    display:flex;
    justify-content:${props => props.market ? 'space-between': 'start'};
}
>div>p:first-of-type > span{
    margin-left:3px;
}
>div>p:last-of-type{
    font-size:16px;
    margin-bottom:0px;
}

.price{
    display:${props => props.market ? 'flex' : 'none'};
    align-items:center;
    position:relative;
    left:-2px;
    top:-1px;
}
.price>img{
    height:20px;
    position:relative;
    margin-right:2px;
}
.price>span{
    font-weight:700;
    font-size:20px;
}
.modal-option{
    min-width:100px;
    background:${props => props.theme.name === "Dark Theme" ? 'rgba(48,60,67,0.9)':'rgba(247,249,249,0.8)' };
    position:absolute;
    top:20.5px;
    transform: translateY(calc( -100% - 20px));
    right:12px;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    animation: ${fadein} 0.1s linear forwards;
    overflow:hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px -10px 15px -3px, rgba(0, 0, 0, 0.05) 0px -4px 6px -2px;
}
.modal-option > ul{
    margin-bottom:0px;
    position:relative;
    padding:4px 4px;
}
.modal-option > ul > hr{
    margin:0px;
    position:absolute;
    width:100%;
    left:0px;
    color:${props => props.theme.name === "Dark Theme" ? 'rgb(247,249,249)':'rgb(48,60,67)'};
}
.option{
    height:26px;
    font-weight:700;
    font-size:16px;
    display:flex;
    align-items:center;
    padding:6px 4px;
    border-radius:5px;
}
.option:last-of-type{
    padding-bottom:4px;
}
.option:hover{
    background-color:${props => props.theme.colors.hover};
    cursor:pointer;
}
.option:first-of-type:hover{
    color:#ADD8E6;
}
.option:nth-child(2):hover{
    color:#B3E6B5;
}
.option:last-of-type:hover{
    color:#D288A2;
    
}
@media screen and (max-width:560px){
    >img{
        bottom:5px
    }
    div>p:first-of-type{
        font-size:16px;
    }
    .price > span{
        font-size:16px;
    }
    .buy-action{
        font-size:14px;
    }
    div>p:last-of-type{
        font-size:14px;
    }
}
@media screen and (max-width:425px){
    height:${props => props.market ? '76px' :'50px'};
    div>p:first-of-type{
        font-size:12px;
    }
    .price{
        position:relative;
        top:-3px;
    }
    .price > span{
        font-size:14px;
    }
    .buy-action{
        font-size:10px;
    }
    div>p:last-of-type{
        font-size:12px;
        position:relative;
        top:-4px;
    }
    .buy-action{
        padding: 4px 12px !important;
        bottom:6px;
    }

}
`