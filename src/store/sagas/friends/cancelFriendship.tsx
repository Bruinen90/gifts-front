import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* cancelFriendship(action: {
	type: string;
	payload: { friendId: string; friendUsername: string };
}) {
	try {
		const graphqlQuery = {
			query: `mutation{cancelFriendship(friendId: "${action.payload.friendId}") {success}}`,
		};
		const response = yield axios.post('graphql', graphqlQuery);
		if (
			response.data.data.cancelFriendship &&
			response.data.data.cancelFriendship.success
		) {
			yield put({
				type: actionTypes.CANCEL_FRIENDSHIP,
				payload: action.payload,
			});
			yield put(
				actionCreators.setSuccess({
					page: 'friends',
					id: 'cancel-friendship',
					message: `Użytkownik ${action.payload.friendUsername} został usunięty z Twojej listy znajomych`,
				})
			);
		} else {
			throw new Error();
		}
	} catch (err) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'friends',
				message:
					'Wystąpił błąd podczas usuwania użytkownika z grona znajomych, spróbuj ponownie później',
			},
		});
	}
}
