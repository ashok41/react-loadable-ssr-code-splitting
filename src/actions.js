import axios from 'axios';
import { config } from './components/utils/config';
export const CREATE_USER_INFO = 'CREATE_USER_INFO'
export const USERS_INFO = 'USERS_INFO'
export const AUTHENTICATE = 'AUTHENTICATE'

export const createUsersInfo = (history, param) => {
  return dispatch => {
    axios.post(config.apiUrl + 'users', param)
	.then((response) => {
		localStorage.setItem('username', param.username);
		history.push('/');
	});
  };
}

export const authenticateUser = (history, username, password) => {
  return dispatch => {
    axios.get(config.apiUrl + 'users?username=' + username + '&password=' + password)
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

export const getUsers = () => {
  return dispatch => {		
	axios.get(config.apiUrl + 'users?username=' + localStorage.getItem('username'))
	.then(response => {
		const data = response.data[0];
		dispatch({
		  type: USERS_INFO,
		  users: data
		});
	}).catch(err => {
		console.error(err);
	});
    
  };
}


