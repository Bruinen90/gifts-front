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
import { changeUserEmail } from './auth/changeUserEmail';
import { unsubscribe } from './auth/unsubscribe';
import { tokenVerification } from './auth/tokenVerification';
import { setWishDone } from './wishes/setWishDone';
import { loginWithGoogle } from './auth/loginWithGoogle';
import { fetchUserNotifications } from './notifications/fetchUserNotifications';

export default function* rootSaga() {
	yield all([
		yield takeLatest(watcherTypes.WATCH_LOGIN_USER, loginUser),
		yield takeEvery(watcherTypes.WATCH_USER_LOGOUT, logoutUser),
		yield takeEvery(watcherTypes.WATCH_CREATE_DRAW, createDraw),
		yield takeEvery(watcherTypes.WATCH_DELETE_DRAW, deleteDraw),
		yield takeEvery(watcherTypes.WATCH_USER_AUTOLOGIN, autoLoginUser),
		yield takeLatest(
			watcherTypes.WATCH_FETCH_USER_DRAWS_LIST,
			fetchUserDrawsList
		),
		yield takeEvery(watcherTypes.WATCH_EXIT_DRAW, exitDraw),
		yield takeLatest(watcherTypes.WATCH_RUN_DRAW, runDraw),
		yield takeLatest(watcherTypes.WATCH_ARCHIVE_DRAW, archiveDraw),
		yield takeEvery(watcherTypes.WATCH_CREATE_WISH, createWish),
		yield takeLatest(watcherTypes.WATCH_FETCH_USER_WISHES, fetchUserWishes),
		yield takeEvery(watcherTypes.WATCH_DELETE_WISH, deleteWish),
		yield takeEvery(watcherTypes.WATCH_RESERVE_WISH, reserveWish),
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
		yield takeLatest(watcherTypes.WATCH_CHANGE_USER_EMAIL, changeUserEmail),
		yield takeLatest(watcherTypes.WATCH_UNSUBSCRIBE, unsubscribe),
		yield takeLatest(watcherTypes.WATCH_AUTO_LOGIN_USER, tokenVerification),
		yield takeLatest(watcherTypes.WATCH_SET_WISH_DONE, setWishDone),
		yield takeLatest(watcherTypes.WATCH_LOGIN_WITH_GOOGLE, loginWithGoogle),
		yield takeLatest(
			watcherTypes.WATCH_FETCH_USER_NOTIFICATIONS,
			fetchUserNotifications
		),
	]);
}
