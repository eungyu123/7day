import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ PageName, BackNavigate = "/" }) {
  const navigate = useNavigate();

  return (
    <div className="common-headercontainer">
      <div
        className="common-left-section"
        onClick={() => navigate(BackNavigate)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>
      <div className="common-center-section">
        <p className="common-headertext">{PageName}</p>
      </div>
      <div className="common-right-section"></div>
    </div>
  );
}
export default Header;
