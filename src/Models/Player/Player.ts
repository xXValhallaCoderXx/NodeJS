const { Loot, Weapon } = require("../Items");

export class Player {
  name: string;
  hp: number;
  str: number;
  dex: number;
  int: number;
  weapon: any;
  inventory: any;

  constructor(name: string, hp = 150, str = 1, dex = 1, int = 1) {
    this.name = name;
    this.hp = hp;
    this.str = str;
    this.dex = dex;
    this.int = int;
    this.weapon = new Weapon();
    this.inventory = [];
  }

  setName(name: string) {
    this.name = name;
    console.log(`Ahhh! So ${name} is your name, what a fine one indeed!`);
  }

  showStats() {
    console.log(
      `Player Name: ${this.name} has ${this.hp} HP, Stats ${this.str}(STR), ${
        this.dex
      }(DEX), ${this.int}(INT)`
    );
  }

  showWeapon() {
    console.log(
      `Current Weapon: ${this.weapon.name}, damaged for ${this.weapon.hit}`
    );
  }

  takeDamage(hit: number) {
    this.hp -= hit;
    console.log(
      `${this.name} has been hit for ${hit}, ${this.hp} HP Remaining`
    );
  }

  addLoot(name: string, value: number, type: string) {
    this.inventory.push(new Loot(name, value, type));
    console.log(`${name} has been added to Inventory!`);
  }

  removeLoot = (item: string) => {
    this.inventory.map((currentItem: any) => {
      if (currentItem.name !== item) {
        return item;
      }
    });
  }

  showInventory() {
    let value: number = 0;
    this.inventory.map((item: any, index: any) => {
      value += item.value;
      console.log(
        `Inventory ${index + 1}: ${item.name} is a ${item.type} worth ${
          item.value
        }`
      );
    });
    console.log(`Iventory Value Total: ${value}`);
  }
}
