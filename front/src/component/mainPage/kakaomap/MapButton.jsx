import "./MainMap.css";
import { useEffect, useState } from "react";
import VisitModal from "../../modal/VisitModal";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../../constant/constant";
import { useAppContext } from "../../../context/context";
import { setLocation } from "../../../context/reducer/action/action";

export default function MapButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { appState, dispatch } = useAppContext();

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchCurrentLocation = async () => {
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
  
    const deltaLat = Math.random() * 1 / 100000; 
    const deltaLng = Math.random() * 1 / 100000; 

    const newLocation = {
      lat: latitude + deltaLat, // 위도에 약간의 변화
      lng: longitude + deltaLng, // 경도에 약간의 변화
    };
  
    dispatch(setLocation(newLocation));
  };
  
  return (
    <>
      <VisitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        goal={"3000보"}
      />

      <div className="main-map-btn-wrapper">
        <div
          className="main-map-btn emojifont"
          onClick={() => {
            fetchCurrentLocation();
          }}
        >
          🧭
        </div>

        <div
          className="main-map-btn emojifont"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          🗓️
        </div>
        <Link to={PAGE_URLS.FriendPage} className="main-map-btn emojifont">
          🤝
        </Link>
      </div>
    </>
  );
}
