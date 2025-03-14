export default function WcRewardModal({
  newReward,
  setIsOpenRewardModal,
  }) {
    return (
      <div className="misstion-animation-wrapper">
        <div className="commonheader-container">
          <div
            className="commonheader-left-section"
            onClick={() => setIsOpenRewardModal(false)}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </div>
        </div>
  
        <div className="wc-animation-img-wrapper updown">
            <img
                src="https://em-content.zobj.net/source/microsoft-teams/363/wrapped-gift_1f381.png"
                loading="lazy"
                alt="15.0"
                style={{ width: "160px", height: "160px", marginBottom: "20px" }}
            />
        </div>
        
        <div className="wc-reward-modal-text">
          <div className="">축하해요!</div>
          <div className=""><b>{newReward}포인트</b>를 획득했어요!</div>
        </div>

        <button
          className="misstion-animation-button"
          onClick={() => {
            setIsOpenRewardModal(false);
          }}
        >
          확인
        </button>
        <div className=""></div>
      </div>
    );
  }