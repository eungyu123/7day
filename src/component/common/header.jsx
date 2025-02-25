import "./Header.css";
import { useNavigate } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chevron_left"
/>;
function Header({ PageName }) {
  const navigate = useNavigate();

  return (
    <div className="headercontainer">
      <div className="left-section" onClick={() => navigate("/")}>
        <span class="material-symbols-outlined">chevron_left</span>
      </div>
      <div className="center-section">
        <p className="headertext">{PageName}</p>
      </div>
      <div className="left-section"></div>
    </div>
  );
}
export default Header;
