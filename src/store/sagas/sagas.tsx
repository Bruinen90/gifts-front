import * as actionTypes from '../actions/actionTypes';
import { put, takeEvery, all } from 'redux-saga/effects';

function* helloSaga() {
	console.log('Hi from Saga!');
}

function* loginUser() {
	yield put({ type: actionTypes.USER_LOGIN });
}

function* watchLoginUser() {
	yield takeEvery('LOGIN_USER_ASYNC', loginUser);
}

export default function* rootSaga() {
	yield all([helloSaga(), watchLoginUser()]);
}
