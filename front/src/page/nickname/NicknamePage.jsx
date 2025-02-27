import Header from "../../component/common/header/Header";
import "./NicknamePage.css";
import { useState } from "react";

export default function NicknamePage() {
  const [nickname, setNickname] = useState(""); // nickname 상태 추가

  const handleInputChange = (e) => {
    setNickname(e.target.value); // 입력값 상태 업데이트
  };
  const handleNicknameSet = () => {
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
    } else {
      alert("닉네임이 설정되었습니다!");
    }
  };
  return (
    <>
      <Header />
      <div className="nicknamepagecontainer">
        <div className="nicknamepagesettingcontainer">
          <p className="nicknamepagetextlg">닉네임을 설정해주세요.</p>
        </div>
        <div className="nicknamepageinputcontainer">
          <p className="nicknamepagetextsm">이름</p>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력하세요"
            className="nicknamepageinput"
            onChange={handleInputChange}
          />
        </div>
        <div className="nicknamebtncontainer">
          <div
            className={`nicknamebtn ${nickname ? "active" : ""}`}
            disabled={!nickname}
            onClick={handleNicknameSet}
          >
            확인
          </div>
        </div>
      </div>
    </>
  );
}
