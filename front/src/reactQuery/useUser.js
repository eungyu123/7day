import { useSuspenseQuery } from "@tanstack/react-query";
import { getUser } from "../api/userApi";
import { getRewards } from "../api/rewardApi";

export const useFetchUser = () => {
  return useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUser,
  });
};

export const useFetchRewards = () => {
  return useSuspenseQuery({
    queryKey: ["rewards"],
    queryFn: getRewards,
  });
};
