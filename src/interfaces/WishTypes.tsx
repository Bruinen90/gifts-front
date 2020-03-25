import { User } from "./interfaces";

export interface WishInput {
	title: string;
	link: string;
	description: string;
	price: number;
	creator: User;
}

export interface Wish extends WishInput {
	_id: string;
}
