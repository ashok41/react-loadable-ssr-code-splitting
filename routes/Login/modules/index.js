import axios from 'axios';
import { config } from '../../../utils/config';
import { injectReducer } from '../../../reducers'


export const AUTHENTICATE = 'AUTHENTICATE'


export const authenticateUser = (history, username, password) => {
  return dispatch => {
    axios.get(config.baseUrl + 'api/users?username=' + username + '&password=' + password)
	.then((response) => {
		const data = response.data;
		if(data.length > 0) {
			localStorage.setItem('username', username);
			history.push('/');
		} else {
			dispatch({
			  type: AUTHENTICATE,
			  users: 'invalid'
			});
		}
	});
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case AUTHENTICATE:
      return Object.assign({}, state, { users: action.users });
    default:
      return state
  }
}

injectReducer({}, { key: 'login', reducer })