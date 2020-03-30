import {RichEmbed} from "discord.js";

export class FieldClass {

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
    constructor(title: string, description: string, inline: boolean = false, blank: boolean = false) {
        this.title = title;
        this.description = description;
        this.inline = inline;
        this.blank = blank;
    }

    /**
     *
     * @param embedMessageToApply
     */
    getConstructedField(embedMessageToApply: RichEmbed): RichEmbed {
        embedMessageToApply.addField(
            this.title,
            this.description,
            this.inline
        );

        if (this.blank)
            embedMessageToApply.addBlankField();

        return embedMessageToApply;
    }

}

/**
 *
 * @param title
 * @param description
 * @param inline
 * @param blank
 */
export default function(title: string, description: string, inline: boolean = false, blank: boolean = false): FieldClass {
    return new FieldClass(title, description, inline, blank);
}
