import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createUsersInfo } from '../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
	  email: '',
	  firstname: '',
	  lastname: '',
	  gender: '',
	  country: '',
      error: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
	const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
	
	if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }
	
	if (this.state.email && !filter.test(this.state.email)) {
		return this.setState({ error: 'Please provide a valid email address' });
	}

    if (!this.state.firstname) {
      return this.setState({ error: 'First Name is required' });
    }
	
	if (!this.state.lastname) {
      return this.setState({ error: 'Last Name is required' });
    }

    if (!this.state.gender) {
      return this.setState({ error: 'Gender is required' });
    }
	
	if (!this.state.country) {
      return this.setState({ error: 'Country is required' });
    }
	const data = {
	  "username": this.state.username,
	  "password": this.state.password,
	  "email": this.state.email,
      "firstname": this.state.firstname,
	  "lastname": this.state.lastname,
	  "gender": this.state.gender,
	  "country": this.state.country
	};
	this.props.createUsersInfo(this.props.history, data);
  }

  handleTextChange = (type) => (e) => {
	let data = {};
	data[type] = e.target.value;
	this.setState(data);
  }	
  
  resetAll = () => {
	const fields = {
		username: '',
		password: '',
		email: '',
		firstname: '',
		lastname: '',
		gender: '',
		country: ''
	};
	this.setState(fields);
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
	const countries = [{name: 'Please select', value: ''},{name: 'India', value: 'IN'},{name:'United States', value: 'US'},{name:'United Kingdom', value: 'UK'}];
    return (
      <div className="form-box">
		<h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3>
              {this.state.error}
            </h3>
          }
		<div className="input-box">
			<label>User Name</label>
			<input type="text" value={this.state.username} onChange={this.handleTextChange('username')} />
		</div>
		<div className="input-box">
			<label>Password</label>
			<input type="password" value={this.state.password} onChange={this.handleTextChange('password')} />
		</div>
		<div className="input-box">
			<label>Email</label>
			<input type="text" value={this.state.email} onChange={this.handleTextChange('email')} />
		</div>
		<div className="input-box">
			<label>First Name</label>
			<input type="text" value={this.state.firstname} onChange={this.handleTextChange('firstname')} />
		</div>
		<div className="input-box">
			<label>Last Name</label>
			<input type="text" value={this.state.lastname} onChange={this.handleTextChange('lastname')} />
		</div>
		<div className="input-box">
			<label>Gender</label>
			Male <input type="checkbox" value={'male'} checked={this.state.gender === 'male'} onChange={this.handleTextChange('gender')} />
			Female <input type="checkbox" value={'female'} checked={this.state.gender === 'female'} onChange={this.handleTextChange('gender')} />
		</div>
		<div className="input-box">
			<label>Country</label>
			<select name="country" onChange={this.handleTextChange('country')}>
			{countries.map((data, index) => {
			return (<option key={index} value={data.value} selected={this.state.country === data.value}>{data.name}</option>)
			})}
			</select>
		</div>
		<div>
		  <button name="signup">Sign Up</button>
		  <button name="reset" onClick={this.resetAll}>Reset</button>
	    </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createUsersInfo
}

export default withRouter(connect(null, mapDispatchToProps)(RegisterPage))
