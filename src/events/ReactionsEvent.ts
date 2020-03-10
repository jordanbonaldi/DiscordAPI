import {MessageReaction} from "discord.js";
import GUIHandler from "../handlers/GUIHandler";
import Event from "./Event";

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

        return GUIHandler.openGUIWithReaction(reaction.emoji.name, reaction.message.channel.id);
    }


}