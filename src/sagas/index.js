import { all } from 'redux-saga/effects';

import { watchIncrementAsync } from './counter';
// import { watchLoadTestData } from './test-data';


// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    // watchLoadTestData(),
  ]);
}
