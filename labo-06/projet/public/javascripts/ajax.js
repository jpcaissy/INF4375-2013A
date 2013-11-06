/*
 * Compléter le fichier!
 */

function envoyer_formulaire() {
  var requete = new XMLHttpRequest();
  var nom = document.getElementById('nom').value;
  requete.open("GET", '/ajax/' + nom, true);
  //request.open("GET", url);

  requete.onreadystatechange = function() {
    if(requete.readyState == 4 && requete.status == 200) {
      var json_parsed = JSON.parse(requete.responseText);
      var resultat = document.getElementById('resultat');
      resultat.innerHTML = "Bonjour : " + json_parsed.name + ", il est : " + json_parsed.date;
    }
  };

  requete.send();
}

function recupere_date() {
  var requete = new XMLHttpRequest();
  requete.open("GET", '/date');
  requete.onreadystatechange = function() {
    if(requete.readyState == 4 && requete.status == 200) {
      alert('Date : ' + JSON.parse(requete.responseText));
    }
  }
  requete.send();
}
