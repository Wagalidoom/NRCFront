import { ActivityContainer, ButtonFilter } from "./activity.style";
import { useState, useEffect } from "react";
import { NRCsubgraph } from "../../../context/ethereumProvider";
import moment from "moment";
import Axios from "axios";
import ethGreen from "../../../assets/images/icon/iconeethvert.png";
import ethBlue from "../../../assets/images/icon/iconeethbleu.png";
import { formatAddress, getNftType } from "../../../helper";

const typeNames = {
  0: "King",
  1: "Queen",
  2: "Rook",
  3: "Knight",
  4: "Bishop",
  5: "Pawn",
};

export const Activity = (props) => {
  const [filter, setFilter] = useState("sales");
  const arrayFilters = ["sales", "offers", "burns", "mints"];
  // Définir l'état pour les NFTs
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTypeName = (type) => typeNames[type] || "Unknown";

  // Utiliser useEffect pour charger les données au chargement du composant
  useEffect(() => {
    const first = 1000;
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
        setIsLoading(true);
        // Faire les requêtes et obtenir les réponses
        const responseSold = await Axios.post(NRCsubgraph, {
          query: GET_NFT_SOLD,
        });
        const responseListed = await Axios.post(NRCsubgraph, {
          query: GET_NFT_LISTED,
        });
        const responseMinted = await Axios.post(NRCsubgraph, {
          query: GET_NFT_MINTED,
        });
        const responseBurnt = await Axios.post(NRCsubgraph, {
          query: GET_NFT_BURNT,
        });

        // Obtenir les données
        let nftSold = responseSold.data.data.nftpurchaseds;
        let nftListeds = responseListed.data.data.nftlisteds;
        let nftMinteds = responseMinted.data.data.nftminteds;
        let nftBurnt = responseBurnt.data.data.nftburneds;

        // Ajouter l'attribut "type" à chaque NFT
        nftSold = nftSold.map((nft) => ({ ...nft, type: "sales" }));
        nftListeds = nftListeds.map((nft) => ({ ...nft, type: "offers" }));
        nftMinteds = nftMinteds.map((nft) => ({ ...nft, type: "mints" }));
        nftBurnt = nftBurnt.map((nft) => ({ ...nft, type: "burns" }));

        // Fusionner et trier les NFTs
        const merged = [...nftSold, ...nftListeds, ...nftMinteds, ...nftBurnt];
        const sorted = merged.sort((a, b) => b.blockNumber - a.blockNumber);

        // Mettre à jour l'état avec les NFTs
        props.container === "right"
          ? setNfts(sorted.slice(0, 5))
          : setNfts(sorted);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
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
    
    <ActivityContainer
      isFilterApplied={props.container === "right" ? true : false}
    >
      {isLoading ? (
        <div style={{display: "flex", justifyContent: "center"}}>
      <p style={{ padding: "12px 16px" }}>Loading...</p>
      </div>
    ) : (
      <div className="filter-section">
          <div className="filter-container">
            {arrayFilters.map((element, index) => (
              <ButtonFilter
                active={element === filter ? true : false}
                category={element}
                className="filter"
                key={index}
                onClick={() => changeFilter(element)}
              >
                {element}
              </ButtonFilter>
            ))}
          </div>
      </div>
    )}
      {nfts.map(
        (nft, index) =>
          (props.container === "right" ||
            (!props.container && nft.type === filter)) && (
            <div className="activity" key={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <div className="activity-left">
                  <div className="activity-info">
                    <span>
                      {nft.type === "sales" && (
                        <span style={{ color: "rgb(179, 230, 181)" }}>
                          Sale
                        </span>
                      )}
                      {nft.type === "burns" && (
                        <span style={{ color: "#D288A2" }}>Burn</span>
                      )}
                      {nft.type === "offers" && (
                        <span style={{ color: "#ADD8E6" }}>Offer</span>
                      )}
                      {nft.type === "mints" && (
                        <span style={{ color: "#F59E0B" }}>Mint</span>
                      )}
                    </span>
                  </div>
                  <p>{moment.unix(nft.blockTimestamp).fromNow()}</p>
                  <div className="activity-user">
                    {(nft.type === "burns" || nft.type === "mints") && (
                      <p
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Owner: <br />
                        {formatAddress(nft.owner)}
                      </p>
                    )}
                    {(nft.type === "sales" || nft.type === "offers") && (
                      <p
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        From: <br />
                        {formatAddress(nft.seller)}
                      </p>
                    )}
                    {nft.type === "sales" && (
                      <p
                        style={{
                          width: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        To: <br />
                        {formatAddress(nft.buyer)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="activity-right">
                  <div className="activity-card">
                    <img
                      alt=""
                      src={`https://ipfs.io/ipfs/QmR26tKkJqMjq1jQDZzvkKjWAiWVuYWvbzRexXAqSkgP1n/${nft.tokenId}.png`}
                    />
                    <div className="toolBar">
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "14px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        Number Runner #{nft.tokenId}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        }}
                      >
                        {getTypeName(getNftType(nft.tokenId))}
                      </p>
                      {nft.type !== "burns" && nft.type !== "mints" && (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "3px 0",
                            boxShadow: "rgba(0, 0, 0, 0.54) 0px 3px 8px",
                          }}
                        >
                          <img
                            className="eth-logo"
                            src={nft.type === "sales" ? ethGreen : ethBlue}
                            alt=""
                          />{" "}
                          <span
                            style={{
                              color:
                                nft.type === "sales" ? "#B3E6B5" : "#ADD8E6",
                            }}
                          >
                            {nft.price / 10 ** 18}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </ActivityContainer>
  );
};
