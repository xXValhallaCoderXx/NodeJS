export {};

const { Weapon } = require("./Weapon");

interface weapon {
  name: string;
  hit: number;
}

export class Player {
  name: string;
  hp: number;
  str: number;
  dex: number;
  int: number;
  // weapon: any;
  constructor({ name = "", str = 1, dex = 1, int = 1, hp = 150 }) {
    this.name = name;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.hp = hp;
    // this.weapon = this.weapon.push(new Weapon());
  }

  showStats() {
    console.log(`
      Name: ${this.name}
      HP: ${this.hp}
      Str: ${this.str}
      Dex: ${this.dex}
      Int: ${this.int}
    `);
  }
}
