import WalkingInfo from "./WalkingInfo";
import "./WalkingMain.css";
import { useState, useEffect, useRef } from "react";
import { useFetchTrail } from "../../reactQuery/useTrails";
import { useNavigate } from "react-router-dom";
import WalkingKaKaoMap from "./WalkingKaKaoMap";
import WalkingCard from "./WalkingCard";
export default function WalkingMain() {
  const { data } = useFetchTrail();
  console.log("data", data);
  const cardsRef = useRef();
  const cardRef = useRef({});
  const [isOpen, setIsOpen] = useState(0);
  const navigate = useNavigate();

  const handleTogglePanelClick = () => {
    if (cardsRef.current) {
      if (isOpen === 0) {
        setIsOpen(1);
        cardsRef.current.style.height = "20vh";
      } else if (isOpen === 1) {
        setIsOpen(2);
        cardsRef.current.style.height = "70vh";
      } else {
        setIsOpen(0);
        cardsRef.current.style.height = "10vh";
      }
    }
  };

  const selectAll = () => {
    cardRef.current[0].classList.add("wm-info-header-selected");
    cardRef.current[1].classList.remove("wm-info-header-selected");
  };

  const selectComplete = () => {
    cardRef.current[0].classList.remove("wm-info-header-selected");
    cardRef.current[1].classList.add("wm-info-header-selected");
  };

  return (
    <div className="wm-container">
      <div className="wm-infocontainer1">
        <div className="wm-info">
          <p className="wm-infotext1">산책로 추천</p>
          <p className="wm-infotext2">이곳저곳 둘러보세요!</p>
        </div>
      </div>

      <div className="wm-map-wrapper">
        <WalkingKaKaoMap TrailItem={data} />
      </div>

      <div className="wm-info-list" ref={cardsRef}>
        <div
          className="wm-line"
          onClick={() => {
            handleTogglePanelClick();
          }}
        ></div>

        <div className="wm-info-header ">
          <div
            className="wm-info-header-selected"
            ref={(el) => (cardRef.current[0] = el)}
            onClick={() => {
              selectAll();
            }}
          >
            전체 보기
          </div>
          <div
            ref={(el) => (cardRef.current[1] = el)}
            onClick={() => {
              selectComplete();
            }}
          >
            완료
          </div>
        </div>
        {data.map((TrailItem, idx) => {
          return (
            <>
              <WalkingCard TrailItem={TrailItem} idx={idx} />
            </>
          );
        })}
      </div>
    </div>
  );
}
