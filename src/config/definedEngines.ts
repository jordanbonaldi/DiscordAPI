import HelpCommand from "../commands/HelpCommand";
import CommandEvent from "../events/CommandEvent";
import Command from "../commands/Command";
import Event from "../events/Event";
import ReactionsEvent from "../events/ReactionsEvent";
import MessagesEvent from "../events/MessagesEvent";

type Engines = {
    commands: Command[];
    events: Event[];
}

let engines: Engines = {
    commands: [
        HelpCommand
    ],
    events: [
        CommandEvent,
        ReactionsEvent,
        MessagesEvent

    ]
};

export default engines;