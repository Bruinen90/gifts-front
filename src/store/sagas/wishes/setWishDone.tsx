import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* setWishDone(action: {
	type: string;
	payload: { wishId: string; wishTitle: string; done: boolean };
}) {
	const { wishId, wishTitle, done } = action.payload;
	yield put(
		actionCreators.setLoading({
			loading: true,
			type: 'edited-record',
			recordId: wishId,
		})
	);
	try {
		const graphQLquery = {
			query: `
                mutation {
                    setWishDone(input: {wishId: "${wishId}", done: ${done}})
                    {success message}}
            `,
		};
		const response = yield axios.post('graphql', graphQLquery);
		if (response.data.data && response.data.data.setWishDone.success) {
			yield put({
				type: actionTypes.SET_WISH_DONE,
				payload: action.payload,
			});
			yield put(
				actionCreators.setSuccess({
					message: `Prezent "${wishTitle}" został oznaczony jako ${
						done ? '' : 'nie'
					} wręczony.`,
				})
			);
		} else {
			console.log('ERR!');
			throw new Error();
		}
	} catch (err) {
		console.log(err);
		yield put(
			actionCreators.setError({
				category: 'wishes',
				message: 'Wystąpił błąd podczas aktualizacji statusu życzenia.',
			})
		);
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
