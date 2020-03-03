const Utils = require('../src/utils/Utils');

const commands = Utils.getEngines('Command.js', 'commands/');
const events = Utils.getEngines('Event.js', 'events/');

module.exports = {
    commands: commands,
    events: events
};