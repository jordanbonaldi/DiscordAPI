import Command from "../commands/Command";
import Event from "../events/Event";
declare type Engines = {
    commands: Command[];
    events: Event[];
};
declare let engines: Engines;
export default engines;
