import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Sagas
import { fetchUserDrawsList } from '../draws/fetchUserDrawsList';
import { fetchUserWishes } from '../wishes/fetchUserWishes';
import { fetchUserInvitations } from '../friends/fetchUserInvitations';
import { fetchUserFriends } from '../friends/fetchUserFriends';
import { fetchShoppingList } from '../wishes/fetchShoppingList';
import { fetchUserNotifications } from '../notifications/fetchUserNotifications';

export function* loginWithGoogle(action: { type: string; payload: any }) {
	const { payload } = action;
	console.log(payload);
	const graphqlQuery = {
		query: `
            {
                loginWithGoogle(googleIdToken:
                    {
                        googleIdToken: "${payload.googleIdToken!}"
                    })
                { token userId username email unsubscribed }
            }`,
	};
	yield put(
		actionCreators.setLoading({
			loading: true,
			category: 'auth',
			type: 'other',
		})
	);
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		const loginData = response.data.data.loginWithGoogle;
		console.log(loginData);
		const { token } = loginData;
		yield localStorage.setItem('token', token);
		yield put({
			type: actionTypes.USER_LOGIN,
			payload: response.data.data.loginWithGoogle,
		});
		yield (axios.defaults.headers.common[
			'Authorization'
		] = token.toString());
		yield fetchUserDrawsList();
		yield fetchUserWishes();
		yield fetchUserInvitations();
		yield fetchUserFriends();
		yield fetchShoppingList();
		yield fetchUserNotifications();
	} catch (err) {
		yield put({
			type: actionTypes.USER_LOGIN_FAILED,
			payload: { message: err.response.data.errors[0].message },
		});
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
