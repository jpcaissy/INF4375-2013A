    var fs = require('fs');

    /*
     * Ne jamais utiliser les métohdes synchrones !
     */
    fs.writeFileSync('fichier', 'Cette chaine est dans le fichier');

    fs.readFile('fichier', function(err, data) {
      if(err) {
        throw err;
      }
      console.log('Callback de la lecture du fichier');
      console.log(data.toString());
    });

    console.log('Fin du fichier javascript');
