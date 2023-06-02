import validate from "../../../assets/images/Valide.png";
import novalidate from "../../../assets/images/Non_Valide.png";
import { GraalContainer } from "./graal.style";
export const Graal = (props) => {
    return (
        <GraalContainer >
            <div className="graal-img" >
                <div>
                    <img alt="" src={props.img} style={{ borderRadius: "5px" }} />
                </div>
                <div className="graal-title" >
                    <span >{props.data.name}</span>
                </div>
                <div className="graal-supply" >
                    10/{props.data.supply}
                </div>
                <div className="graal-action">
                    <button className="bigButton">Mint</button>
                </div>
            </div>
            <div className="graal-desc">
                <div className="graal-condition">
                    <div>
                        <img alt="" src={validate} />
                    </div>
                    <div >
                       {props.data.mint[0]}
                    </div>
                </div>
                <div className="graal-condition" >
                    <div>
                        <img alt="" src={novalidate} />
                    </div>
                    <div >
                    {props.data.mint[1]}
                    </div>
                </div>
            </div>
        </GraalContainer>
    )
}