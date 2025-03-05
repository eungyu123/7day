import "./HalfBasicButton.css";
import { useNavigate } from "react-router-dom";
// div 링크로 변경, href props 추가
export default function HalfBasicButton({ icon, title, des, rightIcon, href }) {
  const navigate = useNavigate();

  return (
    <div className="common-half-btn" onClick={() => navigate(href)}>
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
