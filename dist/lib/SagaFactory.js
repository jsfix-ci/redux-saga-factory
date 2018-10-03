"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
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
exports.SagaFactory = SagaFactory;
function getSagasFromObj(obj) {
    var me = Object.getPrototypeOf(obj);
    var funcs = Object.getOwnPropertyNames(me);
    var sagas = {};
    funcs.forEach(function (func) {
        var isSaga = Reflect.getMetadata(constants_1.IS_SAGA_METADATA, obj, func);
        if (isSaga === true) {
            sagas[func] = obj[func];
        }
    });
    return sagas;
}
//# sourceMappingURL=SagaFactory.js.map