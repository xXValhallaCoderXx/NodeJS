"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require("../Items"), Loot = _a.Loot, Weapon = _a.Weapon;
var Player = /** @class */ (function () {
    function Player(name, hp, str, dex, int) {
        if (hp === void 0) { hp = 150; }
        if (str === void 0) { str = 1; }
        if (dex === void 0) { dex = 1; }
        if (int === void 0) { int = 1; }
        var _this = this;
        this.removeLoot = function (item) {
            _this.inventory.map(function (currentItem) {
                if (currentItem.name !== item) {
                    return item;
                }
            });
        };
        this.name = name;
        this.hp = hp;
        this.str = str;
        this.dex = dex;
        this.int = int;
        this.weapon = new Weapon();
        this.inventory = [];
    }
    Player.prototype.setName = function (name) {
        this.name = name;
        console.log("Ahhh! So " + name + " is your name, what a fine one indeed!");
    };
    Player.prototype.showStats = function () {
        console.log("Player Name: " + this.name + " has " + this.hp + " HP, Stats " + this.str + "(STR), " + this.dex + "(DEX), " + this.int + "(INT)");
    };
    Player.prototype.showWeapon = function () {
        console.log("Current Weapon: " + this.weapon.name + ", damaged for " + this.weapon.hit);
    };
    Player.prototype.takeDamage = function (hit) {
        this.hp -= hit;
        console.log(this.name + " has been hit for " + hit + ", " + this.hp + " HP Remaining");
    };
    Player.prototype.addLoot = function (name, value, type) {
        this.inventory.push(new Loot(name, value, type));
        console.log(name + " has been added to Inventory!");
    };
    Player.prototype.showInventory = function () {
        var value = 0;
        this.inventory.map(function (item, index) {
            value += item.value;
            console.log("Inventory " + (index + 1) + ": " + item.name + " is a " + item.type + " worth " + item.value);
        });
        console.log("Iventory Value Total: " + value);
    };
    return Player;
}());
exports.Player = Player;
//# sourceMappingURL=Player.js.map