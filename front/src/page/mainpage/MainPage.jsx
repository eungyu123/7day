import "./MainPage.css";

import { useState, useEffect } from "react";
import { useAppContext } from "../../context/context";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import MainMap from "../../component/mainPage/kakaomap/MainMap";
import Container from "../../component/common/Container";
import HalfButtonWrapper from "../../component/common/wrapper/HalfBasicButtonWrapper";
import VisitModal from "../../component/modal/VisitModal";
import { PAGE_URLS } from "../../constant/constant";
import PointButton from "../../component/mainPage/PointButton";
import StoreButton from "../../component/mainPage/StoreButton";
import RouletteModal from "../../component/modal/RouletteModal";
import ThreeScene from "../../component/Three/ThreeScene";
import RewardModal from "../../component/modal/RewardModal";

export default function MainPage() {
  const { appState, dispatch } = useAppContext();
  const [isRouletteModalOpen, setIsRouletteModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);

  // console.log("appState.user", appState.user);
  useEffect(() => {
    setIsRouletteModalOpen(false);
    setIsRewardModalOpen(false);
  }, []);
  return (
    <Container>
      <MainMap />
      <div className="main-character-wrapper">
        <ThreeScene
          character={appState.user.character}
          pet={appState.user.pet}
        />
      </div>
      <HalfButtonWrapper>
        <PointButton icon="💎" title="포인트" des={appState.user.userPoint} />
        <StoreButton icon="🏪" title="상점" href={PAGE_URLS.StorePage} />
      </HalfButtonWrapper>
      <ButtonWrapper>
        {buttonsProp.map((button) => (
          <BasicButton
            key={button.description}
            icon={button.icon}
            description={button.description}
            href={button.href}
          />
        ))}
      </ButtonWrapper>
      <RewardModal
        isOpen={isRewardModalOpen}
        setIsOpen={setIsRewardModalOpen}
        goal={"5km 러닝 완료"}
      />
      <RouletteModal
        isOpen={isRouletteModalOpen}
        setIsOpen={setIsRouletteModalOpen}
      />
    </Container>
  );
}

const buttonsProp = [
  {
    icon: "😉",
    description: "프로필과 보상을 확인하세요!",
    href: PAGE_URLS.ProfilePage,
  },

  {
    icon: "📦",
    description: "캐릭터와 펫을 보관중이에요!",
    href: PAGE_URLS.InventoryPage,
  },
  {
    icon: "🥚",
    description: `12개의 알을 모왔어요.
                  부화장으로 가보세요`,
    href: PAGE_URLS.HatcheryPage,
  },
  {
    icon: "🎯",
    description: `미션을 달성했어요 ! 
                  지금바로 확인하세요`,
    href: PAGE_URLS.MissionPage,
  },
  {
    icon: "📦",
    description: "추천된 산책로를 따라 걸어보세요",
    href: PAGE_URLS.WalkingPage,
  },

  {
    icon: "👟",
    description: "내 걸음을 분석해보세요",
    href: PAGE_URLS.StepAnalysisPage,
  },
  {
    icon: "🧿",
    description: "목표를 달성하고 배지를 모아보세요",
    href: PAGE_URLS.BadgePage,
  },
  {
    icon: "⚙️",
    description: "설정을 바꿀수 있어요",
    href: PAGE_URLS.SettingPage,
  },
];
