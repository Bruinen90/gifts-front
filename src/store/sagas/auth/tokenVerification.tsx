import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Sagas
import { logoutUser } from './logoutUser';
import { fetchUserDrawsList } from '../draws/fetchUserDrawsList';
import { fetchUserWishes } from '../wishes/fetchUserWishes';
import { fetchUserInvitations } from '../friends/fetchUserInvitations';
import { fetchUserFriends } from '../friends/fetchUserFriends';
import { fetchShoppingList } from '../wishes/fetchShoppingList';
import { fetchUserNotifications } from '../notifications/fetchUserNotifications';

export function* tokenVerification() {
	const token = localStorage.getItem('token');
	if (token) {
		yield (axios.defaults.headers.common[
			'Authorization'
		] = token.toString());
		const graphQLquery = {
			query: `{
                verifyToken(token: "${token}") { _id username email unsubscribed }
            }`,
		};
		yield put(
			actionCreators.setLoading({
				loading: true,
				category: 'auth',
				type: 'fetching-records',
			})
		);
		try {
			const response = yield axios.post('/graphql', graphQLquery);
			const responseData = response.data.data.verifyToken;
			if (responseData._id) {
				const { _id, username, email, unsubscribed } = responseData;
				yield put({
					type: actionTypes.USER_LOGIN,
					payload: {
						userId: _id,
						username,
						email,
						token,
						unsubscribed,
					},
				});
				yield fetchUserDrawsList();
				yield fetchUserWishes();
				yield fetchUserInvitations();
				yield fetchUserFriends();
				yield fetchShoppingList();
				yield fetchUserNotifications();
			} else {
				logoutUser();
			}
		} catch (error) {
			yield put(
				actionCreators.setError({
					category: 'auth',
					message: 'Wystąpił problem podczas autoryzacji.',
				})
			);
		}
		yield put(actionCreators.setLoading({ loading: false }));
	}
}
