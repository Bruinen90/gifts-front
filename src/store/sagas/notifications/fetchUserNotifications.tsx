import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* fetchUserNotifications() {
	if (axios.defaults.headers.common['Authorization']) {
		const graphqlQuery = {
			query: `{getUserNotifications { type content read createdAt }}`,
		};
		yield put(
			actionCreators.setLoading({
				loading: true,
				category: 'notifications',
				type: 'fetching-records',
			})
		);
		try {
			const response = yield axios.post('graphql', graphqlQuery);
			const responseNotifications =
				response.data.data.getUserNotifications;
			if (!responseNotifications) {
				throw new Error();
			}
			yield put({
				type: actionTypes.SET_USER_NOTIFICATIONS,
				// @ts-ignore
				payload: responseNotifications.map(notification => ({
					...notification,
					createdAt: new Date(parseInt(notification.createdAt)),
				})),
			});
		} catch (error) {
			yield put({
				type: actionTypes.SET_ERROR,
				payload: {
					category: 'notifications',
					message:
						'Wystąpił błąd podczas pobierania listy powiadomień, spróbuj ponownie później',
				},
			});
		}
		yield put(actionCreators.setLoading({ loading: false }));
	}
}
