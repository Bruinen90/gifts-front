import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionsTypes from '../../actions/actionTypes';

export function* setNotificationAsRead(action: {
	type: string;
	payload: { notificationId: string };
}) {
	const { notificationId } = action.payload;
	console.log('SETTING NOTIFICACIN AS READ', action.payload);
	try {
		const graphQLquery = {
			query: `mutation {setNotificationAsRead(notificationId: "${notificationId}") {success}}`,
		};
		const response = yield axios.post('graphql', graphQLquery);
		if (response.data.data.setNotificationAsRead.success) {
			yield put({
				type: actionsTypes.SET_NOTIFICATION_AS_READ,
				payload: { notificationId },
			});
		}
	} catch (err) {
		console.log(err);
	}
}
