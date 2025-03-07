import { useFetchEgg } from "../../reactQuery/useEgg";
import "./HatcheryPage.css";
import { useState, useEffect, useRef } from "react";
import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";

export default function HatcheryPage() {
  const [isHatching, setIsHatching] = useState(false);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [eggStyles, setEggStyles] = useState([]); // eggStyles 상태
  const [progress, setProgress] = useState(0); // 진행 상태를 관리

  const { data } = useFetchEgg();

  useEffect(() => {
    const hatchingEgg = data.data.find((egg) => egg.state == "hatching");

    if (hatchingEgg) {
      setIsHatching(hatchingEgg.eggType);
      setProgress((hatchingEgg.currentStep / hatchingEgg.goalWalk) * 100);
    }

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

  const renderEggs = () => {
    return data.data
      .filter((v) => v.state == "unhatched")
      .map((egg, i) => (
        <div
          key={i}
          className="hatchery-page-egg-img"
          style={{
            position: "absolute",
            top: eggStyles[i].top, // top 위치
            left: eggStyles[i].left, // left 위치
            transform: eggStyles[i].transform,
          }}
        >
          <span
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
      <Container column={true}>
        <Header PageName={"부화장"} />
        {isHatching ? (
          <div className="hatchery-page-wrapper">
            <div className="hatchery-page-Hatchery-title">순조롭게 부화중</div>
            <div className="hatchery-page-progress-bar-wrapper">
              <div
                className="hatchery-page-progress-bar "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div
              className="hatchery-page-Hatchery"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hatchery-page-Hatchery-img"></div>
              <div className="hatchery-page-egg-img-droped rotate-egg">
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
              {renderEggs()}
            </div>
          </div>
        ) : (
          <div className="hatchery-page-wrapper">
            <div
              className="hatchery-page-Hatchery"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hatchery-page-progress-bar-wrapper ">
                <div
                  className="hatchery-page-progress-bar"
                  style={{ width: `${progress}%` }} // 진행 상태에 따라 width가 변화
                ></div>
              </div>
              <div className="hatchery-page-Hatchery-img"></div>
              {renderEggs()}
            </div>
          </div>
        )}
      </Container>
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
