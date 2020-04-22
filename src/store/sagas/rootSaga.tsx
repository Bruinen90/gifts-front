import * as watcherTypes from '../actions/watcherTypes';
import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import { loginUser } from './auth/loginUser';
import { logoutUser } from './auth/logoutUser';
import { autoLoginUser } from './auth/autoLoginUser';
import { createDraw } from './draws/createDraw';
import { deleteDraw } from './draws/deleteDraw';
import { fetchUserDrawsList } from './draws/fetchUserDrawsList';
import { exitDraw } from './draws/exitDraw';
import { runDraw } from './draws/runDraw';
import { archiveDraw } from './draws/archiveDraw';
import { createWish } from './wishes/createWish';
import { fetchUserWishes } from './wishes/fetchUserWishes';
import { deleteWish } from './wishes/deleteWish';
import { reserveWish } from './wishes/reserveWish';
import { fetchShoppingList } from './wishes/fetchShoppingList';
import { sendInvitation } from './friends/sendInvitation';
import { fetchUserInvitations } from './friends/fetchUserInvitations';
import { setInvitationResponse } from './friends/setInvitationResponse';
import { fetchUserFriends } from './friends/fetchUserFriends';
import { cancelFriendship } from './friends/cancelFriendship';

export default function* rootSaga() {
	yield all([
		yield takeLatest('LOGIN_USER_WATCHER', loginUser),
		yield takeEvery('USER_LOGOUT_WATCHER', logoutUser),
		yield takeEvery('CREATE_DRAW_WATCHER', createDraw),
		yield takeEvery('DELETE_DRAW_WATCHER', deleteDraw),
		yield takeEvery('USER_AUTOLOGIN_WATCHER', autoLoginUser),
		yield takeLatest('FETCH_USER_DRAWS_LIST_WATCHER', fetchUserDrawsList),
		yield takeEvery('EXIT_DRAW_WATCHER', exitDraw),
		yield takeLatest('RUN_DRAW_WATCHER', runDraw),
		yield takeLatest('ARCHIVE_DRAW_WATCHER', archiveDraw),
		yield takeEvery('CREATE_WISH_WATCHER', createWish),
		yield takeLatest('FETCH_USER_WISHES_WATCHER', fetchUserWishes),
		yield takeEvery('DELETE_WISH_WATCHER', deleteWish),
		yield takeEvery('RESERVE_WISH_WATCHER', reserveWish),
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
