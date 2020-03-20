import * as actionTypes from "../actions/actionTypes";
import { put, takeEvery, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

// Interfaces
import { DrawInterface, LoginDataInterface } from "../../interfaces/interfaces";

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
  const { title, date, price, creatorsId } = action.payload;
  const graphqlQuery = {
    query: `
			mutation { 
				createDraw(drawInput:
					{
						title: "${title}", 
						date: "${date}", 
						price: ${price}, 
						creatorsID: "${creatorsId}", 
						participantsIDs: ["participant1ID", "participant2ID"]
					}
				) 
				{_id}
			}
		`
  };
  try {
    const response = yield axios.post("graphql", graphqlQuery);
    const drawId = response.data.data.createDraw._id;
    console.log(response.data.data.createDraw._id);
    yield put({
      type: actionTypes.CREATE_DRAW,
      payload: { ...action.payload, id: drawId }
    });
  } catch (error) {
    console.log(error);
  }
}

function* watchCreateDraw() {
  yield takeEvery("CREATE_DRAW_WATCHER", createDraw);
}

function* deleteDraw(action: { type: string; payload: string }) {
  yield console.log(action);
  yield put({ type: actionTypes.DELETE_DRAW, payload: action.payload });
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

function* getUserDrawsList(action: { type: string }) {
  const userId = yield localStorage.getItem("userId");
  if (userId) {
    yield put({
      type: actionTypes.SET_DRAWS_LIST,
      payload: { userId: userId }
    });
  } else {
    const error = new Error("No user ID found, please login!");
    throw error;
  }
}

function* watchGetUserDrawsList() {
  yield takeEvery("WATCH_GET_USER_DRAWS_LIST", getUserDrawsList);
}

export default function* rootSaga() {
  yield all([
    watchLoginUser(),
    watchCreateDraw(),
    watchDeleteDraw(),
    watchUserLogout(),
    watchGetUserDrawsList(),
    watchAutoLoginUser()
  ]);
}
