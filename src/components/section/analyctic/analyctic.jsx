import { AnalycticContainer } from "./analyctic.style"
import { useState, useEffect } from 'react';
import { NRCsubgraph } from "../../../context/ethereumProvider";
import Axios from 'axios';
import cavalier from "../../../assets/images/icon/IconCavalier-Blanc.png";
import BigNumber from 'bignumber.js';
import { getNftType } from "../../../helper";

export const Analyctic = ({ theme }) => {
    const [arrayTest, setArrayTest] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    // Définir l'état pour les NFTs
    const [shares, setShares] = useState([]);
    
    useEffect(() => {
        // Définition des requêtes
        const GET_TOP_HOLDERS = `
        {
            nftSharesUpdateds  {
              id
              tokenId
              shares
            }
        }
        `;
    
        const GET_LAST_GLOBAL_SHARES = `
        {
            globalSharesUpdateds (first: 1, orderBy: blockNumber, orderDirection: desc) {
              id
              shares
              blockNumber
            }
        }
        `;
    
        // Fonction pour obtenir les NFTs
        const fetchShares = async () => {
            try {
                // Faire les requêtes et obtenir les réponses
                const responseHolders = await Axios.post(NRCsubgraph, { query: GET_TOP_HOLDERS });
                const responseGlobalShares = await Axios.post(NRCsubgraph, { query: GET_LAST_GLOBAL_SHARES });
            
                // Obtenir les données
                const topHolders = responseHolders.data.data.nftSharesUpdateds;
                const lastGlobalShares = responseGlobalShares.data.data.globalSharesUpdateds[0].shares;

                // Calculer récompenses
                const rewards = topHolders.map((holder) => {
                    const nftType = getNftType(holder.tokenId);
                    console.log(holder.shares, lastGlobalShares[nftType]);
                    holder.shares = lastGlobalShares[nftType] - holder.shares;
                    return holder.shares;
                });
            
                console.log(rewards);
            } catch (error) {
                console.error(error);
            }
        };
        // Appeler la fonction pour obtenir les NFTs
        fetchShares();
      }, []);


    const showMore = () => {
        let newData = []
        for (let index = 1; index <= 10; index++) {
            newData.push(arrayTest.at(-1) + index)
        }
        setArrayTest(arrayTest.concat(newData))
    }

    return (
        <AnalycticContainer>
            <div>
                <h1 className="title">Top Holders</h1>
            </div>
            <ul className="list">
                {arrayTest.map((element, index) =>
                    <li key={index}>
                        <div className="holder-infos">
                            <span>{element} :</span>
                            <div className="holder-nft"><img alt="" src={cavalier} /></div>
                            <div className="holder-name">
                                <p>777.eth</p>
                                <p>@NRKing</p>
                            </div>
                            <div className="holder-data">700</div>
                        </div>
                    </li>
                )}
                <li onClick={() => showMore()} >
                    <div >Show more</div>
                </li>
            </ul>
        </AnalycticContainer>
    )
}