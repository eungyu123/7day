import "../../index.css";

import Header from "../../component/common/header/Header";
import ShoppingOrderAddressHome from "../../component/shopping/ShoppingOrderAddressHome";
import "../../page/shopping/ShoppingOrder.css";

export default function ShoppingOrderAddressPage() {
  return (
    <>
      <Header BackNavigate="/ShoppingOrderPage" />
      <div className="shopping-order-container shopping-order-box">
        <div className="shopping-order-address-header">
          상품을 어디로 받을까요?
        </div>
        <ShoppingOrderAddressHome />
        <hr style={{ marginTop: "15px" }} />
        <div
          className="shopping-order-address-new"
          style={{ marginTop: "15px" }}
        >
          <span className="emojifont" style={{ marginRight: "12px" }}>
            ➕
          </span>
          새로운 주소
        </div>
      </div>
    </>
  );
}
