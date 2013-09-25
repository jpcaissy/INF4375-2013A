
/*
 * GET home page.
 */

exports.index = function(req, res){
  var objet = [
    {'nom': 'Jean-Philippe Caissy'},
    {'nom': 'Jacques Berger'}
  ];
  res.render('index', { title: 'Express', tableau: tableau});
};
