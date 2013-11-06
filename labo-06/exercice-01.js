function soumettre() {

  var nom = document.getElementById('nom').value;
  var url = "http://labo5.piji.ca/xml?nom=" + nom;

  var requete = new XMLHttpRequest();
  requete.open("GET", url, true);
  //request.open("GET", url);

  requete.onreadystatechange = function() {
    if(requete.readyState == 4 && requete.status == 200) {
      //var json_data = JSON.parse(requete.responseText);
      //console.log(json_data, json_data.name, json_data.date);
      //document.getElementById("resultat").innerHTML = requete.responseText;
      var xmlDom = requete.responseXML;
      var nom = xmlDom.getElementsByTagName('name')[0].textContent;
      var date = xmlDom.getElementsByTagName('heure')[0].textContent;
      document.getElementById("resultat").innerHTML = "Bonjour " + nom + ", il est : " + date;
    }
  };
  requete.send();
}
