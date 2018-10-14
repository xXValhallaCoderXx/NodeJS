const { Player } = require("./index");

export class Mage extends Player {
  constructor(name: string) {
    super(name, 200, 2, 3, 6);
  }

}