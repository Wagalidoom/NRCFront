import { KingAuctionContainer } from "./kingAuction.style"
import { Countdown } from '../../countdown/countdown';
import whiteKing from "../../../assets/images/1.png";
import blackKing from "../../../assets/images/2.png";
import tirelire from "../../../assets/images/icon/tirelire.png";
import tirelireDark from "../../../assets/images/icon/tirelireDark.png";
import eth from "../../../assets/images/eth.png";
import ethDark from '../../../assets/images/ethDark.png';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, ETHEREUM_RPC_URL, useEthereum } from "../../../context/ethereumProvider";
import { NUMBERRUNNERCLUB_ABI } from "../../../ressources/abi";

const MAX_AUCTION_PRICE = 20000;
const MIN_AUCTION_PRICE = 2;

export const KingAuction = (props) => {
    const [calculatedDate, setCalculatedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [price, setPrice] = useState(0);
    const { buyKing } = useEthereum();
    
    const [value, setValue] = useState(10);

    const calculateDate = (priceInEth) => {
        if (startTime) {
            priceInEth = Number(priceInEth);
            const auctionFraction = (MAX_AUCTION_PRICE - priceInEth) / (MAX_AUCTION_PRICE - MIN_AUCTION_PRICE);
            const duration = 30 * 24 * 60 * 60 * 1000; 
            const auctionTimePassed = auctionFraction * duration;
            const date = new Date(startTime.getTime() + auctionTimePassed);
            return date;
        } else {
            return null
        }
    };
    

    useEffect(() => {
        setCalculatedDate(calculateDate(value));
    }, [value]);
      
    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        const fetchPrice = async () => {
            const provider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC_URL);
            const transaction = await provider.getTransaction("0xcfd68ac4d9700f5dee5d1af79b8c3b4c3ed198ce845490de71277fe0546b12ca");
            const block = await provider.getBlock(transaction.blockNumber);
            setStartTime(new Date(block.timestamp * 1000));
            setEndTime(new Date(block.timestamp * 1000 + 30 * 24 * 60 * 60 * 1000));
            console.log('ts: ', block.timestamp)
            const contractInstance = new ethers.Contract(contractAddress, NUMBERRUNNERCLUB_ABI, provider);
            // const priceToPay = await contractInstance.getCurrentPrice();
            // console.log(priceToPay)
            // setPrice(priceToPay)
        }
    
        const interval = setInterval(() => {
            fetchPrice();
        }, 1000); // Fetch price every second
    
        return () => {
            clearInterval(interval); // Cleanup on unmount
        }
    }, [contractAddress]);

    const checkboxChange = (e) => {
        // False is white
        setCheckboxValue(checkboxValue ? false : true)
        console.log(price);
    }
    return (
        <KingAuctionContainer checkbox={checkboxValue}>
            <div className="countdown-container" >
                <Countdown endTime={endTime} />
            </div>
            <div className="king-container" >
                <div className="figure-nft" >
                    <img alt="" src={whiteKing} />
                    <div className="king-infos" >
                        <p className='nft-title' style={{ fontWeight: "700", fontSize: '14px' }}>Number Runner #1</p>
                        <div>
                            <img alt="" src={props.theme === 'Dark Theme' ? tirelire : tirelireDark} /> <span>10</span>
                        </div>
                    </div>
                </div>
                <div className="figure-nft">
                    <img alt="" src={blackKing} />
                    <div className="king-infos">
                        <p className='nft-title' style={{ fontWeight: "700", fontSize: '14px' }}>Number Runner #2</p>
                        <div>
                            <img alt="" src={props.theme === 'Dark Theme' ? tirelire : tirelireDark} /> <span>10</span>
                        </div>
                    </div>
                </div>

                <div className="king-actions" >
                    <div className="king-price">
                        <img alt="" className="leftText" src={props.theme === 'Dark Theme' ? eth : ethDark} /> <span>{price ? parseFloat(ethers.utils.formatEther(price)).toFixed(2) : 'Loading...'}</span>

                    </div>
                    <div className="king-selector">
                        <div className="king-option" style={!checkboxValue ? { borderLeftColor: "#1D9BF0", borderBottomColor: '#1D9BF0', borderTopColor: '#1D9BF0' } : null}>
                            White King
                        </div>
                        <label className="switch">
                            <input type="checkbox" className="input-switch" onChange={(e) => checkboxChange(e)} />
                            <span className="slider"></span>
                        </label>
                        <div className="king-option" style={checkboxValue ? { borderRightColor: "#1D9BF0", borderBottomColor: '#1D9BF0', borderTopColor: '#1D9BF0' } : null}>
                            Black King
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <button className="action-btn" onClick={() => buyKing(checkboxValue ? 1 : 2)}>Buy Now</button>
                </div>
                <div className="payment">
                    <div style={{ width: "30%" }}>
                        <input name="myInput" type="text" style={{ textAlign: "center", width: "100%", fontSize: "23px" }} value={value} onChange={handleChange} />
                    </div>
                    <div style={{ width: "5%", textAlign: "center", paddingTop: "7px" }}>
                        =
                    </div>
                    <div style={{ width: "70%" }}>
                        {calculatedDate ? calculatedDate.toLocaleString() : 'Loading...'}<br />
                        Date et heure affichées en heure locale
                    </div>
                </div>
            </div>
            <div >
                <div className="title" style={{ marginBottom: "15px", marginTop: '32px' }}>
                    {(props.lang === 'EN' || props.lang === true || (props.lang === 'open') || (props.lang === 'open' && props.lastLang === 'EN')) && <span>How does the auction on the King work?</span>}
                    {(props.lang === 'FR' || (props.lang === 'open' && props.lastLang === 'FR')) && <span>Comment fonctionne l’enchère sur le Roi ?</span>}
                    {(props.lang === 'ES' || (props.lang === 'open' && props.lastLang === 'ES')) && <span>¿Cómo funciona la subasta del rey?</span>}
                </div>
                <div className="description">
                    {(props.lang === 'EN' || props.lang === true || (props.lang === 'open' && props.lastLang === true) || (props.lang === 'open' && props.lastLang === 'EN')) && <div className="description">
                        Between all the pieces in the project, the King is obviously the most important. Highly coveted, it offers the benefits and rewards most expected by community members. With such performances, needless to say, the competition will be tough. But to ensure fairness for all participants, the system has set up a specific operation.<br /><br />
                        In order to ensure that all members of the community will go on an equal footing when it comes to mint a king, the auction will start at 20,000 ETH and will decrease exponentially over a period of 30 days. In fact, when this period ends, the auction will reach the base of 2 ETH.<br /><br />
                        There are several options available to you. If you feel like the heart of a bold, you can buy it at today’s price. But if, on the contrary, your heart is that of a strategist, you can bet a specific amount that you are willing to pay while waiting to see if you get the Grail for that price. Finally, the more foresight will be able to inform the amount they are ready to pay and quickly see when they will have to reconnect on the app and mint the King.<br /><br />
                        But beware! Know that as soon as the mint is live, the king’s pool will start to grow. This even if he has not yet found a buyer!
                    </div>}
                    {(props.lang === 'FR' || (props.lang === 'open' && props.lastLang === 'FR')) && <div className="description">
                        Parmi toutes les pièces que recèle le projet, le Roi est évidemment la plus importante. Très convoité, il offre les avantages et les récompenses les plus attendus par les membres de la communauté. Avec de telles performances, inutile de vous dire que la compétition sera rude. Mais pour assurer une équité à tous les participants, le système a mis en place un fonctionnement spécifique.<br /><br />
                        Afin d'assurer que l'ensemble des membres de la communauté partira sur un même pied d'égalité lorsqu'il s'agira de mint un roi, les enchères commenceront à 20,000 ETH et diminueront de manière exponentielle sur une période de 30 jours. De fait, lorsque cette période prendra fin, l'enchère atteindra la base de 2 ETH.<br /><br />
                        Plusieurs options s'offrent à vous. Si vous vous sentez le cœur d'un audacieux, vous pouvez l’acheter au prix du jour. Mais si, au contraire, votre cœur est celui d'un fin stratège, vous pouvez miser une somme spécifique que vous êtes prêt à payer tout en attendant de voir si vous décrochez le Graal pour ce prix. Enfin, les plus prévoyants pourront renseigner la somme qu'ils sont prêts à s'acquitter et voir rapidement à quelle date ils devront se reconnecter sur l'application et mint le Roi.<br /><br />
                        Mais attention ! Sachez que dès que le mint est en direct, la cagnotte du roi commencera à grossir. Cela même si celui-ci n'a pas encore trouvé preneur !
                    </div>}
                    {(props.lang === 'ES' || (props.lang === 'open' && props.lastLang === 'ES')) && <div className="description">
                        De todas las piezas que contiene el proyecto, el Rey es evidentemente la más importante. Muy codiciado, ofrece los beneficios y recompensas más esperados por los miembros de la comunidad. Con este rendimiento, no hace falta decir que la competencia será dura. Sin embargo, para garantizar la equidad de todos los participantes, el sistema ha establecido un funcionamiento específico.<br /><br />
                        Con el fin de garantizar que todos los miembros de la comunidad partirán en pie de igualdad cuando se trate de San Juan, las subastas comenzarán en 20,000 ETH y disminuirán exponencialmente en un período de 30 días. De hecho, cuando este período termine, la subasta alcanzará la base de 2 ETH.<br /><br />
                        Hay varias opciones disponibles para usted. Si siente el corazón de un audaz, puede comprarlo a precio de día. Pero si, por el contrario, tu corazón es el de un estratega fino, puedes apostar una cantidad específica que estás dispuesto a pagar mientras esperas a ver si consigues el Grial por ese precio. Por último, los más previsores podrán indicar la cantidad que están dispuestos a pagar y ver rápidamente en qué fecha deberán volver a conectarse a la aplicación y al Rey.<br /><br />
                        ¡Pero cuidado! Sabed que tan pronto como el Mint esté vivo, el bote del rey comenzará a crecer. ¡Esto incluso si éste no ha encontrado todavía comprador!
                    </div>}
                </div>
            </div>
        </KingAuctionContainer>
    )
}