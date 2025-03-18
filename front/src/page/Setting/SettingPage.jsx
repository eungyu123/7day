import Header from "../../component/common/header/Header";
import Container from "../../component/common/Container";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import SettingButton from "../../component/setting/SettingButton";
import SettingToggle from "../../component/setting/SettingToggle";
import { googleSignOut } from "../../api/authApi";
import "./SettingPage.css";
export default function SettingPage() {
  return (
    <Container>
      <div className="setting-container">
        <Header PageName="설정" />
        <ButtonWrapper>
          {/* <SettingRange title="소리" /> */}
          {settings.map((setting) => {
            return <SettingButton title={setting.title} />;
          })}
          <SettingToggle title="알림" />
          <SettingToggle title="걸음수 측정" />
          <SettingButton
            title={"로그아웃"}
            onClick={() => googleSignOut()}
            right={false}
          />
        </ButtonWrapper>
      </div>
    </Container>
  );
}

const settings = [
  {
    title: "소리",
    href: "",
  },
  {
    title: "이용안내",
    href: "",
  },
  {
    title: "자주묻는 질문",
    href: "",
  },
];
