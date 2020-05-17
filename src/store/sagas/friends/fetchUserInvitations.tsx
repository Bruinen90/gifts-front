import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Utils
import { getLoggedUser } from '../utils/selectors';

export function* fetchUserInvitations() {
	if (axios.defaults.headers.common['Authorization']) {
		const graphqlQuery = {
			query: `
				mutation{getUserInvitations { received {_id sender {_id username email}} sent {_id receiver {_id username email}}}}
			`,
		};
		yield put(
			actionCreators.setLoading({
				loading: true,
				category: 'friends',
				type: 'fetching-records',
				recordId: 'invitations',
			})
		);
		try {
			const response = yield axios.post('graphql', graphqlQuery);
			const responseInvitations = response.data.data.getUserInvitations;
			if (!responseInvitations) {
				throw new Error();
			}
			yield put({
				type: actionTypes.SET_USER_INVITATIONS,
				payload: {
					...responseInvitations,
					loggedUser: yield select(getLoggedUser),
				},
			});
		} catch (error) {
			yield put({
				type: actionTypes.SET_ERROR,
				payload: {
					category: 'friends',
					message:
						'Wystąpił błąd podczas pobierania listy życzeń, spróbuj ponownie później',
				},
			});
		}
		yield put(actionCreators.setLoading({ loading: false }));
	}
}
