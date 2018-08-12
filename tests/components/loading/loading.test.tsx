import * as React from 'react';
import { shallow } from 'enzyme';

import Loading from '../../../src/components/loading/loading.component';

test('should render Loading component correctly', () => {
	const wrapper = shallow(<Loading />);
	
	expect(wrapper).toMatchSnapshot();
});