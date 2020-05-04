import * as actionTypes from "./actionTypes";

import { LoadingState } from "../../types/State";

export const setLoading = (payload: LoadingState) => ({
    type: actionTypes.SET_LOADING,
    payload,
});
