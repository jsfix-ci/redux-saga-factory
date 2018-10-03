"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var effects_1 = require("redux-saga/effects");
function takeWrapper(action, saga) {
    var data;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 3];
                return [4 /*yield*/, effects_1.take(action)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, effects_1.call(saga, data)];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [2 /*return*/];
        }
    });
}
exports.takeWrapper = takeWrapper;
function takeEveryWrapper(action, saga) {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeEvery(action, saga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.takeEveryWrapper = takeEveryWrapper;
function takeLatestWrapper(action, saga) {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.takeLatest(action, saga)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.takeLatestWrapper = takeLatestWrapper;
//# sourceMappingURL=effectWrappers.js.map