const Command = require('./Command');

class HelpCommand extends Command {

    constructor() {
        super('help', '681949716753154057', 'help');
    }

    /**
     *
     * @param executor
     * @param args
     */
    onCommand(executor, args = []) {
        let message = "Here are the available commands:\n";
        require('../../config/definedEngines').commands.forEach(e => {
            message += `Commands: ${e.name}  |  RoleId: [${e.roleId}]  |  Usage: ${e.help}\n`;
        });

        return Promise.resolve(message);
    }

}

/**
 *
 * @type {PermissionCommand}
 */
module.exports = new HelpCommand();