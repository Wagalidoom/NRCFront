import styled from "styled-components";

export const AnalycticContainer = styled.div`
  position: relative;

  .background {
    background: ${(props) =>
      props.theme.name === "Dark Theme"
        ? "rgb(30, 39, 50)"
        : "rgb(247, 249, 249)"};
  }

  .title {
    font-size: 20px;
    padding: 12px 16px;
    margin-bottom: 0px;
    font-weight: 500;
  }
  .list {
    width: 100%;
  }
  .list > li {
    display: flex;
    padding: 4px 8px;
  }
  .holder-infos {
    position: relative;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.text};
    font-weight: 700;
    width: 100%;
  }

  .search-contenair {
    width: ${(props) => (props.market ? "80%" : "60%")};
    margin-bottom: 14px;
    position: relative;
  }
  .search-contenair > img {
    width: 16px;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
  .search-contenair > input {
    width: 100%;
    height: 38px;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 5px;
    color: ${(props) => props.theme.colors.text};
    background: transparent;
    padding-left: 30px;
  }
  .search-contenair > input:focus {
    outline: none;
    border: 1px solid
      ${(props) =>
        props.theme.name === "Dark Theme"
          ? "rgb(239, 243, 244)"
          : "rgb(48, 60, 67)"};
  }
  .search-contenair > input::-webkit-search-cancel-button {
    background: purple;
    width: 200px;
  }

  .holder-name > p {
    margin-bottom: 0px;
    color: ${(props) => props.theme.colors.text};
  }
  .holder-name > p:last-of-type {
    color: grey;
  }
  .holder-name {
    position: relative;
    top: -1px;
  }
  .holder-nft {
    width: 80px;
  }
  .holder-data {
    position: absolute;
    right: 10px;
    padding: 6px 5px;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 100px;
    color: ${(props) =>
      props.theme.name === "Dark Theme" ? "black" : "white"};
    background-color: ${(props) =>
      props.theme.name === "Dark Theme" ? "white" : "black"};
  }
  .list > li:hover {
    cursor: pointer;
  }
  .list > li:last-child {
    display: flex;
    justify-content: center;
    font-weight: 700;
  }
`;
