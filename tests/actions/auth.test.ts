import { LOGIN, loginUser } from '../../src/actions/auth';

test('should generate login action correctly', () => {
	const token = 'Some Token';
	const timestamp = 0;
	const action = loginUser(token, timestamp);
	expect(action).toEqual({
		type: LOGIN,
		token,
		timestamp
	});
});