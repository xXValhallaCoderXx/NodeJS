"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(name, hp, str, dex, int) {
        this.name = name || "";
        this.str = str || 1;
        this.dex = dex || 1;
        this.int = int || 1;
        this.hp = hp || 150;
    }
    Player.prototype.showStats = function () {
        console.log("\n      Name: " + this.name + "\n      HP: " + this.hp + "\n      Str: " + this.str + "\n      Dex: " + this.dex + "\n      Int: " + this.int + "\n    ");
    };
    return Player;
}());
module.exports = Player;
//# sourceMappingURL=Player.js.map