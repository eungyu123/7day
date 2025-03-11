import Header from "../../component/common/header/Header";
import "./NicknamePage.css";
import { useState } from "react";

export default function NicknamePage() {
  const [nickname, setNickname] = useState(""); // nickname 상태 추가
  const [error, setError] = useState("");

  // const handleInputChange = (e) => {
  //   setNickname(e.target.value); // 입력값 상태 업데이트
  // };
  const handleNicknameSet = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력하세요.");
      return;
    }
  };
  return (
    <>
      <Header BackNavigate="/ProfilePage" />
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
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        {error && <p className="nickname-error-message">{error}</p>}
        <div className="nicknamebtncontainer">
          <div
            className="nicknamebtn"
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
