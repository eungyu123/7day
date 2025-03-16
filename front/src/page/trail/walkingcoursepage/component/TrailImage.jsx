import { useState } from "react";

export default function TrailImage({
  TrailItem,
  complete,
  setIsOpenAnimation,
}) {
  const [temp, setTemp] = useState(false);

  const handleGiftClick = () => {
    setTemp(true);
    setIsOpenAnimation(true);
  };

  return (
    <div className="wc-info-wrapper">
      <div className="wc-info-header">{TrailItem.address}</div>
      <div className="wc-info-title">
        {TrailItem.name}
        {complete &&
          (TrailItem.getReward || temp ? (
            <span className="emojifont wc-emoji-right">✅</span>
          ) : (
            <span
              className="emojifont wc-emoji-right wc-gift"
              onClick={handleGiftClick}
            >
              🎁
            </span>
          ))}
      </div>
      <div className="wc-info-coord">
        {TrailItem.distance}, 경도 {TrailItem.location.lat.toFixed(4)}, 위도{" "}
        {TrailItem.location.lng.toFixed(4)}
      </div>
    </div>
  );
}
