//localStorage.clear()
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * fonction qui crée un gladiateur lorsque que l'on submit le formulaire
 */
function createGladiateur() {
  //Création d'une instance d'cole pour ajouter le gladiateur
  ludi = new Ludi();
  //Récuperation des données du formulaire
  let form = document.forms[0];
  let formData = new FormData(form);
  let param = new URLSearchParams(formData);
  //Création d'un objet gladiateur
  var gladiateurObject = {
    nom: param.get("nom"),
    classe: param.get("classe"),
    arme: param.get("arme"),
    vie: Number(param.get("vie")),
    stamina : Number(param.get("stamina")),
    arme : ARMES.getArme(param.get("arme")),
    force: Number(param.get("force")),
    agilite: Number(param.get("agilite")),
    intelligence: Number(param.get("intelligence")),
    isSelected: Boolean(param.get("isSelected"))
  };
  //Si les données sont valid on crée un gladiateur et on l'ajoute à l'école
  if (ludi.isValid(gladiateurObject)) {
    const gladiateur = new Gladiateur(gladiateurObject, ludi);
    ludi.add(gladiateur);
  }
}

function handleRadioClick(event) {
  var inputVie = document.querySelector("input[name = vie]");
  var inputStamina = document.querySelector("input[name = stamina]");
  var inputForce = document.querySelector("input[name = force]");
  var inputAgilite = document.querySelector("input[name = agilite]");
  var inputIntelligence = document.querySelector("input[name = intelligence]");
  var points = document.querySelector("input[name = points]");
  var selectArme = document.querySelector("#arme");
  selectArme.innerHTML = "";
  ARMES.getItems().forEach((arme => {
    if(arme.classes.includes(event.target.value)){
      var option = document.createElement("option")
      option.value = arme.nom;
      option.innerText = capitalizeFirstLetter(arme.nom);
      selectArme.appendChild(option)
    }
  }))
  points.value = 5;
  switch (event.target.value) {
    case CLASSES[0].nom:
      inputVie.value = CLASSES[0].vie;
      inputStamina.value = CLASSES[0].stamina;
      inputForce.value = CLASSES[0].force;
      inputAgilite.value = CLASSES[0].agilite;
      inputIntelligence.value = CLASSES[0].intelligence;
      inputVie.min = CLASSES[0].vie;
      inputStamina.min = CLASSES[0].stamina;
      inputForce.min = CLASSES[0].force;
      inputAgilite.min = CLASSES[0].agilite;
      inputIntelligence.min = CLASSES[0].intelligence;
      break;
    case  CLASSES[1].nom:
      inputVie.value = CLASSES[1].vie;
      inputStamina.value = CLASSES[1].stamina;
      inputForce.value = CLASSES[1].force;
      inputAgilite.value = CLASSES[1].agilite;
      inputIntelligence.value = CLASSES[1].intelligence;
      inputVie.min = CLASSES[1].vie;
      inputStamina.min = CLASSES[1].stamina;
      inputForce.min = CLASSES[1].force;
      inputAgilite.min = CLASSES[1].agilite;
      inputIntelligence.min = CLASSES[1].intelligence;
      break;
    case  CLASSES[2].nom:
      inputVie.value = CLASSES[2].vie;
      inputStamina.value = CLASSES[2].stamina;
      inputForce.value = CLASSES[2].force;
      inputAgilite.value = CLASSES[2].agilite;
      inputIntelligence.value = CLASSES[2].intelligence;
      inputVie.min = CLASSES[2].vie;
      inputStamina.min = CLASSES[2].stamina;
      inputForce.min = CLASSES[2].force;
      inputAgilite.min = CLASSES[2].agilite;
      inputIntelligence.min = CLASSES[2].intelligence;
      break;
    case  CLASSES[3].nom:
      inputVie.value = CLASSES[3].vie;
      inputStamina.value = CLASSES[3].stamina;
      inputForce.value = CLASSES[3].force;
      inputAgilite.value = CLASSES[3].agilite;
      inputIntelligence.value = CLASSES[3].intelligence;
      inputVie.min = CLASSES[3].vie;
      inputStamina.min = CLASSES[3].stamina;
      inputForce.min = CLASSES[3].force;
      inputAgilite.min = CLASSES[3].agilite;
      inputIntelligence.min = CLASSES[3].intelligence;
      break;
  }
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
  if (caract.value > caract.min) {
    points.stepUp();
    caract.stepDown();
  }
}

function handleChange(event) {
  console.log(event);
}
