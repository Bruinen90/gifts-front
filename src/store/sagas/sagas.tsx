import * as actionTypes from "../actions/actionTypes";
import * as watcherTypes from "../actions/watcherTypes";
import { put, takeEvery, takeLatest, all, select } from "redux-saga/effects";
import axios from "axios";

import { getLoggedUser } from "./selectors";

// Interfaces
import { DrawInterface } from "../../types/Draw";
import { User, LoginDataInterface } from "../../types/User";
import { WishInput } from "../../types/WishTypes";

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
            }`,
    };

    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const loginData = response.data.data.login;
        const { token, username, email, userId } = loginData;
        yield localStorage.setItem("token", token);
        yield localStorage.setItem("username", username);
        yield localStorage.setItem("email", email);
        yield localStorage.setItem("userId", userId);
        yield put({
            type: actionTypes.USER_LOGIN,
            payload: response.data.data.login,
        });
        yield (axios.defaults.headers.common[
            "Authorization"
        ] = token.toString());
        yield fetchUserDrawsList();
        yield fetchUserWishes();
        yield fetchUserInvitations();
        yield fetchUserFriends();
        yield fetchShoppingList();
    } catch (err) {
        yield put({
            type: actionTypes.USER_LOGIN_FAILED,
            payload: { message: err.response.data.errors[0].message },
        });
    }
}

function* createDraw(action: { type: string; payload: DrawInterface }) {
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
				{_id}
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
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const drawId = response.data.data.createDraw._id;
        if (_id === drawId) {
            yield put({
                type: actionTypes.UPDATE_DRAW,
                payload: action.payload,
            });
        } else {
            yield put({
                type: actionTypes.CREATE_DRAW,
                payload: {
                    ...action.payload,
                    _id: drawId,
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function* createWish(action: { type: string; payload: WishInput }) {
    const { _id, title, description, link, price } = action.payload;
    const graphqlQuery = {
        query: `
            mutation CreateNewWish($_id: ID, $title: String!, $description: String, $link: String, $price: Int!) {
                createWish(wishInput:
                    {
                        title: $title,
                        description: $description,
                        link: $link,
                        price: $price,
                        _id: $_id,
                    }
                )
                {_id imageUrl}
            }
        `,
        variables: {
            title: title,
            description: description,
            link: link,
            price: price,
            _id: _id,
        },
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        const responseData = response.data.data.createWish;
        const newWishId = responseData._id;
        let newWishImgUrl = responseData.imageUrl;
        let reducerPayload;
        if (newWishImgUrl) {
            reducerPayload = { ...action.payload, imageUrl: newWishImgUrl };
        } else {
            reducerPayload = action.payload;
        }
        if (newWishId === _id) {
            yield put({
                type: actionTypes.UPDATE_WISH,
                payload: reducerPayload,
            });
        } else {
            if (newWishId) {
                yield put({
                    type: actionTypes.CREATE_WISH,
                    payload: {
                        ...reducerPayload,
                        _id: newWishId,
                    },
                });
            } else {
                // Here comes logic for error handling, probably some snackbar
            }
        }
    } catch (err) {
        console.log(err);
    }
}

function* deleteDraw(action: { type: string; payload: { drawId: string } }) {
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
            // There should be some auth error popup message - need to be done!
        }
    } catch (err) {
        console.log(err.response);
    }
}

function* logoutUser() {
    localStorage.clear();
    yield put({ type: actionTypes.USER_LOGOUT });
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
                token: token,
            },
        });
    }
}

function* fetchUserDrawsList() {
    if (axios.defaults.headers.common["Authorization"]) {
        const graphqlQuery = {
            query: `{
                userDraws {
                    drawsList{ _id title date price participants {_id username email} results {_id username email gifts {_id title price link description}} creator {_id username email} status}
                }
            }`,
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
                payload: { drawsList: drawsList },
            });
        } catch (err) {
            console.log(err.response ? err.response : err);
        }
    }
}

function* fetchUserWishes(action?: {
    type?: any;
    payload?: { userId: string };
}) {
    // Fetch for requested user
    if (action && action.payload) {
        const graphqlQuery = {
            query: `
                {userWishes(userId: "${action.payload.userId}") {_id title link imageUrl description price buyer reserved }}
                `,
        };
        const response = yield axios.post("graphql", graphqlQuery);
        yield put({
            type: actionTypes.SET_OTHER_USER_WISHES,
            payload: {
                wishesList: response.data.data.userWishes,
                userId: action.payload.userId,
            },
        });
    }
    // Fetch for currently logged in user
    if (axios.defaults.headers.common["Authorization"]) {
        const graphqlQuery = {
            query: `
                {userWishes {_id title link imageUrl description price buyer reserved }}
                `,
        };
        const response = yield axios.post("graphql", graphqlQuery);
        yield put({
            type: actionTypes.SET_USER_WISHES,
            payload: response.data.data.userWishes,
        });
    }
}

function* deleteWish(action: { type: string; payload: { wishId: string } }) {
    const graphqlQuery = {
        query: `
            mutation {
                deleteWish(wishId: "${action.payload.wishId}") {success}
            }
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        console.log(response);
        if (response.data.data.deleteWish.success) {
            yield put({
                type: actionTypes.DELETE_WISH,
                payload: action.payload,
            });
        } else {
            // There should be some auth error popup message - need to be done!
        }
    } catch (err) {
        console.log(err);
    }
}

function* exitDraw(action: { type: string; payload: { drawId: string } }) {
    const graphqlQuery = {
        query: `
            mutation {
                exitDraw(drawId: "${action.payload.drawId}") {success}
            }
        `,
    };
    try {
        const response = yield axios.post("graphql", graphqlQuery);
        console.log(response.data.data);
        if (response.data.data.exitDraw.success) {
            yield put({
                type: actionTypes.EXIT_DRAW,
                payload: action.payload,
            });
        } else {
            // There should be some auth error popup message - need to be done!
        }
    } catch (err) {
        console.log(err.response);
    }
}

function* reserveWish(action: {
    type: string;
    payload: {
        drawId?: string;
        creatorId: string;
        wishId: string;
        reserved: boolean;
    };
}) {
    try {
        const graphqlQuery = {
            query: `
                mutation {
                    setReserved(reservation: {wishId: "${action.payload.wishId}", reserved: ${action.payload.reserved}})
                    {success}}
            `,
        };
        if (action.payload.drawId) {
            graphqlQuery.query = `
            mutation {
                setReserved(reservation: {drawId: "${action.payload.drawId}", wishId: "${action.payload.wishId}", reserved: ${action.payload.reserved}})
                {success}}
        `;
        }
        const response = yield axios.post("graphql", graphqlQuery);
        if (response.data.data.setReserved.success) {
            yield put({
                type: actionTypes.SET_WISH_STATUS,
                payload: {
                    ...action.payload,
                    loggedUser: yield select(getLoggedUser),
                },
            });
        } else {
            // Error handler comes here
        }
    } catch (err) {
        console.log(err);
    }
}

function* runDraw(action: { type: string; payload: { drawId: string } }) {
    const { drawId } = action.payload;
    const graphqlQuery = {
        query: `
            mutation{runDraw(drawId:"${drawId}") {_id username email }}
        `,
    };
    const response = yield axios.post("graphql", graphqlQuery);
    const creatorResults = response.data.data.runDraw;
    yield put({
        type: actionTypes.SET_CREATOR_RESULTS,
        payload: { drawId: drawId, results: creatorResults },
    });
    fetchUserWishes({
        payload: { userId: creatorResults._id },
    });
}

function* archiveDraw(action: { type: string; payload: { drawId: string } }) {
    const { drawId } = action.payload;
    const graphqlQuery = {
        query: `mutation{archiveDraw(drawId: "${drawId}") {success}}`,
    };
    const response = yield axios.post("graphql", graphqlQuery);
    if (response.data.data.archiveDraw.success) {
        yield put({
            type: actionTypes.SET_DRAW_ARCHIVED,
            payload: { drawId: drawId },
        });
    }
}

function* sendInvitation(action: {
    type: string;
    payload: { invitedUser: User };
}) {
    const graphqlQuery = {
        query: `
            mutation{sendInvitation(receiverId: "${action.payload.invitedUser._id}") {_id}}
        `,
    };
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
    } else {
        // Error handler goes here
    }
}

function* fetchUserInvitations() {
    if (axios.defaults.headers.common["Authorization"]) {
        const graphqlQuery = {
            query: `
				mutation{getUserInvitations { received {_id sender {_id username email}} sent {_id receiver {_id username email}}}}
			`,
        };
        try {
            const response = yield axios.post("graphql", graphqlQuery);
            const responseInvitations = response.data.data.getUserInvitations;
            yield put({
                type: actionTypes.SET_USER_INVITATIONS,
                payload: {
                    ...responseInvitations,
                    loggedUser: yield select(getLoggedUser),
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
}

function* setInvitationResponse(action: {
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
        console.log(response);
        yield put({
            type: actionTypes.SET_INVITATION_DECISION,
            payload: {
                invitationId: invitationId,
                decision: decision,
            },
        });
    } catch (error) {}
}

function* fetchUserFriends() {
    const grapghqlQuery = {
        query: `{getUserFriends {_id username email}}`,
    };
    try {
        const response = yield axios.post("graphql", grapghqlQuery);
        yield put({
            type: actionTypes.SET_USER_FRIENDS,
            payload: response.data.data.getUserFriends,
        });
    } catch (err) {
        console.log(err);
    }
}

function* cancelFriendship(action: {
    type: string;
    payload: { friendId: string };
}) {
    try {
        const graphqlQuery = {
            query: `mutation{cancelFriendship(friendId: "${action.payload.friendId}") {success}}`,
        };
        const response = yield axios.post("graphql", graphqlQuery);
        if (
            response.data.data.cancelFriendship &&
            response.data.data.cancelFriendship.success
        ) {
            yield put({
                type: actionTypes.CANCEL_FRIENDSHIP,
                payload: action.payload,
            });
        } else {
            // Error handler goes here
        }
    } catch (err) {
        console.log(err);
    }
}

function* fetchShoppingList() {
    const grapghqlQuery = {
        query: `{getShoppingList {_id title link imageUrl description price forDraw creator {_id username email}}}`,
    };
    try {
        const response = yield axios.post("graphql", grapghqlQuery);
        yield put({
            type: actionTypes.SET_SHOPPING_LIST,
            payload: {
                shoppingList: response.data.data.getShoppingList,
                loggedUser: yield select(getLoggedUser),
            },
        });
    } catch (error) {
        console.log(error);
    }
}

export default function* rootSaga() {
    yield all([
        yield takeLatest("LOGIN_USER_WATCHER", loginUser),
        yield takeEvery("CREATE_DRAW_WATCHER", createDraw),
        yield takeEvery("DELETE_DRAW_WATCHER", deleteDraw),
        yield takeEvery("USER_LOGOUT_WATCHER", logoutUser),
        yield takeEvery("USER_AUTOLOGIN_WATCHER", autoLoginUser),
        yield takeLatest("FETCH_USER_DRAWS_LIST_WATCHER", fetchUserDrawsList),
        yield takeEvery("CREATE_WISH_WATCHER", createWish),
        yield takeLatest("FETCH_USER_WISHES_WATCHER", fetchUserWishes),
        yield takeEvery("DELETE_WISH_WATCHER", deleteWish),
        yield takeEvery("EXIT_DRAW_WATCHER", exitDraw),
        yield takeEvery("RESERVE_WISH_WATCHER", reserveWish),
        yield takeLatest("RUN_DRAW_WATCHER", runDraw),
        yield takeLatest("ARCHIVE_DRAW_WATCHER", archiveDraw),
        yield takeLatest(watcherTypes.WATCH_SEND_INVITATION, sendInvitation),
        yield takeLatest(
            watcherTypes.WATCH_GET_INVITATIONS,
            fetchUserInvitations
        ),
        yield takeLatest(
            watcherTypes.WATCH_SET_INVITATION_DECISION,
            setInvitationResponse
        ),
        yield takeLatest(
            watcherTypes.WATCH_FETCH_USER_FRIENDS,
            fetchUserFriends
        ),
        yield takeLatest(
            watcherTypes.WATCH_CANCEL_FRIENDSHIP,
            cancelFriendship
        ),
        yield takeLatest(
            watcherTypes.WATCH_FETCH_SHOPPING_LIST,
            fetchShoppingList
        ),
    ]);
}
