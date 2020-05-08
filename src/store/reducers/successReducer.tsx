import * as actionTypes from "../actions/actionTypes";

import { Action, SuccessState } from "../../types/State";

export default (state: SuccessState = {}, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};
