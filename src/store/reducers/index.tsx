import { combineReducers } from 'redux';

import auth from './authReducer';
import draw from './drawReducer';
import wish from './wishReducer';
import friends from './friendsReducer';

export default combineReducers({
	auth,
	draw,
	wish,
	friends,
});
