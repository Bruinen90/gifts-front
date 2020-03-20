import * as actionTypes from "./actions/actionTypes";
import { DrawInterface, StateInterface } from "../interfaces/interfaces";

interface actionInterface {
  type: string;
  [key: string]: any;
}

const initalState: StateInterface = {
  usersDraws: []
};

const reducer = (state = initalState, action: actionInterface) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN:
      const { username, email, token, userId } = action.payload;
      return {
        ...state,
        username: username,
        email: email,
        token: token,
        userId: userId
      };
    case actionTypes.USER_LOGIN_FAILED:
      console.log("LOGIN FAILED");
      return {
        ...state,
        loginError: action.payload.message
      };
    case actionTypes.USER_LOGOUT:
      console.log("LOGGING OUT...");
      const loggedOutState = { ...state };
      delete loggedOutState.username;
      delete loggedOutState.email;
      delete loggedOutState.token;
      delete loggedOutState.userId
      return loggedOutState;
    case actionTypes.CREATE_DRAW:
      console.log("CREATING A DRAW", action.payload);
      const newDraw: DrawInterface = action.payload;
      return {
        ...state,
        usersDraws: state.usersDraws
          ? [...state.usersDraws, newDraw]
          : [newDraw]
      };
    case actionTypes.DELETE_DRAW:
      console.log("DELETING DRAW", action.payload);
      return {
        ...state,
        usersDraws: [
          ...state.usersDraws.filter(
            // Replace with _id when backend addded!!!
            draw => draw.title !== action.payload
          )
        ]
      };
    case actionTypes.SET_DRAWS_LIST:
      console.log('SETTING DRAWS LIST', action.payload);
      return {
        ...state
      }
  }
  return state;
};

export default reducer;
