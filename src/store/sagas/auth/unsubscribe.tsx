import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* unsubscribe(action: {
	type: string;
	payload: { email: string; token: string };
}) {
	yield put(
		actionCreators.setLoading({
			loading: true,
			category: 'auth',
			type: 'edited-record',
			recordId: 'unsubscribe',
		})
	);
	const { email, token } = action.payload;
	const graphQLquery = {
		query: `
            mutation {
                unsubscribe(
                    unsubscribeInput: 
                        {
                            email: "${email}", 
                            token: "${token}"
                        }
                ) { success message }
        }`,
	};
	try {
		const response = yield axios.post('/graphql', graphQLquery);
		console.log(response);
		yield put({
			type: actionTypes.SET_UNSUBSCRIBED,
			payload: { unsubscribed: true },
		});
	} catch (err) {
		console.log(err);
	}
	yield put(actionCreators.setLoading({ loading: false }));
}
