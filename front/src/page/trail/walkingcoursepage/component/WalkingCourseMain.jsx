import "./WalkingCourseMain.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import WalkingCourseKaKaoMap from "./walkingCourseKaKaoMap";
import {
  useFetchOneTrail,
  useUpdateUserTrail,
} from "../../../../reactQuery/useTrails";
import { API_BASE_URL } from "../../../../constant/constant";
import { useQueryClient } from "@tanstack/react-query";
import StampModal from "./StampModal";
import LandmarkImages from "./LandMarkImages";
import LandmarkImage from "./LandMarkImage";
import TrailImage from "./TrailImage";
import WcAnimationModal from "./WcAnimationModal";
import WcRewardModal from "./WcRewardModal";
import { getRewardByTrail } from "../../../../api/trailAPi";
import { useAppContext } from "../../../../context/context";
import { setUser } from "../../../../context/reducer/action/action";
import { delay } from "../../../../utils/utils";

export default function WalkingCourseMain() {
  const { appState, dispatch } = useAppContext();

  const queryClient = useQueryClient();
  const { mutate: updateUserTrail } = useUpdateUserTrail();
  const location = useLocation();
  const { TrailItemId } = location.state || { TrailItemId: null };

  const { data: TrailItem } = useFetchOneTrail({ trailId: TrailItemId });
  console.log("TrailItem", TrailItem);

  const [imageIndex, setImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStamp, setIsOpenStamp] = useState(false);
  const [isOpenAnimation, setIsOpenAnimation] = useState(false);
  const [isOpenRewardModal, setIsOpenRewardModal] = useState(false);
  const [newReward, setNewReward] = useState(null);

  const complete = TrailItem.landmarks.every((landmark) => landmark.visited);

  const clickMarker = (landmarkIndex) => {
    setImageIndex(landmarkIndex);
  };

  const doStamp = async () => {
    updateUserTrail({
      trailId: TrailItem._id,
      landmarkId: TrailItem.landmarks[imageIndex].landmarkId,
    });

    setIsOpenStamp(true);
    await delay(2500);
    setIsOpenStamp(false);
    queryClient.invalidateQueries(["trail"], TrailItemId);
  };

  const getReward = async () => {
    const reward = await getRewardByTrail(TrailItem._id);
    setNewReward(reward.reward);

    dispatch(setUser({ user: reward.user }));
  };

  return (
    <div className="wc-main-container">
      {/* Map */}
      <div className="wc-map-wrapper">
        {TrailItem && (
          <WalkingCourseKaKaoMap
            TrailItem={TrailItem}
            imageIndex={imageIndex}
            setImageIndex={setImageIndex}
          />
        )}
      </div>

      {/* 소개 */}
      <div className="wc-content-wrapper">
        <TrailImage
          TrailItem={TrailItem}
          complete={complete}
          setIsOpenAnimation={setIsOpenAnimation}
        />

        <div className="wc-info-imgs-title">
          관련 명소에서 스탬프를 찍으세요!
        </div>

        <LandmarkImages
          landmarks={TrailItem.landmarks}
          imageIndex={imageIndex}
          clickMarker={clickMarker}
        />

        <div className="wc-info-bt-line"></div>

        <div
          className="wc-landmark-img"
          style={{
            backgroundImage: `url(${API_BASE_URL}/image/${TrailItem.landmarks[imageIndex].image})`,
          }}
        ></div>

        <LandmarkImage
          landmarks={TrailItem.landmarks[imageIndex]}
          imageIndex={imageIndex}
        />

        <button
          className="wc-button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          스탬프 보기!
        </button>
      </div>

      {isOpen && (
        <StampModal
          isOpen={isOpen}
          landmark={TrailItem.landmarks[imageIndex]}
          isOpenStamp={isOpenStamp}
          setIsOpen={setIsOpen}
          doStamp={doStamp}
        />
      )}

      {isOpenAnimation && (
        <WcAnimationModal
          setIsOpenAnimation={setIsOpenAnimation}
          setIsOpenRewardModal={setIsOpenRewardModal}
          getReward={getReward}
        />
      )}

      {isOpenRewardModal && newReward && (
        <>
          <WcRewardModal
            newReward={newReward}
            setIsOpenRewardModal={setIsOpenRewardModal}
          />
        </>
      )}
    </div>
  );
}
