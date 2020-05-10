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

        if (message.channel.type === "dm") {
            let gui: GUI | undefined = GUIHandler.getGUIOfUser(message.author.id);

            if (gui === undefined) return;

            console.log(gui);
            return gui.onMessage(message.author, message);
        }

        let gui: GUI | null = GUIHandler.getActiveGUI(channelId);

        if (gui == null)
            return;

        return gui.onMessage(message.author, message);
    }


}