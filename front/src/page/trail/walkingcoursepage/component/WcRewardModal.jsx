import "./WcRewardModal.css";
export default function WcRewardModal({ newReward, setIsOpenRewardModal }) {
  return (
    <div className="wc-reward-modal-wrapper">
      <div className="wc-reward-modal">
        <div onClick={() => setIsOpenRewardModal(false)}>
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
      </div>

      <div className="wc-reward-modal-img-wrapper updown">
        <img
          src="https://em-content.zobj.net/source/microsoft-teams/363/wrapped-gift_1f381.png"
          loading="lazy"
          alt="15.0"
          style={{ width: "160px", height: "160px", marginBottom: "20px" }}
        />
      </div>

      <div className="wc-reward-modal-text">
        <div className="">축하해요!</div>
        <div className="">
          <b>{newReward}포인트</b>를 획득했어요!
        </div>
      </div>

      <button
        className="wc-reward-modal-button"
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
