"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Field = /** @class */ (function () {
    /**
     *
     * @param title
     * @param description
     * @param inline
     * @param blank
     */
    function Field(title, description, inline, blank) {
        if (inline === void 0) { inline = false; }
        if (blank === void 0) { blank = false; }
        this.title = title;
        this.description = description;
        this.inline = inline;
        this.blank = blank;
    }
    /**
     *
     * @param embedMessageToApply
     */
    Field.prototype.getConstructedField = function (embedMessageToApply) {
        embedMessageToApply.addField(this.title, this.description, this.inline);
        if (this.blank)
            embedMessageToApply.addBlankField();
        return embedMessageToApply;
    };
    return Field;
}());
exports.Field = Field;
/**
 *
 * @param title
 * @param description
 * @param inline
 * @param blank
 */
function default_1(title, description, inline, blank) {
    if (inline === void 0) { inline = false; }
    if (blank === void 0) { blank = false; }
    return new Field(title, description, inline, blank);
}
exports.default = default_1;
