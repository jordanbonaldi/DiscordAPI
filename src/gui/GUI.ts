import {Message, RichEmbed, TextChannel, User} from "discord.js";
import DiscordAPI from "../DiscordAPI";
import {Button} from "./Buttons";
import {Field} from "./Field";

export default abstract class GUI {

    color: string;
    title: string;
    author: string;
    description: string;
    thumbnail: string;
    channelId: string;
    footer: string;

    // Accessed fields
    reload: boolean;
    active: boolean;


    message !: RichEmbed;
    buttons : Button[];

    private readonly oneMessage: boolean;

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
    protected constructor(
        color: string,
        title: string,
        author: string,
        description: string,
        footer: string,
        thumbnail: string,
        channelId: string,
        oneMessage: boolean,
        reload: boolean
    ) {
        this.color = color;
        this.title = title;
        this.author = author;
        this.description = description;
        this.footer = footer;
        this.thumbnail = thumbnail;
        this.channelId = channelId;
        this.oneMessage = oneMessage;
        this.reload = reload;
        this.active = false;
        this.buttons = [];

        this.rebuildMessage();
    }

    buildCore(): void {
        this.message = DiscordAPI.createEmbed()
            .setColor(this.color)
            .setTitle(this.title)
            .setAuthor(this.author)
            .setDescription(this.description)
            .setFooter(this.footer, this.thumbnail)
            .setThumbnail(this.thumbnail)
            .setTimestamp();
    }

    /**
     *
     * @param reaction
     * @returns {*}
     */
    findReaction(reaction: string) {
        return this.buttons.filter((button: Button) => button.icon === reaction)[0];
    }


    /**
     *
     * @param fields
     */
    addFields(...fields: Field[]): void {
        fields.forEach(field => this.message = field.getConstructedField(this.message));
    }

    addButton(...buttons: Button[]): void {
        buttons.forEach(b => this.buttons.push(b));
    }

    protected abstract defineButtons(): void;

    protected abstract defineField(): void;

    rebuildMessage(): void {
        this.buildCore();
        this.defineButtons();
        this.defineField();
    }

    /**
     *
     * @param post
     */
    construct(post: boolean = true): Promise<any> {
        let guild: TextChannel | undefined = DiscordAPI.getChannelFromId(this.channelId);

        if (guild == null)
            return Promise.reject("Unknown guild");

        return guild.fetchMessages({limit: 1})
            .then((messages: any) => {
                if (messages.size === 0 && post)
                    return this.postMessage();
                if (this.oneMessage)
                    return messages.first().clearReactions().then(() =>
                        messages.first().edit(this.message).then(
                            () => Promise.all(this.buttons.map((button: Button) =>
                                button.pushButton(this.channelId, messages.first())
                            ))
                        )
                    );
            })
    }

    postMessage(): Promise<void> {
        return DiscordAPI.sendMessageOnChannel(this.channelId, this.message)
            .then((message: Message | Message[]) =>
                console.log(message)
            ).catch(() => console.log("Error while posting message"));
    }

    /**
     *
     * @param user
     * @param message
     */
    onMessage(user: User, message: Message): Promise<Message> {
        return message.delete();
    }

}
