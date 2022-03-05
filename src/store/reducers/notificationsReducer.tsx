import * as actionTypes from '../actions/actionTypes';

import { Action, NotificationsState } from '../../types/State';

export default (
	state: NotificationsState = { notifications: [] },
	action: Action
) => {
	switch (action.type) {
		case actionTypes.SET_USER_NOTIFICATIONS:
			return {
				...state,
				notifications: [...state.notifications, ...action.payload],
			};
		case actionTypes.SET_ALL_NOTIFICATIONS_AS_READ:
			return {
				...state,
				notifications: state.notifications.map(notification => ({
					...notification,
					read: true,
				})),
			};
		default:
			return state;
	}
};
