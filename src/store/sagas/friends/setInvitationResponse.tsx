import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";

export function* setInvitationResponse(action: {
    type: string;
    payload: { invitationId: string; decision: "accept" | "reject" | "cancel" };
}) {
    const { invitationId, decision } = action.payload;
    const graphqlQuery = {
        query: `
          mutation{setInvitationResponse(response: {invitationId: "${invitationId}", decision: "${decision}"} ) {success}}
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        if (!response.data.data) {
            throw new Error();
        }
        yield put({
            type: actionTypes.SET_INVITATION_DECISION,
            payload: {
                invitationId: invitationId,
                decision: decision,
            },
        });
    } catch (error) {
        yield put({
            type: actionTypes.SET_ERROR,
            payload: {
                category: "friends",
                message:
                    "Wystąpił błąd podczas zmiany statusu znajomości, spróbuj ponownie później",
            },
        });
    }
}
