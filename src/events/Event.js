class Event {

    /**
     *
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    /**
     *
     * @param name
     */
    constructor(name) {
        this._name = name;
    }

    /**
     *
     * @param event
     * @returns {null}
     */
    onEvent(event) {
        return null;
    }
}

/**
 *
 * @type {Event}
 */
module.exports = Event;