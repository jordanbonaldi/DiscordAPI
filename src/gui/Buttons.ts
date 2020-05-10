import {Message, MessageReaction} from "discord.js";

export class Button {


    /**
     *
     * @param icon
     * @param guiLink
     */
    constructor(
        public readonly icon: string,
        public readonly guiLink: string
    ) {}

    /**
     *
     * @param channelId
     * @param embedMessageToApply
     */
    pushButton(channelId: string, embedMessageToApply: Message): Promise<MessageReaction> {
        return embedMessageToApply.react(this.icon);
    }

}

export default function(icon: string, guiLink: string): Button {
    return new Button(icon, guiLink);
}