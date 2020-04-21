import { combineReducers } from "redux";

import authReducer from "./authReducer";
import drawReducer from "./drawReducer";
import wishReducer from "./wishReducer";
import friendsReducer from "./friendsReducer";

export default combineReducers({
    authReducer,
    drawReducer,
    wishReducer,
    friendsReducer,
});
