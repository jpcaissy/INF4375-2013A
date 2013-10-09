function auChargement() {
  document.getElementById('id_1').innerHTML = 'patate';
  document.getElementById('id_1').style.color = 'red';
  document.getElementById('id_1').style.fontWeight = 'bold';

  document.getElementsByTagName('div')[1].innerHTML = 'Modifie par javascript';
  document.getElementsByTagName('div')[2].innerHTML = 'Modifie par javascript';
}

function soumettreFormulaire() {
  var value = document.getElementById('nom').value;
  if(value == '') {
    alert('Vous devez mettre un nom');
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://inf4375.piji.ca/?nom=' + value, false);
    xhr.send();

    var valeur_retour = xhr.responseText;
    document.getElementById('resultat').innerHTML = valeur_retour;

  }
}

function soumettreFormulaireJson() {
  var value = document.getElementById('nom').value;
  if(value == '') {
    alert('Vous devez mettre un nom');
  } else {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://inf4375.piji.ca/json?nom=' + value, false);
    xhr.send();

    var valeur_retour = JSON.parse(xhr.responseText);
    document.getElementById('resultat').innerHTML = "Nom : " + valeur_retour.name + ' et date : ' + valeur_retour.date;

  }
}
