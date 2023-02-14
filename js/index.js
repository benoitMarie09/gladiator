/**
 * fonction de redirection du bouton combat vers combat.html
 */
function goFight(){
    location.href = "./html/combat.html"
}

window.onload = function() {
    ludi = new Ludi();
    ludi.show(".select-perso");
}