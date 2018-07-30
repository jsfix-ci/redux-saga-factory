import { baseDecorator, saga } from "../src/baseDecorators";
import { IS_SAGA_METADATA } from '../src/constants';
import "reflect-metadata";

describe("baseDecorators", () => {

  describe('@baseDecorator', () => {
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
  
    it("Should wrap a method outside of class", () => {
  
      const wrapped = baseDecorator("test-me", (name, method) => ('foo '+method()))(() => 'bar');
      expect(wrapped()).toEqual('foo bar')
    })

  })
 
  describe('@saga', () => {
    it("Should define saga with metadata", () => {
      class TestClass {
        @saga()
        someMethod() {}
      }
  
      const test = new TestClass();
      const meta = Reflect.getMetadata(IS_SAGA_METADATA, test, "someMethod");
      expect(meta).toEqual(true);
    });
  })

});
