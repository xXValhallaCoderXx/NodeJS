export class Weapon{
  name: string;
  hit: number;
  constructor(name: string, hit: number) {
    this.name = name || "fist";
    this.hit = hit || 8;
  }
}
