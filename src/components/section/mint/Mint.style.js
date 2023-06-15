import styled from "styled-components";

export const MintStyleWrapper = styled.section`
.content {
    margin-bottom: 100px;
    width: 100%;
    margin: auto;
    max-width: 600px;
    border-top: 1px solid ${props => props.theme.colors.border};
    border-left: 1px solid ${props => props.theme.colors.border};
    border-right: 1px solid ${props => props.theme.colors.border};
    padding: 12px 16px;
    position:fixed;
    bottom:0;
    background-color: rgb(30, 39, 50);
    z-index: 999;
  }
  @media screen and (max-width: 600px){
    .content {
        margin-bottom: 100px;
        width: 100%;
        margin: auto;
        max-width: 600px;
        border-left: 0;
        border-right: 0;
        border-top: 1px solid ${props => props.theme.colors.border};
        padding: 12px 16px;
    }
  }
`