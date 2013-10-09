
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.accueil);
app.get('/cours', routes.liste_cours);
/*
 * #4 - Ajouter une route dynamique dynamique pour gérer les liens
 * ajoutés au template cours.jade.
 * Une route dynamique peut contenir des variables de cette manière : 
 * app.get('/dossier/:id') et dans la routes, on peut accéder
 * à l'id avec request.params.id
 */
app.get('/cours/:sigle', routes.voir_cours);

/*
 * #7 - Ajouter une route dynamique dynamique comme pour #4, mais pour 
 * modifier les cours. Assurez-vous d'avoir la même route que 
 * le lien Modifier dans le template jade cours.jade
 * Par exemple : /cours/INF4375/modifier/
 */
app.get('/cours/:sigle/modifier', routes.modifier_cours);

/*
 * #10 - Ajouter la même route dynamique que #7, mais avec la méthode POST, pour
 * gérer la soumission du formulaire.
 */
app.post('/cours/:sigle/modifier', routes.modifier_cours_post);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
