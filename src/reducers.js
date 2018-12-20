//import { combineReducers } from 'redux'

/* reducers */
import * as types from './actions';

function makeRootReducer(state = [], action) {
  switch(action.type) {

    case types.AUTHENTICATE:
      return Object.assign({}, state, { users: action.users });

  	case types.USERS_INFO:
      return Object.assign({}, state, { users: action.users });

  }
  return state;
}

/*export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}

export const injectReducer = (asyncReducers, { key, reducer }) => {
  if (Object.hasOwnProperty.call(asyncReducers, key)) return

  asyncReducers[key] = reducer
  makeRootReducer(asyncReducers)
}*/

export default makeRootReducer;