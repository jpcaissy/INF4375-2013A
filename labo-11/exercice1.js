var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

var host = '127.0.0.1';
var port = 27017;
var database = 'labo7_exercice1'

console.log("Connexion vers " + host + ":" + port);

MongoClient.connect(format("mongodb://%s:%s/%s?w=1", host, port, database), function(err, db) {
    if(err) {
        console.log("Impossible de se connecter");
        throw err;
    }
    db.dropDatabase(function() {
        var post = db.collection('post');
        /*
         * 1- Complétez l'ajout de 4 messages sur le blogue. Un billet du blogue
         * contient les éléments suivants : titre, le billet, date d'ajout.
         *
         * Pour le billet, vous pouvez utiliser baconipsum pour générer 
         * le texte : http://baconipsum.com/
         *
         * Voir http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html#insert
         * pour insérer des documents. Il est possible d'ajouter plus d'un document en fournissant
         * une liste comme premier attribut.
         */
        post.insert([/* Mettre les 2 billets ici */], {safe: true}, function(err, doc) {
            if(err) {
                console.log("Erreur lors de l'ajout du billet");
                throw err;
            }
            callback_rechercher();
            callback_modification();
            callback_suppression();
        });

        var callback_rechercher = function() {
            /*
             * Récupération de la liste complète des billets
             *
             * Vous pouvez voir la documentation des curseurs à l'adresse suivante :
             * http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#cursors
             */
            curseur = post.find();
            curseur.each(function(err, doc) {
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                /*
                 * 2- Afficher le titre de chacun des billets et
                 * chacun des tags avec console.log
                 */
            });

            /*
             * 3- Récupérer la liste des cours avec cursor.toArray
             */
            //curseur = post.find();
            //curseur.toArray(function(err, docs){})

            /*
             * 4- Récupérer le premier billet du blog avec son ID
             */
            //curseur = post.find({'_id': ...})
            //curseur.toArray(function(err, docs){})

            /*
             * 5- Afficher le nombre total de billets de blogs
             *
             * Voir API de comptage d'un curseur : http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#counting-matches
             */

            /*
             * Afficher le titre de chacun des billets, en triant par la date d'ajout.
             *
             * Voir API : http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#query-options
             */
            curseur = post.find({}, {'sort': 'data'}).toArray(function(err, doc){
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                /*
                 * 6- Afficher le titre du billet.
                 */
                //console.log(doc.titre);

            });

            /*
             * 7- Faites une recherche sur le titre du billet avec un attribut
             * regex.
             *
             * Ex : curseur = post.find({'titre': /Laboratoire/, ...
             */


        };

        var callback_modification = function() {
            /*
             * Modification de la date d'un billet avec findAndModify.
             * FindAndModify va modifier le premier document seulement.
             *
             * Find And Modify : http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html#find-and-modify
             */
            post.findAndModify({}, [],
                {
                    $set: {
                        'date': new Date('May 10, 2013')
                    },
                },
                {'safe': true, 'new': true},
                function(err, nouvel_objet) {
                    if(err) {
                        console.log('Impossible de modifier la date du billet');
                        throw err;
                    }

                    /*
                     * 8- Afficher la nouvelle date
                     */
                    //console.log(...);
                }
            );

            /*
             * 9- Modifier la date de tous les billets. Utilisez Update:
             * http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html#update
             */
            //post.update(....);



        };

        var callback_suppression = function() {
            /*
             * 10- Cherchez un billet et supprimer le.
             */

            /*
             * 11- Supprimer tous les billets restants
             */
        };




    });
});


