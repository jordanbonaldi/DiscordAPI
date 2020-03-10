import {
    Channel,
    Client,
    Guild,
    GuildChannel,
    GuildMember,
    Message,
    MessageReaction,
    RichEmbed,
    TextChannel
} from 'discord.js';
import EventHandler from "./handlers/EventHandler";

export default new class DiscordAPI {

    private loginToken!: string;
    private serverId!: string;

    client: Client;

    constructor() {
        this.client = new Client();
    }

    /**
     *
     * @param serverId
     * @param loginToken
     */
    setCredentials(serverId: string, loginToken: string): DiscordAPI {
        this.loginToken = loginToken;
        this.serverId = serverId;

        EventHandler.loadEvents(
            this.client
        );

        return this;
    }

    login(): Promise<Client> {
        return this.client.login(this.loginToken).then(() => this.client);
    }

    getGuild(): Guild | undefined {
        return this.client.guilds.get(this.serverId)
    }

    /**
     *
     * @param userId
     */
    getMember(userId: string): GuildMember | null {
        let guild: Guild | undefined = this.getGuild();

        return guild == null ? null : guild.members.find(e => e.id === userId);
    }

    /**
     *
     * @param userId
     * @param roleId
     */
    memberHasRole(userId: string, roleId: string): boolean {
        let member: GuildMember | null = this.getMember(userId);

        return member == null ? false : member.roles.filter(role => role.id === roleId).size >= 0;
    }

    /**
     *
     * @param userId
     * @param message
     */
    sendMessage(userId: string, message: string): Promise<Message | Message[]> | null {
        let member: GuildMember | null = this.getMember(userId);

        return member == null ? null : member.send(message);
    }

    /**
     *
     * @param channelId
     */
    getChannelFromId(channelId: string): TextChannel | undefined {
        let guild: Guild | undefined = this.getGuild();

        return guild == null ? undefined : guild.channels.get(channelId) as TextChannel;
    }

    /**
     *
     * @param channelId
     * @param message
     */
    sendMessageOnChannel(channelId: string, message: Message | RichEmbed | string): Promise<Message | Message[]> {
        let channel: TextChannel | undefined = this.getChannelFromId(channelId);

        return channel == null ? Promise.reject(null) : channel.send(message);
    }

    /**
     *
     * @param channelId
     * @param message
     * @param file
     */
    sendFileOnChannel(channelId: string, message: string, file: string): Promise<Message | Message[]> | null {
        let channel: TextChannel | undefined = this.getChannelFromId(channelId);

        return channel == null ? null : channel.send(message, {
            files: [file]
        });
    }

    /**
     *
     * @param channelId
     * @param title
     */
    changeChannelName(channelId: string, title: string): Promise<GuildChannel> {
        let channel: TextChannel | undefined = this.getChannelFromId(channelId);

        return channel == null ? Promise.reject() : channel.setName(title);
    }

    createEmbed(): RichEmbed {
        return new RichEmbed();
    }

    /**
     *
     * @param channelId
     * @param messageId
     */
    removeMessage(channelId: string, messageId: string): Promise<Message> | null {
        return this.actionOnFetchedMessage(channelId, messageId, (message: Message) => message.delete());
    }


    /**
     *
     * @param channelId
     * @param messageId
     * @param callback
     */
    actionOnFetchedMessage(
        channelId: string,
        messageId: string,
        callback: (message: Message) => Promise<Message | MessageReaction | void>
    ): Promise<Message | any> {
        let channel: TextChannel | undefined = this.getChannelFromId(channelId);

        return channel == null ? Promise.reject() : channel.fetchMessage(messageId).then(callback)
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param newMessage
     */
    modifyMessage(channelId: string, messageId: string, newMessage: string | RichEmbed | Message): Promise<Message> | null {
        return this.actionOnFetchedMessage(channelId, messageId, (message: Message) => message.edit(newMessage));
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     * @param newMessage
     * @param reactions
     */
    awaitAndChange(
        channelId: string,
        messageId: string,
        emoji: string,
        newMessage: string | Message | RichEmbed,
        ...reactions: any
    ): Promise<any> {
        return this.actionOnFetchedMessage(channelId, messageId, (message: Message) => message.awaitReactions(
            (reaction) => reaction.emoji.name === emoji, {max: 1}
        ).then((reaction) =>
            reaction.filter(e => e.emoji.name === emoji).first().message.clearReactions()
                .then(() => this.modifyMessage(channelId, messageId, newMessage))
                .then(() => reactions.forEach((r: string) => this.addReactions(channelId, messageId, r)))
        ));
    }

    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     */
    addReactions(channelId: string, messageId: string, emoji: string): Promise<any> | null {
        return this.actionOnFetchedMessage(channelId, messageId, (message: Message) =>
            message.react(Array.isArray(emoji) ? emoji[0] : emoji)
        );
    }
}