import "reflect-metadata";
export const IS_SAGA_METADATA = "isSaga";

/**
 * baseDecorator
 *
 * Generic decorator that wraps a given class method
 * and tag it with metadata
 */
export function baseDecorator(name: string, wrapper) {
  return function decorator(target, key, descriptor) {
    const original = descriptor.value;
    if (typeof original === "function") {
      Reflect.defineMetadata(IS_SAGA_METADATA, true, target, key);
      descriptor.value = function(...args) {
        return wrapper(name, original);
      };
    }
    return descriptor;
  };
}
