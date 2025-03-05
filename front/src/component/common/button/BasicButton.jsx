import "./BasicButton.css";
import { Link } from "react-router-dom";

// div 링크로 변경, href props 추가
export default function BasicButton({ icon, description, href }) {
  const Component = href ? Link : "div";

  return (
    <Component to={href} className="common-basic-btn">
      <div className="common-basic-btn-img-wrapper font-xl emojifont">
        {icon}
      </div>
      <div className="common-basic-btn-des">{description}</div>
      <div className="common-basic-btn-icon">
        <span className="material-symbols-outlined font-xl">chevron_right</span>
      </div>
    </Component>
  );
}
