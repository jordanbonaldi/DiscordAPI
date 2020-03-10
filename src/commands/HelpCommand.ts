import Command from "./Command";
import {User} from "discord.js";

export default new class HelpCommand extends Command {

    constructor() {
        super('help', '681949716753154057', 'help');
    }

    /**
     *
     * @param executor
     * @param args
     */
    onCommand(executor: User, args: string[] = []): Promise<string> {
        let message = "Here are the available commands:\n";
        require('../config/definedEngines').commands.forEach((e: any) => {
            message += `Commands: ${e.name}  |  RoleId: [${e.roleId}]  |  Usage: ${e.help}\n`;
        });

        return Promise.resolve(message);
    }

}