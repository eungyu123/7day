import "./MainPage.css";
import { useAppContext } from "../../context/context";
import KaKaoMapComponent from "../../component/mainpage/kakaomap/KaKaoMapComponent";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import HalfBasicButton from "../../component/common/button/HalfBasicButton";
import BasicButton from "../../component/common/button/BasicButton";
import MainMap from "../../component/mainpage/MainMap";
import Container from "../../component/common/Container";
import HalfButtonWrapper from "../../component/common/wrapper/HalfBasicButtonWrapper";

export default function MainPage() {
  const { appState, dispatch } = useAppContext();

  const buttonsProp = [
    {
      icon: "📦",
      description: "캐릭터와 펫을 보관중이에요!",
      rightIcon: "chevron_right",
    },
    {
      icon: "🥚",
      description: `12개의 알을 모왔어요.
                    부화장으로 가보세요`,
      rightIcon: "chevron_right",
    },
    {
      icon: "🎯",
      description: `미션을 달성했어요 ! 
                    지금바로 확인하세요`,
      rightIcon: "chevron_right",
    },
    {
      icon: "📦",
      description: "추천된 산책로를 따라 걸어보세요",
      rightIcon: "chevron_right",
    },

    {
      icon: "👟",
      description: "내 걸음을 분석해보세요",
      rightIcon: "chevron_right",
    },
    {
      icon: "⚙️",
      description: "설정을 바꿀수 있어요",
      rightIcon: "chevron_right",
    },
  ];

  return (
    <Container>
      <MainMap />
      {/* 캐릭터 있는곳  */}
      <div className="main-character-wrapper">
        <div className=""></div>
      </div>

      <HalfButtonWrapper>
        <HalfBasicButton
          title="💎포인트"
          des="1000원"
          rightIcon="chevron_right"
        />
        <HalfBasicButton title="🏪상점" des=" " rightIcon="chevron_right" />
      </HalfButtonWrapper>
      <ButtonWrapper>
        {buttonsProp.map((button) => (
          <BasicButton
            icon={button.icon}
            description={button.description}
            rightIcon={button.rightIcon}
          />
        ))}
      </ButtonWrapper>
    </Container>
  );
}
