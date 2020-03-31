import * as actionTypes from './actions/actionTypes';
import { DrawInterface, StateInterface } from '../interfaces/interfaces';

// Types
import { Wish } from '../interfaces/WishTypes';

interface actionInterface {
	type: string;
	[key: string]: any;
}

const initalState: StateInterface = {
	usersDraws: [],
};

const reducer = (
	state = initalState,
	action: actionInterface
): StateInterface => {
	switch (action.type) {
		case actionTypes.USER_LOGIN:
			const { username, email, token, userId } = action.payload;
			return {
				...state,
				username: username,
				email: email,
				token: token,
				userId: userId,
				loginError: undefined,
			};
		case actionTypes.USER_LOGIN_FAILED:
			console.log('LOGIN FAILED');
			return {
				...state,
				loginError: action.payload.message,
			};
		case actionTypes.USER_LOGOUT:
			console.log('LOGGING OUT...');
			const loggedOutState = { ...state };
			delete loggedOutState.username;
			delete loggedOutState.email;
			delete loggedOutState.token;
			delete loggedOutState.userId;
			return { ...loggedOutState, usersDraws: [] };
		case actionTypes.CREATE_DRAW:
			console.log('CREATING A DRAW', action.payload);
			const newDraw: DrawInterface = action.payload;
			return {
				...state,
				usersDraws: state.usersDraws
					? [...state.usersDraws, newDraw]
					: [newDraw],
			};
		case actionTypes.DELETE_DRAW:
			console.log('DELETING DRAW', action.payload);
			return {
				...state,
				usersDraws: [
					...state.usersDraws.filter(
						draw => draw._id !== action.payload.drawId
					),
				],
				lastDeletedDraw: action.payload.drawId,
			};
		case actionTypes.SET_DRAWS_LIST:
			return {
				...state,
				usersDraws: action.payload.drawsList,
			};
		case actionTypes.CREATE_WISH:
			let usersWishes;
			if (state.usersWishes) {
				usersWishes = [...state.usersWishes, action.payload];
			} else {
				usersWishes = [action.payload];
			}
			return {
				...state,
				usersWishes: usersWishes,
			};
		case actionTypes.SET_USER_WISHES:
			return {
				...state,
				usersWishes: action.payload,
			};
		case actionTypes.DELETE_WISH:
			return {
				...state,
				usersWishes: [...state.usersWishes!].filter(
					wish => wish._id !== action.payload.wishId
				),
			};
		case actionTypes.EXIT_DRAW:
			return {
				...state,
				usersDraws: [...state.usersDraws!].filter(
					draw => draw._id !== action.payload.drawId
				),
			};
		case actionTypes.UPDATE_DRAW:
			const updatedDraw = action.payload;
			return {
				...state,
				usersDraws: [...state.usersDraws!].map(draw => {
					if (draw._id !== updatedDraw._id) {
						return draw;
					} else {
						return updatedDraw;
					}
				}),
			};
		case actionTypes.UPDATE_WISH:
			const updatedWish = action.payload;
			return {
				...state,
				usersWishes: [...state.usersWishes!].map(wish => {
					if (wish._id !== updatedWish._id) {
						return wish;
					} else {
						return updatedWish;
					}
				}),
			};
		case actionTypes.SET_DRAW_RESULTS_WISHES:
			return {
				...state,
				usersDraws: [...state.usersDraws!].map(draw => {
					if (draw._id !== action.payload.drawId || !draw.results) {
						return draw;
					}
					return {
						...draw,
						results: {
							...draw.results,
							getterWishes: action.payload.wishesList,
						},
					};
				}),
			};
		case actionTypes.SET_WISH_STATUS:
			return {
				...state,
				usersDraws: [...state.usersDraws!].map(draw => {
					if (draw._id !== action.payload.drawId || !draw.results) {
						return draw;
					}
					// Update gifts array for requested draw:
					let updatedGiftsForFoundDraw: [] | undefined | Wish[];
					const addedGift = [...draw.results.getterWishes!].find(
						wish => wish._id === action.payload.wishId
					)!;
					if (!draw.results.gifts && action.payload.reserved) {
						updatedGiftsForFoundDraw = [addedGift];
					} else if (!action.payload.reserved) {
						updatedGiftsForFoundDraw =
							draw.results.gifts!.length > 1
								? [...draw.results.gifts!].filter(
										gift =>
											gift._id !== action.payload.wishId
								  )
								: undefined;
					} else {
						updatedGiftsForFoundDraw = [
							...draw.results.gifts!,
							addedGift,
						];
					}
					// Update state
					return {
						...draw,
						results: {
							...draw.results,
							gifts: updatedGiftsForFoundDraw,
							getterWishes: draw.results.getterWishes
								? [...draw.results.getterWishes].map(wish => {
										if (
											wish._id !== action.payload.wishId
										) {
											return wish;
										}
										return {
											...wish,
											reserved: action.payload.reserved,
											buyer: action.payload.reserved
												? state.userId
												: undefined,
										};
								  })
								: [],
						},
					};
				}),
			};
	}
	return state;
};

export default reducer;
