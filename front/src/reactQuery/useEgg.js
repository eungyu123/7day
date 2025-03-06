import { useSuspenseQuery } from "@tanstack/react-query";
import { getEgg, getHatchery, updateEggStep } from "../api/eggApi";

export const useFetchEgg = () => {
  return useSuspenseQuery({
    queryKey: ["eggs"],
    queryFn: getEgg,
  });
};
