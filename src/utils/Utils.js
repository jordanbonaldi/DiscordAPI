const fs = require('fs');

/**
 *
 * @param endPath
 * @param from
 * @returns {Array}
 */
const getEngines = (endPath, from) => {
    let files = fs.readdirSync('./src/' + from);

    let engines = [];

    files.forEach(f => {
        if (!f.includes('.js'))
            engines = engines.concat(getEngines(from + f));
        else if (f.includes(endPath) && f !== endPath)
            engines.push(
                require('../' + from + f)
            )
    });

    return engines;
};

/**
 *
 */
module.exports = {getEngines};