import Header from "../../component/common/header/Header";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./LoadingPage.css";

import CharacterFace from "./characterFace.png";

export default function LoadingPage() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="loading-container">
          <div className="loading-header">
            <p>로딩중 입니다</p>
            <p>잠시만 기다려 주세요</p>
          </div>
          <div className="loading-main">
            <div className="loading-cycle"></div>
          </div>
        </div>
      </div>
    </>
  );
}
