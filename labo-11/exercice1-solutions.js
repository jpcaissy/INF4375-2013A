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
        post.insert([
                {
                    'titre': 'Billet #1',
                    'date': new Date('Jul 16, 2013'),
                    'text': 'Bacon ipsum dolor sit amet corned beef salami t-bone pork hamburger kielbasa. Spare ribs bresaola strip steak short loin tongue turkey ground round ham hock corned beef cow rump. Pork loin brisket corned beef tail. Swine salami corned beef pig bacon shank doner fatback. Tenderloin prosciutto spare ribs rump doner turkey, chuck jerky meatloaf.\n' +
            'Pork belly pig bresaola, kielbasa ham flank swine beef ribs brisket ground round shankle turducken meatball short ribs tail. Fatback bresaola filet mignon pork shank sirloin beef ribs ham meatball hamburger strip steak. Prosciutto shankle bacon, ball tip boudin short ribs tenderloin tail pork belly pork loin ham shank frankfurter spare ribs. Sirloin corned beef frankfurter meatloaf.\n' +
            'Pastrami capicola sirloin leberkas frankfurter, corned beef hamburger short loin ball tip filet mignon tongue. Corned beef ground round short ribs leberkas flank t-bone fatback bacon pancetta jerky. Tongue beef ribs biltong filet mignon pork chop cow spare ribs andouille salami drumstick beef tenderloin shankle. Shoulder tri-tip pork belly, boudin pastrami spare ribs corned beef capicola flank sirloin doner biltong chicken frankfurter prosciutto. Pastrami t-bone brisket, meatloaf frankfurter pork turkey. Tenderloin sausage beef ribs drumstick fatback, frankfurter flank ham hock shank capicola ham pork belly brisket biltong tail. Hamburger ball tip jerky, pastrami venison turkey drumstick t-bone swine ground round tongue cow pork belly.'
                },
                {
                    'titre': 'Billet #2',
                    'date': new Date('Jul 15, 2013'),
                    'text': 'Bacon ipsum dolor sit amet ham hock sausage tongue, spare ribs flank brisket pancetta. Rump short ribs beef, ground round leberkas swine jerky brisket pancetta short loin chuck hamburger pork pastrami. Boudin sausage rump pork belly hamburger brisket shankle ball tip capicola swine tenderloin. Tongue capicola ball tip meatball short loin leberkas pork loin ground round biltong. Frankfurter jowl boudin, pork tri-tip turkey ham pork loin meatball short loin. Pork belly swine ham hock meatball shankle. Kielbasa biltong prosciutto, tri-tip flank jowl drumstick.\n' +
            'Jerky beef fatback strip steak leberkas. Tri-tip pork chop fatback cow shankle. Andouille t-bone pig beef, pork chop bresaola chicken salami corned beef tongue jowl doner. Turkey ribeye doner tail. Swine doner short loin prosciutto. Jerky turkey beef ribs, brisket leberkas pig pork belly prosciutto shoulder capicola flank. Jerky sirloin strip steak pork belly, tri-tip meatloaf prosciutto ground round.'
                }
            ], {safe: true}, function(err, doc) {
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
                 * 2- Afficher le titre de chacun des billets.
                 */
                if(doc) { /* Petit bug avec, doc est null à la fin car la connexion est fermée */
                    console.log("each : " + doc.titre);
                }
            });

            /*
             * 3- Récupérer la liste des cours avec cursor.toArray
             */
            var blog_id;
            curseur = post.find();
            curseur.toArray(function(err, docs){
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                blog_id = docs[0]._id;
                for(index in docs) {
                    doc = docs[index];
                    console.log("toArray : " + doc.titre);
                }
            })

            /*
             * 4- Récupérer le premier billet du blog avec son ID
             */
            curseur = post.find({'_id': blog_id});
            curseur.toArray(function(err, docs){
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                console.log("premier post : " + doc.titre);
            })

            /*
             * 5- Afficher le nombre total de billets de blogs
             *
             * Voir API de comptage d'un curseur : http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#counting-matches
             */
            curseur = post.find().count(function(err, count) {
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                console.log("Il y a " + count + " billet(s)");
            });

            /*
             * Afficher le titre de chacun des billets, en triant par la date d'ajout.
             *
             * Voir API : http://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html#query-options
             */
            curseur = post.find({}, {'sort': [['date', 'asc']]}).toArray(function(err, docs){
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                /*
                 * 6- Afficher le titre du billet.
                 */
                for(index in docs) {
                    doc = docs[index];
                    console.log("trie billet : " + doc.titre);
                }


            });

            /*
             * 7- Faites une recherche sur le titre du billet avec un attribut
             * regex.
             *
             * Ex : curseur = post.find({'titre': /Laboratoire/, ...
             */
            curseur = post.find({'titre': /Billet/}).each(function(err, doc){
                if(err) {
                    console.log("Erreur lors de la récupératoin des bilets");
                    throw err;
                }
                if(doc) { /* Petit bug avec, doc est null à la fin car la connexion est fermée */
                    console.log("recherche regex : " + doc.titre);
                }
            });



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
                    /*
                     * Il faut rajouter l'option 'new': true pour que ça retourne
                     * le nouvel objet!
                     */
                    console.log(nouvel_objet.date);
                }
            );

            /*
             * 9- Modifier la date de tous les billets. Utilisez Update:
             * http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html#update
             */
            post.update({},
                {
                    $set: {
                        'date': new Date('May 10, 2013')
                    },
                }, {'safe': true, 'multi': true}, function(err, total) {
                    if(err) {
                        console.log('Impossible de modifier la date du billet');
                        throw err;
                    }
                    /*
                     * Il faut préciser 'multi': true pour modifier tous les 
                     * billets !
                     */
                    console.log(total + " billets modifiés");
                }

             );



        };

        var callback_suppression = function() {
            /*
             * 10- Cherchez un billet et supprimer le.
             */
            post.remove({}, {'single': true}, function(err, numberOfRemovedDocs) {
                console.log(numberOfRemovedDocs + " billet supprimé (doit être 1)");
            });

            /*
             * 11- Supprimer tous les billets restants
             */
            post.remove({}, function(err, numberOfRemovedDocs) {
                console.log(numberOfRemovedDocs + " billet supprimé (restants)");
            });
        };

    });
});


