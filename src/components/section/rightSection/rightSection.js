import { useEffect, useRef, useState } from "react"
import { Activity } from "../activity/activity"
import { RightSectionContainer } from "./rightSection.style"
import knight from "../../../assets/images/icon/IconCavalier-Blanc.png";
import queen from "../../../assets/images/icon/IconDame-Blanc.png";
import king from "../../../assets/images/icon/IconRoi-Blanc.png";
import rook from "../../../assets/images/icon/IconTour-Blanc.png";
import bishop from "../../../assets/images/icon/IconFou-Blanc.png";
import { Analyctic } from "../analyctic/analyctic";

export const RightSection = ({ more,openFunction, actualPage ,subPage,theme}) => {
    const activityRef = useRef(null)
    const [scroll, setScroll] = useState(0)
    const holderData=[
    {img:king,name:'@NRKing'},
    {img:queen,name:'@NRQueen'},
    {img:knight,name:'@NRKnight'},
    {img:rook,name:'@NRRook'},
    {img:bishop,name:'@NRBishop'}]
    const handleScroll = () => {
        const multiplicateur = subPage === 'home' ? 15 : 2; 
        const { scrollTop, scrollHeight, clientHeight } = activityRef.current;
        if (window.scrollY > scroll && scrollTop < scrollHeight - clientHeight) {
            activityRef.current.scrollBy(0,(window.scrollY - scroll) * multiplicateur )
        }
        else if (window.scrollY < scroll && scrollTop > 0) {
            activityRef.current.scrollBy(0, (window.scrollY - scroll) * multiplicateur);
        }
        setScroll(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    })
    return (
        <RightSectionContainer ref={activityRef} showHolder={more.topHolders} showActivity={more.activity}>
            <div className="top-holder">
                <div>
                   <Analyctic />
                    <div className="activity-show"  onClick={() => openFunction({ topHolders: true, activity: false, page: actualPage },{pos:window.scrollY,back:false})} >
                        <div>Show more</div>
                    </div>
                </div>
            </div>
            <div className="activity-container">
                <h1 className="title">
                    Activity
                </h1>
                    <Activity container={'right'} theme={theme}/>
                    <div className="activity-show" onClick={() => openFunction({ topHolders: false, activity: true, page: actualPage },{pos:window.scrollY,back:false})}>
                        Show more
                    </div>
            </div>
        </RightSectionContainer>
    )
}