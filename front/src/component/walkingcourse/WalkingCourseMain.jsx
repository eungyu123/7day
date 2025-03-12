import "./WalkingCourseMain.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import WalkingCourseKaKaoMap from "./walkingCourseKaKaoMap";
import {
  useFetchOneTrail,
  useUpdateUserTrail,
} from "../../reactQuery/useTrails";
import { useQueryClient } from "@tanstack/react-query";

export default function WalkingCourseMain() {
  const queryClient = useQueryClient();
  const { mutate: updateUserTrail } = useUpdateUserTrail();
  const location = useLocation();
  const { TrailItemId } = location.state || { TrailItemId: null };

  const { data: TrailItem } = useFetchOneTrail({ trailId: TrailItemId });

  const [imageIndex, setImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenStamp, setIsOpenStamp] = useState(false);

  const complete = TrailItem.landmarks.every((landmark) => landmark.visited);

  const clickMarker = (landmarkIndex) => {
    setImageIndex(landmarkIndex);
  };

  const openStamp = () => {
    console.log("doStamp");
    setIsOpen(true);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  return (
    <div className="wc-maincontainer">
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
        <div className="wc-info-wrapper">
          <div className="wc-info-header">{TrailItem.address}</div>
          <div className="wc-info-title">
            {TrailItem.name}{" "}
            <span className="emojifont">{complete && "✅"}</span>
          </div>
          <div className="wc-info-coord">
            {TrailItem.distance}, 경도 {TrailItem.location.lat.toFixed(4)}, 위도{" "}
            {TrailItem.location.lng.toFixed(4)}
          </div>
        </div>

        <div className="wc-info-imgs-title">
          관련 명소에서 스탬프를 찍으세요!
        </div>
        <div className="wc-info-imgs">
          {TrailItem.landmarks.map((landmark, landmarkIndex) => {
            return (
              <div
                className={`wc-info-img ${
                  imageIndex == landmarkIndex ? "selected" : ""
                }`}
                style={{
                  backgroundImage: `url(http://localhost:3000/image/${landmark.image})`,
                }}
                onClick={() => {
                  clickMarker(landmarkIndex);
                }}
              ></div>
            );
          })}
        </div>

        <div className="wc-info-bt-line"></div>
        <div
          className="wc-landmark-img"
          style={{
            backgroundImage: `url(http://localhost:3000/image/${TrailItem.landmarks[imageIndex].image})`,
          }}
        ></div>

        <div className="wc-landmark-header-wrapper">
          <div className="wc-landmark-title-wrapper">
            <h2 className="wc-landmark-title">
              {TrailItem.landmarks[imageIndex].name}
            </h2>
            {TrailItem.landmarks[imageIndex].visited && (
              <div className="wc-landmark-title-stamp"></div>
            )}

            <div
              className="wc-landmark-marker"
              onClick={(e) => {
                e.stopPropagation();
                moveToMarker();
              }}
            >
              <div className="wc-landmark-marker-index">
                {" "}
                {String.fromCharCode(65 + imageIndex)}
              </div>
            </div>
          </div>
          <div className="wc-landmark-coord">
            경도 {TrailItem.landmarks[imageIndex].location.lat}, 위도{" "}
            {TrailItem.landmarks[imageIndex].location.lng}
          </div>
        </div>
        <div className="wc-landmark-info-des">
          {TrailItem.landmarks[imageIndex].description}
        </div>

        <button
          className="wc-button"
          onClick={() => {
            openStamp();
          }}
        >
          스탬프 보기!
        </button>
      </div>

      {isOpen && (
        <div
          className="wc-stamp-modal-wrapper"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div
            className="wc-stamp-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {TrailItem.landmarks[imageIndex].visited ? (
              <div className="wc-stamp-wrapper">
                <div className="wc-stamp-title">
                  {TrailItem.landmarks[imageIndex].name}
                </div>
                <div className="wc-stamp-img"></div>
                <div className="wc-stamp-day">
                  {TrailItem.landmarks[imageIndex].visitedAt.split("T")[0]}
                </div>
                <div className="wc-stamp-button">자랑하기!</div>
              </div>
            ) : (
              <div className="wc-stamp-wrapper not-visited">
                {isOpenStamp && <div className="wc-stamp-animation"></div>}
                <div className="wc-stamp-title">
                  {TrailItem.landmarks[imageIndex].name}
                </div>
                <div className="wc-stamp-not-visit">
                  근처에 도착하면 <br />
                  스탬프를 찍어주세요!
                </div>
                <div
                  className="wc-stamp-button"
                  onClick={() => {
                    doStamp();
                  }}
                >
                  스탬프 찍기!
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
