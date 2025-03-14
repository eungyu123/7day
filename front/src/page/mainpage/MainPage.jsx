import "./MainPage.css";

import { useAppContext } from "../../context/context";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import Container from "../../component/common/Container";
import HalfButtonWrapper from "../../component/common/wrapper/HalfBasicButtonWrapper";
import { PAGE_URLS } from "../../constant/constant";
import MainMap from "./component/kakaomap/MainMap";
import PointButton from "./component/PointButton";
import StoreButton from "./component/StoreButton";

export default function MainPage() {
  const { appState, dispatch } = useAppContext();

  return (
    <Container>
      <MainMap />

      <HalfButtonWrapper>
        <PointButton
          icon="💎"
          title="포인트"
          des={appState.user.userPoint}
          href={PAGE_URLS.ShoppingPage}
        />
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
