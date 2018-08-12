import * as React from 'react';
import { shallow } from 'enzyme';

import PostItem from '../../../../src/components/posts/postitem/postitem.component';

test('should render PostItem component correctly', () => {
	const wrapper = shallow(<PostItem />);
	expect(wrapper).toMatchSnapshot();
});