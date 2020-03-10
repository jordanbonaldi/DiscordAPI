"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var EventHandler_1 = require("./handlers/EventHandler");
exports.default = new /** @class */ (function () {
    function DiscordAPI() {
        this.client = new discord_js_1.Client();
    }
    /**
     *
     * @param serverId
     * @param loginToken
     */
    DiscordAPI.prototype.setCredentials = function (serverId, loginToken) {
        this.loginToken = loginToken;
        this.serverId = serverId;
        EventHandler_1.default.loadEvents(this.client);
        return this;
    };
    DiscordAPI.prototype.login = function () {
        var _this = this;
        return this.client.login(this.loginToken).then(function () { return _this.client; });
    };
    DiscordAPI.prototype.getGuild = function () {
        return this.client.guilds.get(this.serverId);
    };
    /**
     *
     * @param userId
     */
    DiscordAPI.prototype.getMember = function (userId) {
        var guild = this.getGuild();
        return guild == null ? null : guild.members.find(function (e) { return e.id === userId; });
    };
    /**
     *
     * @param userId
     * @param roleId
     */
    DiscordAPI.prototype.memberHasRole = function (userId, roleId) {
        var member = this.getMember(userId);
        return member == null ? false : member.roles.filter(function (role) { return role.id === roleId; }).size >= 0;
    };
    /**
     *
     * @param userId
     * @param message
     */
    DiscordAPI.prototype.sendMessage = function (userId, message) {
        var member = this.getMember(userId);
        return member == null ? null : member.send(message);
    };
    /**
     *
     * @param channelId
     */
    DiscordAPI.prototype.getChannelFromId = function (channelId) {
        var guild = this.getGuild();
        return guild == null ? undefined : guild.channels.get(channelId);
    };
    /**
     *
     * @param channelId
     * @param message
     */
    DiscordAPI.prototype.sendMessageOnChannel = function (channelId, message) {
        var channel = this.getChannelFromId(channelId);
        return channel == null ? Promise.reject(null) : channel.send(message);
    };
    /**
     *
     * @param channelId
     * @param message
     * @param file
     */
    DiscordAPI.prototype.sendFileOnChannel = function (channelId, message, file) {
        var channel = this.getChannelFromId(channelId);
        return channel == null ? null : channel.send(message, {
            files: [file]
        });
    };
    /**
     *
     * @param channelId
     * @param title
     */
    DiscordAPI.prototype.changeChannelName = function (channelId, title) {
        var channel = this.getChannelFromId(channelId);
        return channel == null ? Promise.reject() : channel.setName(title);
    };
    DiscordAPI.prototype.createEmbed = function () {
        return new discord_js_1.RichEmbed();
    };
    /**
     *
     * @param channelId
     * @param messageId
     */
    DiscordAPI.prototype.removeMessage = function (channelId, messageId) {
        return this.actionOnFetchedMessage(channelId, messageId, function (message) { return message.delete(); });
    };
    /**
     *
     * @param channelId
     * @param messageId
     * @param callback
     */
    DiscordAPI.prototype.actionOnFetchedMessage = function (channelId, messageId, callback) {
        var channel = this.getChannelFromId(channelId);
        return channel == null ? Promise.reject() : channel.fetchMessage(messageId).then(callback);
    };
    /**
     *
     * @param channelId
     * @param messageId
     * @param newMessage
     */
    DiscordAPI.prototype.modifyMessage = function (channelId, messageId, newMessage) {
        return this.actionOnFetchedMessage(channelId, messageId, function (message) { return message.edit(newMessage); });
    };
    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     * @param newMessage
     * @param reactions
     */
    DiscordAPI.prototype.awaitAndChange = function (channelId, messageId, emoji, newMessage) {
        var _this = this;
        var reactions = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            reactions[_i - 4] = arguments[_i];
        }
        return this.actionOnFetchedMessage(channelId, messageId, function (message) { return message.awaitReactions(function (reaction) { return reaction.emoji.name === emoji; }, { max: 1 }).then(function (reaction) {
            return reaction.filter(function (e) { return e.emoji.name === emoji; }).first().message.clearReactions()
                .then(function () { return _this.modifyMessage(channelId, messageId, newMessage); })
                .then(function () { return reactions.forEach(function (r) { return _this.addReactions(channelId, messageId, r); }); });
        }); });
    };
    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     */
    DiscordAPI.prototype.addReactions = function (channelId, messageId, emoji) {
        return this.actionOnFetchedMessage(channelId, messageId, function (message) {
            return message.react(Array.isArray(emoji) ? emoji[0] : emoji);
        });
    };
    return DiscordAPI;
}());
