import "./WalkingMain.css";
import { useState, useEffect, useRef } from "react";
import { useFetchTrail } from "../../reactQuery/useTrails";
import { useNavigate } from "react-router-dom";
import WalkingKaKaoMap from "./WalkingKaKaoMap";
import WalkingCard from "./WalkingCard";
import { useAppContext } from "../../context/context";
export default function WalkingMain() {
  const { appState, dispatch } = useAppContext();

  const { data } = useFetchTrail();
  const cardsRef = useRef();
  const cardRef = useRef({});
  const buttonRef = useRef({});
  const [isOpen, setIsOpen] = useState(0);
  const [selectCards, setSelectCards] = useState("all");

  console.log("data", data);

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
    buttonRef.current[0].classList.add("wm-info-header-selected");
    buttonRef.current[1].classList.remove("wm-info-header-selected");
    setSelectCards("all");
  };

  const selectComplete = () => {
    buttonRef.current[0].classList.remove("wm-info-header-selected");
    buttonRef.current[1].classList.add("wm-info-header-selected");
    setSelectCards("complete");
  };

  const scrollToCard = (index) => {
    if (cardRef.current[index] && isOpen == 1) {
      cardRef.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (isOpen === 1) {
      setTimeout(() => {
        scrollToCard(appState.trailIndex);
      }, 250);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen === 1) {
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
        <WalkingKaKaoMap TrailItem={data} />
      </div>

      {/* content */}
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
            ref={(el) => (buttonRef.current[0] = el)}
            onClick={() => {
              selectAll();
            }}
          >
            전체 보기
          </div>
          <div
            ref={(el) => (buttonRef.current[1] = el)}
            onClick={() => {
              selectComplete();
            }}
          >
            완료
          </div>
        </div>
        {data
          .filter(
            (TrailItem) =>
              selectCards === "all" ||
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
