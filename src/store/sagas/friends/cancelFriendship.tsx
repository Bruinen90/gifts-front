import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* cancelFriendship(action: {
    type: string;
    payload: { friendId: string };
}) {
    try {
        const graphqlQuery = {
            query: `mutation{cancelFriendship(friendId: "${action.payload.friendId}") {success}}`,
        };
        const response = yield axios.post("graphql", graphqlQuery);
        if (
            response.data.data.cancelFriendship &&
            response.data.data.cancelFriendship.success
        ) {
            yield put({
                type: actionTypes.CANCEL_FRIENDSHIP,
                payload: action.payload,
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "friends",
                message:
                    "Wystąpił błąd podczas usuwania użytkownika z grona znajomych, spróbuj ponownie później",
            },
        });
    }
}