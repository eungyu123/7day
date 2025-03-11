import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import { API_BASE_URL } from "../../constant/constant";
import { getOneEgg } from "../../api/eggApi";
import { getReward } from "../../api/rewardApi";

export default function RewardModal({ isOpen, setIsOpen, newReward }) {
  const [eggData, setEggData] = useState(null); // 알 데이터를 저장할 상태
  const [couponData, setCouponData] = useState(null); // 쿠폰 데이터를 저장할 상태

  useEffect(() => {
    const fetchEggData = async () => {
      const eggRes = await getOneEgg(newReward.eggId);
      setEggData(eggRes.data);
    };

    const fetchRewardData = async () => {
      const reward = await getReward(newReward.rewardId);
      setCouponData(reward.data); // 받은 데이터를 상태에 저장
    };

    if (newReward.giftType === "알") {
      fetchEggData();
    }

    if (newReward.giftType === "쿠폰") {
      fetchRewardData();
    }
  }, [newReward]); // newReward가 변경될 때마다 다시 실행

  console.log("newReward", newReward);
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
              <span
                className="material-symbols-outlined"
                style={{
                  fontVariationSettings: "'FILL' 1",
                  color: colors[Number(eggData.eggType) - 1],
                  fontSize: "44px",
                }}
              >
                egg
              </span>
              <p> {Eggs[Number(eggData.eggType) - 1]} 획득!</p>
            </>
          )}

          {newReward && newReward.giftType === "쿠폰" && couponData && (
            <>
              <img
                src={`${API_BASE_URL}/image/${couponData.image}`}
                alt=""
                className="rm-reward-image"
              />
              <p>{couponData.content} 획득!</p>
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

const Eggs = ["황금알", "실버알", "브론즈알"];
const colors = ["#FFD700", "#C0C0C0", "#B87333"];
