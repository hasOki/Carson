import { applyMiddleware, compose, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import AppReducers from 'reducers';

const loggerMiddleware = createLogger();
const store = createStore(
  AppReducers,
  undefined,
  compose(
    applyMiddleware(
      thunk,
      loggerMiddleware,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;

