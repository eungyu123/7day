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

    case actionType.setlocationLoading: {
      return {
        ...state,
        locationLoading: action.payload.setlocationLoading,
      };
    }

    case actionType.setGifts: {
      return {
        ...state,
        gifts: action.payload.gifts,
      };
    }

    case actionType.removeGift: {
      return {
        ...state,
        gifts: state.gifts.filter((gift) => gift._id !== action.payload.giftId),
      };
    }

    case actionType.setUser: {
      return {
        ...state,
        user: action.payload.user,
      };
    }

    default:
      return state;
  }
}
