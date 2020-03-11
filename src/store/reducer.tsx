import * as actionTypes from './actions/actionTypes';

interface stateTypes {
	username: null | string;
	email: null | string;
	token: null | string;
}

interface actionInterface {
	type: string;
	[key: string]: any;
}

const initalState: stateTypes = {
	username: null,
	email: null,
	token: null,
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
	}
	return state;
};

export default reducer;
