import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions';
import LoginPage from './components/Login';

const mapStateToProps = (state) => ({
	inValidUser : state.users
})

const mapDispatchToProps = {
  authenticateUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
