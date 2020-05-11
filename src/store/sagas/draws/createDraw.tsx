import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

// Types
import { DrawInterface } from "../../../types/Draw";

export function* createDraw(action: { type: string; payload: DrawInterface }) {
    const { _id, title, date, price, creator, participants } = action.payload;
    const graphqlQuery = {
        query: `
			mutation CreateNewDraw($_id: ID, $title: String!, $date: String!, $price: Int!, $creator: ID!, $participants: [ID!]!) { 
				createDraw(drawInput:
					{
						title: $title, 
						date: $date, 
						price: $price, 
						creator: $creator, 
                        participants: $participants
                        _id: $_id
					}
				) 
				{_id updatedAt}
			}
		`,
        variables: {
            _id: _id,
            title: title,
            date: date,
            price: price,
            creator: creator._id,
            participants: participants!.map((participant) => participant._id),
        },
    };
    yield put(
        actionCreators.setLoading({
            loading: true,
            category: "draws",
            type: "new-record",
        })
    );
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const responseData = response.data.data;
        if (!responseData || !responseData.createDraw._id) {
            throw new Error();
        }
        const drawId = responseData.createDraw._id;
        const { updatedAt } = responseData.createDraw;
        const formatedUpdatedDate = new Date(parseInt(updatedAt as string));
        if (_id === drawId) {
            yield put({
                type: actionTypes.UPDATE_DRAW,
                payload: { ...action.payload, updatedAt: formatedUpdatedDate },
            });
            yield put(
                actionCreators.setSuccess({
                    page: "draws",
                    id: "edited-draw",
                    message: `Poprawnie zaktualizowano losowanie "${title}"`,
                })
            );
        } else {
            yield put({
                type: actionTypes.CREATE_DRAW,
                payload: {
                    ...action.payload,
                    _id: drawId,
                    updatedAt: updatedAt,
                },
            });
            yield put(
                actionCreators.setSuccess({
                    page: "draws",
                    id: "edited-draw",
                    message: `Poprawnie utworzono losowanie "${title}"`,
                })
            );
        }
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "draws",
                message:
                    "Wystąpił błąd podczas tworzenia losowania, spróbuj ponownie później",
            },
        });
    }
    yield put(actionCreators.setLoading({ loading: false }));
}
