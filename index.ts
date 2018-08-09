const readline = require("readline");
const { Mage, Player } = require("./Player");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is your name young warrior? ", (answer: any) => {
  const newPlayer = new Player({ name: answer });
  // TODO: Add to DB
  newPlayer.showStats();
  console.log("Weapon: ", newPlayer.weapon[0]);
  rl.close();
});
