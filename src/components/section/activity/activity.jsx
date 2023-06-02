import { ActivityContainer, ButtonFilter } from "./activity.style";
import pawn5185 from "../../../assets/images/5185.png";
import ethGreen from "../../../assets/images/icon/iconeethvert.png";
import ethBlue from "../../../assets/images/icon/iconeethbleu.png";

import { useEffect, useState } from "react";

export const Activity = (props) => {
  const [filter, setFilter] = useState("sales");
  const arrayFilters = ["sales", "offers", "burn"];
  useEffect(() => {}, []);
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
      {filter === "sales" && (
        <div className="activity">
          <div className="activity-left">
            <div className="activity-info">
              <span>
                <span style={{ color: "#ADD8E6" }}>
                  Offer<br></br>Accepted
                </span>
              </span>
            </div>
            <p>2 hours ago</p>
            <div className="activity-user">
              <p>From: User1</p>
              <p>To: User2</p>
            </div>
          </div>
          <div className="activity-right">
            <div className="activity-card">
              <img alt="" src={pawn5185} />
              <div className="activity-infos-right">
                <p>Number Runner #2236</p>
                <p>
                  Pow{" "}
                  {filter !== "burn" && (
                    <span style={{ position: "absolute", right: "8px" }}>
                      <img className="eth-logo" src={ethBlue} alt="" />
                      <span style={{ color: "#ADD8E6" }}>1.06</span>
                    </span>
                  )}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {[1, 2, 3, 4, 5, 6].map((element, index) => (
        <div className="activity" key={index}>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <div className="activity-left">
              <div className="activity-info">
                <span>
                  {filter === "sales" && <span style={{ color: "#B3E6B5" }}>Sale</span>}
                  {filter === "offers" && <span style={{ color: "#ADD8E6" }}>Offer</span>}
                  {filter === "burn" && <span style={{ color: "#D288A2" }}>Burn</span>}
                  {filter === "accepted" && (
                    <span style={{ color: "#ADD8E6" }}>
                      Offer<br></br>Accepted
                    </span>
                  )}
                </span>
              </div>
              <p>2 hours ago</p>
              <div className="activity-user">
                <p>From: User1</p>
                <p>To: User2</p>
              </div>
            </div>
            <div className="activity-right">
              <div className="activity-card">
                <img alt="" src={pawn5185} />
                <div className="activity-infos-right">
                  <p>Number Runner #2236</p>
                  <p>
                    Pow{" "}
                    {filter !== "burn" && (
                      <span style={{ position: "absolute", right: "8px" }}>
                        <img className="eth-logo" src={filter === "sales" ? ethGreen : ethBlue} alt="" />
                        <span style={{ color: filter === "sales" ? "#B3E6B5" : "#ADD8E6" }}>1.06</span>
                      </span>
                    )}{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {props.container !== "right" && <div className="activity-show">Show more</div>}
    </ActivityContainer>
  );
};
