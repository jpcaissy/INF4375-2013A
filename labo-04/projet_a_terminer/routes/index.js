data = require('../data/cours_automne.js');

var accueil = function(req, res) {
  var nom = 'Jacques Berger';
  /**
   * #1 : Dans le template index.jade, il y a une variable nom qui est affiché.
   * Utilisez res.render pour afficher le template index.jade et la variable nom. 
   */

};

var liste_cours = function(req, res) {

  var liste_cours = [];
  for(var cours in data.cours) {
    liste_cours.push(cours);
  }

  /**
   * #2 : Le tableau liste_cours contient la liste
   * de tous les cours pour l'automne 2014.
   * Utilisez res.render pour afficher le template liste_cours.jade et lui passer la variable cours.
   */

};

var voir_cours = function(req, res) {
  var liste_cours = req.params.cours;

  /**
   * #5 : Récupérez le cours dans les données (data.cours) et retournez le
   * au template cours.jade
   *
   * N'oubliez pas d'exposer la méthode cours au module avec module.exports !
   */

}

var modifier_cours = function(req, res) {
  var liste_cours = req.params.cours;
  var 
};

module.exports.accueil = accueil;
module.exports.liste_cours = liste_cours;
