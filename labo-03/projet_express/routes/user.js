
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.banane = function(req, res){
  var id = req.params.id
  res.send("ceci est une banane et bonjour " + id);
};
