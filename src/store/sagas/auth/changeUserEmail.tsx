import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* changeUserEmail(action: {
	type: string;
	payload: {
		email: string;
		unsubscribed: boolean;
		password?: string;
		oldEmail: string;
	};
}) {
	const { email, unsubscribed, password, oldEmail } = action.payload;
	const emailChanged = email !== oldEmail;
	const changeEmailPayload = emailChanged
		? `{
            newEmail: "${email}",
            unsubscribed: ${unsubscribed},
            password: "${password}",
        }`
		: `{
            unsubscribed: ${unsubscribed},

        }`;
	const graphQLquery = {
		query: `
                mutation{changeEmail(changeEmailInput: ${changeEmailPayload}) {success message}}
            `,
	};
	yield put(
		actionCreators.setLoading({
			type: 'edited-record',
			loading: true,
			recordId: 'change-email-button',
		})
	);
	try {
		const response = yield axios.post('/graphql', graphQLquery);
		if (response.data.data && response.data.data.changeEmail.success) {
			// setChangeResponse("success");
			yield put({
				type: actionTypes.CHANGE_USER_EMAIL,
				payload: { newEmail: email },
			});
			yield localStorage.setItem('email', email);
			yield put(actionCreators.clearLocalError());
			yield put(
				actionCreators.setSuccess({
					page: 'settings',
					id: 'email-updated',
					message: 'Adres email został poprawnie zaktualizowany',
				})
			);
		} else {
			console.log('wrong password');
			yield put(
				actionCreators.setLocalError('invalid-change-email-password')
			);
		}
	} catch (error) {
		console.log(error);
		yield put(
			actionCreators.setError({
				category: 'auth',
				message: 'Wystąpił błąd serwera, spróbuj ponownie później',
			})
		);
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
