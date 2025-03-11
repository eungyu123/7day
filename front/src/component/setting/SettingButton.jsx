import { useState } from "react";
import "./SettingComp.css";
import SoundModal from "../../component/modal/SoundModal";
// div 링크로 변경, href props 추가
export default function SettingButton({ title, onClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div
        className="common-setting-btn"
        onClick={title === "소리" ? () => setIsModalOpen(true) : onclick}
      >
        <div className="common-setting-btn-img-wrapper font-lg">{title}</div>
        <div className="common-setting-btn-icon">
          <span className="material-symbols-outlined font-xl">
            chevron_right
          </span>
        </div>
      </div>
      <SoundModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
