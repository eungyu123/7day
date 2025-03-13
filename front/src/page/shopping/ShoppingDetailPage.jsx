import ShoppingHeader from "../../component/shopping/ShoppingHeader";
import { useSearchParams } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import "./ShoppingDetailPage.css";
export default function ShoppingDetailPage() {
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");
  console.log("index:", index);
  const { shopItems } = useShopContext();
  const shopItem = shopItems && shopItems[index];
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
      <div className="shoppingdetailpage-info">
        <div className="shoppingdetailpage-info-line1">
          <p className="shoppingdetailpage-company">{shopItem.Company}</p>
          <p>22</p>
        </div>
      </div>
    </div>
  );
}
