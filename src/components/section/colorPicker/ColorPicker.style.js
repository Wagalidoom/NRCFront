import styled from "styled-components";

export const ColorPickerStyleWrapper = styled.section`
.callContractContainer {
    background-color: rgba(0,0,0,0.714);
    display: flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
}

.contractContent {
    background-color: rgb(21, 32, 43);
    border-radius: 5px;
    margin: auto;
    width: 520px;
    display: flex;
    flex-direction: column;
    border-top: 2px solid ${props => props.theme.colors.border};
    border-left: 2px solid ${props => props.theme.colors.border};
    border-right: 2px solid ${props => props.theme.colors.border};
    border-bottom: 2px solid ${props => props.theme.colors.border};
    
  }

  .contractContainerRow{
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${props => props.theme.colors.border};
  }

  @media screen and (max-width: 600px){
    .contractContent {
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