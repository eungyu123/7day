import "./App.css";
import { useReducer } from "react";
import { initialState } from "./context/constant";
import { appReducer } from "./context/reducer/reducer";
import { appContext } from "./context/context";
import { Routes, Route } from "react-router-dom";

import MainPage from "./page/mainpage/MainPage";
import NotFound from "./page/notfound/NotFound";
import MissionPage from "./page/missionpage/MissionPage";
import ProfilePage from "./page/profilepage/ProfilePage";
import WalkingPage from "./page/walkingpage/WalkingPage";
import WalkingCoursePage from "./page/walkingcoursepage/WalkingCoursePage";
import HatcheryPage from "./page/hatchery/HatcheryPage";
import SettingPage from "./page/Setting/SettingPage";
import Inventory from "./page/inventory/Inventory";
import FriendPage from "./page/friend/FriendPage";

import { useScrollToTop } from "./hook/useScrollToTop";

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const providerState = {
    appState,
    dispatch,
  };
  useScrollToTop();

  return (
    <>
      <appContext.Provider value={providerState}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MissionPage" element={<MissionPage />} />
          <Route path="/WalkingPage" element={<WalkingPage />} />
          <Route path="/WalkingCoursePage" element={<WalkingCoursePage />} />
          <Route path="/HatcheryPage" element={<HatcheryPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/SettingPage" element={<SettingPage />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/FriendPage" element={<FriendPage />} />
          <Route path="*" element={<NotFound />} /> {/* 없는 페이지 처리 */}
        </Routes>
      </appContext.Provider>
    </>
  );
}

export default App;
