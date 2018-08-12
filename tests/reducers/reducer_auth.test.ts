import AuthReducer, { initialState } from '../../src/reducers/reducer_auth';
import { LOGIN } from '../../src/actions/auth';

test('should set default auth test', () => {
	const state = AuthReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
});

test('should set token & timestamp on login', () => {
	const token = 'Some Token';
	const timestamp = 0;
	const action = {
		type: LOGIN,
		token,
		timestamp
	};
	const state = AuthReducer(initialState, action);
	expect(state.token).toBe(token);
	expect(state.timestamp).toBe(timestamp);
});