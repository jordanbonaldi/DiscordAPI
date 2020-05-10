import GUI from "../gui/GUI";
import {Message, MessageReaction, User} from "discord.js";

export default new class GUIHandler {

    private readonly gui: {[name: string] : GUI[]} = {};
    private readonly dmGUI: {[userID: string]: GUI} = {};

    /**
     *
     * @param gui
     */
    removeGui(gui: GUI) {
        gui.active = false;

        this.gui[gui.channelId] = this.gui[gui.channelId].filter(e => e.title != gui.title);
    }

    /**
     *
     * @param gui
     */
    connectGUI(gui: GUI): void {
        if (this.gui[gui.channelId] == null)
            this.gui[gui.channelId] = [];
        this.gui[gui.channelId].push(gui);
    }

    loadAll(): Promise<void[]> {
        return Promise.all(Object.keys(this.gui).map((gui: string) =>
            this.gui[gui].filter((e: GUI) => e.reload)).map((gui: GUI[]) => {
                gui.forEach(e => e.active = true);
                return gui.filter((e: GUI) => !e.personalMessage).forEach((e: GUI) => e.construct());
        }));
    }

    /**
     *
     * @param channelId
     */
    getActiveGUI(channelId: string): GUI | null {
        if (this.gui[channelId] == null)
            return null;
        return this.gui[channelId].filter((gui: GUI) => gui.active)[0];
    }

    /**
     *
     * @param channelId
     * @param className
     */
    findGUIByClassName(channelId: string, className: GUI | string): GUI {
        return this.gui[channelId].filter((gui: GUI) => (className instanceof GUI ? gui : gui.constructor.name) === className)[0];
    }

    /**
     *
     * @param reaction
     * @param channelId
     * @param userID
     */
    getGUIWithReaction(reaction: string, channelId: string, userID ?: string): GUI | null {
        let activeGui = this.getActiveGUI(channelId);

        if (activeGui == null)
            return null;

        let gui = this.findGUIByClassName(channelId,
            activeGui.findReaction(reaction).guiLink);

        if (gui == null)
            return null;

        this.gui[channelId].forEach(e => e.active = false);
        if (gui.personalMessage && userID !== undefined)
            this.dmGUI[userID] = gui;

        gui.active = true;

        return gui;
    }

    /**
     *
     * @param userID
     */
    getGUIOfUser(userID: string): GUI {
        return this.dmGUI[userID];
    }

    /**
     *
     * @param userID
     * @param gui
     */
    setUserGUI(userID: string, gui: GUI) {
        this.dmGUI[userID] = gui;
    }

    /**
     *
     * @param reaction
     * @param channelId
     */
    openGUIWithReaction(reaction: string, channelId: string): Promise<any> | null {
        let gui: GUI | null = this.getGUIWithReaction(reaction, channelId);
        if (gui === null) return null;

        return this.openGUI(gui);
    }

    /**
     *
     * @param gui
     */
    openGUI(gui: GUI): Promise<MessageReaction[]> {
        gui.active = true;
        return gui.construct();
    }

    /**
     *
     * @param newGui
     * @param oldGui
     */
    changeGUI(newGui: GUI, oldGui: GUI): Promise<MessageReaction[]> {
        newGui.active = true;
        this.connectGUI(newGui);
        oldGui.active = false;

        return this.openGUI(newGui);
    };

    /**
     *
     * @param newGui
     * @param oldGui
     * @param user
     */
    changeGUIDms(newGui: GUI, oldGui: GUI, user: User): Promise<Message> {
        this.removeGui(oldGui);

        this.setUserGUI(user.id, newGui);
        newGui.rebuildMessage();

        return user.send(newGui.message).then((msg: Message | Message[]) => newGui.dmID = msg as Message);
    }

}