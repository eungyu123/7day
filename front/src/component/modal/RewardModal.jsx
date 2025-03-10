import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import { API_BASE_URL } from "../../constant/constant";
import { getOneEgg } from "../../api/eggApi";
export default function RewardModal({ isOpen, setIsOpen, newReward }) {
  const [eggData, setEggData] = useState(null); // 알 데이터를 저장할 상태
  const [couponData, setCouponData] = useState(null); // 쿠폰 데이터를 저장할 상태

  useEffect(() => {
    const fetchEggData = async () => {
      try {
        const egg = await fetch(`${API_BASE_URL}/egg/oneEgg`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eggId: newReward.eggId }),
          // credentials: "include",
        });

        const eggResponse = await egg.json();
        console.log("eggResponse", eggResponse);
        setEggData(eggResponse.data); // 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("알 데이터 가져오기 실패:", error);
      }
    };

    const fetchData = async () => {
      try {
        const data = await fetch(`${API_BASE_URL}/reward`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rewardId: newReward.rewardId }),
          // credentials: "include",
        });

        const dataResponse = await data.json();
        console.log("dataResponse", dataResponse);

        setCouponData(dataResponse.data); // 받은 데이터를 상태에 저장
      } catch (error) {
        console.error("쿠폰 데이터 가져오기 실패:", error);
      }
    };

    if (newReward.giftType === "알") {
      fetchEggData();
    }

    if (newReward.giftType === "쿠폰") {
      fetchData();
    }
  }, [newReward]); // newReward가 변경될 때마다 다시 실행

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body">
          {newReward && newReward.giftType === "포인트" && (
            <>
              <span className="modal-icon">🎁</span>
              <p> {newReward.point} 포인트 획득!</p>
            </>
          )}

          {newReward && newReward.giftType === "알" && eggData && (
            <>
              <span className="modal-icon">🐣</span>
              <p> {eggData.eggType}획득!</p>
            </>
          )}

          {newReward && newReward.giftType === "쿠폰" && couponData && (
            <>
              <span className="modal-icon">🐣</span>
              <p>
                {" "}
                {couponData.image} {couponData.content} 획득!
              </p>
            </>
          )}
          <Dialog.Close asChild>
            <button className="reward-button">보상받기</button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
