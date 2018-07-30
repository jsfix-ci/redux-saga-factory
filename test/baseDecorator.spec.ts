import { IS_SAGA_METADATA, baseDecorator } from "../src/baseDecorator";

describe("baseDecorator", () => {
  it("Should define saga with metadata", () => {
    class TestClass {
      @baseDecorator("test-me", () => {})
      someMethod() {}
    }

    const test = new TestClass();
    const meta = Reflect.getMetadata(IS_SAGA_METADATA, test, "someMethod");
    expect(meta).toEqual(true);
  });

  it("Should wrap method with given wrapper", () => {
    const resultValue = "hello-world";

    class TestClass {
      @baseDecorator("test-me", () => {
        return resultValue;
      })
      someMethod() {}
    }

    const test = new TestClass();
    const result = test.someMethod();

    expect(result).toEqual(resultValue);
  });
});
