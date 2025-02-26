import "./RewardButton.css";
// div 링크로 변경, href props 추가
export default function RewardButton({ imgSrc, description, rightIcon }) {
  return (
    <div className="common-basic-btn">
      <div className="common-basic-btn-img-wrapper">
        <img
          src={imgSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </div>
      <div className="common-basic-btn-des">{description}</div>
      <div className="common-basic-btn-icon">
        <span className="material-symbols-outlined font-xl">{rightIcon}</span>
      </div>
    </div>
  );
}
