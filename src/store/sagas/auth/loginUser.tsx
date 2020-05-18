import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Types
import { LoginDataInterface } from '../../../types/User';

// Sagas
import { fetchUserDrawsList } from '../draws/fetchUserDrawsList';
import { fetchUserWishes } from '../wishes/fetchUserWishes';
import { fetchUserInvitations } from '../friends/fetchUserInvitations';
import { fetchUserFriends } from '../friends/fetchUserFriends';
import { fetchShoppingList } from '../wishes/fetchShoppingList';

export function* loginUser(action: {
	type: string;
	payload: LoginDataInterface;
}) {
	const { payload } = action;
	const graphqlQuery = {
		query: `
            {
                login(userInput:
                    {
                        usernameOrEmail: "${payload.username}", 
                        password: "${payload.password}"
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
		const loginData = response.data.data.login;
		const { token, username, email, userId, unsubscribed } = loginData;
		yield localStorage.setItem('token', token);
		// yield localStorage.setItem('username', username);
		// yield localStorage.setItem('email', email);
		// yield localStorage.setItem('userId', userId);
		// yield localStorage.setItem('unsubscribed', unsubscribed);
		yield put({
			type: actionTypes.USER_LOGIN,
			payload: response.data.data.login,
		});
		yield (axios.defaults.headers.common[
			'Authorization'
		] = token.toString());
		yield fetchUserDrawsList();
		yield fetchUserWishes();
		yield fetchUserInvitations();
		yield fetchUserFriends();
		yield fetchShoppingList();
	} catch (err) {
		yield put({
			type: actionTypes.USER_LOGIN_FAILED,
			payload: { message: err.response.data.errors[0].message },
		});
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
