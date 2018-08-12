import { FETCH_SUCCESS, FETCHING, FETCH_ERROR } from '../actions/posts';

export const initialState = { items: { hot: [], random: [] }, isFetching: false, error: '' };

export default (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_SUCCESS:
			return {
				items: {
					...state.items,
					[action.subreddit]: action.posts || [],
				},
				isFetching: false,
				error: ''
			}
		case FETCHING:
			return {
				...state,
				isFetching: true,
				error: ''
			};
		case FETCH_ERROR:
			return {
				...state,
				isFetching: false,
				error: action.error
			};
		default:
			return state;
	}
};