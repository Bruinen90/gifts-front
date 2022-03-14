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
import { fetchUserNotifications } from '../notifications/fetchUserNotifications';

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
                { ... on AuthData { token userId username email unsubscribed } ... on SuccessResult { success message } }
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
		if (response.data && response.data.data.login.token) {
			const loginData = response.data.data.login;
			const { token } = loginData;
			yield localStorage.setItem('token', token);
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
			yield fetchUserNotifications();
		} else if (response.data.data.login.success === false) {
			yield put({
				type: actionTypes.USER_LOGIN_FAILED,
				payload: { message: response.data.data.login.message },
			});
		} else {
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		yield put(
			actionCreators.setError({
				category: 'auth',
				message:
					'Wystąpił błąd serwera podczas autoryzacji, prosimy spróbować ponownie poźniej',
			})
		);
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
