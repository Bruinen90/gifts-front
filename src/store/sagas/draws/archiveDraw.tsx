import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* archiveDraw(action: { type: string; payload: { drawId: string } }) {
    const { drawId } = action.payload;
    const graphqlQuery = {
        query: `mutation{archiveDraw(drawId: "${drawId}") {success}}`,
    };
    const response = yield axios.post("graphql", graphqlQuery);
    if (response.data.data.archiveDraw.success) {
        yield put({
            type: actionTypes.SET_DRAW_ARCHIVED,
            payload: { drawId: drawId },
        });
    }
}