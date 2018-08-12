import { combineReducers } from 'redux';

import AuthReducer from './reducer_auth';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
	auth: AuthReducer,
	posts: PostsReducer
});

export default rootReducer;