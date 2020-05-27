import * as actionTypes from "../actions/actionTypes";

import { Action, ErrorsState } from "../../types/State";

export default (state: ErrorsState = {}, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_ERROR:
            return {
                ...state,
                [action.payload.category]: action.payload.message,
            };
        case actionTypes.CLEAR_ERROR:
            return {
                ...state,
                [action.payload.category]: undefined,
            };
        case actionTypes.CLEAR_ALL_ERRORS:
            return {};
        default:
            return state;
    }
};
