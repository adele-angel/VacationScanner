import { ADD_VACATION, GET_VACATIONS, GET_VACATION, DELETE_VACATION, VACATION_LOADING } from '../actions/types';

const initialState = {
	vacations: [],
	vacation: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case VACATION_LOADING:
			return { ...state, loading: true };
		case GET_VACATIONS:
			return {
				...state,
				vacations: action.payload,
				loading: false
			};
		case GET_VACATION:
			return {
				...state,
				vacation: action.payload,
				loading: false
			};
		case ADD_VACATION:
			return {
				...state,
				vacations: [action.payload, ...state.vacations]
			};
		case DELETE_VACATION:
			return {
				...state,
				vacations: state.vacations.filter(vacation => vacation._id !== action.payload)
			};
		default:
			return state;
	}
}
