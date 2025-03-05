import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import "./BadgePage.css";
import BadgeImg from "./tempBadge.png";

export default function BadgePage() {
  return (
    <>
      <Header PageName={"배지"} />
      <div className="container">
        <div className="badge-container badge-notget">
          <p className="badge-title">도전 목표</p>
          <div className="badge-big-badge">
            <img src={BadgeImg} />
          </div>
          <div className="badge-container-main">
            <div className="badge-goal-info">
              <p>5000보 걷기</p>
              {/* 목표 리스트 데이터 나중에 필요  */}
              <p className="badge-goal-info-achievement">
                목표를 90% 달성했어요!
              </p>
            </div>
          </div>
          <div className="badge-view-all">모두 보기</div>
        </div>
        <div className="badge-container badge-get">
          <p className="badge-title">획득한 배지</p>
          <div className="badge-container-main">
            <div className="badge-yourbadges"></div>
          </div>
          <div className="badge-view-all"> 모두 보기</div>
        </div>
      </div>
    </>
  );
}
