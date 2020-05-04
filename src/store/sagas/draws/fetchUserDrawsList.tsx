import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

// Types
import { DrawInterface } from "../../../types/Draw";

export function* fetchUserDrawsList() {
    if (axios.defaults.headers.common["Authorization"]) {
        const graphqlQuery = {
            query: `{
                userDraws {
                    drawsList{ _id title date price participants {_id username email} results {_id username email gifts {_id title price link description}} creator {_id username email} status}
                }
            }`,
        };
        yield put(
            actionCreators.setLoading({
                loading: true,
                type: "general",
            })
        );
        try {
            const response = yield axios.post("graphql", graphqlQuery);
            const drawsList = response.data.data.userDraws.drawsList.map(
                (draw: DrawInterface) => {
                    const formatedDate = new Date(
                        parseInt(draw.date as string)
                    );
                    return { ...draw, date: formatedDate };
                }
            );
            yield put({
                type: actionTypes.SET_DRAWS_LIST,
                payload: { drawsList: drawsList },
            });
        } catch (err) {
            yield put({
                type: actionTypes.SET_ERROR,
                payload: {
                    category: "draws",
                    message:
                        "Wystąpił błąd podczas pobierania listy Twoich losowań, spróbuj ponownie później",
                },
            });
        }
        yield put(actionCreators.setLoading({ loading: false }));
    }
}
