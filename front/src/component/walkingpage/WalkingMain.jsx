import WalkingInfo from "./WalkingInfo";
import "./WalkingMain.css";
import { useState, useEffect, useRef } from "react";
import { useFetchTrail, useFetchUserTrail } from "../../reactQuery/useTrails";
import { useNavigate } from "react-router-dom";
import WalkingKaKaoMap from "./WalkingKaKaoMap";
import WalkingCard from "./WalkingCard";
export default function WalkingMain() {
  const { data } = useFetchTrail();

  const cardsRef = useRef();
  const cardSort = useRef({});
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (cardsRef.current) {
      cardsRef.current.style.height = isOpen ? "70vh" : "20vh";
    }
  };

  const selectAll = () => {
    cardSort.current[0].classList.add("wm-info-header-selected");
    cardSort.current[1].classList.remove("wm-info-header-selected");
  };

  const selectComplete = () => {
    cardSort.current[0].classList.remove("wm-info-header-selected");
    cardSort.current[1].classList.add("wm-info-header-selected");
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
            togglePanel();
          }}
        ></div>

        <div className="wm-info-header ">
          <div
            className="wm-info-header-selected"
            ref={(el) => (cardSort.current[0] = el)}
            onClick={() => {
              selectAll();
            }}
          >
            전체 보기
          </div>
          <div
            ref={(el) => (cardSort.current[1] = el)}
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
