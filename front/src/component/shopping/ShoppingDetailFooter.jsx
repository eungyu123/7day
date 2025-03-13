import "./ShoppingDetailFooter.css";
import { useState } from "react";
import { useShopContext } from "../../context/ShopContext";

export default function ShoppingDetailFooter({ index }) {
  const { shopItems } = useShopContext();
  const shopItem = shopItems && shopItems[index];
  const [showOptions, setShowOptions] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const initialPrice = (shopItem.price * (100 - shopItem.discount)) / 100;
  const [price, setPrice] = useState(initialPrice);
  const isClothing = shopItem?.Category === "옷";
  console.log("옷?", isClothing);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const isOptionSelected = isClothing ? selectedColor && selectedSize : true;

  const clothesoption = {
    color: ["white", "beige", "brown", "black"],
    size: ["XS", "S", "M", "L", "XL"],
  };
  return (
    <div className="shoppingdetailfooter-container ">
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
          <div className="shoppingdetailfooter-options">
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
            )}
            <div className="shoppingdetailfooter-total">
              <p>{quantity}개 상품 금액</p>
              <p>{price}P</p>
            </div>
            <div className="shoppingdetailfooter-options-btn">
              <div className="shoppingdetailfooter-options-cartbtn">
                장바구니
              </div>
              <div className="shoppingdetailfooter-options-buybtn">
                바로 구매
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
