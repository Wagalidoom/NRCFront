import { ActivityContainer, ButtonFilter } from "./activity.style";
import { useState, useEffect } from 'react';
import { NRCsubgraph, useEthereum } from "../../../context/ethereumProvider";
import moment from 'moment';
import Axios from 'axios';
import pawn5185 from "../../../assets/images/5185.png";
import ethGreen from "../../../assets/images/icon/iconeethvert.png";
import ethBlue from "../../../assets/images/icon/iconeethbleu.png";

export const Activity = (props) => {
  const [filter, setFilter] = useState("sales");
  const arrayFilters = ["sales", "offers", "burns", "mints"];
  // Définir l'état pour les NFTs
  const [nfts, setNfts] = useState([]);

  // Utiliser useEffect pour charger les données au chargement du composant
  useEffect(() => {
    const first = 6;
    // Définition des requêtes
    const GET_NFT_SOLD = `
      {
        nftpurchaseds(first: ${first}, orderBy: blockNumber, orderDirection: desc) {
          id
          buyer
          seller
          tokenId
          price
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `;

    const GET_NFT_LISTED = `
      {
        nftlisteds(first: ${first}, orderBy: blockNumber, orderDirection: desc) {
          id
          seller
          tokenId
          price
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `;
    const GET_NFT_MINTED = `
      {
        nftminteds(first: ${first}, orderBy: blockNumber, orderDirection: desc) {
          id
          tokenId
          blockNumber
          blockTimestamp
          transactionHash
          owner
        }
      }
    `;
    const GET_NFT_BURNT = `
      {
        nftburneds(first: ${first}, orderBy: blockNumber, orderDirection: desc) {
          id
          tokenId
          blockNumber
          blockTimestamp
          transactionHash
          owner
        }
      }
    `;

    // Fonction pour obtenir les NFTs
    const fetchNfts = async () => {
      try {
        // Faire les requêtes et obtenir les réponses
        const responseSold = await Axios.post(NRCsubgraph, { query: GET_NFT_SOLD });
        const responseListed = await Axios.post(NRCsubgraph, { query: GET_NFT_LISTED });
        const responseMinted = await Axios.post(NRCsubgraph, { query: GET_NFT_MINTED });
        const responseBurnt = await Axios.post(NRCsubgraph, { query: GET_NFT_BURNT });

        // Obtenir les données
        let nftSold = responseSold.data.data.nftpurchaseds;
        let nftListeds = responseListed.data.data.nftlisteds;
        let nftMinteds = responseMinted.data.data.nftminteds;
        let nftBurnt = responseBurnt.data.data.nftburneds;

        // Ajouter l'attribut "type" à chaque NFT
        nftSold = nftSold.map(nft => ({ ...nft, type: "sales" }));
        nftListeds = nftListeds.map(nft => ({ ...nft, type: "offers" }));
        nftMinteds = nftMinteds.map(nft => ({ ...nft, type: "mints" }));
        nftBurnt = nftBurnt.map(nft => ({ ...nft, type: "burns" }));

        // Fusionner et trier les NFTs
        const merged = [...nftSold, ...nftListeds, ...nftMinteds, ...nftBurnt];
        const sorted = merged.sort((a, b) => b.blockNumber - a.blockNumber);

        // Mettre à jour l'état avec les NFTs
        setNfts(sorted);
      } catch (error) {
        console.error(error);
      }
    };
    // Appeler la fonction pour obtenir les NFTs
    fetchNfts();
  }, []);

  const changeFilter = (value) => {
    if (arrayFilters.includes(value) && filter !== value) {
      setFilter(value);
    }
  };

  return (
    <ActivityContainer filter={props.container === "right" ? true : false}>
      <div className="filter-section">
        <div className="filter-container">
          {arrayFilters.map((element, index) => (
            <ButtonFilter active={element === filter ? true : false} className="filter " key={index} onClick={() => changeFilter(element)}>
              {element}
            </ButtonFilter>
          ))}
        </div>
      </div>
      {nfts.map((nft, index) => (
        (props.container === "right" || (!props.container && nft.type === filter)) && (
          <div className="activity" key={index}>
            <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
              <div className="activity-left">
                <div className="activity-info">
                  <span>
                    {nft.type === "sales" && <span style={{ color: "#FFFFFF" }}>Sale</span>}
                    {nft.type === "burns" && <span style={{ color: "#D288A2" }}>Burn</span>}
                    {nft.type === "offers" && <span style={{ color: "#ADD8E6" }}>Offer</span>}
                    {nft.type === "mints" && <span style={{ color: "#9cf0ad" }}>Mint</span>}
                  </span>
                </div>
                <p>{moment.unix(nft.blockTimestamp).fromNow()}</p>
                <div className="activity-user">
                  {(nft.type === "burns" || nft.type === "mints") &&
                    <p style={{ width: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Owner: {nft.owner}</p>
                  }
                  {(nft.type === "sales" || nft.type === "offers") &&
                    <p style={{ width: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>From: {nft.seller}</p>
                  }
                  {nft.type === "sales" &&
                    <p style={{ width: '50%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>To: {nft.buyer}</p>
                  }
                </div>
              </div>
              <div className="activity-right">
                <div className="activity-card">
                  <img alt="" src={pawn5185} />
                  <div className="activity-infos-right">
                    <p>Number Runner #{nft.tokenId}</p>
                    <p>
                      Pawn{" "}
                      {(nft.type !== "burns" && nft.type !== "mints") && (
                        <span style={{ position: "absolute", right: "8px" }}>
                          <img className="eth-logo" src={nft.type === "sales" ? ethGreen : ethBlue} alt="" />
                          <span style={{ color: nft.type === "sales" ? "#B3E6B5" : "#ADD8E6" }}>{nft.price / 10 ** 18}</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      ))}
      {props.container !== "right" && <div className="activity-show">Show more</div>}
    </ActivityContainer>
  );
};
