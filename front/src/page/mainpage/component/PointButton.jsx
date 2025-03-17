import "../MainPage.css";
import { Link } from "react-router-dom";
// div 링크로 변경, href props 추가
export default function PointButton({ icon, title, des, href }) {
  return (
    <Link to={href} className="main-half-btn">
      <div className="main-half-btn-left">
        <div className="main-half-btn-left-title">
          <div className="emojifont" style={{ display: "inline" }}>
            {icon}
          </div>
          &nbsp;{title}
        </div>
        <div className="main-half-btn-left-des">{des} 원</div>
      </div>
      <div className="main-half-btn-right">
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "24px" }}
        >
          chevron_right
        </span>
      </div>
    </Link>
  );
}
