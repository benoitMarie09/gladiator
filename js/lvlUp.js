window.onload = function() {
    ludi = new Ludi();
    var gladiateur = ludi.getToLvlUp();
    console.log(gladiateur)
    var inputNom = document.querySelector("input[name = nom]");
    var inputVie = document.querySelector("input[name = vie]");
    var inputStamina = document.querySelector("input[name = stamina]");
    var inputForce = document.querySelector("input[name = force]");
    var inputAgilite = document.querySelector("input[name = agilite]");
    var inputIntelligence = document.querySelector("input[name = intelligence]");
    var points = document.querySelector("input[name = points]");
    var inputId = document.querySelector("input[name = id]");

    inputId.value = gladiateur.id
    inputNom.value = gladiateur.nom
    inputVie.value = gladiateur.vieMax;
    inputStamina.value = gladiateur.staminaMax;
    inputForce.value = gladiateur.force;
    inputAgilite.value = gladiateur.agilite;
    inputIntelligence.value = gladiateur.intelligence;
    inputVie.min = gladiateur.vieMax;
    inputStamina.min = gladiateur.staminaMax;
    inputForce.min = gladiateur.force;
    inputAgilite.min = gladiateur.agilite;
    inputIntelligence.min = gladiateur.intelligence;
    points.value = 5;

}
function increase(event) {
    var caract = event.target.parentNode.querySelector("input");
    var points = document.querySelector("input[name = points]");
    if (points.value > 0) {
      caract.stepUp();
      points.stepDown();
    }
  }
  
  function decrease(event) {
    var caract = event.target.parentNode.querySelector("input");
    var points = document.querySelector("input[name = points]");
    console.log(caract.value > caract.min)
    if (Number(caract.value) > Number(caract.min)) {
      points.stepUp();
      caract.stepDown();
    }
  }

function lvlUpGladiateur(){
    //Création d'une instance d'école pour ajouter le gladiateur
    myludi = new Ludi();
    //Récuperation des données du formulaire
    let form = document.forms[0];
    let formData = new FormData(form);
    let param = new URLSearchParams(formData);
    //update du gladiateur
    console.log(param.get("id"))
    var glad = myludi.getGladiateur(param.get("nom"));
    
    console.log("gladiateur :",glad)
    glad.vie = param.get("vie");
    glad.stamina = param.get("stamina");
    glad.force = param.get("force");
    glad.agilite = param.get("agilite");
    glad.intelligence = param.get("intelligence");
    glad.niveau += 1;
    glad.xp = 0;
    glad.ToLvlUp = false;
    glad.ludi.save();
    location.href = "../index.html";
}
  