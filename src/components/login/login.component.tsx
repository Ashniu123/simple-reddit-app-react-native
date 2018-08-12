import * as React from 'react';
import { WebView, Alert } from 'react-native';
import { connect } from 'react-redux';

import styles from './login.style';

import { startLoginUser, startLoginIfTokenExists } from '../../actions/auth';

export class Login extends React.Component {
	static navigationOptions = {
		title: 'Login to Reddit',
		headerTitleStyle: styles.header__text
	};

	constructor(props) {
		super(props);

		this.handleNavigationStateChange = this.handleNavigationStateChange.bind(this);

		if(this.props.token && this.props.token.length > 0) {
			this.props.navigation.navigate('App');
		}
	}

	async componentDidMount() {
		try {
			await this.props.startLoginIfTokenExists();
		} catch(err) {
			Alert.alert(JSON.stringify(err));
		}
	}

	handleNavigationStateChange(navState) {
		if (navState.url.indexOf('callback://login#') === 0) {
			const accessToken: string = navState.url.match(/^callback:\/\/login#access_token=(.+)&token.*/)[1];
			this.props.startLoginUser(accessToken)
				.then(() => {
					this.props.navigation.navigate('App');
				})
				.catch((err) => {
					Alert.alert('Invalid auth');
					console.log(err);
				});
		}
	}

	render() {
		const REDDIT_APP_ID: string = 'V99jnyVaW3mbNQ';
		const LOGIN_URL: string = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_APP_ID}&response_type=token&
		state=RANDOM_STRING&redirect_uri=callback://login&scope=read`;
		return <WebView
			source={{ uri: LOGIN_URL }}
			onNavigationStateChange={this.handleNavigationStateChange}
		/>
	}
}

const mapStateToProps = (state) => ({
	token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
	startLoginUser: (token) => dispatch(startLoginUser(token)),
	startLoginIfTokenExists: () => dispatch(startLoginIfTokenExists())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
