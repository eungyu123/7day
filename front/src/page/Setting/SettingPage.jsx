import Header from "../../component/common/header/Header";
import Container from "../../component/common/Container";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import SettingButton from "../../component/common/button/SettingButton";
import SettingToggle from "../../component/setting/SettingToggle";
import BasicToggle from "../../component/common/toggle/BasicToggle";

export default function SettingPage() {
  const settings = [
    {
      title: "소리",
      href: "",
    },
    {
      title: "알림",
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
  return (
    <Container>
      <Header PageName="설정" />
      <ButtonWrapper>
        {settings.map((setting) => {
          return (
            <SettingButton title={setting.title} rightIcon="chevron_right" />
          );
        })}
        <SettingToggle title="걸음수 측정" />
      </ButtonWrapper>
    </Container>
  );
}
