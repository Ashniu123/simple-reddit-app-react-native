import * as React from 'react';
import { shallow } from 'enzyme';

import { Login } from '../../../src/components/login/login.component';

let startLoginUser, startLoginIfTokenExists, navigation;

beforeEach(() => {
	startLoginUser = jest.fn();
	startLoginIfTokenExists = jest.fn();
	navigation = { navigate: jest.fn() }
});

test('should render Login component correctly', () => {
	const wrapper = shallow(<Login
		startLoginUser={startLoginUser}
		startLoginIfTokenExists={startLoginIfTokenExists}
		navigation={navigation}
	/>);
	expect(startLoginIfTokenExists).toHaveBeenCalled();
	expect(wrapper).toMatchSnapshot();
});

test('should redirect to "App" if token exists', () => {
	const token = 'Some Token';
	const wrapper = shallow(<Login
		startLoginUser={startLoginUser}
		startLoginIfTokenExists={startLoginIfTokenExists}
		navigation={navigation}
		token={token}
	/>);
	expect(navigation.navigate).toHaveBeenCalledWith('App');
});

test('should not redirect to "App" if token not exists', () => {
	const token = '';
	const wrapper = shallow(<Login
		startLoginUser={startLoginUser}
		startLoginIfTokenExists={startLoginIfTokenExists}
		navigation={navigation}
		token={token}
	/>);
	expect(navigation.navigate).not.toHaveBeenCalled();
});