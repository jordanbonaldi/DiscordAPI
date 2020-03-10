import definedEngines from "../config/definedEngines";
import Event from "../events/Event";
import {Client, MessageReaction, TextChannel, User} from "discord.js";

export default new class EventHandler {

    events: Event[];

    constructor() {
        this.events = definedEngines.events;
    }

    /**
     *
     *
     * @param event
     */
    addEvent(event: Event): void {
        this.events.push(event);
    }

    /**
     *
     * @param client
     */
    loadEvents(client: Client): void {
        this.events.forEach((e: Event) =>
            client.on(e.name, (event1: any, event2: any): void =>
                e.onEvent(event1)
            )
        );

        client.on('raw', (packet: any): void => {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;

            let channel: TextChannel = client.channels.get(packet.d.channel_id) as TextChannel;

            if (channel == null || channel.messages.has(packet.d.message_id)) return;

            channel.fetchMessage(packet.d.message_id).then(message => {
                let emoji: string = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                let reaction: MessageReaction | undefined = message.reactions.get(emoji);
                let user: User | undefined = client.users.get(packet.d.user_id);

                if (user == null) return;

                if (reaction) reaction.users.set(packet.d.user_id, user);

                if (packet.t === 'MESSAGE_REACTION_ADD')
                    client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));

                if (packet.t === 'MESSAGE_REACTION_REMOVE')
                    client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));

            });
        });
    }

}