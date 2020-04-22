import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../../actions/actionTypes';

// Types
import { DrawInterface } from '../../../types/Draw';

export function* createDraw(action: { type: string; payload: DrawInterface }) {
	const { _id, title, date, price, creator, participants } = action.payload;
	const graphqlQuery = {
		query: `
			mutation CreateNewDraw($_id: ID, $title: String!, $date: String!, $price: Int!, $creator: ID!, $participants: [ID!]!) { 
				createDraw(drawInput:
					{
						title: $title, 
						date: $date, 
						price: $price, 
						creator: $creator, 
                        participants: $participants
                        _id: $_id
					}
				) 
				{_id}
			}
		`,
		variables: {
			_id: _id,
			title: title,
			date: date,
			price: price,
			creator: creator._id,
			participants: participants!.map(participant => participant._id),
		},
	};
	try {
		const response = yield axios.post('graphql', graphqlQuery);
		const drawId = response.data.data.createDraw._id;
		if (_id === drawId) {
			yield put({
				type: actionTypes.UPDATE_DRAW,
				payload: action.payload,
			});
		} else {
			yield put({
				type: actionTypes.CREATE_DRAW,
				payload: {
					...action.payload,
					_id: drawId,
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
}
