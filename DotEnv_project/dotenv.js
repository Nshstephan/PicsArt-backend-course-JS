const fs = require('fs');

function config() {
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
            process.env[key] = value;
        }
    }
}

exports.config = config;