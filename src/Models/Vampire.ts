export {};

const { Player } = require("./Player");

export class Vampire extends Player {
  // weapon: any;
  constructor(name: string, hp = 300, str = 4, dex = 6, int = 6) {
    super();
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.dex = dex;
    this.int = int;
  }
}
