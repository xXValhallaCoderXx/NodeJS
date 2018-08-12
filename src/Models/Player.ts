export {};

const { Weapon } = require("./Weapon");

export class Player {
  name: string;
  hp: number;
  str: number;
  dex: number;
  int: number;
  weapon: any;
  // weapon: any;
  constructor(name: string) {
    this.name = name;
    this.str = 1;
    this.dex = 1;
    this.int = 1;
    this.hp = 150;
    this.weapon = new Weapon();
    // this.weapon = this.weapon.push(new Weapon());
  }

  showStats() {
    console.log(
      `Player Name: ${this.name} has ${this.hp} HP, Stats ${this.str}(STR), ${
        this.dex
      }(DEX), ${this.int}(INT)`
    );
  }

  showWeapon() {
    console.log(`Current Weapon: ${this.weapon.name}, damaged for ${this.weapon.hit}`);
  }
}
