export default function WcAnimationModal({
    setIsOpenAnimation,
    setIsOpenRewardModal,
    getReward
  }) {
    return (
      <div className="misstion-animation-wrapper">
        <div className="commonheader-container">
          <div
            className="commonheader-left-section"
            onClick={() => setIsOpenAnimation(false)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </div>
        </div>
        <div className="misstion-animation-title-wrapper">
          <div className="misstion-animation-title"> 축하해요</div>
          <div className="misstion-animation-subtitle">스탬프를 다 찍었어요👏</div>
        </div>
  
        <div className="misstion-animation-img-wrapper">
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/363/party-popper_1f389.png"
            loading="lazy"
            alt="15.0"
            style={{ width: "200px", height: "200px" }}
          />
        </div>
        <button
          className="misstion-animation-button"
          onClick={() => {
            setIsOpenAnimation(false);
            setIsOpenRewardModal(true);
            getReward();
          }}
        >
          보상 받기
        </button>
        <div className=""></div>
      </div>
    );
  }