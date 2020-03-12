import { Client, Guild, GuildChannel, GuildMember, Message, MessageReaction, RichEmbed, TextChannel } from 'discord.js';
declare class DiscordAPI {
    private loginToken;
    private serverId;
    client: Client;
    constructor();
    /**
     *
     * @param serverId
     * @param loginToken
     */
    setCredentials(serverId: string, loginToken: string): DiscordAPI;
    login(): Promise<Client>;
    getGuild(): Guild | undefined;
    /**
     *
     * @param userId
     */
    getMember(userId: string): GuildMember | null;
    /**
     *
     * @param userId
     * @param roleId
     */
    memberHasRole(userId: string, roleId: string): boolean;
    /**
     *
     * @param userId
     * @param message
     */
    sendMessage(userId: string, message: string): Promise<Message | Message[]> | null;
    /**
     *
     * @param channelId
     */
    getChannelFromId(channelId: string): TextChannel | undefined;
    /**
     *
     * @param channelId
     * @param message
     */
    sendMessageOnChannel(channelId: string, message: Message | RichEmbed | string): Promise<Message | Message[]>;
    /**
     *
     * @param channelId
     * @param message
     * @param file
     */
    sendFileOnChannel(channelId: string, message: string, file: string): Promise<Message | Message[]> | null;
    /**
     *
     * @param channelId
     * @param title
     */
    changeChannelName(channelId: string, title: string): Promise<GuildChannel>;
    createEmbed(): RichEmbed;
    /**
     *
     * @param channelId
     * @param messageId
     */
    removeMessage(channelId: string, messageId: string): Promise<Message> | null;
    /**
     *
     * @param channelId
     * @param messageId
     * @param callback
     */
    actionOnFetchedMessage(channelId: string, messageId: string, callback: (message: Message) => Promise<Message | MessageReaction | void>): Promise<Message | any>;
    /**
     *
     * @param channelId
     * @param messageId
     * @param newMessage
     */
    modifyMessage(channelId: string, messageId: string, newMessage: string | RichEmbed | Message): Promise<Message> | null;
    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     * @param newMessage
     * @param reactions
     */
    awaitAndChange(channelId: string, messageId: string, emoji: string, newMessage: string | Message | RichEmbed, ...reactions: any): Promise<any>;
    /**
     *
     * @param channelId
     * @param messageId
     * @param emoji
     */
    addReactions(channelId: string, messageId: string, emoji: string): Promise<any> | null;
}
declare const _default: DiscordAPI;
export default _default;
export { DiscordAPI as DiscordClass, };
