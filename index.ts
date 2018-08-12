// const readline = require("readline");
const { Vampire, Player } = require("./src/Models");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });


// rl.question("What is your name young warrior? ", (answer: any) => {
//   newPlayerName = answer;
//   rl.close();
// });

const newPlayer = new Player("Nate");
newPlayer.showStats();
newPlayer.showWeapon();

const newEnemy = new Vampire("Vampy");
newEnemy.showStats();