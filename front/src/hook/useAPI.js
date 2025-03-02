import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/allApi";
import { getWeekWalkData } from "../api/allApi";

export const useFetchUsers = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });
};

export const useGetWeekWalkDataByGoogleId = () => {
  return useSuspenseQuery({
    queryKey: ["userWeekWalk"],
    queryFn: getWeekWalkData,
    staleTime: 0, // 기본값 0
  });
};
