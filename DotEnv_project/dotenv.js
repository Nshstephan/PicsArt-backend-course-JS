const fs = require('fs');

function config() {
    try {
        let data = fs.readFileSync('./.env', 'utf8');
        let byLine = data.split('\n');
        for (let i = 0; i < byLine.length; ++i) {
            let splitted = byLine[i].split('=');
            let key = splitted[0];
            let value;
            if (splitted.length >= 3) {
                value = splitted.slice(1).join('=');
            } else {
                value = splitted[1];
            }
            if (!key.startsWith("#") && key !== '') {
                if(value === undefined) continue;
                process.env[key] = value.replace(/['"]/g, '');
            }
        }
    } catch (err) {
        throw new Error("File not found.");
    }
}

module.exports = {config: config};
