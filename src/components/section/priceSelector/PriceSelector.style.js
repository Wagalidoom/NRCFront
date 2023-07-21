import styled from "styled-components";

export const PriceSelectorStyleWrapper = styled.section`
.callContractContainer {
    background-color: rgba(0,0,0,0.714);
    display: flex;
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 100;
}

.mintContent {
  z-index: 10000;
  background-color: hsl(246, 6%, 9%);
  border-radius: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100vw - 40px);
  box-sizing: border-box;
  overflow-y: auto;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.07),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  line-height: 1;
  display: flex;
  flex-direction: column;
  max-width: 480px;
}

  .contractContainerRow{
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${props => props.theme.colors.border};
  }

  @media screen and (max-width: 640px) {
    .mintContent {
      top: auto;
      bottom: 0;
      left: 0;
      right: 0;
      transform: none;
      width: 100%;
      border-radius: 32px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      max-width: none!important;
      padding: 12px 16px;
    }
  }
`