import "reflect-metadata";
import { take } from "../src/decorators";
import { actionCreatorFactory } from "typescript-fsa";
import { createTestStore } from "./createTestStore";
import { SagaFactory } from "../src/SagaFactory";

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

    class TestClass extends SagaFactory {
      @take(action, asyncAction)
      *someMethod() {}
    }

    const test = new TestClass();
    const store = createTestStore(test.getSagas());
    store.dispatch(action({ test: 'actions' }));
    const steps = store.snoop.getSteps();
    expect(steps).toHaveLength(3);
    expect(steps[0].action.type).toEqual("REGULAR_ACTION");
    expect(steps[1].action.type).toEqual("ASYNC_ACTION_STARTED");
    expect(steps[2].action.type).toEqual("ASYNC_ACTION_DONE");
  });
});
