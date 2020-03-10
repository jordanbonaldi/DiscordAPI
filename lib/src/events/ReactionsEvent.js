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
var GUIHandler_1 = require("../handlers/GUIHandler");
var Event_1 = require("./Event");
exports.default = new /** @class */ (function (_super) {
    __extends(ReactionsEvent, _super);
    function ReactionsEvent() {
        return _super.call(this, 'messageReactionAdd') || this;
    }
    /*
     *
     * @param reaction
     * @param user
     */
    ReactionsEvent.prototype.onEvent = function (reaction) {
        if (reaction.users.filter(function (e) { return !e.bot; }).size === 0)
            return null;
        return GUIHandler_1.default.openGUIWithReaction(reaction.emoji.name, reaction.message.channel.id);
    };
    return ReactionsEvent;
}(Event_1.default));
