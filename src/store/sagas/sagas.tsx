import * as actionTypes from "../actions/actionTypes";
import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

// Interfaces
import { DrawInterface, LoginDataInterface } from "../../interfaces/interfaces";
import { WishInput } from "../../interfaces/WishTypes";

function* loginUser(action: { type: string; payload: LoginDataInterface }) {
    const { payload } = action;
    const graphqlQuery = {
        query: `
            {
                login(userInput:
                    {
                        usernameOrEmail: "${payload.username}", 
                        password: "${payload.password}"
                    })
                { token userId username email }
            }`
    };

    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const loginData = response.data.data.login;
        const { token, username, email, userId } = loginData;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", userId);
        yield put({
            type: actionTypes.USER_LOGIN,
            payload: response.data.data.login
        });
        axios.defaults.headers.common["Authorization"] = token.toString();
        yield fetchUserDrawsList();
    } catch (err) {
        yield put({
            type: actionTypes.USER_LOGIN_FAILED,
            payload: { message: err.response.data.errors[0].message }
        });
    }
}

function* watchLoginUser() {
    yield takeLatest("LOGIN_USER_WATCHER", loginUser);
}

function* createDraw(action: { type: string; payload: DrawInterface }) {
    const { title, date, price, creator, participants } = action.payload;
    const graphqlQuery = {
        query: `
			mutation CreateNewDraw($title: String!, $date: String!, $price: Int!, $creator: ID!, $participants: [ID!]!) { 
				createDraw(drawInput:
					{
						title: $title, 
						date: $date, 
						price: $price, 
						creator: $creator, 
						participants: $participants
					}
				) 
				{_id}
			}
		`,
        variables: {
            title: title,
            date: date,
            price: price,
            creator: creator._id,
            participants: participants
        }
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const drawId = response.data.data.createDraw._id;
        console.log(response.data.data.createDraw._id);
        yield put({
            type: actionTypes.CREATE_DRAW,
            payload: {
                ...action.payload,
                _id: drawId
            }
        });
    } catch (error) {
        console.log(error);
    }
}

function* watchCreateDraw() {
    yield takeEvery("CREATE_DRAW_WATCHER", createDraw);
}

function* createWish(action: { type: string; payload: WishInput }) {
    console.log("SAGA: ", action.payload);
    const { title, description, link, price } = action.payload;
    const graphqlQuery = {
        query: `
            mutation CreateNewWish($title: String!, $description: String, $link: String, $price: Int!) {
                createWish(wishInput:
                    {
                        title: $title,
                        description: $description,
                        link: $link,
                        price: $price,
                    }
                )
                {_id}
            }
        `,
        variables: {
            title: title,
            description: description,
            link: link,
            price: price
        }
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const newWishId = response.data.data.createWish._id;
        if (newWishId) {
            yield put({
                type: actionTypes.CREATE_WISH,
                payload: {
                    ...action.payload,
                    _id: newWishId
                }
            });
        } else {
            // Here comes logic for error handling, probably some snackbar
        }
    } catch (err) {
        console.log(err);
    }
}

function* watchCreateWish() {
    yield takeEvery("CREATE_WISH_WATCHER", createWish);
}

function* deleteDraw(action: { type: string; payload: { drawId: string } }) {
    const graphqlQuery = {
        query: `
            mutation {
                deleteDraw(drawId: "${action.payload.drawId}") {success}
            }
        `
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        if (response.data.data.deleteDraw.success) {
            yield put({
                type: actionTypes.DELETE_DRAW,
                payload: action.payload
            });
        } else {
            // There should be some auth error popup message - need to be done!
        }
    } catch (err) {
        console.log(err.response);
    }
}

function* watchDeleteDraw() {
    yield takeEvery("DELETE_DRAW_WATCHER", deleteDraw);
}

function* logoutUser() {
    localStorage.clear();
    yield put({ type: actionTypes.USER_LOGOUT });
}

function* watchUserLogout() {
    yield takeEvery("USER_LOGOUT_WATCHER", logoutUser);
}

function* autoLoginUser(action: { type: string }) {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (username && email && userId && token) {
        axios.defaults.headers.common["Authorization"] = token.toString();
        yield put({
            type: actionTypes.USER_LOGIN,
            payload: {
                username: username,
                email: email,
                userId: userId,
                token: token
            }
        });
    }
}

function* watchAutoLoginUser() {
    yield takeEvery("USER_AUTOLOGIN_WATCHER", autoLoginUser);
}

function* fetchUserDrawsList() {
    if (axios.defaults.headers.common["Authorization"]) {
        const graphqlQuery = {
            query: `{
                userDraws {
                    drawsList{ _id title date price participants {_id username} results {_id username email } creator {_id username email} }
                }
            }`
        };
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
                payload: { drawsList: drawsList }
            });
        } catch (err) {
            console.log(err.response ? err.response : err);
        }
    }
}

function* watchFetchUserDrawsList() {
    yield takeLatest("FETCH_USER_DRAWS_LIST_WATCHER", fetchUserDrawsList);
}

function* fetchUserWishes(action: { type: any; payload?: { userId: string } }) {
    console.log("init fetch user wishes...");
    let userId;
    if (action.payload) {
        console.log("Fetching for specific user", action.payload.userId);
    } else {
        if (axios.defaults.headers.common["Authorization"]) {
            console.log("Fetching logged user wishes");
            const graphqlQuery = {
                query: `
                {userWishes {_id title link description price }}
                `
            };
            const response = yield axios.post("graphql", graphqlQuery);
            console.log(response);
        } else {
            console.log("No logged in user found!");
        }
    }
}

function* watchFetchUserWishes() {
    yield takeLatest("FETCH_USER_WISHES_WATCHER", fetchUserWishes);
}

export default function* rootSaga() {
    yield all([
        watchLoginUser(),
        watchCreateDraw(),
        watchDeleteDraw(),
        watchUserLogout(),
        watchAutoLoginUser(),
        watchFetchUserDrawsList(),
        watchCreateWish(),
        watchFetchUserWishes()
    ]);
}
