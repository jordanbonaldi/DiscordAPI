export default abstract class Event {
    name: string;

    /**
     *
     * @param name
     */
    protected constructor(name: string) {
        this.name = name;
    }

    /**
     *
     * @param event
     */
    public abstract onEvent(event: any): any | void;

}