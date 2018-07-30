import { take, call, fork, takeEvery, takeLatest } from "redux-saga/effects";

export function* takeWrapper(action, saga) {
  while (true) {
    const data = yield take(action);
    yield call(saga, data);
  }
}

export function* takeEveryWrapper(action, saga) {
  yield takeEvery(action, saga);
}

export function* takeLatestWrapper(action, saga) {
  yield takeLatest(action, saga);
}
