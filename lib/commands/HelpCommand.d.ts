import { User } from "discord.js";
declare const _default: {
    /**
     *
     * @param executor
     * @param args
     */
    onCommand(executor: User, args?: string[]): Promise<string>;
    name: string;
    roleId: string;
    help: string;
};
export default _default;
