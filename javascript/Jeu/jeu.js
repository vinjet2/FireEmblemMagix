const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method : "POST"        // l’API (games/state)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // contient les cartes/état du jeu.
        if (data === "INVALID_KEY"){

        }
        else if (data === "WAITING") {

        }
        else if (data === "LAST_GAME_WON"){

        }
        else if (data === "LAST_GAME_LOST") {

        }
        else {
            afficherJeu(data);
        }
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});

function afficherJeu(data) {
    //Initialisation 

    const timer = document.querySelector(".timer");
    /* Ennemis */
    const ennemiPortrait = document.querySelector(".ennemis_Portrait");
    const ennemiHand = document.querySelector(".ennemis_Hand");
    const ennemiHealth = document.querySelector(".ennemis_Health");
    const ennemiMana = document.querySelector(".ennemis_Mana");
    const ennemiDeck = document.querySelector(".ennemis_Deck");
    const ennemiCards = document.querySelector(".ennemis_Cards");

    /* Player */
    const playerPortrait = document.querySelector(".player_Portrait");
    const playerHand = document.querySelector(".player_Hand");
    const playerHealth = document.querySelector(".player_Health");
    const playerMana = document.querySelector(".player_Mana");
    const playerDeck = document.querySelector(".player_Deck");
    const playerCards = document.querySelector(".player_Cards");
    const playerPower = document.querySelector(".player_HeroPower");
    const playerTurn = document.querySelector(".endTurn");

    ennemiPortrait.style.backgroundImage = "url(images/EnnemiHeroClass/"+data.opponent.heroClass+".png)";
    ennemiHealth.innerHTML = data.opponent.hp;
    ennemiMana.innerHTML = data.opponent.mp;
    ennemiDeck.innerHTML = data.opponent.remainingCardsCount;

    playerPortrait.style.backgroundImage = "url(images/HeroClass/"+data.heroClass+".png)";
    playerHealth.innerHTML = data.hp;
    playerMana.innerHTML = data.mp;
    playerDeck.innerHTML = data.remainingCardsCount;
    
    data.hand.forEach(card => {
        let div  = carte(card.id);
        /* Carte */ //Les cartes nexiste pas encore et puis il faut preciser le IP
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        console.log(card);
        carteCost.innerHTML = card.cost;
        //carteEffect.style.backgroundImage = "url(images/Effects/"+carte.mechanics+".png)";
        //cartePortrait.style.backgroundImage = "url(images/Cartes/"+carte.id+".png)";
        carteMecanique.innerHTML = card.mechanics;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        playerHand.append(div);
    });

}

function carte(id) {
    var carte = document.createElement("div"); // Carte
    carte.className = "carte";
    carte.setAttribute("id", id);
    var stats = document.createElement("div"); // stats
    stats.className = "carte_Stats";
    carte.append(stats);
    var cost = document.createElement("div"); // cost
    cost.className = "carte_Cost";
    stats.append(cost);
    var effect = document.createElement("div"); // effect
    effect.className = "carte_Effect";
    stats.append(effect);
    var portrait = document.createElement("div"); // portrait
    portrait.className = "carte_Portrait";
    carte.append(portrait);
    var mecanique = document.createElement("div"); // mecanique
    mecanique.className = "carte_Mecanique";
    carte.append(mecanique);
    var stats1 = document.createElement("div"); // stats1
    stats1.className = "carte_Stats";
    carte.append(stats1);
    var attaque = document.createElement("div"); // attaque
    attaque.className = "carte_Attaque";
    stats1.append(attaque);
    var vie = document.createElement("div"); // vie
    vie.className = "carte_Vie";
    stats1.append(vie);
    return carte;
}