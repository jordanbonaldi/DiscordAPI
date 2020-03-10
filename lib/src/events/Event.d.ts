export default abstract class Event {
    name: string;
    /**
     *
     * @param name
     */
    protected constructor(name: string);
    /**
     *
     * @param event
     */
    abstract onEvent(event: any): any | void;
}
