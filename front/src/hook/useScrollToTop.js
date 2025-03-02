import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// 스크롤 맨위로 올리기 훅
export function useScrollToTop() {
  // url이 변화할때마다 실행
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
