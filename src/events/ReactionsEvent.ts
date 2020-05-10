import {Message, MessageEmbed, MessageReaction, User} from "discord.js";
import GUIHandler from "../handlers/GUIHandler";
import Event from "./Event";
import GUI from "../gui/GUI";

export default new class ReactionsEvent extends Event {

    constructor() {
        super('messageReactionAdd');
    }

    /*
     *
     * @param reaction
     * @param user
     */
    onEvent(reaction: MessageReaction): null | Promise<any> {
        if (reaction.users.filter(e => !e.bot).size === 0)
            return null;

        let user: User = reaction.users.last();
        let gui: GUI | null = GUIHandler.getGUIWithReaction(reaction.emoji.name, reaction.message.channel.id, user.id);
        if (gui === null) return null;

        if (!gui.personalMessage) return GUIHandler.openGUI(gui);

        gui.rebuildMessage();

        if (GUIHandler.getGUIOfUser(user.id).channelId === gui.channelId)
            return reaction.remove(user);

        return user.send(gui.message).then((message: Message | Message[]) => {
            if (gui !== null)
                gui.dmID = message as Message;
            return reaction.remove(user);
        });
    }

}