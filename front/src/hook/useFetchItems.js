import { useEffect } from "react";
import { getItems } from "../api/allApi";
import { setItems } from "../context/reducer/action/action";

/** 아이템 갱신 훅 */
export const useFetchItems = (dispatch) => {
  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      dispatch(setItems({ items }));
    };

    const interval = setInterval(fetchItems, 20 * 60 * 1000);
    fetchItems();

    return () => clearInterval(interval);
  }, [dispatch]);
};
