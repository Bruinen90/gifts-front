import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionsTypes from '../../actions/actionTypes';
import * as actionsCreators from '../../actions/actionCreators';

export function* setAllNotificationsAsRead() {
	if (axios.defaults.headers.common['Authorization']) {
		const graphqlQuery = {
			query: `mutation {setAllUsetNotificationsAsRead {success}}`,
		};
		// yield put(
		// 	actionsCreators.setLoading({
		// 		category: 'notifications',
		// 		type: 'edited-record',
		// 	})
		// );
		try {
			const response = yield axios.post('graphql', graphqlQuery);
			if (!response.data.data) {
				throw new Error();
			}
			if (response.data.data.setAllUsetNotificationsAsRead.success) {
				yield put({ type: actionsTypes.SET_ALL_NOTIFICATIONS_AS_READ });
			}
		} catch (err) {
			console.log(err);
		}
	}
}
