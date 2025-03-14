import "./WalkingMain.css";
import { useState, useEffect, useRef } from "react";
import { useFetchTrail } from "../../../../reactQuery/useTrails";
import { useNavigate } from "react-router-dom";
import WalkingKaKaoMap from "./WalkingKaKaoMap";
import WalkingCard from "./WalkingCard";
import { useAppContext } from "../../../../context/context";
export default function WalkingMain() {
  const { appState, dispatch } = useAppContext();

  const { data: trailData } = useFetchTrail();
  console.log("trailData", trailData);
  const cardRef = useRef({});
  const [cardHeight, setCardHeight] = useState(10);
  const [selectCardsAll, setSelectCardsAll] = useState(true);

  const handleTogglePanelClick = () => {
    if (cardHeight === 10) {
      setCardHeight(20);
    } else if (cardHeight === 20) {
      setCardHeight(70);
    } else {
      setCardHeight(10);
    }
  };

  const selectAll = () => {
    setSelectCardsAll(true);
  };

  const selectComplete = () => {
    setSelectCardsAll(false);
  };

  const scrollToCard = (index) => {
    if (cardRef.current[index] && cardHeight == 20) {
      cardRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (cardHeight === 20) {
      console.log(appState.trailIndex);
      setTimeout(() => {
        scrollToCard(appState.trailIndex);
      }, 250);
    }
  }, [cardHeight]);

  useEffect(() => {
    if (cardHeight === 20) {
      scrollToCard(appState.trailIndex);
    }
  }, [appState.trailIndex]);

  return (
    <div className="wm-container">
      <div className="wm-infocontainer1">
        <div className="wm-info">
          <p className="wm-infotext1">산책로 추천</p>
          <p className="wm-infotext2">이곳저곳 둘러보세요!</p>
        </div>
      </div>

      <div className="wm-map-wrapper">
        <WalkingKaKaoMap TrailItem={trailData} />
      </div>

      {/* content */}
      <div className={`wm-info-list height-${cardHeight}`}>
        <div
          className="wm-line"
          onClick={() => {
            handleTogglePanelClick();
          }}
        ></div>

        <div className="wm-info-header ">
          <div
            className={`${selectCardsAll == true && "wm-info-header-selected"}`}
            onClick={() => {
              selectAll();
            }}
          >
            전체 보기
          </div>
          <div
            className={`${
              selectCardsAll == false && "wm-info-header-selected"
            }`}
            onClick={() => {
              selectComplete();
            }}
          >
            완료
          </div>
        </div>
        {trailData
          .filter(
            (TrailItem) =>
              selectCardsAll === true ||
              TrailItem.landmarks.every((landmark) => landmark.visited)
          )
          .map((TrailItem, idx) => (
            <WalkingCard
              key={TrailItem._id} // 고유한 key 값
              ref={(el) => (cardRef.current[idx] = el)} // 직접 WalkingCard에 ref 추가
              TrailItem={TrailItem}
              idx={idx}
            />
          ))}
      </div>
    </div>
  );
}
