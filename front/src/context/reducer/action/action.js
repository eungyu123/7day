import { actionType } from "./actionType";

export function setCharacter({ character }) {
  return {
    type: actionType.setCharacter,
    payload: { character },
  };
}

export function setPet({ pet }) {
  return {
    type: actionType.setPet,
    payload: { pet },
  };
}

export function checkAuth({ isAuthenticated }) {
  return {
    type: actionType.checkAuth,
    payload: { isAuthenticated },
  };
}
