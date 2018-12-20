import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions';

class Dashboard extends React.Component {
	constructor(props) {
	  	super(props);
		this.user = null;
    	props.getUsers();
  	}

  	componentWillUpdate(newProps) {
  		this.user = newProps.users;
  	}
	
	logout = () => {
		localStorage.removeItem('username');
		this.props.history.push('login');
	}

  	render () {
		if(this.user) {
			return (
				<div>
					<h1>Hi, {this.user.firstname} {this.user.lastname}</h1>
					<div className="lists">Users Information</div>
					<div>Gender: {this.user.gender}</div>
					<div>Country: {this.user.country}</div>
					<div className="logout" onClick={this.logout}>Logout</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {
  getUsers
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
