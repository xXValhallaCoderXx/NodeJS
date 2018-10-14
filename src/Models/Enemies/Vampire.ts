export {};

const { Enemy } = require("./index");

export class Vampire extends Enemy {
  constructor(name: string) {
    super(name, 300, 4, 6, 6);
  }

  takeDamage(hit: number) {
    // We are still using the base class function, and just modifying the damage passed
    super.takeDamage(hit / 2);
  }
}
