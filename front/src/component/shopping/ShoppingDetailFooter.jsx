import "./ShoppingDetailFooter.css";
import { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { PAGE_URLS } from "../../constant/constant";
import { Link } from "react-router-dom";

export default function ShoppingDetailFooter({ index }) {
  const { shopItems } = useShopContext();
  const shopItem = shopItems && shopItems[index];
  const [showOptions, setShowOptions] = useState(false);
  const [IsCart, setIsCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const initialPrice = (shopItem.price * (100 - shopItem.discount)) / 100;
  const [price, setPrice] = useState(initialPrice);
  const isClothing = shopItem?.Category === "옷";
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const isOptionSelected = isClothing ? selectedColor && selectedSize : true;

  const clothesoption = {
    color: ["white", "beige", "brown", "black"],
    size: ["XS", "S", "M", "L", "XL"],
  };
  const handleAddToCart = () => {
    setIsCart(true);
    setShowOptions(false);
    setTimeout(() => setIsCart(false), 2000);
  };

  return (
    <div className="shoppingdetailfooter-container">
      <div
        className="shoppingdetailfooter-buybtn"
        onClick={() => setShowOptions(true)}
      >
        구매하기
      </div>
      {showOptions && (
        <div
          className="shoppingdetailfooter-options-overlay"
          onClick={() => setShowOptions(false)}
        >
          <div
            className="shoppingdetailfooter-options"
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 막기
          >
            {isClothing && (
              // 옷이면 컬러,색상 옵션 선택
              <>
                <select onChange={(e) => setSelectedColor(e.target.value)}>
                  <option value="">컬러 선택</option>
                  {clothesoption.color.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
                <select onChange={(e) => setSelectedSize(e.target.value)}>
                  <option value="">사이즈 선택</option>
                  {clothesoption.size.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </>
            )}
            {isOptionSelected && (
              // 옵션 선택 후 개수 조절 UI 표시
              <>
                <div className="shoppingdetailfooter-item">
                  <div className="shoppingdetailfooter-quantity">
                    <p>
                      {shopItem?.Item}
                      {isClothing && selectedColor && selectedSize
                        ? ` / ${selectedColor} / ${selectedSize}`
                        : ""}
                    </p>
                    <button onClick={() => setShowOptions(false)}>X</button>
                  </div>
                  <div className="shoppingdetailfooter-quantity">
                    <div>
                      <button
                        onClick={() => {
                          if (quantity > 1) {
                            setQuantity((prev) => prev - 1);
                            setPrice((prev) => prev - initialPrice);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button
                        onClick={() => {
                          setQuantity((prev) => prev + 1);
                          setPrice((prev) => prev + initialPrice);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <p>{price}P</p>
                  </div>
                </div>
                <div className="shoppingdetailfooter-total">
                  <div className="shoppingdetailfooter-totalquantity">
                    <p style={{ color: "var(--toss-blue)" }}>{quantity}</p>
                    <p style={{ color: "var(--toss-gray)" }}>개 상품 금액</p>
                  </div>
                  <p className="shoppingdetailfooter-totalprice">{price}P</p>
                </div>
                <div className="shoppingdetailfooter-totaldelivery">
                  <p style={{ color: "var(--toss-blue)" }}>배송비 무료</p>
                </div>
              </>
            )}
            <div className="shoppingdetailfooter-options-btn">
              <div
                className="shoppingdetailfooter-options-cartbtn"
                onClick={handleAddToCart}
              >
                장바구니
              </div>
              <Link
                to={`${PAGE_URLS.ShoppingOrderPage}?index=${index}&quantity=${quantity}&color=${selectedColor}&size=${selectedSize}`}
                className="shoppingdetailfooter-options-buybtn"
              >
                바로 구매
              </Link>
            </div>
          </div>
        </div>
      )}
      {IsCart && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <p>구매가 완료되었습니다</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
