const DiscordAPI = require('../DiscordAPI');

class Button {

    /**
     *
     * @param icon
     * @param guiLink
     */
    constructor(icon, guiLink) {
        this.icon = icon;
        this.guiLink = guiLink;

    }

    /**
     *
     * @param channelId
     * @param embedMessageToApply
     * @returns {Promise<MessageReaction>}
     */
    pushButton(channelId, embedMessageToApply) {
        return embedMessageToApply.react(this.icon);
    }

    /**
     *
     * @param channelId
     * @param embedMessageToApply
     * @returns {Promise<Message>}
     */
    applyButton(channelId, embedMessageToApply) {
        this.guiLink.rebuildMessage();
        return DiscordAPI.awaitAndChange(
            channelId,
            embedMessageToApply.id,
            this.icon,
            this.guiLink.message,
            this.guiLink.buttons.map(button => button.icon)
        ).then(() => this.guiLink.construct())
    }

}

module.exports = (icon, guiLink) => new Button(icon, guiLink);