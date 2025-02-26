import { actionType } from "./action/actionType";

export function appReducer(state, action) {
  switch (action.type) {
    case actionType.decreaseCount: {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    case actionType.increseCount: {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case actionType.setCount: {
      return {
        ...state,
        count: action.payload.count,
      };
    }
    default:
      return state;
  }
}
