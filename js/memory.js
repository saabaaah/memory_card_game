window.addEventListener("load",init,false);

var monCanvas,gc;
var maCarte;
const NBLIG= 3;
const NBCOL= 4;
const NBMELANGE = 20;
const DX = 30;
const DY = 10;
var plateau = [];
var premiereCarte;
var secondeCarte;
var nbPairesTrouves;
var timer = undefined;
var temps = 0;

function init(){
	monCanvas = document.getElementById("monCanvas");
	gc = monCanvas.getContext("2d");
    monCanvas.addEventListener ("click", choisirCarte, false); //pas de parantheses car on utilise pas la methode tout de suite mais quand on l'appelera avec le clic
    premiereCarte = undefined;
    secondeCarte = undefined;
    nbPairesTrouves = 0;
    creerPlateau();
}

function choisirCarte(event){
    console.log("choisirCarte", event);
    var souriposX = event.offsetX;
    var souriposY = event.offsetY;
    var tmp_carte = undefined;

    // si le timer n'est pas lancé, alors c'est bien le premier click, on le lance
    if(timer == undefined){
        // lancer timer avec 1 seconde
        timer = setInterval(function(){
            // afficher les secondes en 2 positions 
            var s = temps%60;
            if(s < 10) s = "0"+s;
            // afficher les menutes en 2 positions
            var m = Math.floor(temps/60);
            if(m < 10) m = "0"+m;
            // afficher timer
            monTimer = document.getElementById("monTimer");
            monTimer.innerHTML = m+":"+s;
            temps++;
            //console.log("timer", temps, s, m);
        }, 1000);
    }

    // chercher la carte cliquée dans la liste des carte du plateau
    for (var i = 0; i < plateau.length; i++) {
        if(plateau[i].posX<=souriposX && souriposX<=plateau[i].posX+CARTEW 
            && plateau[i].posY<=souriposY && souriposY<=plateau[i].posY+CARTEH){
            // carte trouvée, on sort de la boucle de recherche
            tmp_carte = plateau[i];
            break;
        }
    }
    console.log("choisir",tmp_carte, premiereCarte, secondeCarte);
    // si la carte a été trouvée
    if (tmp_carte != undefined) {
        // verifier si on avais une carte déjà cliqué ou pas
        if (premiereCarte == undefined) {
            // le cas où c'est la première carte cliqué, on la rend visible
            premiereCarte = tmp_carte;
            premiereCarte.visible = true;
        }else if (secondeCarte == undefined) {
            // sinon, si on a une carte déjà visible, on verifi qu'on a pas recliqué sur la même carte
            secondeCarte = tmp_carte;
            if(premiereCarte != secondeCarte){
                // si bien différentes cartes, on affiche la seconde carte
                secondeCarte.visible = true;
                afficherPlateau();

                // verifier les faces des deux cartes 
                if(premiereCarte.face == secondeCarte.face){
                    // deux faces pareilles, on marque les deux cartes comme trouvées, et on reinit les cartes
                    premiereCarte.trouve = true; 
                    secondeCarte.trouve = true; 
                    reinitCartes();

                    // verifier si le joueur a gagné ou pas en comptant le nombre des cartes marquées comme trouvé
                    var nb_cartes_trouves = 0;
                    for (var i = 0; i < plateau.length; i++) {
                        if(plateau[i].trouve)
                            nb_cartes_trouves++;
                    }
                    // comparer les carte trouvées avec le nombre des cartes du plateau
                    if(nb_cartes_trouves == plateau.length){
                        // fin du jeu
                        alert("Félicitation! vous avez gagné!");
                    }
                }else{
                    // sinon, les deux faces des carte sont différentes, attendre 750ms et cacher les cartes
                    setTimeout(function(){ reinitCartes(); afficherPlateau(); }, 750);
                }
            }
        }
    }
    // redessiner 
    gc.clearRect(0,0,800,800);
    afficherPlateau();
}

function creerPlateau(){

    // vider plateau
    plateau = [];
    var face = 1;
    // compter le nombre de carte ayant cette face (une fois ayant 2 carte; on passe à la face suivante)
    var nombre_cartes_avec_face = 0;
    for (var i = 0; i < NBLIG*NBCOL; i++) {
        // si deux cartes auront la même face, on passe à la face suivante
        if(nombre_cartes_avec_face == 2){
            face++;
            nombre_cartes_avec_face = 0;
        }
        plateau.push(new Carte(0, 0, face)); // position temporaire 0, 0
        nombre_cartes_avec_face++;
    }
    melangerPlateau();
    calculerCoordonnees();
    afficherPlateau();
    //console.log("creerPlateau" , plateau);
}

function melangerPlateau(){
    var i1;
    var i2;
    
    for (var i = 0; i < NBMELANGE; i++) {
        // choisir aléatoirement i1 et i2
        i1 = Math.floor(Math.random() * Math.floor(NBLIG*NBCOL));
        i2 = Math.floor(Math.random() * Math.floor(NBLIG*NBCOL));
        //console.log("melangerPlateau", i1, i2)
        // inverser les deux cartes
        var tmp_carte = plateau[i1];
        plateau[i1] = plateau[i2];
        plateau[i2] = tmp_carte;
    }
    //console.log("melangerPlateau" , plateau);
}

function calculerCoordonnees(){
    var ligne;
    var col;
    
    for (var i = 0; i < NBLIG*NBCOL; i++) {
        // recupérer position ligne/colonne
        ligne = i%NBCOL;
        col = Math.floor(i/NBCOL)%NBLIG;
        // positionner la carte, en gardant l'espace des deux cotés
        plateau[i].posX = ligne* (CARTEW+DX) +DX;
        plateau[i].posY = col* (CARTEH+DY) + DY;

        //console.log("calculerCoordonnees", ligne, col, ligne* (CARTEW+DX), col* (CARTEH+DY));
    }
    //console.log("melangerPlateau" , plateau);
}

function afficherPlateau(){

    for (var i = 0; i < NBLIG*NBCOL; i++) {
        // affiche chaque carte du plateau
        plateau[i].dessinerCarte();
    }
    //console.log("melangerPlateau" , plateau);
}

function reinitCartes(){
    //console.log("reinitCartes", premiereCarte, secondeCarte);
    // rendre invisible et vider les deux cartes
    premiereCarte.visible = false;
    secondeCarte.visible = false;
    premiereCarte = undefined;
    secondeCarte = undefined;
    console.log("reinitCartes", premiereCarte, secondeCarte);
}

    
