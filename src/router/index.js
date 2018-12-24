import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch, Redirect } from 'react-router-dom';

//import asyncComponent from "../asyncComponent";
//import LoadingComponent from "../LoadingComponent";

//const AsyncLogin = asyncComponent(() => import("../components/Login"), LoadingComponent);
const AsyncLogin = Loadable({
    loader: () => import('../components/Login'),
    loading: () => <div>loading page...</div>
    //modules: ['Login'],
});
//const AsyncRegister = asyncComponent(() => import("../components/Register"), LoadingComponent);
const AsyncRegister = Loadable({
    loader: () => import('../components/Register'),
    loading: () => <div>loading page...</div>
    //modules: ['Register'],
});
//const AsyncDashboard = asyncComponent(() => import("../components/Dashboard"), LoadingComponent);
const AsyncDashboard = Loadable({
    loader: () => import('../components/Dashboard'),
    loading: () => <div>loading page...</div>
    //modules: ['Dashboard'],
});
const NotFound = Loadable({
    loader: () => import('../components/NotFound'),
    loading: () => <div>loading page...</div>
    //modules: ['Dashboard'],
});
const GLOBAL_WINDOW = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this;

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      GLOBAL_WINDOW.localStorage && GLOBAL_WINDOW.localStorage.getItem('username') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default () => {
	return (
	  <div>
		<Switch>
		  <Route path={'/login'} component={AsyncLogin} />
		  <Route path={'/register'} component={AsyncRegister} />
		  <PrivateRoute exact path={'/'} component={AsyncDashboard} />
		  <Route component={NotFound} />
		</Switch>
	  </div>
	);
}
/*export default [
  {
    component: AsyncDashboard,
    path: '/',
    exact: true
  },
  {
    component: AsyncLogin,
    path: '/login'
  },
  {
    component: AsyncRegister,
    path: '/register'
  }
];*/