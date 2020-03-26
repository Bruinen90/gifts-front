import * as actionTypes from "./actions/actionTypes";
import { DrawInterface, StateInterface } from "../interfaces/interfaces";

interface actionInterface {
    type: string;
    [key: string]: any;
}

const initalState: StateInterface = {
    usersDraws: []
};

const reducer = (
    state = initalState,
    action: actionInterface
): StateInterface => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            const { username, email, token, userId } = action.payload;
            return {
                ...state,
                username: username,
                email: email,
                token: token,
                userId: userId,
                loginError: undefined
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
            delete loggedOutState.userId;
            return { ...loggedOutState, usersDraws: [] };
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
                        draw => draw._id !== action.payload.drawId
                    )
                ]
            };
        case actionTypes.SET_DRAWS_LIST:
            return {
                ...state,
                usersDraws: action.payload.drawsList
            };
        case actionTypes.CREATE_WISH:
            let usersWishes;
            if (state.usersWishes) {
                usersWishes = [...state.usersWishes, action.payload];
            } else {
                usersWishes = [action.payload];
            }
            return {
                ...state,
                usersWishes: usersWishes
            };
    }
    return state;
};

export default reducer;
