let vieContainer = document.getElementById("vies");
let clavierContainer = document.getElementById("clavier");
let boutonRejouer = document.getElementById("restart");
let affichageContainer = document.getElementById("affichage");
let container = document.body.children[0];
let containerBis = document.body.children[1];
let nbViesMax = 7;
let nbErreur = nbViesMax;
let mot
let motCache = "";
const mots = ["ordinateur", "livre", "ballon", "fourchette", "roue", "drapeau", "voiture", "perdre", "gagner", "commune", "anticonstitutionnellement"];


// INFO : Nouvelle partie
function newGame(){
    containerBis.removeAttribute("id");
    resetElement(containerBis);
    container.classList.remove("blur");
    mot = newMot();
    motCache = cacher(mot);
    majText();
    resetElement(vieContainer);
    newLife();
    resetElement(clavierContainer);
    newClavier();
}

// INFO : Initialisation d'une nouvelle barre de vie
function newLife(){
    if(vieContainer.childElementCount == 0){
        for(let i = 0; i < nbViesMax; i++){
            let coeur = document.createElement("div");
            coeur.classList.add("coeurVide");
            vieContainer.appendChild(coeur);
        }
    
        remplissageProgressif();
    }
}

// INFO : Initialisation d'un nouveau clavier
function newClavier(){
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for(let i = 0; i < alphabet.length; i++){
        let button = document.createElement("input");
        button.type = "button";
        button.value = alphabet[i].toUpperCase();
        button.id = alphabet[i];
        button.onclick = checkIfExist;
        clavierContainer.appendChild(button);
    }
}

// INFO : Mettre à jour affichage
function majText(){
    affichageContainer.innerText = "";
    affichageContainer.innerText = motCache;
}

// INFO : Check if lettre exist in the mot
function checkIfExist(){
    if(mot.includes(this.value.toLowerCase())){
        for(let i = 0; i < mot.length; i++){
            if(mot[i] == this.value.toLowerCase()){
                motCache = motCache.replaceAt(i, this.value.toLowerCase());
            }
        }
        if(motCache == mot){
            gagne();
        }
    }else{
        nbErreur--;
        moinsUne();
        if(nbErreur == 0){
            perdu();
            nbErreur = nbViesMax;
        }
    }
    majText();
    this.disabled = true;
}

// INFO :Retirer une vie
function moinsUne(){
    let compteur;
    for(let i = 0; i < vieContainer.children.length; i++){
        if(vieContainer.children[i].classList.contains("coeurVide")){
            compteur = i;
            break;
        }else{
            compteur = vieContainer.children.length;
        }
    }
    vieContainer.children[compteur - 1].classList.replace("coeurPlein", "coeurVide");
}


// INFO : Remplissage de la barre de vie progressif
function remplissageProgressif(){
    let coeur = 0;
    let remplirCoeur = setInterval(function(){
        vieContainer.children[coeur].classList.replace("coeurVide", "coeurPlein");
        coeur++;
        if(coeur == nbViesMax){
            clearInterval(remplirCoeur);
        }
    },300)
}

// INFO : Supprimer tout les enfants d'un element
function resetElement(element){
    while(element.firstChild){
        element.removeChild(element.lastChild);
    }
}

// INFO : Fonction pour selectionner un nouveau mot
function newMot(){
    return mots[Math.floor(Math.random() * mots.length)];
}

// INFO : Fonction pour cacher le mot
function cacher(mot){
    let newMot = "";
    for(let i = 0; i < mot.length; i++){
        newMot += "_";
    }
    return newMot;
}

// INFO : Create all elements if loose
function perdu(){
    let span = document.createElement("span");
    let btn = document.createElement("input");
    btn.type = "button";
    btn.id = "restart";
    btn.classList.add("restartBtn", "white")
    btn.value = "REJOUER";
    btn.onclick = newGame;
    span.innerText = "VOUS AVEZ PERDU !";
    span.classList.add("red")
    containerBis.appendChild(span);
    containerBis.appendChild(btn);
    containerBis.id = "containerBis";
    container.classList.add("blur");
}

// INFO : Create all elements if win
function gagne(){
    let span = document.createElement("span");
    let btn = document.createElement("input");
    btn.type = "button";
    btn.id = "restart";
    btn.classList.add("restartBtn", "white")
    btn.value = "REJOUER";
    btn.onclick = newGame;
    span.innerText = "VOUS AVEZ GAGNE !";
    span.classList.add("green")
    containerBis.appendChild(span);
    containerBis.appendChild(btn);
    containerBis.id = "containerBis";
    container.classList.add("blur");
}

// INFO : Fonction replaceAt ( permet de remplacer une lettre à un index donné)
String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}

newGame();
boutonRejouer.onclick = newGame;