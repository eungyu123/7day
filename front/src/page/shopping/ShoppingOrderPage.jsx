import { useState } from "react";
import "../../index.css";

import Header from "../../component/common/header/Header";
import ShoppingOrderAddress from "../../component/shopping/ShoppingOrderAddress";
import ShoppingOrderCart from "../../component/shopping/ShoppingOrderCart";
import ShoppingOrderMessage from "../../component/shopping/ShoppingOrderMessage";
import ShoppingOrderCost from "../../component/shopping/ShoppingOrderCost";
import ShoppingPurchaseButton from "../../component/shopping/ShoppingPurchaseButton";
import "../../page/shopping/ShoppingOrder.css";

// import { useState } from "react";
import { useShopContext } from "../../context/ShopContext";
import { useSearchParams, useLocation } from "react-router-dom";

export default function ShoppingOrderPage() {
  // URL 쿼리 파라미터에서 index 가져오기
  const [searchParams] = useSearchParams();
  const index = searchParams.get("index");

  // 필요한 경우 추가 파라미터도 가져올 수 있음
  const quantity = searchParams.get("quantity");
  const color = searchParams.get("color");
  const size = searchParams.get("size");

  const { shopItems } = useShopContext();
  const shopItem = shopItems && shopItems[index];
  console.log("index is ", index);
  console.log("shopItem is ", shopItem);
  console.log(shopItem.discount / 100);

  return (
    <>
      <Header BackNavigate={`/ShoppingDetailPage?index=${index}`} />
      <div className="shopping-order-container">
        <ShoppingOrderAddress index={index} />
        <ShoppingOrderCart
          itemImg={shopItem.ItemImg}
          itemName={shopItem.Item}
          company={shopItem.Company}
          price={shopItem.price * ((100 - shopItem.discount) / 100)}
        />
        <ShoppingOrderCost
          price={shopItem.price * ((100 - shopItem.discount) / 100)}
        />
        <ShoppingOrderMessage />
        <ShoppingPurchaseButton buttonText={"토스포인트로 결제하기"} />
      </div>
    </>
  );
}
