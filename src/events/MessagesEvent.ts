import {Message} from "discord.js";
import Event from "./Event";
import GUIHandler from "../handlers/GUIHandler";

export default new class MessagesEvent extends Event {

    constructor() {
        super('message');
    }

    /*
     *
     * @param message
     */
    onEvent(message: Message): Promise<Message> | void {
        let channelId = message.channel.id;
        if (message.author.bot) return;

        return GUIHandler.getActiveGUI(channelId).onMessage(message.author, message);
    }


}