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
var Event_1 = require("./Event");
var GUIHandler_1 = require("../handlers/GUIHandler");
exports.default = new /** @class */ (function (_super) {
    __extends(MessagesEvent, _super);
    function MessagesEvent() {
        return _super.call(this, 'message') || this;
    }
    /*
     *
     * @param message
     */
    MessagesEvent.prototype.onEvent = function (message) {
        var channelId = message.channel.id;
        if (message.author.bot)
            return;
        var gui = GUIHandler_1.default.getActiveGUI(channelId);
        if (gui == null)
            return;
        return gui.onMessage(message.author, message);
    };
    return MessagesEvent;
}(Event_1.default));
