const CLASSES = [
  {
    nom: "guerrier",
    vie: 120,
    stamina: 120,
    force: 15,
    agilite: 10,
    intelligence: 7,
  },
  {
    nom: "archer",
    vie: 100,
    stamina: 100,
    force: 13,
    agilite: 14,
    intelligence: 13,
  },
  {
    nom: "mage",
    vie: 95,
    stamina: 95,
    force: 12,
    agilite: 14,
    intelligence: 16,
  },
  {
    nom: "assassin",
    vie: 100,
    stamina: 100,
    force: 12,
    agilite: 16,
    intelligence: 12,
  },
];

const ARMES = {
  armesItems: [
    {
      nom: "épée",
      degat: function(){
        return Math.floor(Math.random() * (6 - 1)) + 1;
      },
      classes: ["guerrier", "assassin"],
      stamina: 5,
      CA: 0,
      jetAtt: "force",
      jetDegat: "force",
    },
    {
      nom: "arc",
      degat: function(){
        return Math.floor(Math.random() * (4 - 1)) + 1;
      },
      classes: ["archer"],
      stamina: 3,
      CA: 2,
      jetAtt: "agilite",
      jetDegat: "agilite",
    },
    {
      nom: "baton",
      degat: function(){
        return Math.floor(Math.random() * (4 - 1)) + 1;
      },
      classes: ["mage", "guerrier"],
      stamina: 3,
      CA: 2,
      jetAtt: "force",
      jetDegat: "force",
    },
    {
      nom: "dague",
      degat: function(){
        return Math.random() > 0.8
          ? (Math.floor(Math.random() * (4 - 1)) + 1) * 3
          : Math.floor(Math.random() * (4 - 1)) + 1;
      },
      classes: ["archer", "assassin"],
      stamina: 2,
      CA: 0,
      jetAtt: "agilite",
      jetDegat: "force",
    },
    {
      nom: "baguette",
      degat: function(){
        return Math.floor(Math.random() * (10 - 1)) + 1;
      },
      classes: ["mage"],
      stamina: 4,
      CA: 0,
      jetAtt: "intelligence",
      jetDegat: "aucun",
    },
  ],
  getItems : function(){return this.armesItems} ,
  getArme : function(nom){
    return this.armesItems.find(arme => arme.nom == nom)

  }
};
