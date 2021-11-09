import { User } from './User';
import { DrawInterface } from './Draw';
import {
	ReservationStatusSetterType,
	WishDoneSetterType,
} from './Reservations';

export type WishViewTypes = 'full' | 'simple' | 'withDrawData';

export interface WishInput {
	title: string;
	link: string;
	description: string;
	price: number | string;
	_id?: string;
}

export interface Wish extends WishInput {
	_id: string;
	creator: string | User;
	price: number;
	buyer?: User;
	reserved?: boolean;
	done: boolean;
	forDraw?: string;
	imageUrl?: string;
	updatedAt: Date | string;
}

export interface WishWithDrawData extends Wish {
	drawData?: DrawInterface;
}

export interface WishesListProps {
	wishesList: WishWithDrawData[];
	viewMode: 'creator' | 'guest';
	allWishes?: boolean;
	setReservedStatus?: ReservationStatusSetterType;
	setWishAsDone?: WishDoneSetterType;
	inModal?: boolean;
}

export interface WishBoxProps {
	wish: Wish;
	view: WishViewTypes;
	deleteWish?: () => void;
	setWishAsDone?: WishDoneSetterType;
	setReservedStatus: ReservationStatusSetterType | undefined;
	drawData?: DrawInterface | undefined;
	oneColumn?: boolean;
}
