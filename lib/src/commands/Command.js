"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    /**
     *
     * @param name
     * @param roleId
     * @param help
     */
    function Command(name, roleId, help) {
        this.name = name;
        this.roleId = roleId;
        this.help = help;
    }
    return Command;
}());
exports.default = Command;
