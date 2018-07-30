import "reflect-metadata";
import { take as takeEffect, call } from "redux-saga/effects";
import { bindAsyncAction } from "typescript-fsa-redux-saga";
  
export function* takeWrapper(action, saga, asyncAction?) {
  while (true) {
    const data = yield takeEffect(action);
    yield call(saga, data);
  }
}
