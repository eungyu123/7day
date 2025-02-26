import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import "./HatcheryPage.css";
import Container from "../../component/common/Container";
import Header from "../../component/common/header/header";

export default function HatcheryPage() {
  const buttonsProp = [
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
  ];

  return (
    <Container>
      <Header PageName="부화장" />
      <div className="hatchery-container">
        <div className="hatchery-container-egg-count">🥚12개</div>
      </div>
      <ButtonWrapper>
        {buttonsProp.map((v) => {
          return (
            <BasicButton
              icon={v.icon}
              description={v.description}
              rightIcon={v.rightIcon}
            />
          );
        })}
      </ButtonWrapper>
    </Container>
  );
}
