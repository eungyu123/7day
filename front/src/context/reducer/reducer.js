import { actionType } from "./action/actionType";

export function appReducer(state, action) {
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
    case actionType.setItems: {
      return {
        ...state,
        items: action.payload.items,
      };
    }
    case actionType.setLocation: {
      return {
        ...state,
        location: { lat: action.payload.lat, lng: action.payload.lng },
      };
    }
    case actionType.setlocationError: {
      return {
        ...state,
        locationError: action.payload.locationError,
      };
    }
    default:
      return state;
  }
}
