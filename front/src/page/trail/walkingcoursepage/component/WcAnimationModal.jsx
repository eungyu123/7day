import "./WcAnimationModal.css";
export default function WcAnimationModal({
  setIsOpenAnimation,
  setIsOpenRewardModal,
  getReward,
}) {
  return (
    <div className="wc-animation-modal-wrapper">
      <div className="wc-animation-modal">
        <div onClick={() => setIsOpenAnimation(false)}>
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
      </div>
      <div className="wc-animation-modal-title-wrapper">
        <div className="wc-animation-modal-title"> 축하해요</div>
        <div className="wc-animation-modal-subtitle">
          스탬프를 다 찍었어요👏
        </div>
      </div>

      <div className="wc-animation-modal-img-wrapper">
        <img
          src="https://em-content.zobj.net/source/microsoft-teams/363/party-popper_1f389.png"
          loading="lazy"
          alt="15.0"
          style={{ width: "200px", height: "200px" }}
        />
      </div>
      <button
        className="wc-animation-modal-button"
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
