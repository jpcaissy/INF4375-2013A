fs = require('fs');
module.exports.cours = JSON.parse(fs.readFileSync('data/cours_automne.json'));
