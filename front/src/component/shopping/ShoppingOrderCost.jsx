import "../../index.css";

export default function ShoppingOrderCost({ price, delivery }) {
  return (
    <>
      <div className="shopping-order-box">
        <div className="shopping-order-header">주문금액</div>
        <div className="shopping-order-cost-main">
          <div className="shopping-order-const-main-content">
            <div className="shopping-order-cost-main-text">총 상품 금액</div>
            <div className="shopping-order-cost-main-price">{price}P</div>
          </div>
          <div className="shopping-order-const-main-content">
            <div className="shopping-order-cost-main-text">총 배송비</div>
            <div className="shopping-order-cost-main-price">{delivery}p</div>
          </div>
          <hr style={{ marginTop: "10px" }} />
          <div className="shopping-order-const-main-content">
            <div
              className="shopping-order-cost-main-text"
              style={{ fontSize: "14px", fontWeight: "bold" }}
            >
              총 결제 금액
            </div>
            <div
              className="shopping-order-cost-main-price"
              style={{ fontSize: "14px" }}
            >
              {price + delivery}P
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
