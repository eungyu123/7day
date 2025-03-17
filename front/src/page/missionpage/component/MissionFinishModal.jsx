import "./MissionFinishModal.css";
export default function MissionFinishModal({
  setIsOpenAnimation,
  setIsOpenRoulette,
}) {
  return (
    <div className="mission-animation-wrapper">
      <div className="mission-header-container">
        <div
          className="mission-header-left-section"
          onClick={() => setIsOpenAnimation(false)}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
      </div>
      <div className="mission-animation-title-wrapper">
        <div className="mission-animation-title"> 축하해요</div>
        <div className="mission-animation-subtitle">미션을 완수했어요<span className="emojifont">👏</span></div>
      </div>

      <div className="mission-animation-img-wrapper">
        <img
          src="https://em-content.zobj.net/source/microsoft-teams/363/party-popper_1f389.png"
          loading="lazy"
          alt="15.0"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <button
        className="mission-animation-button"
        onClick={() => {
          setIsOpenAnimation(false);
          setIsOpenRoulette(true);
        }}
      >
        룰렛 돌리러 가기
      </button>
      <div className=""></div>
    </div>
  );
}
