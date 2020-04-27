import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";

// Sagas
import { fetchUserWishes } from "../wishes/fetchUserWishes";

export function* runDraw(action: {
    type: string;
    payload: { drawId: string };
}) {
    const { drawId } = action.payload;
    const graphqlQuery = {
        query: `
            mutation{runDraw(drawId:"${drawId}") {_id username email }}
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const creatorResults = response.data.data.runDraw;
        if (!creatorResults) {
            throw new Error();
        }
        yield put({
            type: actionTypes.SET_CREATOR_RESULTS,
            payload: { drawId: drawId, results: creatorResults },
        });
        fetchUserWishes({
            payload: { userId: creatorResults._id },
        });
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "draws",
                message:
                    "Wystąpił błąd podczas losowania, spróbuj ponownie później",
            },
        });
    }
}