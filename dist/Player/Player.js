"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weapon = require("./Weapon").Weapon;
var Player = /** @class */ (function () {
    // weapon: any;
    function Player(_a) {
        var _b = _a.name, name = _b === void 0 ? "" : _b, _c = _a.str, str = _c === void 0 ? 1 : _c, _d = _a.dex, dex = _d === void 0 ? 1 : _d, _e = _a.int, int = _e === void 0 ? 1 : _e, _f = _a.hp, hp = _f === void 0 ? 150 : _f;
        this.name = name;
        this.str = str;
        this.dex = dex;
        this.int = int;
        this.hp = hp;
        // this.weapon = this.weapon.push(new Weapon());
    }
    Player.prototype.showStats = function () {
        console.log("\n      Name: " + this.name + "\n      HP: " + this.hp + "\n      Str: " + this.str + "\n      Dex: " + this.dex + "\n      Int: " + this.int + "\n    ");
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map