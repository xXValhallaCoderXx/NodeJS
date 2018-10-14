export {};

const { Weapon } = require("../Items");

export class Enemy {
  name: string;
  hp: number;
  str: number;
  dex: number;
  int: number;
  lives: number;
  weapon: any;

  constructor(name: string, hp = 150, str = 1, dex = 1, int = 1, lives = 3) {
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.lives = lives;
    this.weapon = new Weapon();
  }

  takeDamage(hit: number) {
    this.hp -= hit;
    if (this.hp <= 0) {
      this.lives -= 1;
      console.log(`${this.name} has lost a life! ${this.lives} lives remaining!`);
    } else {
      console.log(
        `${this.name} has been hit for ${hit}, ${this.hp} HP Remaining`
      );
    }
  }
}
