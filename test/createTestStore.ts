
import { Action, createStore, applyMiddleware } from "redux";
import sagaMiddlewareFactory from "redux-saga";

/**
 * Helper method to create a store with saga and spy on dispatched actions
 */
export function createTestStore(saga) {
    let actions: any[] = [];
    const reducer = (state = {}, action) => {
      actions.push(action);
      return { ...state };
    };
    const sagaMiddleware = sagaMiddlewareFactory();
  
    const store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(saga);
    return { actions, store };
  }