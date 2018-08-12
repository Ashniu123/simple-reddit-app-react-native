import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import Login from '../components/login/login.component';
import HotPosts from '../components/posts/hotposts.component';
import RandomPosts from '../components/posts/randomposts.component';

export const AppStack = createBottomTabNavigator(
	{
		Hot: HotPosts,
		Random: RandomPosts
	}, {
		tabBarOptions: {
			activeTintColor: 'tomato',
			inactiveTintColor: 'gray',
		},
	}
);

export const AuthStack = createStackNavigator({
	Login
});

export default createSwitchNavigator({
	Auth: AuthStack,
	App: AppStack
}, {
		initialRouteName: 'Auth'
	});