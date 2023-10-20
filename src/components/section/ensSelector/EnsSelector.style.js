import styled from "styled-components";

export const EnsSelectorStyleWrapper = styled.section`
  .callContractContainer {
    background-color: rgba(0, 0, 0, 0.714);
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

  .contractContainerRow {
    display: flex;
    align-items: center;
    border-bottom: 2px solid ${(props) => props.theme.colors.border};
  }

  .spin{
    display: flex;
    align-items: center;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #32323e #161618;
  }

  /* Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 10px;
  }

  *::-webkit-scrollbar-track {
    background: #161618;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #32323e;
    border-radius: 6px;
    border: 3px solid #161618;
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
      max-width: none !important;
      padding: 25px 16px;
    }
  }
`;
