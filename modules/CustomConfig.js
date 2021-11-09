const fs = require('fs');
const YAML = require('yaml');

function fixComments(text) {
    return text.replace(/("|')?~(\d+)?("|')?:\s("|')?.+("|')?/g, match => "# " + match.replace(/("|')?~(\d+)?("|')?:\s/g, '').replace(/("|')/g, ''));
}
module.exports = class Config {
    constructor(path, defaultcontent) {
        this.path = path;
        if (!fs.existsSync(path)) {
            function createConfig() {
                fs.writeFileSync(path, fixComments(YAML.stringify(defaultcontent)), function (err) {
                    if (err) return err;
                })
            }
            if (!fs.existsSync('./addon_configs')) {
                fs.mkdirSync('./addon_configs', (err) => { if (err) console.log(err); });
                createConfig();
            } else createConfig();
            return YAML.parse(fs.readFileSync(path, 'utf-8'));
        } else {
            return YAML.parse(fs.readFileSync(path, 'utf-8'));
        }
    }
}
// https://directleaks.net