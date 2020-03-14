import * as actionTypes from './actions/actionTypes';
import { DrawInterface, StateInterface } from '../interfaces/interfaces';

interface actionInterface {
	type: string;
	[key: string]: any;
}

const initalState: StateInterface = {
	usersDraws: [],
};

const reducer = (state = initalState, action: actionInterface) => {
	switch (action.type) {
		case actionTypes.USER_LOGIN:
			console.log('LOGGING IN... ... ...');
			return {
				...state,
				username: 'new user',
				email: 'test@test.pl',
				token: '#H$#&*GHE^T^DDDASioaaaa8823',
			};
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
			console.log('DELETING DRAW');
			return {
				...state,
				usersDraws: [
					...state.usersDraws.filter(
						// Replace with _id when backend addded!!!
						draw => draw.title !== action.deleteTitle
					),
				],
			};
	}
	return state;
};

export default reducer;
