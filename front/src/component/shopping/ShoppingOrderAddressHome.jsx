import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";

export default function ShoppingOrderAddressHome() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="shopping-order-address-home-header">
          <span className="emojifont" style={{ marginRight: "12px" }}>
            🏠
          </span>
          집
        </div>
        <div
          className="shopping-order-address-home-main"
          style={{ marginLeft: "32px" }}
        >
          <div>
            <div
              style={{ fontSize: "11px", color: "gray", paddingBottom: "5px" }}
            >
              이름 (010-1234-5678)
            </div>
            <div style={{ fontSize: "13px", width: "80%", lineHeight: "18px" }}>
              경기도 의정부시 00로 000 (00동, 000000), 000동 000호
            </div>
          </div>
          <div className="emojifont">✔</div>
        </div>
      </div>
    </>
  );
}
