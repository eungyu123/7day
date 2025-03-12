import "./SettingComp.css";

export default function SettingRange({ title }) {
  return (
    <div className="common-setting-btn">
      <div className="common-setting-btn-img-wrapper font-lg">{title}</div>
      <div className="common-setting-btn-icon">
        <div className="modal-body">
          <input type="range" className="sound-volume-bar" />
        </div>
      </div>
    </div>
  );
}
