import '@babel/polyfill';
import { runSaga } from 'redux-saga';
import { delay } from 'redux-saga/effects';

import { incrementAsyncWorker } from '../counter';

test('Increment async', async () => {
  const dispatchedActions = [];

  const fakeStore = {
    getState: () => null,
    dispatch: action => dispatchedActions.push(action),
  };

  try {
    const result = await runSaga(
      fakeStore,
      incrementAsyncWorker,
      { type: 'INCREMENT_ASYNC' }
    ).toPromise();
  } catch (err) {
    console.log(err);
  }

  dispatchedActions.forEach(a => console.log(a));

  expect(dispatchedActions).toContainEqual({ type: 'INCREMENT' });
  // expect(dispatchedActions).toContainEqual({
  //   type: 'PUT_TEST_DATA',
  //   payload: {
  //     errors: {
  //       name: 'FetchError',
  //       message: 'request to https://autoparser.ru/parsertest failed, reason: unable to verify the first certificate',
  //       type: 'system',
  //       errno: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  //       code: 'UNABLE_TO_VERIFY_LEAF_SIGNATURE',
  //     },
  //   },
  // });
  expect(dispatchedActions).toContainEqual({ type: 'INCREMENT' });
});
