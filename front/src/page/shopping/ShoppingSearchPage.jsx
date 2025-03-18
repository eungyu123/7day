import "./ShoppingPage.css";
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

export default function ShoppingSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { shopItems } = useShopContext();
  const [likedItems, setIsLiked] = useState([]);
  const toggleLike = (index) => {
    setIsLiked((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const filteredItems = shopItems
    .map((Shop, index) => ({ ...Shop, originalIndex: index })) // 원래 인덱스를 추가
    .filter((Shop) =>
      Shop.Item.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="shoppingpage-container">
      <ShoppingHeader pagename={"상품 검색"} BackNavigate="/ShoppingPage" />
      <div className="shoppingpage-point-container"></div>
      <div className="shoppingpage-point-row ">
        <input
          type="search"
          placeholder="검색어를 입력하세요"
          className="shoppingsearchpage-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="shoppingsearchpage-btn">검색</div>
      </div>
      <div className="shoppingpage-items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map((Shop) => {
            const isLiked = likedItems.includes(Shop.originalIndex);
            return (
              <div
                key={Shop.originalIndex}
                className="shoppingpage-item-container"
              >
                {/* <div className="shoppingpage-point-between ">
                  <div className="shoppingsearchpage-btn">검색</div>
                  <div className="shoppingsearchpage-btn">검색</div>
                  <div className="shoppingsearchpage-btn">검색</div>
                  <div className="shoppingsearchpage-btn">검색</div>
                </div> */}
                <div className="shoppingpage-item-img-container">
                  <Link
                    to={{
                      pathname: PAGE_URLS.ShoppingDetailPage,
                      search: `?index=${Shop.originalIndex}`, // 원래 index 유지
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
                    onClick={() => toggleLike(Shop.originalIndex)}
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
              </div>
            );
          })
        ) : (
          <p className="shoppingpage-no-results">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
}
