import "../../index.css";

import Header from "../../component/common/header/Header";
import ShoppingOrderAddressHome from "../../component/shopping/ShoppingOrderAddressHome";
import ShoppingOrderButton from "../../component/shopping/ShoppingOrderButton";
import "../../page/shopping/ShoppingOrder.css";

import { useSearchParams, useLocation } from "react-router-dom";

export default function ShoppingOrderAddressPage() {
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");
  return (
    <>
      <Header BackNavigate={`/ShoppingOrderPage?index=${index}`} />
      <div className="shopping-order-container shopping-order-box">
        <div className="shopping-order-address-header">
          상품을 어디로 받을까요?
        </div>
        <ShoppingOrderAddressHome />
        <hr style={{ marginTop: "15px" }} />
        <div
          className="shopping-order-address-new"
          style={{ marginTop: "15px" }}
          onClick={() => onClick()}
        >
          <p>
            <span className="emojifont" style={{ marginRight: "12px" }}>
              ➕
            </span>
            새로운 주소
          </p>
        </div>
      </div>
      <ShoppingOrderButton buttonText={"확인"} index={index} />
    </>
  );
}
