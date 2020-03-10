import GUI from "../gui/GUI";
declare const _default: {
    readonly gui: {
        [name: string]: GUI[];
    };
    /**
     *
     * @param gui
     */
    connectGUI(gui: GUI): void;
    loadAll(): Promise<void[]>;
    /**
     *
     * @param channelId
     */
    getActiveGUI(channelId: string): GUI;
    /**
     *
     * @param channelId
     * @param className
     */
    findGUIByClassName(channelId: string, className: string | GUI): GUI;
    /**
     *
     * @param reaction
     * @param channelId
     */
    openGUIWithReaction(reaction: string, channelId: string): Promise<any> | null;
    /**
     *
     * @param gui
     */
    openGUI(gui: GUI): Promise<any>;
};
export default _default;
