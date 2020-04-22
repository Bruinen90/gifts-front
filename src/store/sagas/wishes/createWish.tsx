import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

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
		} else {
			if (newWishId) {
				yield put({
					type: actionTypes.CREATE_WISH,
					payload: {
						...reducerPayload,
						_id: newWishId,
					},
				});
			} else {
				// Here comes logic for error handling, probably some snackbar
			}
		}
	} catch (err) {
		console.log(err);
	}
}
