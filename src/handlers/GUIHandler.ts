import GUI from "../gui/GUI";

export default new class GUIHandler {

    private readonly gui: {[name: string] : GUI[]};

    constructor() {
        this.gui = {};
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
            this.gui[gui].filter((e: GUI) => e.reload)).map(gui => {
                gui.forEach(e => e.active = true);
                return gui.forEach(e => e.construct());
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
     */
    openGUIWithReaction(reaction: string, channelId: string): Promise<any> | null {
        let activeGui = this.getActiveGUI(channelId);

        if (activeGui == null)
            return null;

        let gui = this.findGUIByClassName(channelId,
            activeGui.findReaction(reaction).guiLink);

        if (gui == null)
            return null;

        this.gui[channelId].forEach(e => e.active = false);
        gui.active = true;

        return this.openGUI( gui);
    }

    /**
     *
     * @param gui
     */
    openGUI(gui: GUI): Promise<any> {
        return gui.construct();
    }

}