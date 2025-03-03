import "./BasicToggle.css";
export default function BasicToggle() {
  return (
    <label className="toggle-container">
      <input type="checkbox" className="toggle-input" />
      <div className="toggle-switch"></div>
    </label>
  );
}
