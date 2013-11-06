function appel_ajax(nom) {
  var request = new XMLHttpRequest();
  request.open("GET", '/ajax/' + nom, true);
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
      var data = JSON.parse(request.responseText);
      document.getElementById('resultat').innerHTML = "Le nom retourné est : " + data.name + ", il est : " + data.date;
    }
  }
  request.send();
}

function chargement() {
  document.getElementsByTagName('form')[0].onsubmit = function() {
    var nom = document.getElementById('nom').value;
    if(nom == "") {
      alert("Vous devez entrer votre nom.");
    } else {
      appel_ajax(nom);
    }
    return false;
  };

  document.getElementById('recuperer_bieres').onclick = recuperer_bieres;
}

function recuperer_bieres() {
  var request = new XMLHttpRequest();
  request.open("GET", '/liste_bieres', true);
  request.onreadystatechange = function() {
    
    if (request.readyState === 4 && request.status === 200) {
      var table = document.getElementById('resultat_biere');
      var domRoot = request.responseXML;
      var compagnies = domRoot.getElementsByTagName("compagnie");
      if(compagnies.length) {
        var html = '';
        for(var i = 0; i < compagnies.length; i++) {
          var compagnie = compagnies[i];
          var nom = compagnie.getElementsByTagName("nom")[0].textContent;
          var bieres = compagnie.getElementsByTagName("biere");
          html += '<tr>';
          html += '<td>' + nom + '</td>';
          html += '<td>';
          for(var j = 0; j < bieres.length; j++) {
            biere = bieres[j];
            html += biere.textContent + ' ';
          }
          html += '</td>';
          html += '</tr>';
        }
      }
      table.innerHTML = html;
    }
  }
  request.send();
}
