import * as React from 'react';
import { shallow } from 'enzyme';

import { HotPost } from '../../../src/components/posts/hotposts.component';

let startFetchPosts, navigation;

beforeEach(() => {
	startFetchPosts = jest.fn();
	navigation = { navigate: jest.fn() }
});

test('should render HotPost component correctly', () => {
	const wrapper = shallow(<HotPost 
		startFetchPosts={startFetchPosts}
		navigation={navigation}
	/>);
	expect(wrapper).toMatchSnapshot();
});

test('should startFetchPosts with "hot" if token exists and timestamp difference is lesser than 1 hr', () => {
	const token = 'Some Token';
	const timestamp = Date.now() + 3600;
	const wrapper = shallow(<HotPost
		startFetchPosts={startFetchPosts} 
		navigation={navigation}
		timestamp={timestamp}
		token={token}
	/>);
	expect(startFetchPosts).toHaveBeenCalledWith('hot');
	expect(navigation.navigate).not.toHaveBeenCalled();
});

test('should not startFetchPosts with "hot" if token exists and timestamp difference is greater than 1 hr', () => {
	const token = 'Some Token';
	const timestamp = 0; //beginning of UTC time :D
	const wrapper = shallow(<HotPost
		startFetchPosts={startFetchPosts}
		navigation={navigation}
		timestamp={timestamp}
		token={token}
	/>);
	expect(startFetchPosts).not.toHaveBeenCalled();
	expect(navigation.navigate).toHaveBeenCalledWith('Auth');
});

test('should not startFetchPosts with "hot" if token does not exists and timestamp difference is lesser than 1 hr', () => {
	const token = '';
	const timestamp = Date.now() + 3600;
	const wrapper = shallow(<HotPost
		startFetchPosts={startFetchPosts}
		navigation={navigation}
		timestamp={timestamp}
		token={token}
	/>);
	expect(startFetchPosts).not.toHaveBeenCalled();
	expect(navigation.navigate).toHaveBeenCalledWith('Auth');
});