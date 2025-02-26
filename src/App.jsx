import "./App.css";
import { useReducer } from "react";
import { initialState } from "./context/constant";
import { appReducer } from "./context/reducer/reducer";
import { appContext } from "./context/context";
import { Routes, Route } from "react-router-dom";

import MainPage from "./page/mainpage/MainPage";
import NotFound from "./page/notfound/NotFound";
import HatcheryPage from "./page/hatchery/HatcheryPage";
import ProfilePage from "./page/profilepage/ProfilePage";
import SettingPage from "./page/Setting/SettingPage";

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <>
      <appContext.Provider value={providerState}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hatchery" element={<HatcheryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="*" element={<NotFound />} /> {/* 없는 페이지 처리 */}
        </Routes>
      </appContext.Provider>
    </>
  );
}

export default App;
