import { useFetchEgg } from "../../reactQuery/useEgg";
import "./HatcheryModal.css";
import { useState } from "react";
import { useRef } from "react";

export default function HatcheryModal({ setIsOpenHatchery }) {
  const [draggedItem, setDraggedItem] = useState(false);

  const eggRef1 = useRef(null);
  const eggRef2 = useRef(null);
  const hatcheryRef = useRef(null);

  const start = () => {
    console.log("start() 함수호출");
  };

  const handleDragStart = (e, id) => {
    setDraggedItem(id);
    e.dataTransfer.setData("text", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedElement = eggRef1.current;
    const targetHatchery = hatcheryRef.current;

    draggedElement.className = "hatchery-modal-egg-img1 droped";

    // 여기서 이제 부화 시작하도록 변경
    // 이미 부화중이라면 부화중인 화면 보여주기

    setDraggedItem(null);
  };

  const { data } = useFetchEgg();
  return (
    <>
      {false ? (
        <div
          className="hatchery-modal-wrapper"
          onClick={() => setIsOpenHatchery(false)}
        >
          <div
            className="hatchery-modal-Hatchery"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="hatchery-modal-Hatchery-img"></div>
            <div className="hatchery-modal-egg-img1 droped">
              <span className="material-symbols-outlined">egg</span>
            </div>
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
              ref={hatcheryRef}
              className="hatchery-modal-Hatchery-img"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            ></div>
            <div
              ref={eggRef1}
              draggable="true"
              onDragStart={handleDragStart}
              className="hatchery-modal-egg-img1"
            >
              <span className="material-symbols-outlined">egg</span>
            </div>
            <div
              ref={eggRef1}
              draggable="true"
              onDragStart={handleDragStart}
              className="hatchery-modal-egg-img1"
            >
              <span className="material-symbols-outlined">egg</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
