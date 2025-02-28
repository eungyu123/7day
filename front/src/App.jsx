import "./App.css";
import { useReducer, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { initialState } from "./context/constant";
import { appReducer } from "./context/reducer/reducer";
import { appContext } from "./context/context";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// prettier-ignore
import { MainPage, MissionPage, ProfilePage, WalkingPage, WalkingCoursePage,
         HatcheryPage, SettingPage, Inventory, LoginPage, FriendPage, StepAnalysisPage, NotFound, LoadingPage, ErrorPage} from "./page";
import NicknamePage from "./page/nickname/NicknamePage";

import { PAGE_URLS } from "./constant/constant";
import { useScrollToTop } from "./hook/useScrollToTop";

const queryClient = new QueryClient();

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const providerState = {
    appState,
    dispatch,
  };
  useScrollToTop();

  return (
    <>
      {/* 에러  */}
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={() => <ErrorPage />}>
          {/* 로딩 */}
          <Suspense fallback={<LoadingPage />}>
            <appContext.Provider value={providerState}>
              <Routes>
                <Route path={PAGE_URLS.MainPage} element={<MainPage />} />
                <Route path={PAGE_URLS.LoginPage} element={<LoginPage />} />
                <Route path={PAGE_URLS.MissionPage} element={<MissionPage />} />
                <Route path={PAGE_URLS.WalkingPage} element={<WalkingPage />} />
                <Route
                  path={PAGE_URLS.WalkingCoursePage}
                  element={<WalkingCoursePage />}
                />
                <Route
                  path={PAGE_URLS.HatcheryPage}
                  element={<HatcheryPage />}
                />
                <Route path={PAGE_URLS.ProfilePage} element={<ProfilePage />} />
                <Route path={PAGE_URLS.SettingPage} element={<SettingPage />} />
                <Route path={PAGE_URLS.FriendPage} element={<FriendPage />} />
                <Route path={PAGE_URLS.InventoryPage} element={<Inventory />} />
                <Route
                  path={PAGE_URLS.StepAnalysisPage}
                  element={<StepAnalysisPage />}
                />
                <Route
                  path={PAGE_URLS.NicknamePage}
                  element={<NicknamePage />}
                />
                <Route path="*" element={<NotFound />} />{" "}
                {/* 없는 페이지 처리 */}
                {/* 임시 에러페이지, 로딩페이지 */}
                <Route path={PAGE_URLS.ErrorPage} element={<ErrorPage />} />
                <Route path={PAGE_URLS.LoadingPage} element={<LoadingPage />} />
              </Routes>
            </appContext.Provider>
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
