let yourTurn = true;
let selectedCardUID;
const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method: "POST",        // l’API (games/state)
        credentials:'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data === "INVALID_KEY") {
                messageErreur("Clé Invalide");
            }
            else if (data === "WAITING") {
                messageErreur("Downloading...");
            }
            else if (data === "LAST_GAME_WON") {
                messageErreur("Game Won!");
                //setInterval(window.location.href="lobby.php", 5000);
            }
            else if (data === "LAST_GAME_LOST") {
                messageErreur("Game Lost");
                //setInterval(window.location.href="lobby.php" ,5000);
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
    const ennemi = document.querySelector(".ennemis_UI");
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

    // Latest Actions
    var divInfo = document.querySelector(".info_log");

    while(divInfo.firstChild){
        divInfo.removeChild(divInfo.firstChild);
    }

    data.latestActions.forEach(latestaction => {
        var action = document.createElement("div");
        var fromAction = document.createElement("p");
        fromAction.innerHTML = latestaction.from;
        action.append(fromAction);
        var typeAction = document.createElement("p");
        typeAction.innerHTML = latestaction.action.type;
        action.append(typeAction);
        if (latestaction.action.type == "PLAY" || latestaction.action.type == "ATTACK"){
            var uiAction = document.createElement("p");
            console.log(latestaction);
            //var uid = document.querySelector("#"+latestaction.action.uid); Aller cherchez l'object
            uiAction.innerHTML = "Carte : "+ latestaction.action.uid;
            action.append(uiAction);
        }
        if (latestaction.action.type == "ATTACK"){
            var targetAction = document.createElement("p");
            if (latestaction.action.targetuid == null){
                target = "Joueur";
            }
            else if (latestaction.action.targetuid == 0){
                target = "Opponent";
            }
            else {
                target = latestaction.action.targetuid;
            }
            targetAction.innerHTML = "Target : "+ target;
            action.append(targetAction);
        }
        
        divInfo.append(action);
    });

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

    // Pour attaquer l'adversaire
    ennemi.onclick = function() { if(selectedCardUID != null){ action('ATTACK',selectedCardUID,0);}}

    // Cartes en Main
    while(playerHand.firstChild){playerHand.removeChild(playerHand.firstChild);}
    data.hand.forEach(card => {
        let div = carte(card.uid, false, false);
        const name = carteInfo[card.id][0];
        div.onclick = function(){action('PLAY',card.uid);}
        div.addEventListener('mouseover', (event) => {
            event.currentTarget.style.transform = ("translate(0,-10%)");
            descCarte(name,card.mechanics);
        })
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        if (card.cost <= data.mp && yourTurn){
            div.style.border = "4px solid rgb(10,75,10)";
        }
        carteCost.innerHTML = card.cost;
        var effect = consultMechanics(card.mechanics) 
        carteEffect.style.backgroundImage = "url(images/Effects/"+effect+".png)";
        div.style.backgroundImage = "url(images/Cartes/"+name+"_Neutral.png)";
        var texte = consultTxtMechanics(card.mechanics);
        carteMecanique.innerHTML = texte;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        playerHand.append(div);
    });

    // Cartes sur le Board
    while(playerCards.firstChild){playerCards.removeChild(playerCards.firstChild);}
    data.board.forEach(card => {
        let div = carte(card.id, true, false);
        const name = carteInfo[card.id][0] ?? "Kiran";
        
        div.onclick = function(){if (card.state != "SLEEP"){selectedCardUID = card.uid;}}
        div.addEventListener('mouseover', (event) => {
            event.currentTarget.style.transform = ("translate(0,-10%)");
            descCarte(name,card.mechanics);
        })
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        if (selectedCardUID == card.uid){
            div.style.border = "4px solid rgb(10,75,10)";
            div.style.backgroundImage = "url(images/Cartes/"+name+"_Special.png)";
        }
        else {
            div.style.border = "4px solid black";
            div.style.backgroundImage = "url(images/Cartes/"+name+"_Attack.png)";
        }
        if (card.state == "SLEEP"){
            div.style.opacity = "80%";
        }
        var effect = consultMechanics(card.mechanics) 
        carteEffect.style.backgroundImage = "url(images/Effects/"+effect+".png)";
        carteCost.innerHTML = card.cost;
        var texte = consultTxtMechanics(card.mechanics);
        carteMecanique.innerHTML = texte;
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
    while(ennemiCards.firstChild){ennemiCards.removeChild(ennemiCards.firstChild);}
    data.opponent.board.forEach(card => {
        let div = carte(card.id, false, true);
        const name = carteInfo[card.id][0];
        div.onclick = function() { if(selectedCardUID != null){ action('ATTACK',selectedCardUID,card.uid);}}
        div.addEventListener('mouseover', (event) => {
            descCarte(name,card.mechanics);
        })
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        if (card.state == "SLEEP"){
            div.style.opacity = "80%";
        }
        carteCost.innerHTML = card.cost;
        var effect = consultMechanics(card.mechanics);
        carteEffect.style.backgroundImage = "url(images/Effects/"+effect+".png)";
        div.style.backgroundImage = "url(images/Cartes/"+name+"_Attack.png)";
        var texte = consultTxtMechanics(card.mechanics);
        carteMecanique.innerHTML = texte;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        ennemiCards.append(div);
    });
}

function consultMechanics(mechanics) {
    var image = null;
    
    if (mechanics.includes("Taunt")){
        return image = "Taunt";
    }
    else if (mechanics.includes("Charge")){
        return image = "Charge";
    }
    else if (mechanics.includes("Stealth")){
        return image = "Stealth";
    }
    else {
        mechanics.forEach(mechanic => {
            if (image == null){
                if (mechanic.indexOf("Deathrattle") != -1){
                    image = "Deathrattle";
                }
                else if (mechanic.indexOf("Battlecry") != -1){
                    image = "Battlecry";
                }
                else if (mechanic.indexOf("Cannot attack") != -1){
                    image = "Cannot_Attack";
                }
                else if (mechanic.indexOf("start of your turn") != -1){
                    image = "StartTurn";
                }
                else if (mechanic.indexOf("end of your turn") != -1){
                    image = "EndTurn";
                }
                else if (mechanic.indexOf("hero power") != -1){
                    image = "HeroPower";
                }
                else if (mechanic.indexOf("you play a card") != -1){
                    image = "PlayCard";
                }
            }
        });
    }
    return image;
}

function consultTxtMechanics(mechanics) {
    var texte = "";
    if (mechanics.includes("Taunt")){
        texte = texte + "Taunt ";
    }
    if (mechanics.includes("Charge")){
        texte = texte + "Charge ";
    }
    if (mechanics.includes("Stealth")){
        texte = texte + "Stealth ";
    }
    mechanics.forEach(mechanic => {
        if (mechanic.indexOf("Deathrattle") != -1){
            texte = texte + "Deathrattle ";
        }
        if (mechanic.indexOf("Battlecry") != -1){
            texte = texte + "Battlecry ";
        }
        if (mechanic.indexOf("Cannot attack") != -1){
            texte = texte + "Cannot_Attack ";
        }
        if (mechanic.indexOf("start of your turn") != -1){
            texte = texte + "StartTurn ";
        }
        if (mechanic.indexOf("end of your turn") != -1){
            texte = texte + "EndTurn ";
        }
        if (mechanic.indexOf("hero power") != -1){
            texte = texte + "HeroPower ";
        }
        if (mechanic.indexOf("you play a card") != -1){
            texte = texte + "PlayCard ";
        }
    });
    return texte;
}

// Description des Cartes (info_log)
function descCarte(name, mechanics) {
    var portrait = document.querySelector(".description_portrait");
    portrait.style.backgroundImage = "url(images/Cartes/"+name+".png)";
    var nom = document.querySelector(".description_nom");
    nom.innerHTML = name;
    var mecanique = document.querySelector(".description_mechanique");
    mecanique.innerHTML = mechanics;
}

// Les Actions du joueur
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
                    messageErreur("Clé Invalide.");
                }
                else if (data == "INVALID_ACTION") {
                    messageErreur("Action Invalide.");
                }
                else if (data == "ACTION_IS_NOT_AN_OBJECT") {
                    messageErreur("Mauvaise structure de données.");
                }
                else if (data == "NOT_ENOUGH_ENERGY") {
                    messageErreur("Pas assez d'énergie.");
                }
                else if (data == "BOARD_IS_FULL") {
                    messageErreur("Pas assez de place pour la carte.");
                }
                else if (data == "CARD_NOT_IN_HAND") {
                    messageErreur("La carte n'est pas dans votre main.");
                }
                else if (data == "CARD_IS_SLEPPING") {
                    messageErreur("Carte ne peut être jouée ce tour-ci.");
                }
                else if (data == "MUST_ATTACK_TAUNT_FIRST") {
                    messageErreur("Une carte Taunt empêche ce coup!");
                }
                else if (data == "OPPONENT_CARD_NOT_FOUND") {
                    messageErreur("La carte attaquée n'est pas présente sur le jeu.");
                }
                else if (data == "OPPONENT_CARD_HAS_STEALTH") {
                    messageErreur("La carte a l'effect de Stealth.");
                }
                else if (data == "CARD_NOT_FOUND") {
                    messageErreur("La carte n'est pas présente.");
                }
                else if (data == "HERO_POWER_ALREADY_USED") {
                    messageErreur("HeroPower déjà utilisé pour ce tour.");
                }
                else {

                }
            })
    }
    else {
        messageErreur("Ennemy turn");
    }
}

function messageErreur(erreur ) {
    let divMessage = document.querySelector(".message_erreur");
    divMessage.innerHTML = erreur;
    divMessage.style.display = "block";
    window.setTimeout(fermerErreur,3000);
}

function fermerErreur(){
    let divMessage = document.querySelector(".message_erreur");
    divMessage.style.display = "none";
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

//"latestActions":[{"id":31,"from":"Hit-AI","action":{"type":"ATTACK","uid":34,"targetuid":null}},{"id":32,"from":"Hit-AI","action":{"type":"HERO_POWER"}},{"id":33,"from":"Hit-AI","action":{"type":"END_TURN"}}]}