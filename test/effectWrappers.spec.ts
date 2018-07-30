import { createTestStore } from './createTestStore';
import { takeWrapper } from '../src/effectWrappers';

describe("takeWrapper", () => {

    it("Should take action", done => {
      const actionName = "some-action";
      const { store } = createTestStore(() =>
        takeWrapper(actionName, function*(action) {
          if (action.type === actionName) {
            done();
          } else {
            done("Wrong action received");
          }
        })
      );
      store.dispatch({ type: actionName });
    });
  });