import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {rootReducer} from '../Reducers/rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk))
export const store = createStore(rootReducer, enhancer);