import * as actionTypes from "../actions/actionTypes";

import { Action, LocalErrorsIds } from "../../types/State";

export default (
    state: { errorCode: LocalErrorsIds } = { errorCode: undefined },
    action: Action
) => {
    switch (action.type) {
        case actionTypes.SET_LOCAL_ERROR:
            console.log("setting local error");
            return { errorCode: action.payload.errorId };
        case actionTypes.CLEAR_LOCAL_ERROR:
            return { errorCode: undefined };
        default:
            return state;
    }
};
