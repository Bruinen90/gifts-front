import * as actionTypes from '../actions/actionTypes';

import { AuthState, Action } from '../../types/State';

export default (state: AuthState = {}, action: Action) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN:
			const {
				username,
				email,
				token,
				userId,
				unsubscribed,
			} = action.payload;
			return {
				username: username,
				email: email,
				token: token,
				_id: userId,
				loginError: undefined,
				unsubscribed: unsubscribed,
			};
		case actionTypes.USER_LOGIN_FAILED:
			return {
				loginError: action.payload.message,
			};
		case actionTypes.USER_LOGOUT:
			return {};
		case actionTypes.CHANGE_USER_EMAIL:
			return {
				...state,
				email: action.payload.newEmail,
			};
		case actionTypes.SET_UNSUBSCRIBED:
			return {
				...state,
				unsubscribed: action.payload.unsubscribed,
			};
		default:
			return state;
	}
};
