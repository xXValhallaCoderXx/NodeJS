"use strict";
// const readline = require("readline");
var _a = require("./src/Models"), Vampire = _a.Vampire, Player = _a.Player;
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
// rl.question("What is your name young warrior? ", (answer: any) => {
//   newPlayerName = answer;
//   rl.close();
// });
var newPlayer = new Player("Nate");
newPlayer.showStats();
newPlayer.showWeapon();
var newEnemy = new Vampire("Vampy");
newEnemy.showStats();
//# sourceMappingURL=index.js.map