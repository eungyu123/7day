import ShoppingHeader from "../../component/shopping/ShoppingHeader";
import "./ShoppingPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=favorite"
/>;

export default function ShoppingPage() {
  const [likedItems, setIsLiked] = useState([]);

  const toggleLike = (index) => {
    setIsLiked((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };
  const ShopItem = [
    {
      Item: "여성 와이드 팬츠",
      ItemImg: "src/page/shopping/widepants.jpg",
      price: 38000,
      discount: 50,
      Company: "musinsa",
      Category: "옷",
    },
    {
      Item: "핸드폰 젤리 케이스",
      ItemImg: "src/page/shopping/phonecase.jpg",
      price: 15000,
      discount: 30,
      Company: "phonecasecompany",
      Category: "기타",
    },
    {
      Item: "꿀고구마 1kg",
      price: 35000,
      discount: 60,
      ItemImg: "src/page/shopping/goguma.png",
      Company: "해뜨레",
      Category: "음식",
    },
    {
      Item: "나이키 모자",
      ItemImg: "src/page/shopping/cap.jpg",
      price: 50000,
      discount: 20,
      Company: "Nike",
      Category: "옷",
    },
    // { Item: "", ItemImg: "", price:, discount:, Company: "", Category: "" },
  ];

  return (
    <div className="shoppingpage-container">
      <ShoppingHeader pagename={"토스 쇼핑"} />
      {ShopItem.map((Shop, index) => {
        const isLiked = likedItems.includes(index);

        return (
          <div key={index} className="shoppingpage-item-container">
            <div className="shoppingpage-item-img-container">
              <Link
                to={{
                  pathname: PAGE_URLS.ShoppingDetailPage,
                  state: { shopItem: Shop }, // 이 부분 추가
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
              <div className="shoppingpage-item-delivery">배송비 무료</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
