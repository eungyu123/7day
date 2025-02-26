import "./MainHeader.css";
function MainHeader() {
  return (
    <div className="mainheadercontainer">
      <div className="mainleft-section"></div>
      <div className="maincenter-section">
        <p className="mainheadertext">3.02km</p>
        <p className="mainheaderboldtext">5020</p>
        <p className="mainheadertext">걸음</p>
      </div>
      <div className="mainright-section">
        <div className="mainmodalbtn">
          <p className="mainicon">🗓️</p>
        </div>
        <div className="mainmodalbtn">
          <p className="mainicon">🤝‍</p>
        </div>
        <div className="mainmodalbtn" style={{ marginRight: "5px" }}>
          <p className="mainicon">📤</p>
        </div>
      </div>
    </div>
  );
}
export default MainHeader;
