import { createContext, useContext } from "react";
import { initialState } from "./constant";

export const appContext = createContext({
  appState: initialState,
  dispatch: () => {},
});

export function useAppContext() {
  return useContext(appContext);
}
