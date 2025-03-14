import "./ShoppingHeader.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chevron_left"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=search"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=shopping_cart"
/>;

function ShoppingHeader({ pagename, BackNavigate = "/" }) {
  const navigate = useNavigate();

  return (
    <div className="shoppingheader-container">
      <div
        className="shoppingheader-left-section"
        onClick={() => navigate(BackNavigate)}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </div>
      <div className="shoppingheader-center-section">
        <p className="shoppingheader-headertext">{pagename}</p>
      </div>
      <div className="shoppingheader-right-section">
        <Link to={"/ShoppingSearchPage"} className="shoppingheader-link ">
          <span class="material-symbols-outlined shoppingheader-icon">
            search
          </span>
        </Link>
        <span class="material-symbols-outlined shoppingheader-icon">
          shopping_cart
        </span>
      </div>
    </div>
  );
}
export default ShoppingHeader;
