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
  var sigle_cours = req.params.sigle;

  /**
   * #5A : Récupérez le cours dans les données (data.cours) et retournez le
   * au template cours.jade
   *
   * N'oubliez pas d'exposer la méthode cours au module avec module.exports !
   */

  /**
   * #5B : Ajoutez une validation au sigle. Si le sigle n'existe pas
   * dans la liste des cours, retourner un erreur 404.
   */

}

var modifier_cours = function(req, res) {
  var sigle_cours = req.params.sigle;
  if(!(sigle_cours in data.cours)) {
    res.status(404).send('Not found');
    return;
  }

  var cours = data.cours[sigle_cours];
  console.log(cours.sigle, sigle_cours);

  return res.render('modifier', {'cours': cours, sigle_cours: sigle_cours});
};

var modifier_cours_post = function(req, res) {
  var sigle_cours = req.params.sigle;
  if(!(sigle_cours in data.cours)) {
    res.status(404).send('Not found');
    return;
  }

  data.cours[sigle_cours].nom = req.body.nom;
  /*
   * #8- Faites l'écriture du fichier data/cours_automne avec les nouvelles
   * données.
   */
  
  /**
   * #9- Avec res.redirect(), faites la redirection vers la page d'information
   * du cours.
   */
}

module.exports.accueil = accueil;
module.exports.liste_cours = liste_cours;

module.exports.modifier_cours = modifier_cours
