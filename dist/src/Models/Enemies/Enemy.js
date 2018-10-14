"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Weapon = require("../Items").Weapon;
var Enemy = /** @class */ (function () {
    function Enemy(name, hp, str, dex, int, lives) {
        if (hp === void 0) { hp = 150; }
        if (str === void 0) { str = 1; }
        if (dex === void 0) { dex = 1; }
        if (int === void 0) { int = 1; }
        if (lives === void 0) { lives = 3; }
        this.name = name;
        this.hp = hp;
        this.str = str;
        this.dex = dex;
        this.int = int;
        this.lives = lives;
        this.weapon = new Weapon();
    }
    Enemy.prototype.takeDamage = function (hit) {
        this.hp -= hit;
        if (this.hp <= 0) {
            this.lives -= 1;
            console.log(this.name + " has lost a life! " + this.lives + " lives remaining!");
        }
        else {
            console.log(this.name + " has been hit for " + hit + ", " + this.hp + " HP Remaining");
        }
    };
    return Enemy;
}());
exports.Enemy = Enemy;
//# sourceMappingURL=Enemy.js.map