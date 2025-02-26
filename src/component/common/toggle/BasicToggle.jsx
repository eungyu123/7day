import "./BasicToggle.css";
export default function BasicToggle() {
  return (
    <label class="toggle-container">
      <input type="checkbox" class="toggle-input" />
      <div class="toggle-switch"></div>
    </label>
  );
}
