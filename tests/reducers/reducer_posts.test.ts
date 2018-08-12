import PostsReducer, { initialState } from '../../src/reducers/reducer_posts';
import { FETCH_SUCCESS, FETCHING, FETCH_ERROR } from '../../src/actions/posts';

import hotposts from '../fixtures/hotposts';
import randomposts from '../fixtures/randomposts';

test('should set default posts test', () => {
	const state = PostsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
});

test('should set "hot" posts on fetch success', () => {
	const posts = hotposts;
	const subreddit = 'hot';
	const otherSubreddit = 'random';
	const action = {
		type: FETCH_SUCCESS,
		posts,
		subreddit
	};
	const state = PostsReducer(initialState, action);
	expect(state.items[subreddit]).toEqual(posts);
	expect(state.items[otherSubreddit]).toEqual([]);
	expect(state.isFetching).toBeFalsy();
	expect(state.error).toBeDefined();
});

test('should set "random" posts on fetch success', () => {
	const posts = randomposts;
	const subreddit = 'random';
	const otherSubreddit = 'hot';
	const action = {
		type: FETCH_SUCCESS,
		posts,
		subreddit
	};
	const state = PostsReducer(initialState, action);
	expect(state.items[subreddit]).toEqual(posts);
	expect(state.items[otherSubreddit]).toEqual([]);
	expect(state.isFetching).toBeFalsy();
	expect(state.error).toBe('');
});

test('should set fetching state on fetching', () => {
	const action = {
		type: FETCHING
	};
	const state = PostsReducer(initialState, action);
	expect(state.items).toBeDefined();
	expect(state.isFetching).not.toBeFalsy();
	expect(state.error).toBe('');
});

test('should set error message on fetch error', () => {
	const error = 'Unauthorized';
	const action = {
		type: FETCH_ERROR,
		error
	};
	const state = PostsReducer(initialState, action);
	expect(state.items).toBeDefined();
	expect(state.isFetching).toBeFalsy();
	expect(state.error).toBe(error);
});