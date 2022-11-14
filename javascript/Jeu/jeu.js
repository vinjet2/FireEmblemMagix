let yourTurn = true;
let selectedCardUID;
const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method: "POST",        // l’API (games/state)
        credentials:'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // contient les cartes/état du jeu.
            if (data === "INVALID_KEY") {
                console.log("Clé Invalide");
            }
            else if (data === "WAITING") {

            }
            else if (data === "LAST_GAME_WON") {
                console.log("Game Won");
                setInterval(window.location.href="lobby.php", 5000);
            }
            else if (data === "LAST_GAME_LOST") {
                console.log("Game Lost");
                setInterval(window.location.href="lobby.php" ,5000);
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
    yourTurn = data["yourTurn"];
    const timer = document.querySelector(".timer");
    timer.innerHTML = data.remainingTurnTime;

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

    // UI 
    ennemiPortrait.style.backgroundImage = "url(images/EnnemiHeroClass/" + data.opponent.heroClass + ".png)";
    ennemiHealth.innerHTML = data.opponent.hp;
    ennemiMana.innerHTML = data.opponent.mp;
    ennemiDeck.innerHTML = data.opponent.remainingCardsCount;

    playerPortrait.style.backgroundImage = "url(images/HeroClass/" + data.heroClass + ".png)";
    playerHealth.innerHTML = data.hp;
    playerMana.innerHTML = data.mp;
    playerDeck.innerHTML = data.remainingCardsCount;

    /* End Turn */
    if (data.yourTurn)
        playerTurn.style.opacity = "100%";
    else
        playerTurn.style.opacity = "50%";
    /* Hero Power */
    if (data.heroPowerAlreadyUsed)
        playerPower.style.opacity = "50%";
    else
        playerPower.style.opacity = "100%";

    // Cartes en Main
    while(playerHand.firstChild){
        playerHand.removeChild(playerHand.firstChild);
    }

    data.hand.forEach(card => {
        let div = carte(card.id, false, false);
        div.onclick = function(){action('PLAY',card.uid);}
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        carteCost.innerHTML = card.cost;
        //carteEffect.style.backgroundImage = "url(images/Effects/"+carte.mechanics+".png)";
        div.style.backgroundImage = "url(images/Cartes/"+carteInfo[card.id][0]+"_Neutral.png)";
        carteMecanique.innerHTML = card.mechanics;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        playerHand.append(div);
    });

    // Cartes sur le Board
    while(playerCards.firstChild){
        playerCards.removeChild(playerCards.firstChild);
    }

    data.board.forEach(card => {
        let div = carte(card.id, true, false);
        div.onclick = function(){selectedCardUID = card.uid;div.className="selectedcarte";}
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        carteCost.innerHTML = card.cost;
        //carteEffect.style.backgroundImage = "url(images/Effects/"+carte.mechanics+".png)";
        div.style.backgroundImage = "url(images/Cartes/"+carteInfo[card.id][0]+"_Attack.png)";
        carteMecanique.innerHTML = card.mechanics;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        playerCards.append(div);
    });

    //Cartes en Main Ennemi
    while(ennemiHand.firstChild){
        ennemiHand.removeChild(ennemiHand.firstChild);
    }

    for (let i = 0; i < data.opponent.handSize; i++) {
        let div = document.createElement("div");
        div.className = "ennemis_card";
        ennemiHand.append(div);
    }

    // Cartes sur le Board Ennemi
    while(ennemiCards.firstChild){
        ennemiCards.removeChild(ennemiCards.firstChild);
    }

    data.opponent.board.forEach(card => {
        let div = carte(card.id, false, true);
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        carteCost.innerHTML = card.cost;
        //carteEffect.style.backgroundImage = "url(images/Effects/"+carte.mechanics+".png)";
        div.style.backgroundImage = "url(images/Cartes/"+carteInfo[card.id][0]+"_Attack.png)";
        carteMecanique.innerHTML = card.mechanics;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        ennemiCards.append(div);
    });
}

function action(type, id, targetid) {
    if (yourTurn) {
        formData = new FormData();
        formData.append("action",type);
        if (id != null){
            formData.append("uid",id);
        }
        if (targetid != null) {
            formData.append("targetuid",targetid);
        }
        fetch("ajax-state.php", {
            method: "POST",
            credentials : 'include',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (typeof data != "string") {
                    console.log(data);
                }
                else if (data == "INVALID_KEY") {
                    console.log("Clé Invalide");
                }
                else if (data == "INVALID_ACTION") {
                    console.log("Action Invalide");
                }
                else if (data == "ACTION_IS_NOT_AN_OBJECT") {
                    console.log("Mauvaise structure de données");
                }
                else if (data == "NOT_ENOUGH_ENERGY") {
                    console.log("Pas assez d'énergie");
                }
                else if (data == "BOARD_IS_FULL") {
                    console.log("Pas assez de place pour la carte");
                }
                else if (data == "CARD_NOT_IN_HAND") {
                    console.log("La carte n'est pas dans votre main");
                }
                else if (data == "CARD_IS_SLEPPING") {
                    console.log("Carte ne peut être jouée ce tour-ci");
                }
                else if (data == "MUST_ATTACK_TAUNT_FIRST") {
                    console.log("La carte taunt empêche ce coup");
                }
                else if (data == "OPPONENT_CARD_NOT_FOUND") {
                    console.log("La carte attaquée n'est pas présente sur le jeu");
                }
                else if (data == "OPPONENT_CARD_HAS_STEALTH") {
                    console.log("La carte a l'effect de Stealth");
                }
                else if (data == "CARD_NOT_FOUND") {
                    console.log("La carte n'est pas présente");
                }
                else if (data == "HERO_POWER_ALREADY_USED") {
                    console.log("Pouvoir déjà utilisé pour ce tour");
                }
                else {

                }
            })
    }
    else {
        console.log("Ennemy turn");
    }
}
/*{"remainingTurnTime":13,
"heroPowerAlreadyUsed":false,
"yourTurn":true,
"hp":35,
"maxHp":35,
"heroClass":"Priest",
"talent":"LifeBoost",
"mp":1,
"maxMp":1,
"hand":[
{"id":11,"cost":3,"hp":4,"atk":1,"mechanics":["Taunt","Charge"],"dedicated":"","uid":2,"baseHP":4},
{"id":8,"cost":2,"hp":2,"atk":3,"mechanics":[],"dedicated":"","uid":3,"baseHP":2},
{"id":48,"cost":4,"hp":4,"atk":3,"mechanics":["Taunt","Battlecry : Add 2 1\/1 taunt minions to your hand"],"dedicated":"","uid":4,"baseHP":4},
{"id":55,"cost":3,"hp":1,"atk":1,"mechanics":["Battlecry : Give your taunt minions +2\/+2"],"dedicated":"","uid":5,"baseHP":1}],
"board":[],
"remainingCardsCount":26,
"welcomeText":"Salut!!",
"opponent":
{"username":"Hybrid-AI",
"heroClass":"Warlock",
"talent":"ShieldProtection",
"trophyCount":0,
"winCount":0,
"lossCount":0,
"hp":30,
"maxHp":30,
"mp":0,
"maxMp":1,
"board":[],
"handSize":4,
"remainingCardsCount":26,
"welcomeText":"Agility is the key"},
"latestActions":[]}*/