export {};

// tslint:disable-next-line:variable-name
const Player = require("./Player");

class Mage extends Player {
  constructor(name: any, hp: any) {
    super();
    console.log("LALALA", this, name, hp);
  }
}

module.exports = Mage;
