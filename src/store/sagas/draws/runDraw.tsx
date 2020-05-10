import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Sagas
import { fetchUserWishes } from '../wishes/fetchUserWishes';

export function* runDraw(action: {
	type: string;
	payload: { drawId: string; drawTitle: string };
}) {
	const { drawId } = action.payload;
	const graphqlQuery = {
		query: `
            mutation{runDraw(drawId:"${drawId}") {_id username email }}
        `,
	};
	yield put(
		actionCreators.setLoading({
			loading: true,
			category: 'draws',
			type: 'edited-record',
			recordId: drawId,
			operationType: 'accept',
		})
	);
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		const creatorResults = response.data.data.runDraw;
		if (!creatorResults) {
			throw new Error();
		}
		yield put({
			type: actionTypes.SET_CREATOR_RESULTS,
			payload: { drawId: drawId, results: creatorResults },
		});
		fetchUserWishes({
			payload: { userId: creatorResults._id },
		});
		yield put(
			actionCreators.setSuccess({
				page: 'draws',
				id: 'run-draw',
				message: `Losowanie "${action.payload.drawTitle}" zostało przeprowadzone, jego uczestnicy otrzymali informacje o wynikach`,
			})
		);
	} catch (error) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'draws',
				message:
					'Wystąpił błąd podczas losowania, spróbuj ponownie później',
			},
		});
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
