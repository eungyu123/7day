import "./BasicButton.css";
// div 링크로 변경, href props 추가
export default function BasicButton({ icon, description, rightIcon }) {
  return (
    <div className="common-basic-btn">
      <div className="common-basic-btn-img-wrapper font-xl">{icon}</div>
      <div className="common-basic-btn-des">{description}</div>
      <div className="common-basic-btn-icon">
        <span className="material-symbols-outlined font-xl">{rightIcon}</span>
      </div>
    </div>
  );
}
