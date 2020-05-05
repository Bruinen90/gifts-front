import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

export function* archiveDraw(action: {
    type: string;
    payload: { drawId: string };
}) {
    const { drawId } = action.payload;
    const graphqlQuery = {
        query: `mutation{archiveDraw(drawId: "${drawId}") {success}}`,
    };
    yield put(
        actionCreators.setLoading({
            loading: true,
            category: "draws",
            type: "edited-record",
            recordId: drawId,
        })
    );
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        if (response.data.data.archiveDraw.success) {
            yield put({
                type: actionTypes.SET_DRAW_ARCHIVED,
                payload: { drawId: drawId },
            });
        } else {
            throw new Error();
        }
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "draws",
                message:
                    "Wystąpił błąd podczas archiwizowania losowania, spróbuj ponownie później",
            },
        });
    }
    yield put(actionCreators.setLoading({ loading: false }));
}
