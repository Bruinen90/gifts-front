import { put } from "redux-saga/effects";
import axios from "axios";
import * as actionTypes from "../../actions/actionTypes";

// Sagas
import { autoLoginUser } from "./autoLoginUser";
import { logoutUser } from "./logoutUser";

export function* tokenVerification() {
    const graphQLquery = {
        query: `{
			verifyToken { success message }
		}`,
    };
    try {
        const response = yield axios.post("/graphql", graphQLquery);
        console.log(response);
        if (response.data.data.verifyToken.success) {
            autoLoginUser();
        } else {
            logoutUser();
        }
    } catch (error) {}
}
