const fs = require('fs');

/**
 *
 * @param endPath
 * @param from
 */
export default function getEngines<T>(endPath: string, from: string): Array<T> {
    let files = fs.readdirSync('./src/' + from);

    let engines: T[] = [];

    files.forEach((file: string) => {
        if (!file.includes('.js'))
            engines = engines.concat(getEngines(from + file, from));
        else if (file.includes(endPath) && file !== endPath)
            engines.push(
                require('../' + from + file)
            )
    });

    return engines;
};