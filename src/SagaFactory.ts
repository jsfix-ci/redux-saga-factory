
import { IS_SAGA_METADATA } from "./constants";

export class SagaFactory {

  static fromMetadata(cls) {
    return getSagasFromObj(cls);
  }

  getSagas() {
    return getSagasFromObj(this);
  }

}

function getSagasFromObj(obj) {
  const me = Object.getPrototypeOf(obj);
  const funcs = Object.getOwnPropertyNames(me);
  const sagas = {};

  funcs.forEach(func => {
    const isSaga = Reflect.getMetadata(IS_SAGA_METADATA, obj, func);
    if (isSaga === true) {
      sagas[func] = obj[func];
    }
  });
  return sagas;
}
