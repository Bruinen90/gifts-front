export interface DrawInterface {
	_id?: string;
	title: string;
	price: number;
	date: Date | string;
	creatorsId: string;
}

export interface StateInterface {
	username?: string;
	email?: string;
	userId?: string;
	token?: string;
	usersDraws: DrawInterface[];
	loginError?: string;
}

export interface LoginDataInterface {
	username: string;
	password: string;
}

export interface User {
	_id: string;
	username: string;
	password?: string;
	draws?: String[];
	wishes?: String[];
}

export interface PopulatedInterface extends DrawInterface {
	_id: string;
	creatorsID?: string;
	participants?: User[];
}

export type DrawsList = DrawInterface[];
