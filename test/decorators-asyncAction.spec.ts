import "reflect-metadata";
import { take } from "../src/decorators";
import { actionCreatorFactory } from "typescript-fsa";
import { createTestStore } from './createTestStore';
import { SagaFactory } from '../src/Sagafactory';

describe("Decorators with asyncAction", () => {
  it("Should wrap with asyncAction", async () => {
    const actionCreator = actionCreatorFactory();

    const action = actionCreator<{ test: any }>("REGULAR_ACTION");
    const asyncAction = actionCreator.async<
      {
        type: string;
        payload: {
          foo: string;
        };
      },
      void
    >("ASYNC_ACTION");
    const resultValue = "hello-world";

    class TestClass extends SagaFactory{
        @take(action, asyncAction)
        *someMethod() {}

      }
  
      const test = new TestClass();
      const { store, actions } = createTestStore(test.getSagas());
      store.dispatch(action({test: actions}));
      expect(actions.length).toEqual(4);
      expect(actions[1].type).toEqual('REGULAR_ACTION');
      expect(actions[2].type).toEqual('ASYNC_ACTION_STARTED');
      expect(actions[3].type).toEqual('ASYNC_ACTION_DONE');


  });
});
