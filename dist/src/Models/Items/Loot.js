"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LootType;
(function (LootType) {
    LootType["ARMOUR"] = "ARMOUR";
    LootType["POTION"] = "POTION";
    LootType["ITEM"] = "ITEM";
})(LootType || (LootType = {}));
var Loot = /** @class */ (function () {
    function Loot(name, value, type) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
    return Loot;
}());
exports.Loot = Loot;
//# sourceMappingURL=Loot.js.map