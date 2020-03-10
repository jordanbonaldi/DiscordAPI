"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HelpCommand_1 = require("../commands/HelpCommand");
var CommandEvent_1 = require("../events/CommandEvent");
var ReactionsEvent_1 = require("../events/ReactionsEvent");
var MessagesEvent_1 = require("../events/MessagesEvent");
var engines = {
    commands: [
        HelpCommand_1.default
    ],
    events: [
        CommandEvent_1.default,
        ReactionsEvent_1.default,
        MessagesEvent_1.default
    ]
};
exports.default = engines;
