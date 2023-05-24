import { AnalycticContainer } from "./analyctic.style"
import { useState } from "react"
import cavalier from "../../../assets/images/icon/IconCavalier-Blanc.png";
export const Analyctic = ({ theme }) => {
    const [arrayTest, setArrayTest] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
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