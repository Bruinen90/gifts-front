import * as actionTypes from '../actions/actionTypes';
import { put, takeEvery, all } from 'redux-saga/effects';

// Interfaces
import { DrawInterface, LoginDataInterface } from '../../interfaces/interfaces';

function* loginUser(action: { type: string; payload: LoginDataInterface }) {
	yield put({ type: actionTypes.USER_LOGIN, payload: action.payload });
}

function* watchLoginUser() {
	yield takeEvery('LOGIN_USER_WATCHER', loginUser);
}

function* createDraw(action: { type: string; payload: DrawInterface }) {
	yield console.log(action);
	yield put({ type: actionTypes.CREATE_DRAW, payload: action.payload });
}

function* watchCreateDraw() {
	yield takeEvery('CREATE_DRAW_WATCHER', createDraw);
}

function* deleteDraw(action: { type: string; payload: string }) {
	yield console.log(action);
	yield put({ type: actionTypes.DELETE_DRAW, payload: action.payload });
}

function* watchDeleteDraw() {
	yield takeEvery('DELETE_DRAW_WATCHER', deleteDraw);
}

function* logoutUser() {
	yield put({ type: actionTypes.USER_LOGOUT });
}

function* watchUserLogout() {
	yield takeEvery('USER_LOGOUT_WATCHER', logoutUser);
}

export default function* rootSaga() {
	yield all([
		watchLoginUser(),
		watchCreateDraw(),
		watchDeleteDraw(),
		watchUserLogout(),
	]);
}
