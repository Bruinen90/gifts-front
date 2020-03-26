import { User } from './interfaces';

export interface WishInput {
	title: string;
	link: string;
	description: string;
	price: number | string;
}

export interface Wish extends WishInput {
	_id: string;
	creator: string;
	price: number;
}

export interface WishesListProps {
	wishesList: Wish[];
	viewMode: 'creator' | 'guest'
}