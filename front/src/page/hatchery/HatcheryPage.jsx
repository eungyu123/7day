import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import "./HatcheryPage.css";
import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";

export default function HatcheryPage() {
  const w = "30%";

  return (
    <Container>
      <Header PageName="부화장" />
      <div className="hatchery-container">
        <div className="hatchery-progress-bar-wrapper">
          <div
            className="hatchery-progress-bar"
            style={{ width: `${w}` }}
          ></div>
        </div>
        <div className="hatchery-container-egg-count">🥚12개</div>
      </div>
      <ButtonWrapper>
        {buttonsProp.map((button) => {
          return (
            <BasicButton icon={button.icon} description={button.description} />
          );
        })}
      </ButtonWrapper>
    </Container>
  );
}

const buttonsProp = [
  {
    icon: "🥚",
    description: `아기 공룡을 획득했어요`,
  },
  {
    icon: "🥚",
    description: `아기 공룡을 획득했어요`,
  },
  {
    icon: "🥚",
    description: `아기 공룡을 획득했어요`,
  },
  {
    icon: "🥚",
    description: `아기 공룡을 획득했어요`,
  },
];
