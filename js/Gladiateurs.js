/**
 * Class Gladiateur
 */
class Gladiateur {
  #id;

  static #nextId = 1; //id du prochain gladiateur créé
  constructor(stats, ludi) {
    this.#id = Gladiateur.#nextId++;
    this.ludi = ludi; // l'école du gladiateur
    this.nom = stats.nom;
    this.classe = stats.classe;
    this.niveau = stats.niveau ? stats.niveau : 1;
    this.xp = stats.xp ? stats.xp : 0;
    this.xpThreshold = this.niveau * 100;
    this.arme = stats.arme;
    this.force = stats.force;
    this.agilite = stats.agilite;
    this.intelligence = stats.intelligence;
    this.vie = stats.vie;
    this.vieMax = stats.vie;
    this.stamina = stats.stamina;
    this.staminaMax = stats.stamina;
    console.log(stats)
    this.isSelected = stats.isSelected == true;
    this.ToLvlUp = stats.ToLvlUp ? stats.ToLvlUp : false;
  }
  /**
   * Transforme l'objet gladiateur en chaine de caractères
   */
  stringify() {
    return JSON.stringify(
      {
        id: Number(this.#id),
        nom: this.nom,
        classe: this.classe,
        arme: Object(this.arme),
        vie: Number(this.vieMax),
        xp: Number(this.xp),
        niveau: Number(this.niveau),
        force: Number(this.force),
        agilite: Number(this.agilite),
        intelligence: Number(this.intelligence),
        stamina: Number(this.staminaMax),
        ToLvlUp : Boolean(this.ToLvlUp),
        isSelected: Boolean(this.isSelected),
      },
      "UTF-8"
    );
  }
  /**
   * renvoi l'id du gladiateur
   */
  get id() {
    return this.#id;
  }

  /**
   * Renvoi le nombre de gladiateur sélectionné
   * @returns {Number} le nombre de gladiateur selectionné depuis l'école
   */
  getSelected() {
    return this.ludi.getSelectedGladiateurs()
      ? this.ludi.getSelectedGladiateurs().length
      : 0;
  }

  /**
   * renvoi true ou false si la vie du gladiateur est supèrieur à 0
   */
  isAlive() {
    return this.vie > 0;
  }

  /**
   * renvoi la carte d'un personnage
   * @returns {Element} Une div avec un tableau contenant les stats du gladiateur et les boutons supprimer et selectionner
   */
  carte() {
    var carte = document.createElement("div");
    carte.className = `carte ${this.isSelected ? "carte-selected" : ""}`;
    carte.id = `carte-${this.#id}`;
    carte.innerHTML = `
      <table>
      <tbody>
      <tr>
      <th>
      ${this.nom}<br>
      <label for="xp">xp:</label>
      <progress id="xp" value=${this.xp} max=${this.xpThreshold}></progress>
      </th>
      <th><img height="50" src="../img/${this.classe}.png" alt=></th>
      </tr>
      <tr>
        <td  colspan="2" height="25px">
        <meter 
        class="bar bar-vie" 
        min=0 
        max=${this.vieMax} 
        low=${this.vieMax / 3} 
        high=${this.vieMax / 2} 
        optimum=${this.vieMax } 
        value=${this.vie}>
        </meter>
        <span class="pv" data-value="${this.vie}/${this.vieMax}">
        </span></td>
      </tr>
      <tr>
        <td  colspan="2" height="25px">
        <meter 
        class="bar bar-stamina" 
        min=0 
        max=${this.staminaMax} 
        low=${this.staminaMax / 3} 
        high=${this.staminaMax / 2} 
        optimum=${this.staminaMax } 
        value=${this.stamina}>
        </meter>
        <span class="stamina" data-value="${this.stamina}/${
this.staminaMax
}">
        </span></td>
      </tr>
      <tr>
          <td>Niveau :</td>
          <td>${this.niveau}</td>
      </tr>
      <tr>
          <td>Arme :</td>
          <td>${this.arme ? this.arme.nom : "aucune"}</td>
      </tr>
      <tr>
          <td>Force :</td>
          <td>${this.force}</td>
      </tr>
      <tr>
          <td>Agilité :</td>
          <td>${this.agilite}</td>
      </tr>
      <tr>
          <td>Intelligence :</td>
          <td>${this.intelligence}</td>
      </tr>
  </tbody>
      </table>
  <div class="buttons">
      ${this.xp > this.xpThreshold ? 
      "<button class='lvlUp'>LVL UP</button>" :
      "<button class='select'>Selectionner</button>"}
      <button class="supp">Supprimer</button>
  </div>

      `;
      if(this.xp > this.xpThreshold){
        //Ajoute l'event sur le bouton lvlUp
        var select = carte.getElementsByClassName("lvlUp")[0];
        select.addEventListener("click", this.lvlUp.bind(this));
      }else{
        //Ajoute l'event sur le bouton selectionner
        var select = carte.getElementsByClassName("select")[0];
        select.addEventListener("click", this.select.bind(this));
      }
      //Ajoute l'event sur le bouton supprimer
      var supp = carte.getElementsByClassName("supp")[0];
      supp.addEventListener("click", () => this.ludi.delete(this.#id));

    return carte;
  }

  lvlUp(){
    this.ToLvlUp = true;
    this.ludi.save();
    location.href = "./html/lvlUp.html";
  }

  carteCombat() {
    var carte = document.createElement("div");
    carte.className = "carte carte-combat";
    carte.id = `carte-${this.#id}`;
    carte.innerHTML = `
      <table>
          <tbody>
              <tr>
              <th> ${this.nom}</th>
              <th><img height="50" src="../img/${this.classe}.png" alt=></th>
              </tr>
              <tr>
                <td  colspan="2" height="25px">
                <meter 
                class="bar bar-vie" 
                min=0 
                max=${this.vieMax} 
                low=${this.vieMax / 3} 
                high=${this.vieMax / 2} 
                optimum=${this.vieMax } 
                value=${this.vie}>
                </meter>
                <span class="pv" data-value="${this.vie}/${this.vieMax}">
                </span></td>
              </tr>
              <tr>
                <td  colspan="2" height="25px">
                <meter 
                class="bar bar-stamina" 
                min=0 
                max=${this.staminaMax} 
                low=${this.staminaMax / 3} 
                high=${this.staminaMax / 2} 
                optimum=${this.staminaMax } 
                value=${this.vie}>
                </meter>
                <span class="stamina" data-value="${this.stamina}/${
      this.staminaMax
    }">
                </span></td>
              </tr>
              <tr>
                  <td>Niveau :</td>
                  <td>${this.niveau}</td>
              </tr>
              <tr>
                  <td>Arme :</td>
                  <td>${this.arme ? this.arme.nom : "aucune"}</td>
              </tr>
              <tr>
                  <td>Force :</td>
                  <td>${this.force}</td>
              </tr>
              <tr>
                  <td>Agilité :</td>
                  <td>${this.agilite}</td>
              </tr>
              <tr>
                  <td>Intelligence :</td>
                  <td>${this.intelligence}</td>
              </tr>
          </tbody>
      </table>
      `;
    return carte;
  }

  updateBar() {
    var carte = document.getElementById(`carte-${this.#id}`);
    var textVie = carte.getElementsByClassName("pv")[0];
    var barVie = carte.getElementsByClassName("bar-vie")[0];
    var textStamina =  carte.getElementsByClassName("stamina")[0];
    var barStamina = carte.getElementsByClassName("bar-stamina")[0];
    barVie.value = this.vie;
    barStamina.value = this.stamina;
    textStamina.setAttribute("data-value", `${this.stamina}/${this.staminaMax}`)
    textVie.setAttribute("data-value", `${this.vie}/${this.vieMax}`);
  }

  /**
   * fonction qui sélectionne un gladiateur
   * Active le bouton combat quand deux gladiateurs sont sélectionnés
   * sauvegarde l'école
   */
  select() {
    //Récupération de la carte du gladiateur
    var carte = document.getElementById(`carte-${this.#id}`);
    if (!this.isSelected) {
      if (this.getSelected() < 2) {
        //Sélection du gladiateur si il n'est pas déjà selectionné
        //et si il y a moins de deux gladiateurs sélectionnés
        this.isSelected = true;
        carte.classList.add("carte-selected");
      }
    } else {
      //Si le gladiateur est séléctionné on le déséléctionne
      this.isSelected = false;
      carte.classList.remove("carte-selected");
    }
    //activation du bouton combat si deux gladiateur son séléctionnés
    //désactivation sinon
    document.getElementById("combat").disabled =
      this.getSelected() == 2 ? false : true;
    //Savegarde de l'école dans le localStorage
    this.ludi.save();
  }
  /**
   *
   * @param {number} min
   * @param {number} max
   * @returns renvoi un entier aléatoire entre min et max
   */
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  attaque() {
    var diceRoll = this.randInt(1, 20);
    if(this.stamina>0){
      this.stamina -= this.arme.stamina;
    switch (this.arme.jetAtt) {
      case "force":
        return diceRoll + Math.floor((this.force - 10) / 2);
      case "agilite":
        return diceRoll + Math.floor((this.agilite - 10) / 2);
      case "intelligence":
        return diceRoll + Math.floor((this.intelligence - 10) / 2);
      default:
        return diceRoll;
    }}else{
      return diceRoll
    }
  }
  defense() {
    var diceRoll = this.randInt(1, 20);
    if(this.stamina>0){
    return (
      diceRoll + Math.floor((this.agilite - 10) / 2) + this.arme.CA
    );}else{
      return  diceRoll
    }
  }
  degat() {
    if(this.stamina>0){
    switch (this.arme.jetDegat) {
      case "force":
        return ARMES.getArme(this.arme.nom).degat() + Math.floor((this.force - 10) / 2);
      case "agilite":
        return ARMES.getArme(this.arme.nom).degat() + Math.floor((this.agilite - 10) / 2);
      case "intelligence":
        return ARMES.getArme(this.arme.nom).degat() + Math.floor((this.intelligence - 10) / 2);
      default:
        return ARMES.getArme(this.arme.nom).degat();
    }}else{
      return  Math.floor((this.force - 10) / 2);
    }
  }
}
