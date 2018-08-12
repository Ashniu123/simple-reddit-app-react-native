import * as React from 'react';
import { shallow } from 'enzyme';

import Comment from '../../../../src/components/posts/comment/comment.component';

test('should render Comment component correctly', () => {
	const wrapper = shallow(<Comment />);
	expect(wrapper).toMatchSnapshot();
});