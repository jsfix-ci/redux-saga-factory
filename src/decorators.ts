import { baseDecorator } from './baseDecorators';
import { takeWrapper, takeEveryWrapper, takeLatestWrapper} from './effectWrappers';
import {
    ActionCreator,
    AsyncActionCreators
  } from "typescript-fsa";
  
 function take(action: string | ActionCreator<any>, asyncAction?: AsyncActionCreators<any, any, any>){
    return baseDecorator(action, takeWrapper, asyncAction);
  }
  
 function takeEvery(action: string | ActionCreator<any>, asyncAction?: AsyncActionCreators<any, any, any>){
    return baseDecorator(action, takeEveryWrapper, asyncAction);
  }
  
 function takeLatest(action: string | ActionCreator<any>, asyncAction?: AsyncActionCreators<any, any, any>){
    return baseDecorator(action, takeLatestWrapper, asyncAction);
  }
  
  export { take}