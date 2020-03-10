import {Message, User} from "discord.js";
import Command from "../commands/Command";
import definedEngines from "../config/definedEngines";
import DiscordAPI from "../DiscordAPI";
import Event from "./Event";

export default new class CommandEvent extends Event {

    constructor() {
        super('message');
    }

    /**
     *
     * @param commandInstance
     * @param executor
     * @param message
     */
    processCommand(
        commandInstance: Command,
        executor: User,
        message: Message
    ): Promise<Message | Message[] | [(Message | Message[]), (Message | Message[])]> {
        return commandInstance.onCommand(executor == null ? message.author : executor, message.content.split(' '))
            .then((response) =>
                message.reply(response)
            ).catch((err) => Promise.all([
                    message.reply(`Error while performing command: ${err}`),
                    message.reply(`Command usage: ${commandInstance.help}`)
                ])
            )
    }

    /**
     *
     * @param message
     */
    onEvent(message: Message): Promise<any> | void {
        if (message.author.bot || message.guild !== null) return;

        return Promise.all(definedEngines.commands
            .filter((command: Command) =>
                command.name.toLowerCase() === message.content.split(' ')[0].toLowerCase() && DiscordAPI.memberHasRole(message.author.id, command.roleId)
            ).map((command: Command) => this.processCommand(command, message.author, message))
        );
    }

}