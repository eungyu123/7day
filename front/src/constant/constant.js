export const PAGE_URLS = {
  MainPage: "/",
  LoginPage: "/LoginPage",
  MissionPage: "/MissionPage",
  WalkingPage: "/WalkingPage",
  WalkingCoursePage: "/WalkingCoursePage",
  HatcheryPage: "/HatcheryPage",
  ProfilePage: "/ProfilePage",
  SettingPage: "/SettingPage",
  FriendPage: "/FriendPage",
  InventoryPage: "/InventoryPage",
  StepAnalysisPage: "/StepAnalysisPage",
  NicknamePage: "/NicknamePage",
  not: "not",
  LoadingPag: "/LoadingPage",
  ErrorPage: "/ErrorPage",
};
// prettier-ignore

// export const API_BASE_URL = "https://localhost:3000/api";
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const googleId = localStorage.getItem("googleId");
