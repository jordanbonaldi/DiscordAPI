const DiscordAPI = require('../DiscordAPI');

class GUI {

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
    constructor(
        color, title, author, description, footer, thumbnail,
        channelId, oneMessage, reload
    ) {
        this.color = color;
        this.title = title;
        this.author = author;
        this.description = description;
        this.footer = footer;
        this.thumbnail = thumbnail;
        this.channelId = channelId;
        this.oneMessage = oneMessage;
        this.buttons = [];
        this.reload = reload;
        this.active = false;

        this.rebuildMessage();
    }

    buildCore() {
        this._message = DiscordAPI.createEmbed()
            .setColor(this.color)
            .setTitle(this.title)
            .setAuthor(this.author)
            .setDescription(this.description)
            .setFooter(this.footer, this.thumbnail)
            .setThumbnail(this.thumbnail)
            .setTimestamp();
    }

    /**
     *
     * @param reaction
     * @returns {*}
     */
    findReaction(reaction) {
        return this.buttons.filter(button => button.icon === reaction)[0];
    }

    get message() {
        return this._message;
    }

    /**
     *
     * @param fields
     */
    addFields(...fields) {
        fields.forEach(field => this._message = field.getConstructedField(this._message));
    }

    addButton(...buttons) {
        buttons.forEach(b => this.buttons.push(b));
    }

    defineButtons() {
        return null;
    }

    defineField() {
        return null;
    }

    rebuildMessage() {
        this.buildCore();
        this.defineButtons();
        this.defineField();
    }

    /**
     *
     * @returns {Promise<*>}
     */
    construct(post = true) {
        return DiscordAPI.getGuild().channels
            .get(this.channelId).fetchMessages({limit: 1})
            .then((messages) => {
                if (messages.size === 0 && post)
                    return this.postMessage();
                if (this.oneMessage)
                    return messages.first().clearReactions().then(() =>
                        messages.first().edit(this.message).then(
                            () => Promise.all(this.buttons.map(e =>
                                e.pushButton(this.channelId, messages.first())
                            ))
                        )
                    );
            })
    }

    /**
     *
     * @returns {PromiseLike<void> | Promise<void>}
     */
    postMessage() {
        return discordAPI.sendMessageOnChannel(this.channelId, this.message).then(
            (message) => console.log(message)
        );
    }

    /**
     *
     * @param user
     * @param message
     * @returns {*}
     */
    onMessage(user, message) {
        return message.delete();
    }

}

module.exports = GUI;
