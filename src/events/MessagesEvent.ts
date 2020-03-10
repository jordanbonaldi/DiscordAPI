import {Message} from "discord.js";
import Event from "./Event";
import GUIHandler from "../handlers/GUIHandler";
import GUI from "../gui/GUI";

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

        let gui: GUI | null = GUIHandler.getActiveGUI(channelId);

        if (gui == null)
            return;

        return gui.onMessage(message.author, message);
    }


}