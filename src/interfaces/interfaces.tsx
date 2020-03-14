export interface DrawInterface {
	title: string;
	price: number;
	date: Date;
}

export interface StateInterface {
	username?: string;
	email?: string;
	token?: string;
	usersDraws: DrawInterface[];
}
