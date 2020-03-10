"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Command_1 = require("./Command");
var definedEngines_1 = require("../config/definedEngines");
exports.default = new /** @class */ (function (_super) {
    __extends(HelpCommand, _super);
    function HelpCommand() {
        return _super.call(this, 'help', '681949716753154057', 'help') || this;
    }
    /**
     *
     * @param executor
     * @param args
     */
    HelpCommand.prototype.onCommand = function (executor, args) {
        if (args === void 0) { args = []; }
        var message = "Here are the available commands:\n";
        definedEngines_1.default.commands.forEach(function (e) {
            message += "Commands: " + e.name + "  |  RoleId: [" + e.roleId + "]  |  Usage: " + e.help + "\n";
        });
        return Promise.resolve(message);
    };
    return HelpCommand;
}(Command_1.default));
