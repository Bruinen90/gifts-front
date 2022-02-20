import { InvitationInterface, OtherUsersWishes } from './Friends';
import { DrawInterface } from './Draw';
import { User } from './User';
import { Wish } from './WishTypes';
import { Notification } from './Notification';

export interface State {
	auth: AuthState;
	draw: DrawState;
	wish: WishState;
	friends: FriendsState;
	errors: ErrorsState;
	notifications: NotificationsState;
	localError: { errorCode: LocalErrorsIds };
	success: SuccessState;
	loading: LoadingState;
}

export interface Action {
	type: string;
	payload?: any;
}

export interface AuthState {
	username?: string;
	email?: string;
	token?: string;
	_id?: string;
	loginError?: string;
	unsubscribed?: boolean;
}

export interface DrawState {
	usersDraws: DrawInterface[];
	lastDeletedDraw?: string;
	error?: string;
}

export interface WishState {
	usersWishes?: Wish[];
	othersWishes?: OtherUsersWishes;
	shoppingList?: Wish[];
}

export interface FriendsState {
	friends?: User[];
	invitations?: {
		received?: InvitationInterface[];
		sent?: InvitationInterface[];
	};
}

export interface NotificationsState {
	notifications: Notification[];
}

export interface ErrorsState {
	auth?: string;
	draws?: string;
	friends?: string;
	wishes?: string;
	other?: string;
}

export type LocalErrorsIds = 'invalid-change-email-password' | undefined;

export type LoadingCategory =
	| 'wishes'
	| 'friends'
	| 'draws'
	| 'auth'
	| 'notifications';
export type LoadingType =
	| 'new-record'
	| 'edited-record'
	| 'fetching-records'
	| 'general'
	| 'other';
export type LoadingOperation = 'accept' | 'cancel' | 'other';

export interface LoadingState {
	loading?: boolean;
	category?: LoadingCategory;
	type?: LoadingType;
	recordId?: string;
	operationType?: LoadingOperation;
}

export type SuccessPages =
	| 'draws'
	| 'wishes'
	| 'password-change'
	| 'friends'
	| 'login'
	| 'signup'
	| 'settings';

export interface SuccessState {
	page?: SuccessPages;
	id?: string;
	message?: string;
}
