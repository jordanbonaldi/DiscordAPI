exports.discordAPI = require('./src/DiscordAPI');
exports.discordGUI = {
    gui: require('./src/gui/GUI'),
    guiHandler: require('./src/handlers/GUIHandler'),
    field: require('./src/gui/Field'),
    button: require('./src/gui/Buttons')
};
