import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { take, call } from 'redux-saga/effects';

var IS_SAGA_METADATA = "isSaga";

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
                target = bindAsyncAction(asyncAction)(target);
            }
            return function () { return wrapper(action, target); };
        }
        else {
            var original_1 = descriptor.value;
            if (typeof original_1 === "function") {
                addMetadata(target, key);
                if (asyncAction) {
                    original_1 = bindAsyncAction(asyncAction)(original_1);
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
function addMetadata(target, key) {
    Reflect.defineMetadata(IS_SAGA_METADATA, true, target, key);
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function takeWrapper(action, saga) {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                return [4 /*yield*/, take(action)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, call(saga, data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}

function take$1(action, asyncAction) {
    return baseDecorator(action, takeWrapper, asyncAction);
}

var SagaFactory = /** @class */ (function () {
    function SagaFactory() {
    }
    SagaFactory.fromMetadata = function (cls) {
        return getSagasFromObj(cls);
    };
    SagaFactory.prototype.getSagas = function () {
        return getSagasFromObj(this);
    };
    return SagaFactory;
}());
function getSagasFromObj(obj) {
    var me = Object.getPrototypeOf(obj);
    var funcs = Object.getOwnPropertyNames(me);
    var sagas = {};
    funcs.forEach(function (func) {
        var isSaga = Reflect.getMetadata(IS_SAGA_METADATA, obj, func);
        if (isSaga === true) {
            sagas[func] = obj[func];
        }
    });
    return sagas;
}

export { take$1 as take, SagaFactory, baseDecorator, saga };
