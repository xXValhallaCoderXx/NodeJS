export {};

class Player {
  name: string;
  hp: number;
  str: number;
  dex: number;
  int: number;
  constructor(name: string, hp: number, str: number, dex: number, int: number) {
    this.name = name || "";
    this.str = str || 1;
    this.dex = dex || 1;
    this.int = int || 1;
    this.hp = hp || 150;
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

module.exports = Player;
