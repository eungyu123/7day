import ShoppingHeader from "../../component/shopping/ShoppingHeader";
import { useSearchParams } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import "./ShoppingDetailPage.css";
import ShoppingDetailFooter from "../../component/shopping/ShoppingDetailFooter";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=chevron_right"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=star"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=star_half"
/>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=download"
/>;

export default function ShoppingDetailPage() {
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");
  console.log("index:", index);
  const { shopItems } = useShopContext();
  const shopItem = shopItems && shopItems[index];
  const starreivew = [
    { stars: 1.5, review: "32" },
    { stars: 5, review: "1,568" },
    { stars: 4, review: "103" },
    { stars: 4, review: "20,358" },
  ];
  const starindex = index % starreivew.length;
  const renderStars = (rating) => {
    let stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined shoppingdetailpage-star shoppingdetailpage-goldstar"
          >
            star
          </span>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <span
            key={i}
            style={{ display: "inline-flex", position: "relative" }}
          >
            <span
              className="material-symbols-outlined shoppingdetailpage-star"
              style={{
                color: "gold",
                position: "absolute",
                left: 0,
                width: "70%",
                overflow: "hidden",
              }}
            >
              star
            </span>
            <span
              className="material-symbols-outlined shoppingdetailpage-star"
              style={{
                color: "lightgray",
                width: "30%",
              }}
            >
              star
            </span>
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            className="material-symbols-outlined shoppingdetailpage-star shoppingdetailpage-graystar"
          >
            star
          </span>
        );
      }
    }
    return stars;
  };
  return (
    //{ Item: "", ItemImg: "", price:, discount:, Company: "", Category: "" }
    <div className="shoppingdetailpage-container">
      <ShoppingHeader BackNavigate="/ShoppingPage" />
      <img
        src={shopItem.ItemImg}
        alt={shopItem.Item}
        className="shoppingdetailpage-item-img"
      />
      <div className="shoppingdetailpage-info">
        <div className="shoppingdetailpage-info-line1">
          <div className="shoppingdetailpage-info-row">
            <p>{shopItem.Company}</p>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
          <div className="shoppingdetailpage-info-row">
            <p>{renderStars(starreivew[starindex].stars)}</p>
            <p className="shoppingdetailpage-info-text">
              ({starreivew[starindex].review})
            </p>
          </div>
        </div>
        <p className="shoppingdetailpage-item-text">{shopItem.Item}</p>
        <p className="shoppingdetailpage-info-price">{shopItem.price}</p>
        <div className="shoppingdetailpage-discountprice">
          <p className="shoppingdetailpage-discount-text">
            {shopItem.discount}%
          </p>
          <p>{(shopItem.price * (100 - shopItem.discount)) / 100}P</p>
        </div>
        <div className="shoppingdetailpage-delivery">무료배송</div>
        <div className="shoppingdetailpage-discount-coupon">
          <div className="shoppingdetailpage-discount-coupon-text">
            <div className="shoppingdetailpage-discount-coupon-icon">%</div>
            <p>토스쇼핑 할인 쿠폰</p>
          </div>
          <span class="material-symbols-outlined">download</span>
        </div>
        <div className="shoppingdetailpage-line"></div>
        <div className="shoppingdetailpage-delivery-info">
          <div className="shoppingdetailpage-info-row">
            <p className="shoppingdetailpage-delivery-info-graytext">배송비</p>
            <p className="shoppingdetailpage-delivery-info-text">무료</p>
          </div>
          <p className="shoppingdetailpage-delivery-info-graytext-sm">
            제주, 도서산간지역 5,000원 추가
          </p>
          <div className="shoppingdetailpage-info-row">
            <p className="shoppingdetailpage-delivery-info-graytext">
              배송일정
            </p>
            <p className="shoppingdetailpage-delivery-info-text">
              평균 2일 내 도착·99%
            </p>
          </div>
          <p className="shoppingdetailpage-delivery-info-graytext-sm">
            영업일 기준, 주말·공휴일 제외
          </p>
        </div>
      </div>
      <ShoppingDetailFooter index={index} />
    </div>
  );
}
