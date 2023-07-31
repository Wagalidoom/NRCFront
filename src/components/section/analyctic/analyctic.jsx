import { AnalycticContainer } from "./analyctic.style";
import { useState, useEffect } from "react";
import { NRCsubgraph } from "../../../context/ethereumProvider";
import Axios from "axios";
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
import BigNumber from "bignumber.js";
import eth from "../../../assets/images/eth.png";
import ethDark from "../../../assets/images/ethDark.png";
import { getNftType } from "../../../helper";
import { ThemeContext } from "..//../../app/App";
import { useContext } from "react";


const typeNames = {
    0: "NRKing",
    1: "NRQueen",
    2: "NRTower",
    3: "NRCavalier",
    4: "NRBishop",
    5: "NRPawn",
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
    },
};

export const Analyctic = (props) => {
    // Définir l'état pour les NFTs
    const [isLoading, setIsLoading] = useState(true);
    const [rewards, setRewards] = useState([]);
    const currentTheme = useContext(ThemeContext);

    const getTypeName = (type) => typeNames[type] || "Unknown";
    const getImage = (type, id) => images[id % 2 === 0 ? "noir" : "blanc"][type];

    useEffect(() => {
        // Définition des requêtes
        const GET_TOP_HOLDERS = `
        {
            nfts (where: { or: [{share_gt: 0}, {unclaimedRewards_gt: 0}] }) {
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
                const responseHolders = await Axios.post(NRCsubgraph, {
                    query: GET_TOP_HOLDERS,
                });
                const responseGlobalShares = await Axios.post(NRCsubgraph, {
                    query: GET_LAST_GLOBAL_SHARES,
                });

                const topHolders = responseHolders.data.data.nfts;
                const lastGlobalShares =
                    responseGlobalShares.data.data.globalSharesUpdateds[0].shares;

                const calculatedRewards = topHolders.map((holder) => {
                    const nftType = getNftType(holder.id);
                    const unclaimedRewards = holder.unclaimedRewards
                        ? new BigNumber(holder.unclaimedRewards)
                        : new BigNumber(0);
                    let stringEnsName = "Not stacked";
                    if (holder.id === "0") {
                        stringEnsName = "BlackKing.ens";
                    }
                    if (holder.id === "1") {
                        stringEnsName = "WhiteKing.ens";
                    }
                    if (holder.ensName) {
                        stringEnsName = Buffer.from(holder.ensName.slice(2), "hex")
                            .toString("ascii")
                            .replace(/\0/g, "");
                    }
                    holder.ensNameString = stringEnsName;
                    // console.log(holder.share, lastGlobalShares[nftType]);
                    const holderSharesTemp = holder.share ? new BigNumber(holder.share) : new BigNumber(0);
                    holder.share = holderSharesTemp.toNumber() > 0 ? new BigNumber(lastGlobalShares[nftType]).minus(holderSharesTemp) : new BigNumber(0);
                    holder.type = nftType;
                    holder.rewards =
                        holder.share.plus(unclaimedRewards).toNumber() / 10 ** 18;
                    console.log(holder.rewards)
                    if (holder.rewards > 0) {
                        return holder;
                    }
                }).filter(Boolean);


                props.container === "right" ? setRewards(calculatedRewards.slice(0, 5)) : setRewards(calculatedRewards);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchShares();
    }, []);

    return (
        <AnalycticContainer>
            <div>
                <h1 className="title">Top Holders</h1>
            </div>
            <ul className="list">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    rewards.sort((a, b) => b.rewards - a.rewards).map((element, index) => (
                        <li key={index}>
                            <div className="holder-infos">
                                <span>{index + 1} :</span>
                                <div className="holder-nft">
                                    <img alt="" src={getImage(element.type, element.id)} />
                                </div>
                                <div className="holder-name">
                                    <p>{element.ensNameString}</p>
                                    <p>@{getTypeName(element.type)}</p>
                                </div>
                                <div className="holder-data">
                                    <img
                                        style={{
                                            height: "16px",
                                            marginBottom: "2px",
                                            marginLeft: "2px",
                                            marginRight: "5px"
                                        }}
                                        src={currentTheme.theme.name === "Dark Theme" ? ethDark : eth}
                                    />
                                    {element.rewards.toFixed(6)}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </AnalycticContainer>
    );
};
