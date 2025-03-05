import { useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";

export const useFetchUser = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
};
