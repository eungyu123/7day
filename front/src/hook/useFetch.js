import { useEffect, useState } from "react";
import { getHatchery } from "../api/eggApi";
import { userId } from "../constant/constant";
import {
  setGifts,
  setUser,
  setHatchery,
} from "../context/reducer/action/action";
import { googleSignOut } from "../api/authApi";
import { updateUserCoord, getGifts } from "../api/userApi";
import { setHatchery } from "../context/reducer/action/action";
import { getUser, generateGift } from "../api/userApi";
import { getHatchery } from "../api/eggApi";
import { updateUserCoord, generateGift, getUser } from "../api/userApi";

export const useFetch = ({ appState, dispatch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await generateGift();
      const user = await getUser();
      dispatch(setUser({ user: user.data }));
      const hatchery = await getHatchery();
      dispatch(setHatchery({ hatchery: hatchery.data }));

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
