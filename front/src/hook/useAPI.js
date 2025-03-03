import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodayWalkData, getUser, getWeekWalkData } from "../api/allApi";

export const useGetUser = () => {
  return useSuspenseQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

export const useGetTodayWalk = () => {
  return useSuspenseQuery({
    queryKey: ["todayWalk"],
    queryFn: getTodayWalkData,
  });
};

export const useGetWeekWalkData = () => {
  return useSuspenseQuery({
    queryKey: ["userWeekWalk"],
    queryFn: getWeekWalkData,
    staleTime: 0, // 기본값 0
  });
};
