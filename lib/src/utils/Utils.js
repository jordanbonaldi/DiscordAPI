"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
/**
 *
 * @param endPath
 * @param from
 */
function getEngines(endPath, from) {
    var files = fs.readdirSync('./src/' + from);
    var engines = [];
    files.forEach(function (file) {
        if (!file.includes('.js'))
            engines = engines.concat(getEngines(from + file, from));
        else if (file.includes(endPath) && file !== endPath)
            engines.push(require('../' + from + file));
    });
    return engines;
}
exports.default = getEngines;
;
