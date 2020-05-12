import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* setInvitationResponse(action: {
	type: string;
	payload: {
		invitationId: string;
		decision: 'accept' | 'reject' | 'cancel';
		invitedUser: string;
	};
}) {
	const { invitationId, decision, invitedUser } = action.payload;
	const graphqlQuery = {
		query: `
          mutation{setInvitationResponse(response: {invitationId: "${invitationId}", decision: "${decision}"} ) {success}}
        `,
	};
	yield put(
		actionCreators.setLoading({
			category: 'friends',
			type: 'edited-record',
			recordId: invitationId,
		})
	);
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		if (!response.data.data) {
			throw new Error();
		}
		yield put({
			type: actionTypes.SET_INVITATION_DECISION,
			payload: {
				invitationId: invitationId,
				decision: decision,
			},
		});
		let responseMessage;
		switch (action.payload.decision) {
			case 'accept':
				responseMessage = `Zaakceptowałeś zaproszenie użytkownika ${invitedUser}`;
				break;
			case 'reject':
				responseMessage = `Odrzuciłeś zaproszenie użytkownika ${invitedUser}`;
				break;
			case 'cancel':
				responseMessage = `Anulowano zaproszenie użytkownika ${invitedUser}`;
				break;
			default:
				responseMessage = '';
		}
		yield put(
			actionCreators.setSuccess({
				page: 'friends',
				id: 'set-response',
				message: responseMessage,
			})
		);
	} catch (error) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'friends',
				message:
					'Wystąpił błąd podczas zmiany statusu znajomości, spróbuj ponownie później',
			},
		});
	}
	yield put(actionCreators.setLoading({}));
}
