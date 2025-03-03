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

export function setItems({ items }) {
  return {
    type: actionType.setItems,
    payload: { items },
  };
}

export function setLocation({ lat, lng }) {
  return {
    type: actionType.setLocation,
    payload: { lat, lng },
  };
}

export function setlocationError({ locationError }) {
  return {
    type: actionType.setlocationError,
    payload: { locationError },
  };
}

export function setlocationLoading({ locationLoading }) {
  return {
    type: actionType.setlocationLoading,
    payload: { locationLoading },
  };
}

export function removeItem({ itemId }) {
  return {
    type: actionType.removeItem,
    payload: { itemId },
  };
}

export function setUser({ user }) {
  return {
    type: actionType.setUser,
    payload: { user },
  };
}
