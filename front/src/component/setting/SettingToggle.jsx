import "./SettingComp.css";

// div 링크로 변경, href props 추가
import BasicToggle from "../common/toggle/BasicToggle";
export default function SettingToggle({ title }) {
  return (
    <div className="common-setting-btn">
      <div className="common-setting-btn-img-wrapper font-lg">{title}</div>
      <div className="common-setting-btn-icon">
        <BasicToggle />
      </div>
    </div>
  );
}
