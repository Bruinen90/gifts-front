import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";

export function* deleteDraw(action: {
    type: string;
    payload: { drawId: string };
}) {
    const graphqlQuery = {
        query: `
            mutation {
                deleteDraw(drawId: "${action.payload.drawId}") {success}
            }
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        if (response.data.data.deleteDraw.success) {
            yield put({
                type: actionTypes.DELETE_DRAW,
                payload: action.payload,
            });
        } else {
            throw new Error();
        }
    } catch (err) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "draws",
                message:
                    "Wystąpił błąd podczas usuwania losowania, spróbuj ponownie później",
            },
        });
    }
}
