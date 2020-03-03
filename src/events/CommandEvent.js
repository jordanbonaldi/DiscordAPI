const Event = require('./Event');
const DiscordHandler = require('../DiscordAPI');

class CommandEvent extends Event {

    /**
     *
     * @param name
     */
    constructor() {
        super('message');
    }


    processCommand(commandInstance, executor, message) {
        commandInstance.onCommand(executor == null ? message.author : executor, message.content.split(' '))
            .then((response) =>
                message.reply(response)
            ).catch((err) => {
            message.reply(`Error while performing command: ${err}`);
            message.reply(`Command usage: ${commandInstance.help}`)
        })
    }

    /**
     *
     * @param message
     */
    onEvent(message) {
        if (message.author.bot || message.guild !== null) return;

        return require('../../config/definedEngines').commands.forEach(e => {
            if (e.name.toLowerCase() === message.content.split(' ')[0].toLowerCase()
                && DiscordHandler.memberHasRole(message.author.id, e.roleId))
                this.processCommand(e, message.author, message);
        })
    }


}

/**
 *
 * @type {Event}
 */
module.exports = new CommandEvent();