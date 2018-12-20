import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticateUser } from './modules';
import LoginPage from './components';

const mapStateToProps = (state) => ({
	inValidUser : state.users
})

const mapDispatchToProps = {
  authenticateUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
