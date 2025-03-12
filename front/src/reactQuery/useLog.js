import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { getLog, insertLog } from "../api/logApi";


export const useFetchLog = () => {
  return useSuspenseQuery({
    queryKey: ["log"],
    queryFn: getLog,
  });
};