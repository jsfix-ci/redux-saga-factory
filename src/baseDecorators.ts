import { IS_SAGA_METADATA } from "./constants";
import { ActionCreator, AsyncActionCreators } from "typescript-fsa";
import { bindAsyncAction } from "typescript-fsa-redux-saga";

/**
 * baseDecorator
 *
 * Generic decorator that wraps a given class method
 * and tag it with metadata
 */

export function baseDecorator(
  action: string | ActionCreator<any>,
  wrapper,
  asyncAction?: AsyncActionCreators<any, any, any>
) {
  return function decorator(target, key?, descriptor?) {
    if (typeof target === "function" && (!key && !descriptor)) {
      if (asyncAction) {
        target = bindAsyncAction(asyncAction as any)(target);
      }
      return () => wrapper(action, target);
    } else {
      let original = descriptor.value;
      if (typeof original === "function") {
        addMetadata(target, key);

        if (asyncAction) {
          original = bindAsyncAction(asyncAction as any)(original);
        }
        descriptor.value = function(...args) {
          return wrapper(action, original);
        };
      }
      return descriptor;
    }
  };
}

/**
 * Generic saga decorator, simply marks a function with correct metadata
 */
export function saga() {
  return function decorator(target, key?, descriptor?) {
    let original = descriptor.value;
    if (typeof original === "function") {
        addMetadata(target, key);
    }
    return descriptor;
  };
}

function addMetadata(target, key) {
    Reflect.defineMetadata(IS_SAGA_METADATA, true, target, key);

}
