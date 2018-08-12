import { AsyncStorage } from 'react-native';

const LOGIN: string = 'LOGIN', ASYNC_KEY: string = 'redditAuthToken', EXPIRE_ASYNC: string = 'redditExpireTime';

const loginUser = (token, timestamp) => ({
	type: LOGIN,
	token,
	timestamp
});

const startLoginUser = (token) => {
	return (dispatch) => {
		return new Promise(async (resolve, reject) => {
				if (token) {
					console.log('storing in AsyncStorage')
					try {
						await AsyncStorage.clear();
						await AsyncStorage.setItem(ASYNC_KEY, token);
						await AsyncStorage.setItem(EXPIRE_ASYNC, Date.now().toString())
						console.log('stored in AsyncStorage')
						dispatch(loginUser(token, Date.now()));
						resolve();
					} catch (err) {
						console.log(err);
						reject('Error setting token in async storage');
					}
				} else {
					reject('No token!');
				}
		});
	};
}

const startLoginIfTokenExists = () => {
	return (dispatch) => {
		return new Promise(async (resolve, reject) => {
			console.log('Checking for token in AsyncStorage')
			try {
				const token: string = await AsyncStorage.getItem(ASYNC_KEY);
				const expiryTime: string = await AsyncStorage.getItem(EXPIRE_ASYNC);
				if(expiryTime) {
					const timeDifference = Date.now() - Number(expiryTime);
					if (timeDifference >= 3600000) {
						// token is expired
						await AsyncStorage.removeItem(EXPIRE_ASYNC);
						await AsyncStorage.removeItem(ASYNC_KEY);
						dispatch(loginUser(''));
						resolve();
					} else {
						// token can still be used
						dispatch(loginUser(token));
						resolve();
					}
				} else {
					dispatch(loginUser(''));
					resolve();
				}
			} catch (err) {
				console.log(err);
				reject(err);
			}
		})
	}
}

export {
	LOGIN,
	loginUser,
	ASYNC_KEY,
	EXPIRE_ASYNC,
	startLoginUser,
	startLoginIfTokenExists
};