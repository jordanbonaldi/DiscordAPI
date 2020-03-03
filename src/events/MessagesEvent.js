const Event = require('./Event');
const GUIHandler = require('../handlers/GUIHandler');

class MessagesEvent extends Event {

    constructor() {
        super('message');
    }

    /*
     *
     * @param message
     */
    onEvent(message) {
        let channelId = message.channel.id;
        if (message.author.bot === true)
            return;

        return GUIHandler.getActiveGUI(channelId).onMessage(message.author, message);
    }


}

/**
 *
 * @type {Event}
 */
module.exports = new MessagesEvent();