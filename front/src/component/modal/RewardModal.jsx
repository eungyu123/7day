import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "../../page/modal/Modal.css";
import { API_BASE_URL } from "../../constant/constant";
import { getOneEgg } from "../../api/eggApi";
import { getReward } from "../../api/rewardApi";
// import { Link } from "react-router-dom";
// import { PAGE_URLS } from "../../constant/constant";

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

    if (newReward && newReward.giftType === "알") {
      fetchEggData();
    }

    if (newReward && newReward.giftType === "쿠폰") {
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
          {/* <span className="modal-icon">🎁</span>
          <p className="modal-message">축하합니다!</p>
          <p className="modal-message">
            <strong>{goal}</strong> 미션 달성!
          </p>
          <Dialog.Close asChild>
            <Link to={PAGE_URLS.MissionPage} className="reward-button">
              보상받으러 가기
            </Link>
          </Dialog.Close> */}
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const Eggs = ["황금알", "실버알", "브론즈알"];
const colors = ["#FFD700", "#C0C0C0", "#B87333"];
