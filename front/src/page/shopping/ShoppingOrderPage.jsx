import { useState } from "react";
import "../../index.css";

import Header from "../../component/common/header/Header";
import ShoppingOrderAddress from "../../component/shopping/ShoppingOrderAddress";
import ShoppingOrderCart from "../../component/shopping/ShoppingOrderCart";
import ShoppingOrderMessage from "../../component/shopping/ShoppingOrderMessage";
import ShoppingOrderCost from "../../component/shopping/ShoppingOrderCost";
import ShoppingOrderButton from "../../component/shopping/ShoppingOrderButton";
import "../../page/shopping/ShoppingOrder.css";

export default function ShoppingOrderPage() {
  return (
    <>
      <Header />
      <div className="shopping-order-container">
        <ShoppingOrderAddress />
        <ShoppingOrderCart />
        <ShoppingOrderCost />
        <ShoppingOrderMessage />
        <ShoppingOrderButton />
      </div>
    </>
  );
}
