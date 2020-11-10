const translate = require('translate-js');
const fs = require('fs');

const translationFiles = fs.readdirSync('./src/assets/translation/locales').filter(file => file.endsWith('.js'));

for (let file of translationFiles) {
    const translation = require(`./locales/${file}`);
    translate.add(
        translation,
        file.replace('.js', '')
    );
}

module.exports = translate;