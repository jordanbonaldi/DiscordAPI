/**
 *
 */
class GUIHandler {

    constructor() {
        this._gui = {};
    }

    connectGUI(gui) {
        if (this._gui[gui.channelId] == null)
            this._gui[gui.channelId] = [];
        this._gui[gui.channelId].push(gui);
    }

    /**
     *
     * @returns {Promise<number[]>}
     */
    loadAll() {
        return Promise.all(Object.keys(this._gui).map(gui =>
            this._gui[gui].filter(e => e.reload === true)).map(gui => {
                gui.forEach(e => e.active = true);
                return gui.forEach(e => e.construct());
        }));
    }

    /**
     *
     * @param channelId
     * @returns {*}
     */
    getActiveGUI(channelId) {
        return this._gui[channelId].filter(gui => gui.active === true)[0];
    }

    /**
     *
     * @param channelId
     * @param className
     * @returns {*}
     */
    findGUIByClassName(channelId, className) {
        return this._gui[channelId].filter(gui => gui.constructor.name === className)[0];
    }

    /**
     *
     * @param reaction
     * @param channelId
     * @returns {Promise<*>|null}
     */
    openGUIWithReaction(reaction, channelId) {
        let activeGui = this.getActiveGUI(channelId);

        if (activeGui == null)
            return null;

        let gui = this.findGUIByClassName(channelId,
            activeGui.findReaction(reaction).guiLink);

        if (gui == null)
            return null;

        this._gui[channelId].forEach(e => e.active = false);
        gui.active = true;

        return this.openGUI( gui);
    }

    /**
     *
     * @param gui
     * @returns {Promise<*>}
     */
    openGUI(gui) {
        return gui.construct();
    }

}

/**
 *
 * @type {GUIHandler}
 */
module.exports = new GUIHandler();