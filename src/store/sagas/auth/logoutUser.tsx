import { put } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';

export function* logoutUser() {
    localStorage.clear();
    yield put({ type: actionTypes.USER_LOGOUT });
}