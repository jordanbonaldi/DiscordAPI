"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordAPI_1 = require("./DiscordAPI");
exports.discordAPI = DiscordAPI_1.default;
exports.discordGUI = {
    gui: require('./gui/GUI'),
    guiHandler: require('./handlers/GUIHandler'),
    field: require('./gui/Field'),
    button: require('./gui/Buttons')
};
