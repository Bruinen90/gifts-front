import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* autoLoginUser(action: { type: string }) {
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');
	if (username && email && userId && token) {
		axios.defaults.headers.common['Authorization'] = token.toString();
		yield put({
			type: actionTypes.USER_LOGIN,
			payload: {
				username: username,
				email: email,
				userId: userId,
				token: token,
			},
		});
	}
}
