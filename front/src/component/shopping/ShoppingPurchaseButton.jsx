import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { PAGE_URLS } from "../../constant/constant";

export default function ShoppingBuyButton({ buttonText }) {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const navigate = useNavigate();

  // 모달이 표시되면 카운트다운 시작
  useEffect(() => {
    let timer;
    if (showModal) {
      timer = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            // 카운트다운이 끝나면 모달 닫고 페이지 이동
            clearInterval(timer);
            setShowModal(false);
            navigate(PAGE_URLS.ShoppingPage);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    }

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showModal, navigate]);

  // 버튼 클릭 시 모달 표시
  const handleButtonClick = () => {
    setShowModal(true);
    setCountdown(3); // 카운트다운 초기화
  };

  return (
    <>
      <div className="shopping-order-button" onClick={handleButtonClick}>
        <div className="shopping-order-button-main">{buttonText}</div>
      </div>

      {/* 구매 완료 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-body">
              <p>구매가 완료되었습니다</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
