import "./RewardButton.css";
import { useState } from "react";
import GifticonModal from "../../modal/GifticonModal";

// div 링크로 변경, href props 추가
export default function RewardButton({ imgSrc, description, rightIcon }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="common-basic-btn" onClick={() => setIsModalOpen(true)}>
        <div className="common-basic-btn-img-wrapper">
          <img
            src={imgSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>
        <div className="common-basic-btn-des">{description}</div>
        <div className="common-basic-btn-icon">
          <span className="material-symbols-outlined font-xl">{rightIcon}</span>
        </div>
      </div>
      <GifticonModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        imgSrc={imgSrc}
        description={description}
        barcodeNumber="123456789013"
      />
    </>
  );
}
