import { actionType } from "./actionType";

export function increseCount() {
  return {
    type: actionType.increseCount,
  };
}

export function decreaseCount() {
  return {
    type: actionType.decreaseCount,
  };
}

export function setCount({ count }) {
  return {
    type: actionType.setCount,
    payload: { count },
  };
}
