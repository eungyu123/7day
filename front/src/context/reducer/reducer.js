import { actionType } from "./action/actionType";

export async function appReducer(state, action) {
  switch (action.type) {
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
    case actionType.checkAuth: {
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
      };
    }
    default:
      return state;
  }
}
