import "../../index.css";

export default function ShoppingOrderCart({ itemImg }) {
  return (
    <>
      <div className="shopping-order-box">
        <div className="shopping-order-header">주문상품</div>
        <div className="shopping-order-cart-main">
          <div
            // src={itemImg}
            style={{
              width: "60px",
              height: "60px",
              background: "black",
              borderRadius: "10px",
            }}
          ></div>
          <div className="shopping-order-cart-info">
            <div className="shopping-order-cart-info-company">바다사나이</div>
            <div className="shopping-order-cart-info-itemname">
              바다사나이 제철 가리비
            </div>
            <div className="shopping-order-cart-info-price">10,900원</div>
          </div>
        </div>
      </div>
    </>
  );
}
