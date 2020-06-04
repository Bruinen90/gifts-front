import { put } from 'redux-saga/effects';
import axios from 'axios';
import { Wish } from '../../../types/WishTypes';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

export function* fetchUserWishes(action?: {
	type?: any;
	payload?: { userId: string };
}) {
	if (action && action.payload) {
		// Fetching for other user
		yield put(
			actionCreators.setLoading({
				loading: true,
				category: 'wishes',
				type: 'fetching-records',
				recordId: action.payload.userId,
			})
		);
		try {
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
                                reserved 
                                done 
                                updatedAt 
                                buyer { _id }
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
		} catch (err) {
			yield put(
				actionCreators.setError({
					category: 'wishes',
					message:
						'Wystąpił błąd podczas pobierania listy życzeń dla tego użytkownika',
				})
			);
		}
		yield put(actionCreators.setLoading({ loading: false }));
	} else {
		try {
			// Fetch for currently logged in user
			if (axios.defaults.headers.common['Authorization']) {
				const graphqlQuery = {
					query: `
                    {
                        userWishes { 
                            _id 
                            title 
                            link 
                            imageUrl 
                            description 
                            price 
                            reserved 
                            done 
                            updatedAt 
                            buyer { _id username } 
                        }
                    }
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
				yield put({
					type: actionTypes.SET_USER_WISHES,
					payload: userWishes,
				});
			}
		} catch (error) {
			yield put(
				actionCreators.setError({
					category: 'wishes',
					message:
						'Wystąpił błąd podczas pobierania listy życzeń dla tego użytkownika',
				})
			);
		}
	}
}
