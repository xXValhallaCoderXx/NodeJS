"use strict";
var Player = require("./src/Models/Player").Player;
var readline = require("readline");
var _a = require("./src/Models"), Vampire = _a.Vampire, Mage = _a.Mage, Loot = _a.Loot;
var lootType = require("./src/Models/Loot").lootType;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var newPlayer = new Player("Default");
rl.question("What is your name young warrior? ", function (answer) {
    newPlayer.setName(answer);
    newPlayer.showStats();
    rl.close();
});
// newPlayer.addLoot("Red Potion", 4, "POTION");
// newPlayer.addLoot("Blue Potion", 8, "POTION");
// newPlayer.showInventory();
// newPlayer.removeLoot("Red Potion");
// newPlayer.showInventory();
// const newEnemy = new Vampire("Vampy");
// newEnemy.takeDamage(600);
//# sourceMappingURL=index.js.map