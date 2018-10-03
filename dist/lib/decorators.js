"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseDecorators_1 = require("./baseDecorators");
var effectWrappers_1 = require("./effectWrappers");
function take(action, asyncAction) {
    return baseDecorators_1.baseDecorator(action, effectWrappers_1.takeWrapper, asyncAction);
}
exports.take = take;
function takeEvery(action, asyncAction) {
    return baseDecorators_1.baseDecorator(action, effectWrappers_1.takeEveryWrapper, asyncAction);
}
function takeLatest(action, asyncAction) {
    return baseDecorators_1.baseDecorator(action, effectWrappers_1.takeLatestWrapper, asyncAction);
}
//# sourceMappingURL=decorators.js.map