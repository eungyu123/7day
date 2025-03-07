import { Link } from "react-router-dom";
import "./HalfBasicButton.css";
import { useNavigate } from "react-router-dom";
// div 링크로 변경, href props 추가
export default function StoreButton({ icon, title, href }) {
  return (
    <Link to={href} className="common-half-btn">
      <div className="common-half-btn-left">
        <div className="common-half-btn-left-title">
          <div className="emojifont" style={{ display: "inline" }}>
            {icon}
          </div>
          {title}
        </div>
      </div>
      <div className="common-half-btn-right">
        <span className="material-symbols-outlined font-xl">chevron_right</span>
      </div>
    </Link>
  );
}
