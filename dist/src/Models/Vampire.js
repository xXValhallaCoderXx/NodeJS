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
var Player = require("./Player").Player;
var Vampire = /** @class */ (function (_super) {
    __extends(Vampire, _super);
    // weapon: any;
    function Vampire(name, hp, str, dex, int) {
        if (hp === void 0) { hp = 300; }
        if (str === void 0) { str = 4; }
        if (dex === void 0) { dex = 6; }
        if (int === void 0) { int = 6; }
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.hp = hp;
        _this.str = str;
        _this.dex = dex;
        _this.int = int;
        return _this;
    }
    return Vampire;
}(Player));
exports.Vampire = Vampire;
//# sourceMappingURL=Vampire.js.map