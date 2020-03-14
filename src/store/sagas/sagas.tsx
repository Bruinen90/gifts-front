import * as actionTypes from '../actions/actionTypes';
import { put, takeEvery, all } from 'redux-saga/effects';

// Interfaces
import { DrawInterface } from '../../interfaces/interfaces';

function* helloSaga() {
	yield console.log('Saga init OK...');
}

function* loginUser() {
	yield put({ type: actionTypes.USER_LOGIN });
}

function* watchLoginUser() {
	yield takeEvery('LOGIN_USER_ASYNC', loginUser);
}

function* createDraw(action: { type: string; payload: DrawInterface }) {
	yield console.log(action);
	yield put({ type: actionTypes.CREATE_DRAW, payload: action.payload });
}

function* watchCreateDraw() {
	yield takeEvery('CREATE_DRAW_WATCHER', createDraw);
}

export default function* rootSaga() {
	yield all([helloSaga(), watchLoginUser(), watchCreateDraw()]);
}
