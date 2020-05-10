import Command from "./Command";
import {User} from "discord.js";
import engines from "../config/definedEngines";

export default new class HelpCommand extends Command {

    constructor() {
        super('help', '681949716753154057', 'help');
    }

    /**
     *
     * @param executor
     * @param args
     */
    public onCommand(executor: User, args: string[] = []): Promise<string> {
        let message: string = "Here are the available commands:\n";

        engines.commands.forEach((e: Command) => {
            message += `Commands: ${e.name}  |  RoleId: [${e.roleId}]  |  Usage: ${e.help}\n`;
        });

        return Promise.resolve(message);
    }

}