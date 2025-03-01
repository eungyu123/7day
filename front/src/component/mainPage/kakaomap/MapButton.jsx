import "./MainMap.css";
import VisitModal from "../../modal/VisitModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PAGE_URLS } from "../../../constant/constant";

export default function MapButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="">
      <VisitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        goal={"3000보"}
      />
      <div className="main-map-btn-wrapper">
        <button
          className="main-map-btn"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          🗓️
        </button>
        <Link className="main-map-btn" to={PAGE_URLS.FriendPage}>
          🤝
        </Link>
      </div>
    </div>
  );
}
