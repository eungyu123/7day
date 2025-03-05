import { useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";

export const useFetchUser = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });
};
