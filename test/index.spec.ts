import "reflect-metadata";
import { take } from "../src";
import { createTestStore } from "./createTestStore";
import { SagaFactory } from "../src";
import {
  AsyncActionCreators,
  actionCreatorFactory,
  ActionCreator
} from "typescript-fsa";

describe("redux-saga-factory", () => {
  it("Should wrap an instance of class method with fsa action", done => {
    const actionCreator = actionCreatorFactory();

    const action = actionCreator<{ test: string }>("SUBMIT_ACTION");

    class SagaFac extends SagaFactory {
      @take(action)
      *someSaga() {
        done();
      }
    }

    const instance = new SagaFac();
    const store = createTestStore(instance.getSagas());
    store.dispatch(action({ test: "world" }));
  });

  it("Should wrap an indipendent method", done => {
    const action = "some-action";
    function* someSaga(data) {
      done();
    }
    const saga = take(action)(someSaga);

    const store = createTestStore(saga);
    store.dispatch({ type: action, foo: "bar" });
  });
});
