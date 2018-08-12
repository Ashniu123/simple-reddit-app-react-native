const FETCH_SUCCESS: string = 'FETCH_SUCCESS', FETCHING: string = 'FETCHING', FETCH_ERROR: string = 'FETCH_ERROR';

const fetchPostsSuccess = (posts, subreddit) => ({
	type: FETCH_SUCCESS,
	posts,
	subreddit
});

const fetchingPosts = () => ({
	type: FETCHING
});

const fetchPostsError = (error) => ({
	type: FETCH_ERROR,
	error
});

const startFetchPosts = (endpoint) => {
	return (dispatch, getState) => {
		const FETCH_URI: string = 'https://oauth.reddit.com/' + endpoint;
		const token: string = getState().auth.token;
		console.log('Fetching posts!', token);
		dispatch(fetchingPosts());
		fetch(FETCH_URI, {
			headers: { 'Authorization': `bearer ${token}` }
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.hasOwnProperty('error') && res.error === 401) {
					dispatch(fetchPostsError(res.message));
				} else {
					let items;
					if(Array.isArray(res)) {
						items = res.reduce((prev, curr) => prev.concat(curr.data.children), []);
					} else {
						items = res.data.children;
					}
					console.log(endpoint, items);
					dispatch(fetchPostsSuccess(items, endpoint))
				}
			})
			.catch((err) => {
				console.log('error', err)
				dispatch(fetchPostsError(err));
			});
	}
}

export {
	FETCH_SUCCESS,
	fetchPostsSuccess,
	FETCHING,
	fetchingPosts,
	fetchPostsError,
	FETCH_ERROR,
	startFetchPosts
};