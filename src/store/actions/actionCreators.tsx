import * as actionTypes from "./actionTypes";

import {
    LoadingState,
    ErrorsState,
    LocalErrorsIds,
    SuccessState,
} from "../../types/State";

export const setLoading = (payload: LoadingState) => ({
    type: actionTypes.SET_LOADING,
    payload,
});

export const setError = (payload: {
    category: keyof ErrorsState;
    message: string;
}) => ({
    type: actionTypes.SET_ERROR,
    payload: {
        category: payload.category,
        message: payload.message,
    },
});

export const setLocalError = (errorId: LocalErrorsIds) => ({
    type: actionTypes.SET_LOCAL_ERROR,
    payload: { errorId },
});

export const clearLocalError = () => ({
    type: actionTypes.CLEAR_LOCAL_ERROR,
});

export const setSuccess = (payload: SuccessState) => ({
    type: actionTypes.SET_SUCCESS,
    payload: payload,
});
