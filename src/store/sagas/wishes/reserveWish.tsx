import { put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

// Utils
import { getLoggedUser } from '../utils/selectors';

export function* reserveWish(action: {
	type: string;
	payload: {
		drawId?: string;
		creatorId: string;
		wishId: string;
		reserved: boolean;
	};
}) {
	try {
		const graphqlQuery = {
			query: `
                mutation {
                    setReserved(reservation: {wishId: "${action.payload.wishId}", reserved: ${action.payload.reserved}})
                    {success}}
            `,
		};
		if (action.payload.drawId) {
			graphqlQuery.query = `
            mutation {
                setReserved(reservation: {drawId: "${action.payload.drawId}", wishId: "${action.payload.wishId}", reserved: ${action.payload.reserved}})
                {success}}
        `;
		}
		const response = yield axios.post('graphql', graphqlQuery);
		if (response.data.data.setReserved.success) {
			yield put({
				type: actionTypes.SET_WISH_STATUS,
				payload: {
					...action.payload,
					loggedUser: yield select(getLoggedUser),
				},
			});
		} else {
			// Error handler comes here
		}
	} catch (err) {
		console.log(err);
	}
}
