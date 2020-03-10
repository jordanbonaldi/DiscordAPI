"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return Button;
}());
exports.Button = Button;
function default_1(icon, guiLink) {
    return new Button(icon, guiLink);
}
exports.default = default_1;
