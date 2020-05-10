import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';
import * as actionCreators from '../../actions/actionCreators';

// Types
import { WishInput } from '../../../types/WishTypes';

export function* createWish(action: { type: string; payload: WishInput }) {
	const { _id, title, description, link, price } = action.payload;
	const graphqlQuery = {
		query: `
            mutation CreateNewWish($_id: ID, $title: String!, $description: String, $link: String, $price: Int!) {
                createWish(wishInput:
                    {
                        title: $title,
                        description: $description,
                        link: $link,
                        price: $price,
                        _id: $_id,
                    }
                )
                {_id imageUrl}
            }
        `,
		variables: {
			title: title,
			description: description,
			link: link,
			price: price,
			_id: _id,
		},
	};
	yield put(
		actionCreators.setLoading({
			loading: true,
			category: 'wishes',
			type: 'new-record',
		})
	);
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		const responseData = response.data.data.createWish;
		const newWishId = responseData._id;
		let newWishImgUrl = responseData.imageUrl;
		let reducerPayload;
		if (newWishImgUrl) {
			reducerPayload = { ...action.payload, imageUrl: newWishImgUrl };
		} else {
			reducerPayload = action.payload;
		}
		if (newWishId === _id) {
			yield put({
				type: actionTypes.UPDATE_WISH,
				payload: reducerPayload,
			});
			yield put(
				actionCreators.setSuccess({
					page: 'wishes',
					id: 'edit-wish',
					message: `Życzenie "${title}" zostało zaktualizowane`,
				})
			);
		} else {
			if (newWishId) {
				yield put({
					type: actionTypes.CREATE_WISH,
					payload: {
						...reducerPayload,
						_id: newWishId,
					},
				});
				yield put(
					actionCreators.setSuccess({
						page: 'wishes',
						id: 'create-wish',
						message: `Życzenie "${title}" zostało utworzone`,
					})
				);
			} else {
				throw new Error();
			}
		}
	} catch (err) {
		yield put({
			type: actionTypes.SET_ERROR,
			payload: {
				category: 'wishes',
				message:
					'Wystąpił błąd podczas tworzenia życzenia, spróbuj ponownie później',
			},
		});
	}
	yield put(
		actionCreators.setLoading({
			loading: false,
		})
	);
}
