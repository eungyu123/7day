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
    case actionType.setCharacter: {
      return {
        ...state,
        character: action.payload.character,
      };
    }
    case actionType.setPet: {
      return {
        ...state,
        pet: action.payload.pet,
      };
    }
    default:
      return state;
  }
}
