import { createStore,
    combineReducers,
    compose,
    applyMiddleware 
} from "redux";

import reducers from './reducers';

import reduxThunk from "redux-thunk";

// if you're also using redux-thunk, add it as a middleware
const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk))(createStore);

const rootReducer = combineReducers({
    reducers
});

export default function configureStore(initialState = {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
};