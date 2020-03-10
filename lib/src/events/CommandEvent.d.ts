import { Message, User } from "discord.js";
import Command from "../commands/Command";
declare const _default: {
    /**
     *
     * @param commandInstance
     * @param executor
     * @param message
     */
    processCommand(commandInstance: Command, executor: User, message: Message): Promise<Message | Message[] | [Message | Message[], Message | Message[]]>;
    /**
     *
     * @param message
     */
    onEvent(message: Message): void | Promise<any>;
    name: string;
};
export default _default;
