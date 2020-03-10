"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordAPI_1 = require("../DiscordAPI");
var GUI = /** @class */ (function () {
    /**
     *
     * @param color
     * @param title
     * @param author
     * @param description
     * @param footer
     * @param thumbnail
     * @param channelId
     * @param oneMessage
     * @param reload
     */
    function GUI(color, title, author, description, footer, thumbnail, channelId, oneMessage, reload) {
        this.color = color;
        this.title = title;
        this.author = author;
        this.description = description;
        this.footer = footer;
        this.thumbnail = thumbnail;
        this.channelId = channelId;
        this.oneMessage = oneMessage;
        this.reload = reload;
        this.active = false;
        this.buttons = [];
        this.rebuildMessage();
    }
    GUI.prototype.buildCore = function () {
        this.message = DiscordAPI_1.default.createEmbed()
            .setColor(this.color)
            .setTitle(this.title)
            .setAuthor(this.author)
            .setDescription(this.description)
            .setFooter(this.footer, this.thumbnail)
            .setThumbnail(this.thumbnail)
            .setTimestamp();
    };
    /**
     *
     * @param reaction
     * @returns {*}
     */
    GUI.prototype.findReaction = function (reaction) {
        return this.buttons.filter(function (button) { return button.icon === reaction; })[0];
    };
    /**
     *
     * @param fields
     */
    GUI.prototype.addFields = function () {
        var _this = this;
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i] = arguments[_i];
        }
        fields.forEach(function (field) { return _this.message = field.getConstructedField(_this.message); });
    };
    GUI.prototype.addButton = function () {
        var _this = this;
        var buttons = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            buttons[_i] = arguments[_i];
        }
        buttons.forEach(function (b) { return _this.buttons.push(b); });
    };
    GUI.prototype.rebuildMessage = function () {
        this.buildCore();
        this.defineButtons();
        this.defineField();
    };
    /**
     *
     * @param post
     */
    GUI.prototype.construct = function (post) {
        var _this = this;
        if (post === void 0) { post = true; }
        var guild = DiscordAPI_1.default.getChannelFromId(this.channelId);
        if (guild == null)
            return Promise.reject("Unknown guild");
        return guild.fetchMessages({ limit: 1 })
            .then(function (messages) {
            if (messages.size === 0 && post)
                return _this.postMessage();
            if (_this.oneMessage)
                return messages.first().clearReactions().then(function () {
                    return messages.first().edit(_this.message).then(function () { return Promise.all(_this.buttons.map(function (button) {
                        return button.pushButton(_this.channelId, messages.first());
                    })); });
                });
        });
    };
    GUI.prototype.postMessage = function () {
        return DiscordAPI_1.default.sendMessageOnChannel(this.channelId, this.message)
            .then(function (message) {
            return console.log(message);
        }).catch(function () { return console.log("Error while posting message"); });
    };
    /**
     *
     * @param user
     * @param message
     */
    GUI.prototype.onMessage = function (user, message) {
        return message.delete();
    };
    return GUI;
}());
exports.default = GUI;
