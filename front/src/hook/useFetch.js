import { useEffect, useState } from "react";
import { userId } from "../constant/constant";
import { setGifts, setUser } from "../context/reducer/action/action";
import { googleSignOut } from "../api/authApi";
import {
  updateUserCoord,
  getGifts,
  getUser,
  generateGift,
  getUserFriend,
  updateUserFriend,
} from "../api/userApi";

export const useFetch = ({ appState, dispatch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser();
      dispatch(setUser({ user: user.data }));
      // user사용하는 문에
      // const user = await getUser();
      //dispatch(setUser({ user: user.data }));
      // 추가
      setLoading(false);
    };
    fetchData();

    // 로컬스토리지에 userId 없으면 로그아웃 시키기
    // if (!localStorage.getItem("userId")) {
    //   googleSignOut();
    // }
  }, []);

  return loading;
};
