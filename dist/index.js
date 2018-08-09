"use strict";
var readline = require("readline");
var _a = require("./Player"), Mage = _a.Mage, Player = _a.Player;
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("What is your name young warrior? ", function (answer) {
    var newPlayer = new Player({ name: answer });
    // TODO: Add to DB
    newPlayer.showStats();
    console.log("Weapon: ", newPlayer.weapon[0]);
    rl.close();
});
//# sourceMappingURL=index.js.map