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
			const { username } = action.payload;
			return {
				...state,
				username: username,
				// Replace with real data when backend added
				email: 'test@test.pl',
				token: '#H$#&*GHE^T^DDDASioaaaa8823',
			};
		case actionTypes.USER_LOGOUT:
			console.log('LOGGING OUT...');
			const loggedOutState = { ...state };
			delete loggedOutState.username;
			delete loggedOutState.email;
			delete loggedOutState.token;
			return loggedOutState;
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
						// Replace with _id when backend addded!!!
						draw => draw.title !== action.payload
					),
				],
			};
	}
	return state;
};

export default reducer;
