import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* exitDraw(action: { type: string; payload: { drawId: string } }) {
    const graphqlQuery = {
        query: `
            mutation {
                exitDraw(drawId: "${action.payload.drawId}") {success}
            }
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        console.log(response.data.data);
        if (response.data.data.exitDraw.success) {
            yield put({
                type: actionTypes.EXIT_DRAW,
                payload: action.payload,
            });
        } else {
            // There should be some auth error popup message - need to be done!
        }
    } catch (err) {
        console.log(err.response);
    }
}