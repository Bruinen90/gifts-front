import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* deleteWish(action: { type: string; payload: { wishId: string } }) {
    const graphqlQuery = {
        query: `
            mutation {
                deleteWish(wishId: "${action.payload.wishId}") {success}
            }
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        console.log(response);
        if (response.data.data.deleteWish.success) {
            yield put({
                type: actionTypes.DELETE_WISH,
                payload: action.payload,
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "wishes",
                message:
                    "Wystąpił błąd podczas usuwania życzenia, spróbuj ponownie później",
            },
        });
    }
}