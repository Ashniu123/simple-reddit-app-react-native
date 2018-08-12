import {
	FETCH_SUCCESS,
	fetchPostsSuccess,
	FETCHING,
	fetchingPosts,
	FETCH_ERROR,
	fetchPostsError
} from '../../src/actions/posts';

import hotposts from '../fixtures/hotposts';

test('should generate fetch success action correctly', () => {
	const posts = hotposts;
	const subreddit = hotposts[0].subreddit_name_prefixed;
	const action = fetchPostsSuccess(posts, subreddit);
	expect(action).toEqual({
		type: FETCH_SUCCESS,
		posts,
		subreddit
	});
});

test('should generate fetching action correctly', () => {
	const action = fetchingPosts();
	expect(action).toEqual({
		type: FETCHING,
	});
});

test('should generate fetch error action correctly', () => {
	const error = 'Unauthorized';
	const action = fetchPostsError(error);
	expect(action).toEqual({
		type: FETCH_ERROR,
		error
	});
});