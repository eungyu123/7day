import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import "./HatcheryPage.css";
import Container from "../../component/common/Container";

export default function HatcheryPage() {
  const buttonsProp = [
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
  ];

  return (
    <Container>
      <div className="hatchery-container">.</div>
      <div className=""></div>
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
