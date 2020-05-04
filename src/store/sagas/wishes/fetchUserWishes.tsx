import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

export function* fetchUserWishes(action?: {
    type?: any;
    payload?: { userId: string };
}) {
    yield put(
        actionCreators.setLoading({
            loading: true,
            type: "general",
        })
    );
    try {
        if (action && action.payload) {
            const graphqlQuery = {
                query: `
                    {userWishes(userId: "${action.payload.userId}") {_id title link imageUrl description price buyer reserved }}
                    `,
            };
            const response = yield axios.post("graphql", graphqlQuery);
            if (!response.data.data) {
                throw new Error();
            }
            yield put({
                type: actionTypes.SET_OTHER_USER_WISHES,
                payload: {
                    wishesList: response.data.data.userWishes,
                    userId: action.payload.userId,
                },
            });
        }
        // Fetch for currently logged in user
        if (axios.defaults.headers.common["Authorization"]) {
            const graphqlQuery = {
                query: `
                    {userWishes {_id title link imageUrl description price buyer reserved }}
                    `,
            };
            const response = yield axios.post("graphql", graphqlQuery);
            if (!response.data.data) {
                throw new Error();
            }
            yield put({
                type: actionTypes.SET_USER_WISHES,
                payload: response.data.data.userWishes,
            });
        }
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "wishes",
                message:
                    "Wystąpił błąd podczas pobierania listy życzeń, spróbuj ponownie później",
            },
        });
    }
    yield put(actionCreators.setLoading({ loading: false }));
}
