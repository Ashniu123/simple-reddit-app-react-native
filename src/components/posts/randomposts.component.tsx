import * as React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import styles from './posts.style';


import PostItem from './postitem/postitem.component';
import Comment from './comment/comment.component';
import Loading from '../loading/loading.component';

import { startFetchPosts } from '../../actions/posts';

export class RandomPost extends React.Component {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
		this.handleRefresh = this.handleRefresh.bind(this);
	}

	componentDidMount() {
		this.handleRefresh();
	}

	renderItem({ item }) {
		const { data, kind } = item;
		if (kind === 't3') {
			const { subreddit_name_prefixed, thumbnail = null, title, id } = data;
			const importantData = { subreddit: subreddit_name_prefixed, thumbnail, title, id };
			return <PostItem {...importantData} />;
		} else {
			const { subreddit_name_prefixed, body, author, id } = data;
			const importantData = { subreddit: subreddit_name_prefixed, body, author, id };
			return <Comment {...importantData} />;
		}
	}

	handleRefresh() {
		// can refresh only if token is not expired
		if (Date.now() - this.props.timestamp < 3600000 && this.props.token && this.props.token.length > 0) {
			this.props.startFetchPosts('random');
		} else {
			this.props.navigation.navigate('Auth');
		}
	}

	render() {
		return this.props.isFetching ?
			<View style={styles.container}><Loading /></View> :
			this.props.error ? <View style={styles.container}>
				<Text>Error: {this.props.error}</Text>
			</View> :
				<FlatList
					data={this.props.posts}
					renderItem={this.renderItem}
					keyExtractor={(item) => item.data.id}
					refreshControl={
						<RefreshControl
							refreshing={this.props.isFetching}
							onRefresh={this.handleRefresh}
						/>
					}
				/>
	}
}

const mapStateToProps = (state) => ({
	posts: state.posts.items.random,
	isFetching: state.posts.isFetching,
	error: state.posts.error,
	token: state.auth.token,
	timestamp: state.auth.timestamp
});

const mapStateToDispatch = (dispatch) => ({
	startFetchPosts: (endpoint) => dispatch(startFetchPosts(endpoint))
});

export default connect(mapStateToProps, mapStateToDispatch)(RandomPost);