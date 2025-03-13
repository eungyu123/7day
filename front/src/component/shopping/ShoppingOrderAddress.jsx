import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import UpModal from "../modal/UpModal";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=arrow_drop_down"
/>;

export default function ShoppingOrderAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryMessage, setDeliveryMessage] = useState("배송 시 요청사항");
  const navigate = useNavigate();
  return (
    <>
      <div className="shopping-order-address shopping-order-box">
        <div className="shopping-order-header">배송지 입력</div>
        <div className="shopping-order-address-info-box">
          <div>
            <div className="shopping-order-address-info">이름</div>
            <div className="shopping-order-address-info">01012345678</div>
            <div className="shopping-order-address-info">주소주소</div>
          </div>
          <div>
            <div
              className="shopping-order-address-info-edit"
              onClick={() => navigate("/ShoppingOrderAddressPage")}
            >
              수정
            </div>
          </div>
        </div>
        <div
          className="shopping-order-address-message"
          onClick={() => setIsModalOpen(true)}
        >
          <p>{deliveryMessage}</p>
          <span class="material-symbols-outlined">arrow_drop_down</span>
        </div>
      </div>
      <UpModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setDeliveryMessage={setDeliveryMessage}
      />
    </>
  );
}
