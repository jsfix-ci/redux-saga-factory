import "reflect-metadata";
import { Action, createStore, applyMiddleware } from "redux";
import sagaMiddlewareFactory from "redux-saga";
import "redux-snoop";

jest.mock("redux", () => {
  const inject = require("redux-snoop").injectReduxSnoop;
  return inject();
});
/**
 * Helper method to create a store with saga and spy on dispatched actions
 */
export function createTestStore(saga) {
    const reducer = (state = {}, action) => ( { ...state });
    const sagaMiddleware = sagaMiddlewareFactory();
  
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    
    if(typeof(saga)==='object'){
      Object.values(saga).forEach(item => sagaMiddleware.run(item))
    } else {
      sagaMiddleware.run(saga);
    }
    return store;
  }