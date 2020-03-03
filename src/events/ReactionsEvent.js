const Event = require('./Event');
const GUIHandler = require('../handlers/GUIHandler');

class ReactionsEvent extends Event {

    constructor() {
        super('messageReactionAdd');
    }

    /*
     *
     * @param reaction
     * @param user
     */
    onEvent(reaction) {
        if (reaction.users.filter(e => !e.bot).size === 0)
            return;

        return GUIHandler.openGUIWithReaction(reaction.emoji.name, reaction.message.channel.id);
    }


}

/**
 *
 * @type {Event}
 */
module.exports = new ReactionsEvent();