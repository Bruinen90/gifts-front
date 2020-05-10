import { put } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* logoutUser() {
	localStorage.clear();
	yield put({ type: actionTypes.USER_LOGOUT });
	yield put(
		actionCreators.setSuccess({
			page: 'login',
			id: 'logout-user',
			message: 'Zostałeś poprawnie wylogowany',
		})
	);
}
