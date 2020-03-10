import { Message, RichEmbed, User } from "discord.js";
import { Button } from "./Buttons";
import { Field } from "./Field";
export default abstract class GUI {
    color: string;
    title: string;
    author: string;
    description: string;
    thumbnail: string;
    channelId: string;
    footer: string;
    reload: boolean;
    active: boolean;
    message: RichEmbed;
    buttons: Button[];
    private readonly oneMessage;
    /**
     *
     * @param color
     * @param title
     * @param author
     * @param description
     * @param footer
     * @param thumbnail
     * @param channelId
     * @param oneMessage
     * @param reload
     */
    protected constructor(color: string, title: string, author: string, description: string, footer: string, thumbnail: string, channelId: string, oneMessage: boolean, reload: boolean);
    buildCore(): void;
    /**
     *
     * @param reaction
     * @returns {*}
     */
    findReaction(reaction: string): Button;
    /**
     *
     * @param fields
     */
    addFields(...fields: Field[]): void;
    addButton(...buttons: Button[]): void;
    protected abstract defineButtons(): void;
    protected abstract defineField(): void;
    rebuildMessage(): void;
    /**
     *
     * @param post
     */
    construct(post?: boolean): Promise<any>;
    postMessage(): Promise<void>;
    /**
     *
     * @param user
     * @param message
     */
    onMessage(user: User, message: Message): Promise<Message>;
}
