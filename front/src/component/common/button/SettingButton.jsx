import "./SettingButton.css";
// div 링크로 변경, href props 추가
export default function SettingButton({ title, rightIcon }) {
  return (
    <div className="common-setting-btn">
      <div className="common-setting-btn-img-wrapper font-lg">{title}</div>
      <div className="common-setting-btn-icon">
        <span className="material-symbols-outlined font-xl">{rightIcon}</span>
      </div>
    </div>
  );
}
