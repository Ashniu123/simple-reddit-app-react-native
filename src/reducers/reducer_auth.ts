import { LOGIN } from '../actions/auth';

export const initialState = { token: '', timestamp: 0 };

export default (state: Object = initialState, action: any) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				token: action.token,
				timestamp: action.timestamp
			};
		default:
			return state;
	}
};