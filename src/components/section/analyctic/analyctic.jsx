import { AnalycticContainer } from "./analyctic.style"
import { useState, useEffect } from 'react';
import { NRCsubgraph } from "../../../context/ethereumProvider";
import Axios from 'axios';
import cavalierBlanc from "../../../assets/images/icon/IconCavalier-Blanc.png";
import cavalierNoir from "../../../assets/images/icon/Icon Cavalier - Noir.png";
import dameBlanc from "../../../assets/images/icon/IconDame-Blanc.png";
import dameNoir from "../../../assets/images/icon/Icon Dame - Noir.png";
import roiBlanc from "../../../assets/images/icon/IconRoi-Blanc.png";
import roiNoir from "../../../assets/images/icon/IconRoi-Noir.png";
import fouBlanc from "../../../assets/images/icon/IconFou-Blanc.png";
import fouNoir from "../../../assets/images/icon/Icon Fou - Noir.png";
import pionBlanc from "../../../assets/images/icon/IconPion-Blanc.png";
import pionNoir from "../../../assets/images/icon/Icon Pion - Noir.png";
import tourBlanc from "../../../assets/images/icon/IconTour-Blanc.png";
import tourNoir from "../../../assets/images/icon/Icon Tour - Noir.png";
import BigNumber from 'bignumber.js';
import { getNftType } from "../../../helper";

const typeNames = {
    0: 'NRKing',
    1: 'NRQueen',
    2: 'NRTower',
    3: 'NRCavalier',
    4: 'NRFou',
    5: 'NRPawn'
};

const images = {
    blanc: {
        0: roiBlanc,
        1: dameBlanc,
        2: tourBlanc,
        3: cavalierBlanc,
        4: fouBlanc,
        5: pionBlanc,
    },
    noir: {
        0: roiNoir,
        1: dameNoir,
        2: tourNoir,
        3: cavalierNoir,
        4: fouNoir,
        5: pionNoir,
    }
};

export const Analyctic = ({ theme }) => {
    // Définir l'état pour les NFTs
    const [isLoading, setIsLoading] = useState(true);
    const [rewards, setRewards] = useState([]);

    const getTypeName = (type) => typeNames[type] || 'Unknown';
    const getImage = (type, id) => images[id % 2 === 0 ? 'noir' : 'blanc'][type];

    
    useEffect(() => {
        // Définition des requêtes
        const GET_TOP_HOLDERS = `
        {
            nfts (where: {share_gt: 0})  {
              id
              share
              ensName
              unclaimedRewards
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
                setIsLoading(true);
                // Faire les requêtes et obtenir les réponses
                const responseHolders = await Axios.post(NRCsubgraph, { query: GET_TOP_HOLDERS });
                const responseGlobalShares = await Axios.post(NRCsubgraph, { query: GET_LAST_GLOBAL_SHARES });
            
                // Obtenir les données
                const topHolders = responseHolders.data.data.nfts;
                const lastGlobalShares = responseGlobalShares.data.data.globalSharesUpdateds[0].shares;
                console.log(topHolders, lastGlobalShares)
                // Calculer récompenses
                const calculatedRewards = topHolders.map((holder) => {
                    const nftType = getNftType(holder.tokenId);
                    const unclaimedRewards = holder.unclaimedRewards ? new BigNumber(holder.unclaimedRewards) : new BigNumber(0);
                    const stringEnsName = holder.ensName ? Buffer.from(holder.ensName.slice(2), 'hex').toString('ascii').replace(/\0/g, '') : "No name";
                    holder.ensNameString = stringEnsName;
                    console.log(holder.share, lastGlobalShares[nftType]);
                    holder.share = new BigNumber(lastGlobalShares[nftType]).minus(holder.share);
                    holder.type = nftType;
                    holder.rewards = (holder.share.plus(unclaimedRewards)).toNumber() / 10**18;
                    return holder;
                });
            
                setRewards(calculatedRewards);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        // Appeler la fonction pour obtenir les NFTs
        fetchShares();
      }, []);

    return (
        <AnalycticContainer>
            <div>
                <h1 className="title">Top Holders</h1>
            </div>
            <ul className="list">
                {isLoading ? <p>Loading...</p> : rewards.map((element, index) =>
                    <li key={index}>
                        <div className="holder-infos">
                            <span>{index+1} :</span>
                            <div className="holder-nft"><img alt="" src={getImage(element.type, element.id)} /></div>
                            <div className="holder-name">
                                <p>{element.ensNameString}</p>
                                <p>@{getTypeName(element.type)}</p>
                            </div>
                            <div className="holder-data">{element.rewards}</div>
                        </div>
                    </li>
                )}
            </ul>
        </AnalycticContainer>
    )
}