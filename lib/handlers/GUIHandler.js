"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GUI_1 = require("../gui/GUI");
exports.default = new /** @class */ (function () {
    function GUIHandler() {
        this.gui = {};
    }
    /**
     *
     * @param gui
     */
    GUIHandler.prototype.connectGUI = function (gui) {
        if (this.gui[gui.channelId] == null)
            this.gui[gui.channelId] = [];
        this.gui[gui.channelId].push(gui);
    };
    GUIHandler.prototype.loadAll = function () {
        var _this = this;
        return Promise.all(Object.keys(this.gui).map(function (gui) {
            return _this.gui[gui].filter(function (e) { return e.reload; });
        }).map(function (gui) {
            gui.forEach(function (e) { return e.active = true; });
            return gui.forEach(function (e) { return e.construct(); });
        }));
    };
    /**
     *
     * @param channelId
     */
    GUIHandler.prototype.getActiveGUI = function (channelId) {
        if (this.gui[channelId] == null)
            return null;
        return this.gui[channelId].filter(function (gui) { return gui.active; })[0];
    };
    /**
     *
     * @param channelId
     * @param className
     */
    GUIHandler.prototype.findGUIByClassName = function (channelId, className) {
        return this.gui[channelId].filter(function (gui) { return (className instanceof GUI_1.default ? gui : gui.constructor.name) === className; })[0];
    };
    /**
     *
     * @param reaction
     * @param channelId
     */
    GUIHandler.prototype.openGUIWithReaction = function (reaction, channelId) {
        var activeGui = this.getActiveGUI(channelId);
        if (activeGui == null)
            return null;
        var gui = this.findGUIByClassName(channelId, activeGui.findReaction(reaction).guiLink);
        if (gui == null)
            return null;
        this.gui[channelId].forEach(function (e) { return e.active = false; });
        gui.active = true;
        return this.openGUI(gui);
    };
    /**
     *
     * @param gui
     */
    GUIHandler.prototype.openGUI = function (gui) {
        return gui.construct();
    };
    return GUIHandler;
}());
