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
var definedEngines_1 = require("../../config/definedEngines");
var DiscordAPI_1 = require("../DiscordAPI");
var Event_1 = require("./Event");
exports.default = new /** @class */ (function (_super) {
    __extends(CommandEvent, _super);
    function CommandEvent() {
        return _super.call(this, 'message') || this;
    }
    /**
     *
     * @param commandInstance
     * @param executor
     * @param message
     */
    CommandEvent.prototype.processCommand = function (commandInstance, executor, message) {
        return commandInstance.onCommand(executor == null ? message.author : executor, message.content.split(' '))
            .then(function (response) {
            return message.reply(response);
        }).catch(function (err) { return Promise.all([
            message.reply("Error while performing command: " + err),
            message.reply("Command usage: " + commandInstance.help)
        ]); });
    };
    /**
     *
     * @param message
     */
    CommandEvent.prototype.onEvent = function (message) {
        var _this = this;
        if (message.author.bot || message.guild !== null)
            return;
        return Promise.all(definedEngines_1.default.commands
            .filter(function (command) {
            return command.name.toLowerCase() === message.content.split(' ')[0].toLowerCase() && DiscordAPI_1.default.memberHasRole(message.author.id, command.roleId);
        }).map(function (command) { return _this.processCommand(command, message.author, message); }));
    };
    return CommandEvent;
}(Event_1.default));
