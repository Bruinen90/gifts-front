import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* exitDraw(action: {
	type: string;
	payload: { drawId: string; drawTitle: string };
}) {
	const graphqlQuery = {
		query: `
            mutation {
                exitDraw(drawId: "${action.payload.drawId}") {success}
            }
        `,
	};
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		console.log(response.data.data);
		if (response.data.data.exitDraw.success) {
			yield put({
				type: actionTypes.EXIT_DRAW,
				payload: action.payload,
			});
			yield put(
				actionCreators.setSuccess({
					page: 'draws',
					id: 'exit-draw',
					message: `Opuściłeś losowanie "${action.payload.drawTitle}"`,
				})
			);
		} else {
			throw new Error();
		}
	} catch (err) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'draws',
				message:
					'Wystąpił błąd podczas próby wypisania sie z losowania, spróbuj ponownie później',
			},
		});
	}
}
