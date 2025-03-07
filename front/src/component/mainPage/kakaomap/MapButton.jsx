import "./MainMap.css";
import { useEffect, useState } from "react";
import VisitModal from "../../modal/VisitModal";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../../constant/constant";

export default function MapButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
