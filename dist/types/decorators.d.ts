import { ActionCreator, AsyncActionCreators } from "typescript-fsa";
declare function take(action: string | ActionCreator<any>, asyncAction?: AsyncActionCreators<any, any, any>): (target: any, key?: any, descriptor?: any) => any;
export { take };
