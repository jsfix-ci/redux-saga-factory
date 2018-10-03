"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var typescript_fsa_redux_saga_1 = require("typescript-fsa-redux-saga");
/**
 * baseDecorator
 *
 * Generic decorator that wraps a given class method
 * and tag it with metadata
 */
function baseDecorator(action, wrapper, asyncAction) {
    return function decorator(target, key, descriptor) {
        if (typeof target === "function" && (!key && !descriptor)) {
            if (asyncAction) {
                target = typescript_fsa_redux_saga_1.bindAsyncAction(asyncAction)(target);
            }
            return function () { return wrapper(action, target); };
        }
        else {
            var original_1 = descriptor.value;
            if (typeof original_1 === "function") {
                addMetadata(target, key);
                if (asyncAction) {
                    original_1 = typescript_fsa_redux_saga_1.bindAsyncAction(asyncAction)(original_1);
                }
                descriptor.value = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return wrapper(action, original_1);
                };
            }
            return descriptor;
        }
    };
}
exports.baseDecorator = baseDecorator;
/**
 * Generic saga decorator, simply marks a function with correct metadata
 */
function saga() {
    return function decorator(target, key, descriptor) {
        var original = descriptor.value;
        if (typeof original === "function") {
            addMetadata(target, key);
        }
        return descriptor;
    };
}
exports.saga = saga;
function addMetadata(target, key) {
    Reflect.defineMetadata(constants_1.IS_SAGA_METADATA, true, target, key);
}
//# sourceMappingURL=baseDecorators.js.map