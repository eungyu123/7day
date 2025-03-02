import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeekWalkData } from "../api/allApi";

export const useGetWeekWalkDataByGoogleId = () => {
  return useSuspenseQuery({
    queryKey: ["userWeekWalk"],
    queryFn: getWeekWalkData,
    staleTime: 0, // 기본값 0
  });
};
