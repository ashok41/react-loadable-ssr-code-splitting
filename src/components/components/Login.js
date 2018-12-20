import React from 'react';
import { Link } from 'react-router-dom';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
	this.error = null;
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillReceiveProps(newProps) {
	if(newProps.inValidUser) {
		this.error = 'Username & Password is invalid';
	}
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

	this.props.authenticateUser(this.props.history, this.state.username, this.state.password);
    //Username & Password is invalid
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="form-box">
		<h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3>
              {this.state.error}
            </h3>
          }
		  {
            this.error &&
            <h3>
              {this.error}
            </h3>
          }
          <div className="input-box">
			<label>User Name</label>
			<input type="text" value={this.state.username} onChange={this.handleUserChange} />
		  </div>
		  <div className="input-box">
			<label>Password</label>
			<input type="password" value={this.state.password} onChange={this.handlePassChange} />
		  </div>
          <div><button name="login">Log In</button></div>
        </form>
		<div className="signup"><Link to='register'>Sign Up</Link></div>
      </div>
    );
  }
}

export default LoginPage
