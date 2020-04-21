import * as actionTypes from "../actions/actionTypes";

import { AuthState } from "../../types/State";

export default (state: AuthState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      const { username, email, token, userId } = action.payload;
      return {
        username: username,
        email: email,
        token: token,
        userId: userId,
        loginError: undefined,
      };
    case actionTypes.USER_LOGIN_FAILED:
      return {
        loginError: action.payload.message,
      };
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
