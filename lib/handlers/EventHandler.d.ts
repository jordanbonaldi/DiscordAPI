import Event from "../events/Event";
import { Client } from "discord.js";
declare const _default: {
    events: Event[];
    /**
     *
     *
     * @param event
     */
    addEvent(event: Event): void;
    /**
     *
     * @param client
     */
    loadEvents(client: Client): void;
};
export default _default;
