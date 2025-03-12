import ShoppingHeader from "../../component/shopping/ShoppingHeader";
import { useLocation } from "react-router-dom";
import "./ShoppingDetailPage.css";
export default function ShoppingDetailPage() {
  const location = useLocation();
  const { shopItem } = location.state || { shopItem: {} };

  // 만약 shopItem이 없다면 빈 객체를 사용하여 오류를 방지
  if (!shopItem.Item) {
    return <div>상품 정보가 없습니다.</div>;
  }
  const clothesoption = [
    {
      color: ["white", "beige", "brown", "black"],
      size: ["XS", "S", "M", "L", "XL"],
    },
  ];
  return (
    //{ Item: "", ItemImg: "", price:, discount:, Company: "", Category: "" }
    <div className="shoppingdetailpage-container">
      <ShoppingHeader BackNavigate="/ShoppingPage" />
      <img
        src={shopItem.ItemImg}
        alt={shopItem.Item}
        className="shoppingdetailpage-item-img"
      />
    </div>
  );
}
