export const initialStateAuth = {
  user: null,
  isAuthenticated: false,
};

export function reducerAuth(state, action) {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    }
    case "logout": {
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    }
  }
  throw new Error("Unkown action");
}
