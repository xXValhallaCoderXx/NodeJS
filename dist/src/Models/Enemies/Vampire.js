"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Enemy = require("./index").Enemy;
var Vampire = /** @class */ (function (_super) {
    __extends(Vampire, _super);
    function Vampire(name) {
        return _super.call(this, name, 300, 4, 6, 6) || this;
    }
    Vampire.prototype.takeDamage = function (hit) {
        // We are still using the base class function, and just modifying the damage passed
        _super.prototype.takeDamage.call(this, hit / 2);
    };
    return Vampire;
}(Enemy));
exports.Vampire = Vampire;
//# sourceMappingURL=Vampire.js.map