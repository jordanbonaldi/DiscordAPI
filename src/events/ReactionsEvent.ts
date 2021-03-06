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
    onEvent(reaction: MessageReaction): null | Promise<MessageReaction | MessageReaction[] | undefined> {
        if (reaction.users.filter(e => !e.bot).size === 0)
            return null;

        let user: User = reaction.users.last();
        let oldGUI: GUI | null = GUIHandler.getActiveGUI(reaction.message.channel.id);
        let gui: GUI | null = GUIHandler.getGUIWithReaction(reaction.emoji.name, reaction.message.channel.id, user.id);

        if (gui == undefined) return Promise.resolve(undefined);

        if (!gui?.personalMessage) return reaction.remove(user).then(() =>
            oldGUI?.onReaction(user, reaction, gui as GUI)
                .then((shouldSend: boolean) => shouldSend ? GUIHandler.openGUI(gui as GUI) : Promise.resolve(undefined))
            );

        gui.rebuildMessage();

        return ((GUIHandler.getGUIOfUser(user.id).channelId === gui.channelId ? reaction.remove(user) : Promise.resolve()) as Promise<MessageReaction | void>).then(() =>
            oldGUI?.onReaction(user, reaction, gui as GUI).then((shouldSend: boolean) =>
                shouldSend ? user.send(gui?.message).then((message: Message | Message[]) => {
                    if (gui !== null)
                        gui.dmID = message as Message;

                    return reaction.remove(user);
                }) : Promise.resolve(reaction)
            )
        );
    }

}