import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

export function* fetchUserFriends() {
    const grapghqlQuery = {
        query: `{getUserFriends {_id username email}}`,
    };
    try {
        const response = yield axios.post("graphql", grapghqlQuery);
        if(!response.data.data.getUserFriends) {
            throw new Error();
        }
        yield put({
            type: actionTypes.SET_USER_FRIENDS,
            payload: response.data.data.getUserFriends,
        });
    } catch (err) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "friends",
                message:
                    "Wystąpił błąd podczas pobierania listy znajomych, spróbuj ponownie później",
            },
        });
    }
}