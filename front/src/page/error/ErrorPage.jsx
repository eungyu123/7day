import Header from "../../component/common/header/Header";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./ErrorPage.css";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container">
        <div className="errorContainer">
          <div className="error-icon">⚠</div>
          <div className="error-header">
            <p>문제가 발생했습니다</p>
          </div>
          <div className="error-main">
            <div className="error-main-bar"></div>
            <div className="error-main-message">
              <p>요청하신 페이지를 처리 중에 오류가 발생했습니다.</p>
              <p>서비스 이용에 불편을 드려 죄송합니다.</p>
            </div>
          </div>
        </div>
        <button className="error-return-button" onClick={() => navigate("/")}>
          확인
        </button>
      </div>
    </>
  );
}
