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

export function setGifts({ gifts }) {
  return {
    type: actionType.setGifts,
    payload: { gifts },
  };
}

export function removeGift({ giftId }) {
  return {
    type: actionType.removeGift,
    payload: { giftId },
  };
}

export function setUser({ user }) {
  console.log("user", user);
  return {
    type: actionType.setUser,
    payload: { user },
  };
}

export function setMission({ missions }) {
  console.log("missions", missions);
  return {
    type: actionType.setMission,
    payload: { missions },
  };
}
