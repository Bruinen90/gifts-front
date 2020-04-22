import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

// Sagas
import { fetchUserWishes } from '../wishes/fetchUserWishes';

export function* runDraw(action: {
	type: string;
	payload: { drawId: string };
}) {
	const { drawId } = action.payload;
	const graphqlQuery = {
		query: `
            mutation{runDraw(drawId:"${drawId}") {_id username email }}
        `,
	};
	const response = yield axios.post('graphql', graphqlQuery);
	const creatorResults = response.data.data.runDraw;
	yield put({
		type: actionTypes.SET_CREATOR_RESULTS,
		payload: { drawId: drawId, results: creatorResults },
	});
	fetchUserWishes({
		payload: { userId: creatorResults._id },
	});
}
