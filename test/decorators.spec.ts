import "reflect-metadata";
import { take } from "../src/decorators";
import { takeWrapper } from "../src/effectWrappers";
import * as BaseDecorator from "../src/baseDecorators";

describe("Decorators", () => {
  it("@take -> takeWrapper", () => {
    jest.spyOn(BaseDecorator, "baseDecorator");
    const actionName = "test-action";

    class TestClass {
      @take(actionName)
      *someMethod() {}
    }

    expect(BaseDecorator.baseDecorator).toBeCalledWith(actionName, takeWrapper, undefined);
  });
});
