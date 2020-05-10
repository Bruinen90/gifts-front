import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* deleteWish(action: {
	type: string;
	payload: { wishId: string; wishTitle: string };
}) {
	const graphqlQuery = {
		query: `
            mutation {
                deleteWish(wishId: "${action.payload.wishId}") {success}
            }
        `,
	};
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		console.log(response);
		if (response.data.data.deleteWish.success) {
			yield put({
				type: actionTypes.DELETE_WISH,
				payload: action.payload,
			});
			yield put(
				actionCreators.setSuccess({
					page: 'wishes',
					id: 'delete-wish',
					message: `Życzenie "${action.payload.wishTitle}" zostało usunięte`,
				})
			);
		} else {
			throw new Error();
		}
	} catch (err) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'wishes',
				message:
					'Wystąpił błąd podczas usuwania życzenia, spróbuj ponownie później',
			},
		});
	}
}
