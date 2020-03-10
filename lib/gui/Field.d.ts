import { RichEmbed } from "discord.js";
export declare class Field {
    title: string;
    description: string;
    inline: boolean;
    blank: boolean;
    /**
     *
     * @param title
     * @param description
     * @param inline
     * @param blank
     */
    constructor(title: string, description: string, inline?: boolean, blank?: boolean);
    /**
     *
     * @param embedMessageToApply
     */
    getConstructedField(embedMessageToApply: RichEmbed): RichEmbed;
}
/**
 *
 * @param title
 * @param description
 * @param inline
 * @param blank
 */
export default function (title: string, description: string, inline?: boolean, blank?: boolean): Field;
