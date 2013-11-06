
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

exports.retourner_date = function(req, res) {
  res.json(new Date());

}
