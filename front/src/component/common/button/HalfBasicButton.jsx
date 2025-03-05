import "./HalfBasicButton.css";
// div 링크로 변경, href props 추가
export default function HalfBasicButton({ icon, title, des, rightIcon }) {
  return (
    <div className="common-half-btn">
      <div className="common-half-btn-left">
        <div className="common-half-btn-left-title">
          <div className="emojifont" style={{ display: "inline" }}>
            {icon}
          </div>
          {title}
        </div>
        <div className="common-half-btn-left-des">{des}</div>
      </div>
      <div className="common-half-btn-right">
        <span className="material-symbols-outlined font-xl ">{rightIcon}</span>
      </div>
    </div>
  );
}
