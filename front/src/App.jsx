import "./App.css";
import { useReducer, Suspense } from "react";
import { ShopProvider } from "./context/ShopContext";
import { ErrorBoundary } from "react-error-boundary";
import { initialState } from "./context/constant";
import { appReducer } from "./context/reducer/reducer";
import { appContext } from "./context/context";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// prettier-ignore
import { MainPage, MissionPage, ProfilePage, WalkingPage, WalkingCoursePage,
         HatcheryPage, SettingPage, BadgePage, Inventory, LoginPage, FriendPage, StepAnalysisPage, NotFound, LoadingPage, ErrorPage,
         BadgeGoalPage, BadgeListPage,
         Store,
         ShoppingOrderPage,
         ShoppingOrderAddressPage} from "./page";
import NicknamePage from "./page/nickname/NicknamePage";
import ShoppingPage from "./page/shopping/ShoppingPage";
import ShoppingDetailPage from "./page/shopping/ShoppingDetailPage";

import { PAGE_URLS } from "./constant/constant";
import { useScrollToTop } from "./hook/useScrollToTop";
import { useFetch } from "./hook/useFetch";
import { useLocationTracker } from "./hook/useLocationTracker";
const queryClient = new QueryClient();

function App() {
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const providerState = {
    appState,
    dispatch,
  };
  useScrollToTop();
  // useAuth({ dispatch });
  // useAuthRedirect({ appState });
  useLocationTracker({ dispatch });
  const loading = useFetch({ appState, dispatch });
  if (loading) return <div className="">Loading Page useFetch</div>;

  return (
    <>
      {/* 에러  */}
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={() => <ErrorPage />}>
          <Suspense fallback={<LoadingPage />}>
            <appContext.Provider value={providerState}>
              <ShopProvider>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/LoginPage" element={<LoginPage />} />
                  <Route path="/MissionPage" element={<MissionPage />} />
                  <Route path="/WalkingPage" element={<WalkingPage />} />
                  <Route
                    path="/WalkingCoursePage"
                    element={<WalkingCoursePage />}
                  />
                  <Route path="/HatcheryPage" element={<HatcheryPage />} />
                  <Route path="/ProfilePage" element={<ProfilePage />} />
                  <Route path="/SettingPage" element={<SettingPage />} />
                  <Route path="/FriendPage" element={<FriendPage />} />
                  <Route path="/InventoryPage" element={<Inventory />} />
                  <Route path="/StorePage" element={<Store />} />
                  <Route path="/BadgePage" element={<BadgePage />} />
                  <Route path="/BadgeListPage" element={<BadgeListPage />} />
                  <Route path="/BadgeGoalPage" element={<BadgeGoalPage />} />
                  <Route
                    path="/StepAnalysisPage"
                    element={<StepAnalysisPage />}
                  />
                  <Route path="/NicknamePage" element={<NicknamePage />} />
                  <Route path="/ShoppingPage" element={<ShoppingPage />} />
                  <Route
                    path="/ShoppingDetailPage"
                    element={<ShoppingDetailPage />}
                  />
                  <Route
                    path="/ShoppingOrderPage"
                    element={<ShoppingOrderPage />}
                  />
                  <Route
                    path="/ShoppingOrderAddressPage"
                    element={<ShoppingOrderAddressPage />}
                  />
                  <Route path="*" element={<NotFound />} />{" "}
                  {/* 없는 페이지 처리 */}
                  {/* 임시 에러페이지, 로딩페이지 */}
                  <Route path="/ErrorPage" element={<ErrorPage />} />
                  <Route path="/LoadingPage" element={<LoadingPage />} />
                </Routes>
              </ShopProvider>
            </appContext.Provider>
          </Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;
