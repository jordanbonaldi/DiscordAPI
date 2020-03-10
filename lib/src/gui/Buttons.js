"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordAPI_1 = require("../DiscordAPI");
var Button = /** @class */ (function () {
    /**
     *
     * @param icon
     * @param guiLink
     */
    function Button(icon, guiLink) {
        this.icon = icon;
        this.guiLink = guiLink;
    }
    /**
     *
     * @param channelId
     * @param embedMessageToApply
     */
    Button.prototype.pushButton = function (channelId, embedMessageToApply) {
        return embedMessageToApply.react(this.icon);
    };
    Button.prototype.getReactions = function () {
        return this.guiLink.buttons.map(function (button) { return button.icon; });
    };
    /**
     *
     * @param channelId
     * @param embedMessageToApply
     * @returns {Promise<Message>}
     */
    Button.prototype.applyButton = function (channelId, embedMessageToApply) {
        var _this = this;
        this.guiLink.rebuildMessage();
        return DiscordAPI_1.default.awaitAndChange(channelId, embedMessageToApply.id, this.icon, this.guiLink.message, this.getReactions()).then(function () { return _this.guiLink.construct(); });
    };
    return Button;
}());
exports.Button = Button;
function default_1(icon, guiLink) {
    return new Button(icon, guiLink);
}
exports.default = default_1;
