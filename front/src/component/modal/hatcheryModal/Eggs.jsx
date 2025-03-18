import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { EGG_COLORS } from "../../../../constant/constant";

const Eggs = (forwardRef = ({ data }, ref) => {
  const [eggStyles, setEggStyles] = useState([]); // eggStyles 상태
  const styles = getRandomPosition({ Count: data.data.length });
  setEggStyles(styles); // 상태 업데이트

  const allRef = useRef({
    eggRef: [],
    iconEggRef: [],
  });

  useImperativeHandle(ref, () => allRef.current);

  // 부모 컴포넌트에서 eggRef, iconEggRef 접근 가능하도록 설정

  const renderEggs = () => {
    return data.data
      .slice(0, eggStyles.length)
      .filter((v) => v.state == "unhatched")
      .map((egg, i) => (
        <div
          key={i}
          ref={(el) => (allRef.current.eggRef[i] = el)}
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
            ref={(el) => (allRef.current.iconEggRef[i] = el)}
            data-eggid={egg._id}
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: "'FILL' 1",
              color: EGG_COLORS[Number(egg.eggType) - 1],
              fontSize: "36px",
            }}
          >
            egg
          </span>
        </div>
      ));
  };
  return <>{renderEggs()}</>;
});

export default Eggs;

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
