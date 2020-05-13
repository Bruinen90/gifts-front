import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import { Wish } from '../../../types/WishTypes';

export function* fetchUserWishes(action?: {
	type?: any;
	payload?: { userId: string };
}) {
	try {
		if (action && action.payload) {
			const graphqlQuery = {
				query: `
                    {
                        userWishes(userId: "${action.payload.userId}") 
                            { 
                                _id 
                                title 
                                link 
                                imageUrl 
                                description 
                                price 
                                buyer 
                                reserved 
                                updatedAt 
                            }
                    }
                `,
			};
			const response = yield axios.post('graphql', graphqlQuery);
			if (!response.data.data) {
				throw new Error();
			}
			const userWishes = response.data.data.userWishes.map(
				(wish: Wish) => ({
					...wish,
					updatedAt: new Date(parseInt(wish.updatedAt as string)),
				})
			);
			yield put({
				type: actionTypes.SET_OTHER_USER_WISHES,
				payload: {
					wishesList: userWishes,
					userId: action.payload.userId,
				},
			});
		}
		// Fetch for currently logged in user
		if (axios.defaults.headers.common['Authorization']) {
			const graphqlQuery = {
				query: `
                    {userWishes { _id title link imageUrl description price buyer reserved updatedAt }}
                    `,
			};
			const response = yield axios.post('graphql', graphqlQuery);
			if (!response.data.data) {
				throw new Error();
			}
			const userWishes = response.data.data.userWishes
				.map((wish: Wish) => ({
					...wish,
					updatedAt: new Date(parseInt(wish.updatedAt as string)),
				}))
				.sort((wishA: Wish, wishB: Wish) =>
					wishA.updatedAt > wishB.updatedAt ? -1 : 1
				);
			console.log(userWishes);
			yield put({
				type: actionTypes.SET_USER_WISHES,
				payload: userWishes,
			});
		}
	} catch (error) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'wishes',
				message:
					'Wystąpił błąd podczas pobierania listy życzeń, spróbuj ponownie później',
			},
		});
	}
}
