import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/userApi";

export const useFetchUsers = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 유지
  });
};
