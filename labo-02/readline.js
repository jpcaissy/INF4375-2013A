
    var readline = require('readline');
    var rl = readline.createInterface({input: process.stdin, output: process.stdout});
    console.log("\n\nJe suis au début du code source.")
    var gerer_reponse = function(reponse) {
        console.log("Voici la réponse : ", reponse);
        rl.close();
    }
    rl.question("Que pensez-vous de node.js ?", gerer_reponse);
    console.log("\n\nLe programme va se terminer.")
