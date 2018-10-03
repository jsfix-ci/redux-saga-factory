export declare function takeWrapper(action: any, saga: any): IterableIterator<import("redux-saga/effects").TakeEffect | import("redux-saga/effects").CallEffect>;
export declare function takeEveryWrapper(action: any, saga: any): IterableIterator<import("redux-saga/effects").ForkEffect>;
export declare function takeLatestWrapper(action: any, saga: any): IterableIterator<import("redux-saga/effects").ForkEffect>;
