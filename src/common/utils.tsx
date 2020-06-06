import { Wish } from '../types/WishTypes';

export const sortWishes = (wishesList: Wish[]) => {
	return wishesList.sort((wishA, wishB) => {
		let A = wishA.done ? -1000 : 0;
		let B = wishB.done ? -1000 : 0;
		wishA.updatedAt > wishB.updatedAt ? A-- : B--;
		return A > B ? -1 : 0;
	});
};
