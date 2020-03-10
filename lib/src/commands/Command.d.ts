import { User } from "discord.js";
export default abstract class Command {
    name: string;
    roleId: string;
    help: string;
    /**
     *
     * @param name
     * @param roleId
     * @param help
     */
    protected constructor(name: string, roleId: string, help: string);
    abstract onCommand(author: User, args: string[]): Promise<string>;
}
