import { Link } from "react-router-dom";
import "./HalfBasicButton.css";
import { useNavigate } from "react-router-dom";
// div 링크로 변경, href props 추가
export default function StoreButton({ title, href }) {
  return (
    <Link to={href} className="common-half-btn">
      <div className="common-half-btn-left">
        <div className="common-half-btn-left-title">{title}</div>
      </div>
      <div className="common-half-btn-right">
        <span className="material-symbols-outlined font-xl">chevron_right</span>
      </div>
    </Link>
  );
}
