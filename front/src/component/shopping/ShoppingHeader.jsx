import "././component/header/Header.css";
import { useNavigate } from "react-router-dom";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chevron_left"
/>;

function Header({ BackNavigate = "/" }) {
  const navigate = useNavigate();

  return (
    <div className="commonheader-container">
      <div
        className="commonheader-left-section"
        onClick={() => navigate(BackNavigate)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>
      <div className="commonheader-center-section">
        <p className="commonheader-headertext">토스 쇼핑</p>
      </div>
      <div className="shoppingheader-right-section">
        <p className="emojifont shoppingheader-icon">🔍</p>
        <p className="emojifont">🔍</p>
      </div>
    </div>
  );
}
export default Header;
