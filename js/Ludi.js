
/**
 * Ecole de gladiateurs 
 */
class Ludi {
    constructor() {
      this.Gladiateurs = []; // tableau des gladiateurs de l'école
      this.load();// Récupere les gladiateurs depuis le local Storage
    }
    

    getGladiateur(nom){
      var glad = this.Gladiateurs.find(gladiateur => gladiateur.nom == nom)
      console.log("glad",glad)
      return glad;
    }

    /**
     * fonction qui renvoi si l'école est vide ou non
     * @returns {Bollean} true si gladiateur est vide false sinon
     */
    isEmpty() {
      return this.Gladiateurs.length === 0;
    }
    /**
     * fonction de validation des données d'un gladiateur
     * @param {Object} param représentant les statistiques d'un gladiateurs
     * @returns {Bollean} Si les données sont valid ou non
     */
    isValid(param) {
      let isvalid = true;
      //Un gladiateur est valid si il à un nom(string) d'une longueur supèrieur à 0
      isvalid &&= typeof param.nom === "string" && param.nom.length > 0;
      this.Gladiateurs.forEach((gladiateur) => {
        isvalid &&= gladiateur.nom !== param.nom;
      });
      return isvalid;
    }
    /**
     * Ajoute à l'école le gladiateur entré en paramètre
     * @param {Gladiateur} newGladiateur 
     */
    add(newGladiateur) {
        //Vérification de l'unicité du nom du gladiateur à ajouter
      if (newGladiateur.constructor.name == "Gladiateur") {
        var isIn = false;
        this.Gladiateurs.forEach((myGladiateur) => {
          isIn ||= newGladiateur.id === myGladiateur.id;
        });
        //Si son nom est unique on l'ajoute au tableau de gladiateur de l'école 
        if (!isIn) {
          this.Gladiateurs.push(newGladiateur);
          this.save();
        }
        //sinon on revoie un message d'erreur
      } else {
        console.error(newGladiateur + "is not a gladiateur");
      }
    }
    
    /**
     * fonction qui supprime le gladiateur de l'école correspondant à l'id en parametre
     * @param {Number} id du gladiateur à supprimer
     */
    delete(id){
      this.Gladiateurs = this.Gladiateurs.filter(gladiateur => gladiateur.id != id)
      this.save();
      location.href = "../index.html";
    }
    
    /**
     * Sauvergarde les gladfiateurs de l'école dans le locale Storage
     */
    save() {
      var newData = "";
      //Si l'école n'est pas vide on crée un registre des gladiateurs
      if (!this.isEmpty()) {
        newData = "[";
        this.Gladiateurs.forEach(
          (gladiateur, index, array) =>
            (newData +=
              gladiateur.stringify() + (index === array.length - 1 ? "" : ","))
        );
        newData += "]";
      }
      //Ensuiteon réinitialise la sauvegarde
      localStorage.clear();
      localStorage.setItem("savedData", newData);
    }
    /**
     * Récupère les gladiateur sauvardés dans le local storage
     */
    load() {
    //Si la sauvegarde existe on la récupère puis la transforme en Object
      if (localStorage.getItem("savedData")) {
        var data = JSON.parse(localStorage.getItem("savedData"),"UTF-8");
        if (data !== null) {
            //on crée les gladiateur et on les ajoutent à l'école
          data.forEach((gladiateur) => this.add(new Gladiateur(gladiateur, this)));
        }
      }
    }

    /**
     * Affiche tous les gladiateurs de l'école dans l'élément entré en paramètre
     * @param {Element} div ou afficher les gladiateurs
     */
    show(div = "body") {
        var parent = document.querySelector(div);
        this.Gladiateurs.forEach((gladiateur) =>
        parent.appendChild(gladiateur.carte())
      );
    }

    /**
     * @returns un tableau des gladiateurs selectionnés
     */
    getSelectedGladiateurs(){
        var selectedGlad = this.Gladiateurs.filter(gladiateur => gladiateur.isSelected == true)
        return selectedGlad;
    }

    /**
     * @returns le gladiateur to lvl up
     */
    getToLvlUp(){
      var ToLvlUp = this.Gladiateurs.filter(gladiateur => gladiateur.ToLvlUp == true)
      return ToLvlUp[0];
  }

    /**
     * Affiche les deux gladiateurs séléctionnés
     * @param {Element} div ou afficher les gladiateurs
     */
    showArena(div = "main"){
        var parent = document.querySelector(div);
        var joueur1 = this.getSelectedGladiateurs()[0].carteCombat()
        joueur1.classList.add("joueur1");
        var joueur2 =  this.getSelectedGladiateurs()[1].carteCombat()
        joueur2.classList.add("joueur2")
        var button = document.createElement("button")
        button.innerText = "Start"
        button.id = "start"
        parent.appendChild(joueur1)
        parent.appendChild(button)
        parent.appendChild(joueur2)
        var combatLog = document.createElement("pre")
        combatLog.classList.add("combatLog")
        var div = document.createElement("div")
        div.classList.add("divLog")
        div.appendChild(combatLog)

        parent.appendChild(div)
        
        
        //Ajoute l'event sur le bouton selectionner 
        var start = document.getElementById("start")
        start.addEventListener("click",  this.startFight.bind(this))
      }

      attackRound(attaquant, defenseur, timer){
        var combatLog = document.querySelector(".combatLog")
        var degat = attaquant.degat();
        var jetAtt = attaquant.attaque();
        var jetDef = defenseur.defense();
        combatLog.innerText += `
        --------------------------------------
        ${attaquant.nom} attaque avec son ${attaquant.arme.nom}: ${jetAtt}
        ${defenseur.nom} se défend : ${jetDef}
        `
        if( jetAtt > jetDef){
          combatLog.innerText += `${attaquant.nom} touche pour ${degat} points de dégats`
          defenseur.vie -= degat
        }else{
          combatLog.innerText += `${attaquant.nom} rate`
        }
        defenseur.updateBar()
        attaquant.updateBar()
        if(!defenseur.isAlive()){
          clearInterval(timer)
          attaquant.xp += 100;
          this.save()
        }
      }


      startFight(){
        var joueur1 = this.getSelectedGladiateurs()[0]
        var joueur2 = this.getSelectedGladiateurs()[1]
        const fightRound = setInterval(()=>{
          this.attackRound(joueur1, joueur2, fightRound)
          this.attackRound(joueur2, joueur1, fightRound)       
        },100)         
      }
  }