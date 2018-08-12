"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weapon = require("./Weapon").Weapon;
var Player = /** @class */ (function () {
    // weapon: any;
    function Player(name) {
        this.name = name;
        this.str = 1;
        this.dex = 1;
        this.int = 1;
        this.hp = 150;
        this.weapon = new Weapon();
        // this.weapon = this.weapon.push(new Weapon());
    }
    Player.prototype.showStats = function () {
        console.log("Player Name: " + this.name + " has " + this.hp + " HP, Stats " + this.str + "(STR), " + this.dex + "(DEX), " + this.int + "(INT)");
    };
    Player.prototype.showWeapon = function () {
        console.log("Current Weapon: " + this.weapon.name + ", damaged for " + this.weapon.hit);
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map