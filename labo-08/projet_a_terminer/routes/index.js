fs = require('fs');
data = require('../data/cours_automne.js');

var accueil = function(req, res) {
  var nom = 'Labo 8 INF4375';
  res.render('index', {'nom': nom});
};

var liste_cours = function(req, res) {
  var liste_cours = [];
  for(var cours in data.cours) {
    liste_cours.push(cours);
  }
  res.render('liste_cours', {'cours': liste_cours});
};

var voir_cours = function(req, res) {
  var sigle_cours = req.params.sigle;
  var cours = data.cours[sigle_cours];
  var sigle_cours = req.params.sigle;
  if(!(sigle_cours in data.cours)) {
    res.status(404).send('Not found');
    return;
  }
  return res.render('cours', {'cours': cours, sigle_cours: sigle_cours});
}

var modifier_cours = function(req, res) {
  var sigle_cours = req.params.sigle;
  if(!(sigle_cours in data.cours)) {
    res.status(404).send('Not found');
    return;
  }
  var cours = data.cours[sigle_cours];
  return res.render('modifier', {'cours': cours, sigle_cours: sigle_cours});
};

var modifier_cours_post = function(req, res) {
  var sigle_cours = req.params.sigle;
  if(!(sigle_cours in data.cours)) {
    res.status(404).send('Not found');
    return;
  }
  data.cours[sigle_cours].nom = req.body.nouveau_nom;
  fs.writeFile('data/cours_automne.json', JSON.stringify(data.cours), function(err) {
      if(err) {
          throw err;
      }
      res.redirect('/cours/' + sigle_cours);
  });
}

module.exports.accueil = accueil;
module.exports.liste_cours = liste_cours;
module.exports.voir_cours = voir_cours;
module.exports.modifier_cours_post = modifier_cours_post;
module.exports.modifier_cours = modifier_cours
