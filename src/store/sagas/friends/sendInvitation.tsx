import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

// Types
import { User } from '../../../types/User';

// Utils
import {getLoggedUser} from '../utils/selectors';

export function* sendInvitation(action: {
	type: string;
	payload: { invitedUser: User };
}) {
	const graphqlQuery = {
		query: `
            mutation{sendInvitation(receiverId: "${action.payload.invitedUser._id}") {_id}}
        `,
	};
	const response = yield axios.post('graphql', graphqlQuery);
	if (response.data.data && response.data.data.sendInvitation) {
		const invitationId = response.data.data.sendInvitation._id;
		yield put({
			type: actionTypes.SEND_INVITATION,
			payload: {
				receiver: action.payload.invitedUser,
				sender: yield select(getLoggedUser),
				_id: invitationId,
			},
		});
	} else {
		// Error handler goes here
	}
}
