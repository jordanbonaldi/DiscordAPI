class Command {
    get help() {
        return this._help;
    }

    /**
     *
     * @returns {String}
     */
    get name() {
        return this._name;
    }

    get roleId() {
        return this._roleId;
    }

    /**
     *
     * @param name
     * @param roleId
     * @param help
     */
    constructor(name, roleId, help) {
        this._name = name;
        this._roleId = roleId;
        this._help = help;
    }

    /**
     *
     * @returns {Promise<*>}
     */
    onCommand(executor, args = []) {
        return null;
    }

}

/**
 *
 * @type {Command}
 */
module.exports = Command;