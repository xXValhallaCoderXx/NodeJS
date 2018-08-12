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
// tslint:disable-next-line:variable-name
var Player = require("./Player");
var Warrior = /** @class */ (function (_super) {
    __extends(Warrior, _super);
    function Warrior(_a) {
        var _b = _a.name, name = _b === void 0 ? "" : _b, _c = _a.hp, hp = _c === void 0 ? 1 : _c;
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.hp = hp;
        return _this;
        // this.weapon = this.weapon.push(new Weapon());
    }
    return Warrior;
}(Player));
module.exports = Warrior;
//# sourceMappingURL=Warrior.js.map