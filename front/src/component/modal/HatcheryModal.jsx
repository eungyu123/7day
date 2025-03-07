import { useFetchEgg } from "../../reactQuery/useEgg";
import "./HatcheryModal.css";
import { useState, useEffect, useRef } from "react";

export default function HatcheryModal({ setIsOpenHatchery }) {
  const eggRef = useRef({});
  const iconEggRef = useRef({});
  const barWrapperRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isHatching, setIsHatching] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [eggStyles, setEggStyles] = useState([]); // eggStyles 상태
  const [progress, setProgress] = useState(0); // 진행 상태를 관리
  const [finished, setFinished] = useState(false);
  const [timeFinished, setTimeFinished] = useState(false);

  const { data } = useFetchEgg();

  console.log("data", data);
  useEffect(() => {
    const styles = [];
    for (let i = 0; i < 30; i++) {
      styles.push({
        top: `${randomPositionTop()}%`, // top 위치
        left: `${randomPositionLeft()}%`, // left 위치
        transform: `rotate(${randomRotate()}deg) translate(80%, 50%)`, // 회전 및 이동
      });
    }
    setEggStyles(styles); // 상태 업데이트
    setLoading(false); // 로딩 완료 후 상태 변경
  }, []);

  useEffect(() => {
    if (progress == 100) {
      const timer = setTimeout(() => {
        setTimeFinished(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text", id);
    const draggedElement = eggRef.current[id];
    setTimeout(() => {
      draggedElement.style.display = "none";
    }, 0);
  };

  const handleDragEnd = (e, id) => {
    e.dataTransfer.setData("text", id);
    const draggedElement = eggRef.current[id];
    draggedElement.style.display = "block";
    barWrapperRef.current.style.display = "none";
    //progressBarRef.current.classList.remove("full-width"); // 클래스 제거 이방식은 왜 안되는지 모르겠음음
    setProgress(0); // progress 바가 다시 0%로 돌아감
    console.log("set0", progress);
  };

  const handleDragOver = (e) => {
    if (finished) return;
    e.preventDefault();
    const item = e.dataTransfer.getData("text"); // 드래그한 아이템 데이터를 가져옴
    barWrapperRef.current.style.display = "block";
    //progressBarRef.current.classList.add("full-width"); // 클래스 추가
    setProgress(100); // 드래그하면 progress 바가 100%로 채워짐
    console.log("set1", progress);
  };

  const handleDrop = (e, i) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text"); // 드래그한 아이템 데이터를 가져옴
    console.log("set2", progress);

    if (timeFinished == true) {
      const draggedElement = eggRef.current[item];
      const iconEggElement = iconEggRef.current[item];
      draggedElement.style.position = "absolute";
      draggedElement.style.top = "50%";
      draggedElement.style.left = "50%";
      draggedElement.style.transform = "translate(-50%, -50%)";
      iconEggElement.style.fontSize = "82px";
      setFinished(true);
    } else {
      setTimeFinished(false);
    }
  };

  const renderEggs = () => {
    return data.data
      .filter((v) => v.state == "unhatched")
      .map((egg, i) => (
        <div
          key={i}
          ref={(el) => (eggRef.current[i] = el)}
          data-eggId={egg._id}
          draggable="true"
          onDragStart={(e) => handleDragStart(e, i)}
          onDragEnd={(e) => handleDragEnd(e, i)}
          className="hatchery-modal-egg-img"
          style={{
            position: "absolute",
            top: eggStyles[i].top, // top 위치
            left: eggStyles[i].left, // left 위치
            transform: eggStyles[i].transform,
          }}
        >
          <span
            ref={(el) => (iconEggRef.current[i] = el)}
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: "'FILL' 1",
              color: colors[Number(egg.eggType) - 1],
              fontSize: "36px",
            }}
          >
            egg
          </span>
        </div>
      ));
  };
  if (loading) return null;

  return (
    <>
      {isHatching ? (
        <div
          className="hatchery-modal-wrapper"
          onClick={() => setIsOpenHatchery(false)}
        >
          <div
            className="hatchery-modal-Hatchery"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hatchery-modal-Hatchery-title">순조롭게 부화중</div>
            <div
              className="hatchery-modal-progress-bar-wrapper"
              style={{ display: "block" }}
              ref={barWrapperRef}
            >
              <div
                className="hatchery-modal-progress-bar-static "
                style={{ width: "80%" }} // 진행 상태에 따라 width가 변화
                ref={progressBarRef}
              ></div>
            </div>
            <div className="hatchery-modal-Hatchery-img"></div>
            <div className="hatchery-modal-egg-img-droped rotate-egg">
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  color: colors[1],
                  fontSize: "82px",
                }}
              >
                egg
              </span>
            </div>
            {renderEggs()}
          </div>
        </div>
      ) : (
        <div
          className="hatchery-modal-wrapper"
          onClick={() => setIsOpenHatchery(false)}
        >
          <div
            className="hatchery-modal-Hatchery"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="hatchery-modal-progress-bar-wrapper "
              ref={barWrapperRef}
            >
              <div
                className="hatchery-modal-progress-bar"
                style={{ width: `${progress}%` }} // 진행 상태에 따라 width가 변화
                ref={progressBarRef}
              ></div>
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="hatchery-modal-Hatchery-img"
            ></div>
            {renderEggs()}
          </div>
        </div>
      )}
    </>
  );
}

const colors = ["#FFD700", "#C0C0C0", "#B87333"];

const randomPositionTop = () => {
  return Math.random() * 20 + 65; // 75% ~ 95% 사이의 무작위 위치
};

const randomPositionLeft = () => {
  return Math.random() * 60 + 5; // 75% ~ 95% 사이의 무작위 위치
};

const randomRotate = () => {
  return Math.random() * 50 - 25; // -20도 ~ 20도 사이의 무작위 회전
};
