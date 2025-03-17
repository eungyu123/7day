import "./SettingComp.css";
// div 링크로 변경, href props 추가
export default function SettingButton({ title, onClick, right = true }) {
  return (
    <>
      <div className="common-setting-btn" onClick={onClick}>
        <div className="common-setting-btn-img-wrapper font-lg">{title}</div>
        <div className="common-setting-btn-icon">
          {right && (
            <span className="material-symbols-outlined font-xl">
              chevron_right
            </span>
          )}
        </div>
      </div>
    </>
  );
}
