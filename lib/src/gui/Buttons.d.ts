import GUI from "./GUI";
import { Message, MessageReaction } from "discord.js";
export declare class Button {
    icon: string;
    guiLink: GUI;
    /**
     *
     * @param icon
     * @param guiLink
     */
    constructor(icon: string, guiLink: GUI);
    /**
     *
     * @param channelId
     * @param embedMessageToApply
     */
    pushButton(channelId: string, embedMessageToApply: Message): Promise<MessageReaction>;
    getReactions(): string[];
    /**
     *
     * @param channelId
     * @param embedMessageToApply
     * @returns {Promise<Message>}
     */
    applyButton(channelId: string, embedMessageToApply: Message): Promise<any>;
}
export default function (icon: string, guiLink: GUI): Button;
