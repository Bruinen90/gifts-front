import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* setWishDone(action: {
	type: string;
	payload: { wishId: string; wishTitle: string };
}) {
	const { wishId, wishTitle } = action.payload;
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
                    setWishDone(wishData: {wishId: "${wishId}", done: true})
                    {success}}
            `,
		};
		const response = yield axios.post('graphql', graphQLquery);
		if (response.data.data && response.data.data.setWishDone.success) {
		} else {
			throw new Error();
		}
		yield put({ type: actionTypes.SET_WISH_DONE, payload: action.payload });
		yield put(
			actionCreators.setSuccess({
				message: `Prezent "${wishTitle}" został oznaczony jako wręczony.`,
			})
		);
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
