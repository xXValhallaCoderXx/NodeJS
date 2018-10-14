export {};

enum LootType {
  ARMOUR = "ARMOUR", POTION = "POTION", ITEM = "ITEM"
}

export interface lootType {
  name: string;
  value: number;
  type: LootType;
}

export class Loot{
  name: string;
  value: number;
  type: LootType;
  constructor(name: string, value: number, type: LootType) {
    this.name = name;
    this.type = type;
    this.value = value;
  }
}