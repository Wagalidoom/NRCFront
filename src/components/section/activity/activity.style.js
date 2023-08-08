import styled from "styled-components";
export const ButtonFilter = styled.button`
color: ${props => props.active ? props.category === "sales" ? 'rgb(179, 230, 181)' : props.category === "burns" ? "#D288A2" : props.category === "offers" ? "#ADD8E6" : props.category === "mints" ? "#F59E0B" : props.theme.colors.text : props.theme.colors.text};
border:none;
width:84px;
height:32px;
text-transform: capitalize;
background:transparent;
font-weight:${props => props.active ? '700':'500'};
font-size:18px;
`
export const ActivityContainer = styled.div`
display:flex;
flex-direction:column;
min-height: 1000px;
width:100%;

>div:last-of-type{
    padding-bottom:0px !important;
}
.filter-section {
    position: relative;
    width: 100%;
    height: 34px;
    margin-bottom:32px;
    margin-top:16px;
    display:${props => props.isFilterApplied ? 'none' :'initial'};
}
  
.filter-container {
    width: auto;
    display: flex;
    border-radius: 5px;
    background:${props => props.theme.name === "Dark Theme" ?'rgb(30,39,50)':'rgb(230,231,231)' };
    justify-content: space-around;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  
.activity{
    display:flex;
    width:100%;
    padding:${props => props.isFilterApplied ? '0px 16px' : '0px 58px'};
    position:relative;
    height:auto;    
}
.activity-left{
    flex-grow:1;
    position:relative;    
}
.activity:not(:last-child){
    border-bottom:1px solid ${props => props.theme.colors.border};
}
.activity:not(:first-child){
    padding-top:30px;
}
.activity-user{
    position:absolute;
    bottom:30px;
}
.activity-user > p, .activity-infos-right > p{
    margin-bottom:0px;
    color: ${props => props.theme.colors.text};
    font-size: 13px;
    @media screen and (max-width:400px){
        font-size:12px;
    }
}
.activity-infos-right{
    border-top:1px solid ${props => props.theme.colors.border};
    background:${props => props.theme.name === "Dark Theme" ? 'rgba(48,60,67,0.8)':'rgb(247,249,249)'};
    width:100%;
    height:auto;    
    border-bottom-left-radius:5px;
    border-bottom-right-radius:5px;
}
.activity-info>span{
    font-size:20px; 
    color: ${props => props.theme.colors.text};
    position:relative;
    font-weight:700;
}

.activity-left > p{
    color:grey;
}
.activity-info>span>span:first-of-type{
    color:rgb(29, 155, 240);
    margin-right:8px;
} 

.activity-info > span > img{
    position:relative;
    top:-1.5px;
    left:-1.5px;
    max-width:23px;
}
.activity-right{
    width:175px;
    position:relative;
    right:0px;
    display:flex;
    justify-content:end;   
    padding-bottom:30px;
}
.activity-show{
    position:relative;
    top:15px;
    position:relative;
    left:58px;
    color:#1D9BF0 !important;  
    border-bottom-right-radius:16px;
    border-bottom-left-radius:16px; 
    font-weight:700;
    @media screen and (max-width:600px){
        left:0px;
    }
}
.activity-show:hover{
    cursor:pointer;
}
.activity-card{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-right-radius:5px;
    border-bottom-left-radius:5px;
    box-shadow: ${props => props.theme.name === "Dark Theme" ? 'rgb(0, 0, 0) 0px 2px 4px, rgb(0, 0, 0) 0px 7px 13px -3px, rgb(0, 0, 0) 0px -3px 0px inset' : 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset' };
    width:175px;
}
.activity-infos-right >p{
    position:relative;
    left:3px;
}
.eth-logo{
height:16px;
position:absolute;
left:-12px;
top:50%;
transform:translateY(-50%);
}
.activity-right > div> img{
width:175px;
height:175px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
}
@media screen and (max-width:600px){
       .activity{
        padding-left:6px;
        padding-right:6px;
       }
}
 `