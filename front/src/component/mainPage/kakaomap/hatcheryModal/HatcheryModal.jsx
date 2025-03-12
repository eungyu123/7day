import { useFetchEgg } from "../../../../reactQuery/useEgg";
import "./HatcheryModal.css";
import { useState, useEffect, useRef } from "react";
import { getEgg, updateEggState } from "../../../../api/eggApi";
import { useQueryClient } from "@tanstack/react-query";

export default function HatcheryModal({ setIsOpenHatchery }) {
  const queryClient = useQueryClient(); // queryClient 가져오기
  const eggRef = useRef({});
  const iconEggRef = useRef({});
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);
  const [isHatching, setIsHatching] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [eggStyles, setEggStyles] = useState([]); // eggStyles 상태
  const [progress, setProgress] = useState(0); // 진행 상태를 관리
  const [hatchingProgress, sethatchingProgress] = useState(0); // 진행 상태를 관리

  const { data } = useFetchEgg();
  useEffect(() => {
    if (data.type == "success") {
      const hatchingEgg = data.data.find((egg) => egg.state == "hatching");

      if (hatchingEgg) {
        setIsHatching(hatchingEgg.eggType);
        sethatchingProgress(
          (hatchingEgg.currentStep / hatchingEgg.goalWalk) * 100
        );
      }

      const styles = getRandomPosition({ Count: data.data.length });

      setEggStyles(styles); // 상태 업데이트
    }

    setLoading(false); // 로딩 완료 후 상태 변경
  }, [data]);

  const handleDragStart = (e, id) => {
    console.log("실행 1");
    if (isHatching) return;
    e.dataTransfer.setData("text", id);
    const draggedElement = eggRef.current[id];
    setTimeout(() => {
      draggedElement.style.display = "none";
    }, 0);
    setProgress(0);
  };

  const handleDragEnd = (e, id) => {
    console.log("실행 2", isHatching);

    if (isHatching) return;

    e.dataTransfer.setData("text", id);
    const draggedElement = eggRef.current[id];
    draggedElement.style.display = "block";
    setIsVisible(false);
  };

  const handleDragOver = (e) => {
    console.log("실행 3");

    if (isHatching) return;
    e.preventDefault();

    const item = e.dataTransfer.getData("text"); // 드래그한 아이템 데이터를 가져옴
    setIsVisible(true);

    if (intervalRef.current) return;
    let currentProgress = 0; // 첫 번째 진행은 즉시 10%로 설정

    intervalRef.current = setInterval(() => {
      currentProgress += 1; // 5%씩 증가
      setProgress((prev) => Math.min(prev + 2, 100)); // 100%를 초과하지 않도록 설정

      if (currentProgress >= 100) {
        clearInterval(intervalRef.current); // 100%가 되면 정지
        intervalRef.current = null;
      }
    }, 50); // 200ms마다 실행 (부드러운 애니메이션 효과)
  };

  const handleDragLeave = () => {
    console.log("실행 4");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
    setIsVisible(true);
  };

  const handleDrop = (e, i) => {
    e.preventDefault();
    setProgress(0);

    const item = e.dataTransfer.getData("text"); // 드래그한 아이템 데이터를 가져옴

    const updateEgg = async () => {
      const result = await updateEggState({
        eggId: eggRef.current[item].dataset.eggid,
      });
      const res = await getEgg();
      console.log(res.data);

      if (result.type == "success") {
        console.log("queryClient");
        await queryClient.invalidateQueries("eggs");
        await queryClient.refetchQueries("eggs", { active: true });
      }
    };

    if (progress == 100) {
      updateEgg();
      setIsHatching(true);
    }
  };

  const renderEggs = () => {
    if (data.type == "error") return;
    return data.data
      .slice(0, eggStyles.length)
      .filter((v) => v.state == "unhatched")
      .map((egg, i) => (
        <div
          key={i}
          ref={(el) => (eggRef.current[i] = el)}
          data-eggid={egg._id}
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
            data-eggid={egg._id}
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
            >
              <div
                className="hatchery-modal-progress-bar "
                style={{ width: `${hatchingProgress}%` }}
              ></div>
            </div>
            <div className="hatchery-modal-Hatchery-img"></div>
            <div className="hatchery-modal-egg-img-droped rotate-egg">
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  color: colors[isHatching - 1],
                  fontSize: "82px",
                }}
              >
                egg
              </span>
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
              className="hatchery-modal-progress-bar-wrapper "
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div
                className="hatchery-modal-progress-bar"
                style={{ width: `${progress}%` }} // 진행 상태에 따라 width가 변화
              ></div>
            </div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
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
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

const getRandomPosition = ({ Count }) => {
  const styles = [];
  const positions = [];
  const maxAttempts = 20; // 중복 방지 최대 시도 횟수
  const minDistance = 6; // 최소 거리 (단위: %)

  for (let i = 0; i < Count; i++) {
    let attempt = 0;
    let top, left;
    let isValid = false;

    while (attempt < maxAttempts) {
      top = randomPositionTop();
      left = randomPositionLeft();

      if (
        positions.every(
          (pos) => getDistance(pos.top, pos.left, top, left) >= minDistance
        )
      ) {
        isValid = true;
        break;
      }
      attempt++;
    }

    if (!isValid) {
      break;
    }

    positions.push({ top, left });

    styles.push({
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${randomRotate()}deg) translate(80%, 50%)`,
    });
  }

  return styles;
};
