import {
  put,
  takeEvery, // Позволяет производить отслеживание (тип события, выполняемый воркер)
  // call,
  delay,
} from 'redux-saga/effects';
import { INCREMENT, INCREMENT_ASYNC } from '../actions/counter';


// export const delay = ms => new Promise(res => setTimeout(res, ms))
export function* incrementAsyncWorker() {
  // yield call(delay, 1000);
  yield delay(1000);
  yield put({ type: INCREMENT });
}
export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncWorker);
}
