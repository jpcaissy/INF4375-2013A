var serveur_web = require("http");
var fs = require("fs");
var xmldom = require("xmldom");

var callback = function(requete, reponse) {
  reponse.writeHead(200, {'Content-Type': 'text/html'});

  fs.readFile("bieres.xml", function(err, data) {
    if (err) {
      console.log("Error reading XML document");
    } else {
      reponse.write('<!DOCTYPE html>' +
      '<html>' +
        '<head>' +
          '<title>Bières du Québec</title>' +
          '<meta charset="utf-8">' +
        '</head>' +
        '<body>' +
          '<table>' +
            '<thead>' +
              '<tr>' +
                '<th>Microbrasserie</th>' +
                '<th>Bière(s)</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>'
        );
      var domRoot = new xmldom.DOMParser().parseFromString(data.toString());
      var compagnies = domRoot.getElementsByTagName("compagnie");
      if(compagnies.length) {
        for(var i = 0; i < compagnies.length; i++) {
          var compagnie = compagnies[i];
          var nom = compagnie.getElementsByTagName("nom")[0].textContent;
          var bieres = compagnie.getElementsByTagName("biere");
          reponse.write('<tr>');
          reponse.write('<td>' + nom + '<td>');
          reponse.write('<td>');
          for(var j = 0; j < bieres.length; j++) {
            biere = bieres[j];
            reponse.write(biere.textContent + ' ');
          }
          reponse.write('</td>');
          reponse.write('</tr>');
        }
      }
      reponse.write(
            '</tbody>' +
          '</table>' +
        '</body>' +
      '</html>');
      reponse.end();

    }
  });
};

serveur_web.createServer(callback).listen(3000);
