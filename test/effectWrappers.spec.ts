import "reflect-metadata";
import { createTestStore } from './createTestStore';
import { takeWrapper, takeEveryWrapper, takeLatestWrapper} from '../src/effectWrappers';

describe("Effect Wrappers", () => {

    it("takeWrapper", () => {
      const actionName = "some-action";
      const spy = jest.fn();

      const store = createTestStore(() =>
        takeWrapper(actionName, spy)
      );
      const action = { type: actionName, payload: 'foo'}
      store.dispatch(action);
      expect(spy).toBeCalledWith(action);
    });

    it("takeEveryWrapper", () => {
        const actionName = "some-action";
        const spy = jest.fn();
  
        const store = createTestStore(() =>
            takeEveryWrapper(actionName, spy)
        );
  
        const action = { type: actionName, payload: 'foo'}
        store.dispatch(action);
        expect(spy).toBeCalledWith(action)
    })

    it("takeLatestWrapper", () => {
        const actionName = "some-action";
        const spy = jest.fn();
  
        const store = createTestStore(() =>
            takeLatestWrapper(actionName, spy)
        );
  
        const action = { type: actionName, payload: 'foo'}
        store.dispatch(action);
        store.dispatch(action);
        store.dispatch(action);

        expect(spy).toBeCalledWith(action)
    })
  });