import { Wish } from './WishTypes';
import { InvitationInterface, OtherUsersWishes } from './Friends';

export interface DrawResultsInterface {
	_id: string;
	username: string;
	email?: string;
	gifts?: Wish[] | undefined;
	getterWishes?: Wish[] | undefined;
}

export interface DrawInterface {
	_id?: string;
	title: string;
	price: number;
	date: Date | string;
	creator: User;
	participants?: User[];
	status: 'pending' | 'done' | 'archived';
	results?: DrawResultsInterface;
}

export interface StateInterface {
	username?: string;
	email?: string;
	userId?: string;
	token?: string;
	usersDraws: DrawInterface[];
	usersWishes?: Wish[];
	othersWishes?: OtherUsersWishes;
	loginError?: string;
	lastDeletedDraw?: string;
	friends?: User[];
	invitations?: {
		received?: InvitationInterface[];
		sent?: InvitationInterface[];
	};
	shoppingList?: Wish[];
}

export interface LoginDataInterface {
	username: string;
	password: string;
}

export interface BasicUser {
	username: string;
	email?: string;
}

export interface User extends BasicUser {
	_id: string;
	password?: string;
	draws?: string[];
	wishes?: string[];
}

export type SearchState =
	| 'too-short'
	| 'loading'
	| 'no-results'
	| 'display-results'
	| 'error';

export interface SearchResultsBoxProps {
	searchState: SearchState;
}

export type DrawsList = DrawInterface[];

export type UsersListType = User[] | [];

export type UsersListTypesType = 'addingUsers' | 'removingUsers';
