import { useEffect, useState } from "react";
import { getHatchery } from "../api/eggApi";
import { userId } from "../constant/constant";
import {
  setGifts,
  setUser,
  setHatchery,
  setTodayWalk,
} from "../context/reducer/action/action";
import { googleSignOut } from "../api/authApi";
import { updateUserCoord, getGifts } from "../api/userApi";
import { getUser, generateGift } from "../api/userApi";
import { getWalkData } from "../api/walkApi";

export const useFetch = ({ appState, dispatch }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await generateGift();
      const user = await getUser();
      console.log("user", user);
      dispatch(setUser({ user: user.data }));
      const hatchery = await getHatchery();
      dispatch(setHatchery({ hatchery: hatchery.data }));

      const today = new Date().toISOString().split("T")[0];
      const response = await getWalkData(today, today);
      if (response.type === "success" && response.stepRecords.length > 0) {
        dispatch(setTodayWalk({ steps: response.stepRecords[0].steps }));
      }

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
