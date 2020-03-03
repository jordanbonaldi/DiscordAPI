const api = require('discord.js');

class DiscordAPI {

    constructor() {
        this._client = new api.Client();
    }

    setCredentials(serverId, loginToken) {
        this._loginToken = loginToken;
        this._serverId = serverId;

        require('./handlers/EventHandler').loadEvents(
            this._client
        );

        return this;
    }

    /**
     *
     * @returns {String}
     */
    get serverId() {
        return this._serverId;
    }

    /**
     *
     * @returns {Client | module:"discord.js".Client}
     */
    get client() {
        return this._client;
    }

    /**
     *
     * @returns {Promise<*>}
     */
    login() {
        return this._client.login(this._loginToken).then(() => this._client);
    }

    /**
     *
     * @returns {Guild}
     */
    getGuild() {
        return this._client.guilds.get(this._serverId)
    }

    /**
     *
     * @returns {GuildMember}
     * @param userId
     */
    getMember(userId) {
        return this._client.guilds.get(this._serverId).members.find(e => e.id === userId);
    }

    /**
     *
     * @param userId
     * @param roleId
     * @returns {boolean}
     */
    memberHasRole(userId, roleId) {
        return this.getMember(userId).roles.filter(role => role.id === roleId).size >= 0;
    }

    /**
     *
     * @param userId
     * @param message
     * @returns {*}
     */
    sendMessage(userId, message) {
        return this.getMember(userId).send(message);
    }

    /**
     *
     * @param channelId
     * @param message
     * @returns {*}
     */
    sendMessageOnChannel(channelId, message) {
        return this._client.guilds.get(this._serverId).channels.get(channelId).send(message);
    }

    /**
     *
     * @param channelId
     * @param message
     * @param file
     * @returns {*}
     */
    sendFileOnChannel(channelId, message, file) {
        return this._client.guilds.get(this._serverId).channels.get(channelId).send(message, {
            files: [file]
        });
    }

    /**
     *
     * @param channelId
     * @param title
     * @returns {Promise<GuildChannel>}
     */
    changeChannelName(channelId, title) {
        return this._client.guilds.get(this._serverId).channels.get(channelId).setName(title);
    }

    /**
     *
     * @returns {module:"discord.js".RichEmbed}
     */
    createEmbed() {
        return new api.RichEmbed();
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @returns {Promise<Message>}
     */
    removeMessage(channelId, messageId) {
        return this.actionOnFetchedMessage(channelId, messageId, (message) => message.delete());
    }


    /**
     *
     * @param channelId
     * @param messageId
     * @param callback
     * @returns {Promise<Message>}
     */
    actionOnFetchedMessage(channelId, messageId, callback) {
        return this.getGuild().channels.get(channelId).fetchMessage(messageId).then(callback)
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param newMessage
     * @returns {Promise<Message>}
     */
    modifyMessage(channelId, messageId, newMessage) {
        return this.actionOnFetchedMessage(channelId, messageId, (e) => e.edit(newMessage));
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     * @param newMessage
     * @param reactions
     * @returns {Promise<Message>}
     */
    awaitAndChange(channelId, messageId, emoji, newMessage, ...reactions) {
        return this.actionOnFetchedMessage(channelId, messageId, (e) => e.awaitReactions(
            (reaction) => reaction.emoji.name === emoji, {max: 1}
        ).then((reaction) =>
            reaction.filter(e => e.emoji.name === emoji).first().message.clearReactions()
                .then(() => this.modifyMessage(channelId, messageId, newMessage)
                .then(() => reactions.forEach(r => this.addReactions(channelId, messageId, r))))
        ));
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     * @param callback
     * @returns {Promise<Message>}
     */
    awaitAndChangeCallback(channelId, messageId, emoji, callback) {
        return this.actionOnFetchedMessage(channelId, messageId, (e) => e.awaitReactions(
            (reaction) => reaction.emoji.name === emoji, {max: 1}
        ).then((reaction) => {
            reaction.filter(e => e.emoji.name === emoji).first().message.clearReactions()
                .then(callback)
        }));
    }

    addReactions(channelId, messageId, emoji) {
        return this.actionOnFetchedMessage(channelId, messageId, (e) =>
            e.react(Array.isArray(emoji) ? emoji[0] : emoji)
        );
    }
}

/**
 *
 * @returns {DiscordAPI}
 */
module.exports = new DiscordAPI();