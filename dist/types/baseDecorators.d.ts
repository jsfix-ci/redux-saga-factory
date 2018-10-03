import { ActionCreator, AsyncActionCreators } from "typescript-fsa";
/**
 * baseDecorator
 *
 * Generic decorator that wraps a given class method
 * and tag it with metadata
 */
export declare function baseDecorator(action: string | ActionCreator<any>, wrapper: any, asyncAction?: AsyncActionCreators<any, any, any>): (target: any, key?: any, descriptor?: any) => any;
/**
 * Generic saga decorator, simply marks a function with correct metadata
 */
export declare function saga(): (target: any, key?: any, descriptor?: any) => any;
