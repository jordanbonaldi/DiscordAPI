class Field {

    /**
     *
     * @param title
     * @param description
     * @param inline
     * @param blank
     */
    constructor(title, description, inline = false, blank = false) {
        this.title = title;
        this.description = description;
        this.inline = inline;
        this.blank = blank;
    }

    getConstructedField(embedMessageToApply) {
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

module.exports = (title, description, inline, blank) => new Field(title, description, inline, blank);