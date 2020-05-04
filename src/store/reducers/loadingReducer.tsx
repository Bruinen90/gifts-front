import * as actionTypes from "../actions/actionTypes";

import { Action, LoadingState } from "../../types/State";

export default (state: LoadingState = {}, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return action.payload;
        default:
            return state;
    }
};
