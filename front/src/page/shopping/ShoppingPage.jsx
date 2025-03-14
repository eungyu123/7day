import ShoppingHeader from "../../component/shopping/ShoppingHeader";
import "./ShoppingPage.css";
import { useState } from "react";
import { useAppContext } from "../../context/context";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";
import { useShopContext } from "../../context/ShopContext";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=favorite"
/>;

export default function ShoppingPage() {
  const { appState, dispatch } = useAppContext();
  const { shopItems } = useShopContext();
  const [likedItems, setIsLiked] = useState([]);
  const toggleLike = (index) => {
    setIsLiked((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="shoppingpage-container">
      <ShoppingHeader />
      <div className="shoppingpage-point-container">
        <p className="shoppingpage-point-text">내 포인트</p>
        <div className="shoppingpage-point-between">
          <p className="shoppingpage-mypoint">{appState.user.userPoint}P</p>
          <button className="shoppingpage-point-btn">출금</button>
        </div>
        <div className="shoppingpage-point-row">
          <p className="emojifont">🎫</p>
          <p className="shoppingpage-point-text">무료 출금 쿠폰 0개</p>
        </div>
      </div>
      <div className="shoppingpage-line"></div>
      <div className="shoppingpage-items-container">
        {shopItems.map((Shop, index) => {
          const isLiked = likedItems.includes(index);
          return (
            <div className="shoppingpage-item-container">
              <div className="shoppingpage-item-img-container">
                <Link
                  to={{
                    pathname: PAGE_URLS.ShoppingDetailPage,
                    search: `?index=${index}`, // 인덱스값 전달
                  }}
                >
                  <img
                    src={Shop.ItemImg}
                    alt={Shop.Item}
                    className="shoppingpage-item-img"
                  />
                </Link>
                <span
                  className={`material-symbols-outlined shoppingpage-heart ${
                    isLiked ? "liked" : ""
                  }`}
                  onClick={() => toggleLike(index)}
                >
                  favorite
                </span>
              </div>
              <p className="shoppingpage-item-text">{Shop.Item}</p>
              <div className="shoppingpage-item-price">
                <p className="shoppingpage-item-discount-text">
                  {Shop.discount}%
                </p>
                <p className="shoppingpage-item-price-text">
                  {(Shop.price * (100 - Shop.discount)) / 100}P
                </p>
              </div>
              {!Shop.delivery && (
                <div className="shoppingpage-item-delivery">배송비 무료</div>
              )}
              {/* {Shop.delivery && (
                <div className="shoppingpage-item-delivery"></div>
              )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
