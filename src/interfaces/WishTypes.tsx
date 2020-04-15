import { User } from './interfaces';
import { ReservationStatusSetterType } from './Reservations';

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
	buyer?: string;
	reserved?: boolean;
	forDraw?: string;
}

export interface WishesListProps {
	wishesList: Wish[];
	viewMode: 'creator' | 'guest';
	setReservedStatus?: ReservationStatusSetterType;
}

export interface WishBoxProps {
	wish: Wish;
	view: WishViewTypes;
	deleteWish?: (_: React.MouseEvent) => void;
	setReservedStatus: ReservationStatusSetterType | undefined;
}
