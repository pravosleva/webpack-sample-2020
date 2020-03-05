import {
  put,
  takeEvery, // Позволяет производить отслеживание (аргументы: тип события, выполняемый воркер)
  call,
  delay,
} from 'redux-saga/effects';
import {
  INCREMENT,
  INCREMENT_ASYNC,
} from '../actions/counter';


// export const delay = ms => new Promise(res => setTimeout(res, ms))
export function* incrementAsyncWorker() {
  // yield call(delay, 1000);
  yield delay(1000);
  yield put({ type: INCREMENT });

  if (window && window.toaster) {
    yield call(window.toaster.message, {
      text: 'ASYNC INC DONE',
      type: 'done',
      removeFromDOMByClick: true,
    });
  }
}
// Additional worker for example:
export function* incrementWorker() {
  if (window && window.toaster) {
    yield call(window.toaster.message, {
      text: 'INC DONE',
      type: 'done',
      removeFromDOMByClick: true,
    });
  }
}
export function* watchIncrementAsync() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncWorker);
  yield takeEvery(INCREMENT, incrementWorker);
}
