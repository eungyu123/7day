import "../../index.css";

export default function ShoppingOrderCart({
  itemImg,
  itemName,
  company,
  price,
}) {
  return (
    <>
      <div className="shopping-order-box">
        <div className="shopping-order-header">주문상품</div>
        <div className="shopping-order-cart-main">
          <img
            src={itemImg}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "10px",
            }}
          ></img>
          <div className="shopping-order-cart-info">
            <div className="shopping-order-cart-info-company">{company}</div>
            <div className="shopping-order-cart-info-itemname">{itemName}</div>
            <div className="shopping-order-cart-info-price">{price}P</div>
          </div>
        </div>
      </div>
    </>
  );
}
