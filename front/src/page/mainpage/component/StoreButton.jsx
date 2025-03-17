import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../MainPage.css";
// div 링크로 변경, href props 추가
export default function StoreButton({ icon, title, href }) {
  return (
    <Link to={href} className="main-half-btn">
      <div className="main-half-btn-left">
        <div className="main-half-btn-left-title">
          <div className="emojifont" style={{ display: "inline" }}>
            {icon}
          </div>
          &nbsp;{title}
        </div>
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
