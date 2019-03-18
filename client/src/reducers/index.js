import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import vacationReducer from './vacationReducer';

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	vacation: vacationReducer
});
