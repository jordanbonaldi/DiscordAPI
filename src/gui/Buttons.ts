import GUI from "./GUI";
import {Message, MessageReaction, RichEmbed} from "discord.js";
import DiscordAPI from "../DiscordAPI";
import GUIHandler from "../handlers/GUIHandler";

export class Button {

    readonly icon: string;
    readonly guiLink: string;

    /**
     *
     * @param icon
     * @param guiLink
     */
    constructor(icon: string, guiLink: string) {
        this.icon = icon;
        this.guiLink = guiLink;
    }

    /**
     *
     * @param channelId
     * @param embedMessageToApply
     */
    pushButton(channelId: string, embedMessageToApply: Message): Promise<MessageReaction> {
        return embedMessageToApply.react(this.icon);
    }

}

export default function(icon: string, guiLink: string) {
    return new Button(icon, guiLink);
}