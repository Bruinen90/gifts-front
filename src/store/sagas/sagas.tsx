import * as actionTypes from '../actions/actionTypes';
import { put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';

// Interfaces
import { DrawInterface, LoginDataInterface } from '../../interfaces/interfaces';

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
		const response = yield axios.post('graphql', graphqlQuery);
		const loginData = response.data.data.login;
		const { token, username, email, userId } = loginData;
		localStorage.setItem('token', token);
		localStorage.setItem('username', username);
		localStorage.setItem('email', email);
		localStorage.setItem('userId', userId);
		yield put({
			type: actionTypes.USER_LOGIN,
			payload: response.data.data.login,
		});
		axios.defaults.headers.common['Authorization'] = token.toString();
		yield fetchUserDrawsList();
	} catch (err) {
		yield put({
			type: actionTypes.USER_LOGIN_FAILED,
			payload: { message: err.response.data.errors[0].message },
		});
	}
}

function* watchLoginUser() {
	yield takeLatest('LOGIN_USER_WATCHER', loginUser);
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
		`,
	};
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		const drawId = response.data.data.createDraw._id;
		console.log(response.data.data.createDraw._id);
		yield put({
			type: actionTypes.CREATE_DRAW,
			payload: { ...action.payload, _id: drawId },
		});
	} catch (error) {
		console.log(error);
	}
}

function* watchCreateDraw() {
	yield takeEvery('CREATE_DRAW_WATCHER', createDraw);
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
		const response = yield axios.post('graphql', graphqlQuery);
		if (response.statusText === 'OK') {
			yield put({
				type: actionTypes.DELETE_DRAW,
				payload: action.payload,
			});
		}
	} catch (err) {
		console.log(err.response);
	}
}

function* watchDeleteDraw() {
	yield takeEvery('DELETE_DRAW_WATCHER', deleteDraw);
}

function* logoutUser() {
	localStorage.clear();
	yield put({ type: actionTypes.USER_LOGOUT });
}

function* watchUserLogout() {
	yield takeEvery('USER_LOGOUT_WATCHER', logoutUser);
}

function* autoLoginUser(action: { type: string }) {
	const username = localStorage.getItem('username');
	const email = localStorage.getItem('email');
	const userId = localStorage.getItem('userId');
	const token = localStorage.getItem('token');
	if (username && email && userId && token) {
		axios.defaults.headers.common['Authorization'] = token.toString();
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

function* watchAutoLoginUser() {
	yield takeEvery('USER_AUTOLOGIN_WATCHER', autoLoginUser);
}

function* fetchUserDrawsList() {
	if (axios.defaults.headers.common['Authorization']) {
		const graphqlQuery = {
			query: `{userDraws {drawsList{_id title date price participants {_id username}}}}`,
		};
		try {
			const response = yield axios.post('graphql', graphqlQuery);
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
			console.log(err.response);
		}
	}
}

function* watchFetchUserDrawsList() {
	yield takeLatest('FETCH_USER_DRAWS_LIST_WATCHER', fetchUserDrawsList);
}

export default function* rootSaga() {
	yield all([
		watchLoginUser(),
		watchCreateDraw(),
		watchDeleteDraw(),
		watchUserLogout(),
		watchAutoLoginUser(),
		watchFetchUserDrawsList(),
	]);
}
