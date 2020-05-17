import {Collection, Message, MessageReaction, RichEmbed, TextChannel, User} from "discord.js";
import DiscordAPI from "../DiscordAPI";
import {Button} from "./Buttons";
import {FieldClass} from "./Field";
import {GUIHandler} from "../index";
import ReactionsEvent from "../events/ReactionsEvent";

export default abstract class GUI {

    // Accessed fields
    active !: boolean;
    message !: RichEmbed;

    public dmID: Message | undefined = undefined;

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
     * @param personalMessage
     * @param image
     * @param buttons
     */
    protected constructor(
        private readonly color: string,
        public readonly title: string,
        private readonly author: string,
        private readonly description: string,
        private readonly footer: string,
        private readonly thumbnail: string,
        public readonly channelId: string,
        private readonly oneMessage: boolean,
        public reload: boolean,
        public readonly personalMessage: boolean = false,
        private readonly image : string | null = null,
        public buttons: Button[] = []
    ) { this.rebuildMessage() }

    buildCore(): void {
        this.message = DiscordAPI.createEmbed()
            .setColor(this.color)
            .setTitle(this.title)
            .setAuthor(this.author)
            .setDescription(this.description)
            .setFooter(this.footer, this.thumbnail)
            .setThumbnail(this.thumbnail)
            .setTimestamp();

        if (this.image !== null)
            this.message.setImage(this.image);
    }

    /**
     *
     * @param reaction
     * @returns {*}
     */
    findReaction(reaction: string): Button {
        return this.buttons.filter((button: Button) => button.icon === reaction)[0];
    }

    /**
     *
     * @param fields
     */
    addFields(...fields: FieldClass[]): void {
        fields.forEach(field => this.message = field.getConstructedField(this.message));
    }

    addButton(...buttons: Button[]): void {
        buttons.forEach(b => this.buttons.push(b));
    }

    protected abstract defineButtons(): void;

    protected abstract defineField(): void;

    abstract refreshData(): Promise<any>;

    rebuildMessage(): void {
        this.buildCore();
        this.defineButtons();
        this.defineField();
    }

    /**
     *
     * @param message
     */
    editMessage(message: Message): Promise<MessageReaction[]> {
        return message.clearReactions().then(() =>
            message.edit(this.message).then(
                () => this.postButtons(message)
            )
        );
    }

    postButtons(message: Message): Promise<MessageReaction[]> {
        return Promise.all(this.buttons.map((button: Button) =>
            button.pushButton(this.channelId, message)
        ));
    }

    /**
     *
     * @param post
     * @param refresh
     */
    construct(post: boolean = true, refresh: boolean = true): Promise<MessageReaction[] | undefined> {
        let guild: TextChannel | undefined = DiscordAPI.getChannelFromId(this.channelId);

        if (guild == null)
            return Promise.reject("Unknown guild");

        return (refresh ? this.refreshData() : Promise.resolve())
            .then(() => this.rebuildMessage())
            .then(() => guild?.fetchMessages({limit: 1})
            .then((messages: Collection<String, Message>) => {
                if (messages.size === 0 && post)
                    return this.postMessage().then((message) => this.postButtons(message as Message));
                if (this.oneMessage)
                    return this.editMessage(messages.first());
                else
                    return messages.last().author.bot ? this.editMessage(messages.last()) :
                        DiscordAPI.sendMessageOnChannel(this.channelId, this.message).then((msg: Message | Message[]) => this.postButtons(msg as Message));
            })
        );
    }

    postMessage(): Promise<Message | Message[] | void> {
        return DiscordAPI.flushChannel(this.channelId).then(() =>
            DiscordAPI.sendMessageOnChannel(this.channelId, this.message).catch(() => console.log("Error while posting message")));
    }

    /**
     *
     * @param user
     * @param message
     */
    onMessage(user: User, message: Message): Promise<Message> {
        return message.delete();
    }

    /**
     *
     * Should open next gui
     *
     * @param user
     * @param reaction
     * @param nextGUI
     */
    onReaction(user: User, reaction: MessageReaction, nextGUI: GUI): Promise<boolean> {
        return Promise.resolve(true);
    }

    /**
     *
     * @param gui
     */
    protected nextGUI(gui: GUI): Promise<any> {
        gui.active = true;
        GUIHandler.connectGUI(gui);
        this.active = false;
        return GUIHandler.openGUI(gui);
    }
}

