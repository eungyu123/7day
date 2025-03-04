import "./MainPage.css";

import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import MainMap from "../../component/mainPage/kakaomap/MainMap";
import Container from "../../component/common/Container";
import HalfButtonWrapper from "../../component/common/wrapper/HalfBasicButtonWrapper";
import { PAGE_URLS } from "../../constant/constant";
import { Link } from "react-router-dom";
import { setUser } from "../../context/reducer/action/action";
import { useGetUser } from "../../hook/useAPI";
import PointButton from "../../component/mainPage/PointButton";
import StoreButton from "../../component/mainPage/StoreButton";

export default function MainPage() {
  const { appState, dispatch } = useAppContext();
  const { data } = useGetUser();

  useEffect(() => {
    if (data && data.result) dispatch(setUser({ user: data.result }));
  }, [data]);

  return (
    <Container>
      <MainMap />
      {/* 캐릭터 있는곳  */}
      <Link to="/ProfilePage" className="main-character-wrapper">
        <div className=""></div>
      </Link>

      <HalfButtonWrapper>
        <PointButton title="💎포인트" des={`${appState?.user?.userPoint}원`} />
        <StoreButton title="🏪상점" />
      </HalfButtonWrapper>
      <ButtonWrapper>
        {buttonsProp.map((button, i) => (
          <BasicButton
            key={i}
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
    icon: "⚙️",
    description: "설정을 바꿀수 있어요",
    href: PAGE_URLS.SettingPage,
  },
];
