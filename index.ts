const { Player } = require("./src/Models/Player");

const readline = require("readline");
const { Vampire, Mage, Loot } = require("./src/Models");
const { lootType } = require("./src/Models/Loot");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const newPlayer = new Player("Default");

rl.question("What is your name young warrior? ", (answer: any) => {
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
