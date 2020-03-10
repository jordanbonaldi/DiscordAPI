import { Message, MessageReaction } from "discord.js";
export declare class Button {
    readonly icon: string;
    readonly guiLink: string;
    /**
     *
     * @param icon
     * @param guiLink
     */
    constructor(icon: string, guiLink: string);
    /**
     *
     * @param channelId
     * @param embedMessageToApply
     */
    pushButton(channelId: string, embedMessageToApply: Message): Promise<MessageReaction>;
}
export default function (icon: string, guiLink: string): Button;
