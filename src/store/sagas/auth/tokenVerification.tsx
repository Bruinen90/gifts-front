import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";

// Sagas
import { logoutUser } from "./logoutUser";
import { fetchUserDrawsList } from "../draws/fetchUserDrawsList";
import { fetchUserWishes } from "../wishes/fetchUserWishes";
import { fetchUserInvitations } from "../friends/fetchUserInvitations";
import { fetchUserFriends } from "../friends/fetchUserFriends";
import { fetchShoppingList } from "../wishes/fetchShoppingList";

export function* tokenVerification() {
    const token = localStorage.getItem("token");
    if (token) {
        yield (axios.defaults.headers.common[
            "Authorization"
        ] = token.toString());
        const graphQLquery = {
            query: `{
                verifyToken(tokenInput: "${token}") { userId username email unsubscribe }
            }`,
        };
        try {
            const response = yield axios.post("/graphql", graphQLquery);
            console.log(response);
            const responseData = response.data.data.verifyToken;
            if (responseData.userId) {
                const { username, email, userId, unsubscribed } = responseData;
                yield put({
                    type: actionTypes.USER_LOGIN,
                    payload: {
                        username: username,
                        email: email,
                        userId: userId,
                        token: token,
                        unsubscribed: unsubscribed,
                    },
                });
                yield fetchUserDrawsList();
                yield fetchUserWishes();
                yield fetchUserInvitations();
                yield fetchUserFriends();
                yield fetchShoppingList();
            } else {
                logoutUser();
            }
        } catch (error) {}
    }
}
