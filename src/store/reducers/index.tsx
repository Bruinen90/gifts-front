import { combineReducers } from 'redux';

import * as actionTypes from '../actions/actionTypes';

import auth from './authReducer';
import draw from './drawReducer';
import wish from './wishReducer';
import friends from './friendsReducer';
import notifications from './notificationsReducer';
import errors from './errorsReducer';
import loading from './loadingReducer';
import localError from './localErrorsReducer';
import success from './successReducer';
import { State } from '../../types/State';

const rootReducer = combineReducers({
	auth,
	draw,
	wish,
	friends,
	errors,
	loading,
	localError,
	success,
	notifications,
});

const defaultState = {
	auth: {},
	draw: { usersDraws: [] },
	errors: {},
	friends: {},
	loading: {},
	localError: { errorCode: undefined },
	notifications: { notifications: [] },
	success: {},
	wish: {},
};

export default (
	state: State = defaultState,
	action: { type: string; payload?: any }
) => {
	if (action.type === actionTypes.USER_LOGOUT) {
		return rootReducer(undefined, action);
	}
	return rootReducer(state, action);
};
