
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.requete_ajax = function(req, res) {
  res.json({
    'name': req.params.name,
    'date': new Date()
  });
}

exports.liste_bieres = function(req, res) {
  res.header("Content-Type", "application/xml");
  res.send('<?xml version="1.0" encoding="utf-8"?><bieres><compagnie><nom>Unibroue</nom><biere>Fin du monde</biere></compagnie><compagnie><nom>La Barberie</nom><biere>Blonde biologique</biere><biere>Stout impériale</biere></compagnie></bieres>');
}
