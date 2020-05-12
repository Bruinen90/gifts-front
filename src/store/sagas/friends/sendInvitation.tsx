import { put, select } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";
import * as actionCreators from "../../actions/actionCreators";

// Types
import { User } from "../../../types/User";

// Utils
import { getLoggedUser } from "../utils/selectors";

export function* sendInvitation(action: {
    type: string;
    payload: { invitedUser: User };
}) {
    const graphqlQuery = {
        query: `
            mutation{sendInvitation(receiverId: "${action.payload.invitedUser._id}") {_id}}
        `,
    };
    yield put(
        actionCreators.setLoading({ recordId: action.payload.invitedUser._id })
    );
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        if (response.data.data && response.data.data.sendInvitation) {
            const invitationId = response.data.data.sendInvitation._id;
            yield put({
                type: actionTypes.SEND_INVITATION,
                payload: {
                    receiver: action.payload.invitedUser,
                    sender: yield select(getLoggedUser),
                    _id: invitationId,
                },
            });
            yield put(
                actionCreators.setSuccess({
                    page: "friends",
                    id: "send-invitation",
                    message: `Wysłano zaproszenie do użytkownika ${action.payload.invitedUser.username}`,
                })
            );
        } else {
            throw new Error();
        }
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "friends",
                message:
                    "Wystąpił błąd podczas wysyłania zaproszenia, spróbuj ponownie później",
            },
        });
    }
    yield put(actionCreators.setLoading({}));
}
