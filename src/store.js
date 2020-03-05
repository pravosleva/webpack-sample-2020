import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from '@/reducers';
import rootSaga from '@/sagas';

// Create saga middlw:
const sagaMiddleware = createSagaMiddleware();

// Mount it on the store:
const isDev = process.env.NODE_ENV === 'development';
const middlewares = [];

if (isDev) middlewares.push(logger);
middlewares.push(sagaMiddleware);

export default createStore(rootReducer, applyMiddleware(...middlewares));

// Run the sagas:
sagaMiddleware.run(rootSaga);
