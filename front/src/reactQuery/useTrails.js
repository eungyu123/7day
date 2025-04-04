import { useSuspenseQuery } from "@tanstack/react-query";
import { getTrails, getTrail, updateUserTrail } from "../api/trailAPi";
import { useMutation } from "@tanstack/react-query";

export const useFetchTrail = () => {
  return useSuspenseQuery({
    queryKey: ["trails"],
    queryFn: getTrails,
  });
};

export const useFetchOneTrail = ({ trailId }) => {
  return useSuspenseQuery({
    queryKey: ["trail", trailId],
    queryFn: async () => {
      const response = await getTrail({ trailId });
      return response;
    },
  });
};

// 데이터를 수정하는 데 사용하는 useMutation 예시
export const useUpdateUserTrail = () => {
  return useMutation({
    mutationFn: ({ trailId, landmarkId }) =>
      updateUserTrail({ trailId, landmarkId }), // 비동기 API 호출 함수
    onSuccess: (data) => {
      console.log("User trail updated successfully", data);
    },
    onError: (error) => {
      console.error("Error updating user trail", error);
    },
  });
};
