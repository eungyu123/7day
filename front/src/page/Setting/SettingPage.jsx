import Header from "../../component/common/header/Header";
import Container from "../../component/common/Container";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import SettingButton from "../../component/setting/SettingButton";
import SettingToggle from "../../component/setting/SettingToggle";
import SettingRange from "../../component/setting/SettingRange";
import "./SettingPage.css";
export default function SettingPage() {
  return (
    <Container>
      <div className="setting-container">
        <Header PageName="설정" />
        <ButtonWrapper>
          {/* <SettingRange title="소리" /> */}
          {settings.map((setting) => {
            return (
              <SettingButton title={setting.title} rightIcon="chevron_right" />
            );
          })}
          <SettingToggle title="알림" />
          <SettingToggle title="걸음수 측정" />
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
