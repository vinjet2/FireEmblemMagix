let yourTurn = true;

const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
        method: "POST",        // l’API (games/state)
        credentials:'include'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // contient les cartes/état du jeu.
            if (data === "INVALID_KEY") {

            }
            else if (data === "WAITING") {

            }
            else if (data === "LAST_GAME_WON") {
                setInterval(window.location.href="lobby.php", 5000);
            }
            else if (data === "LAST_GAME_LOST") {
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

    //yourTurn = data["yourTurn"];
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

    // 
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
        const carteCost = div.querySelector(".carte_Cost");
        const carteEffect = div.querySelector(".carte_Effect");
        const cartePortrait = div.querySelector(".carte_Portrait");
        const carteMecanique = div.querySelector(".carte_Mecanique");
        const carteAttaque = div.querySelector(".carte_Attaque");
        const carteVie = div.querySelector(".carte_Vie");
        carteCost.innerHTML = card.cost;
        //carteEffect.style.backgroundImage = "url(images/Effects/"+carte.mechanics+".png)";
        //cartePortrait.style.backgroundImage = "url(images/Cartes/"+carteInfo[carte.id][0]+".png)";
        carteMecanique.innerHTML = card.mechanics;
        carteAttaque.innerHTML = card.atk;
        carteVie.innerHTML = card.hp;
        playerCards.append(div);
    });

    //Cartes dans EnnemiHand
    while(ennemiHand.firstChild){
        ennemiHand.removeChild(ennemiHand.firstChild);
    }

    for (let i = 0; i < data.opponent.handSize; i++) {
        let div = document.createElement("div");
        div.className = "ennemis_card";
        ennemiHand.append(div);
    }

    // Cartes sur le Board Ennemi
    ennemiCards.childNodes.forEach(element => {
        element.remove();
    });

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
        // cartePortrait.style.backgroundImage = "url(images/Cartes/"+carteInfo[data.hand.id][0]+".png)";
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
        fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
            method: "POST",     // l’API (games/state)
            credentials : 'include',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (typeof data != "string") {
                    console.log(data);
                }
                else {
                    console.log("Erreur");
                }
            })
    }
    else {
        console.log("Ennemy turn");
    }
}

function carte(id, board, ennemi) {
    let carte = document.createElement("div"); // Carte
    carte.className = "carte";
    if (board == true) { carte.classList.add("B") }
    if (ennemi == true) { carte.classList.add("E") }
    carte.setAttribute("id", id);
    let stats = document.createElement("div"); // stats
    stats.className = "carte_Stats";
    if (board == true) { stats.classList.add("Bstats") }
    if (ennemi == true) { stats.classList.add("Estats") }
    carte.append(stats);
    let cost = document.createElement("div"); // cost
    cost.className = "carte_Cost";
    if (board == true) { cost.classList.add("Bcost") }
    if (ennemi == true) { cost.classList.add("Ecost") }
    stats.append(cost);
    let effect = document.createElement("div"); // effect
    effect.className = "carte_Effect";
    if (board == true) { effect.classList.add("Beffect") }
    if (ennemi == true) { effect.classList.add("Eeffect") }
    stats.append(effect);
    let portrait = document.createElement("div"); // portrait
    portrait.className = "carte_Portrait";
    if (board == true) { portrait.classList.add("Bportrait") }
    if (ennemi == true) { portrait.classList.add("Eportrait") }
    carte.append(portrait);
    let mecanique = document.createElement("div"); // mecanique
    mecanique.className = "carte_Mecanique";
    carte.append(mecanique);
    let stats1 = document.createElement("div"); // stats1
    stats1.className = "carte_Stats1";
    if (board == true) { stats1.classList.add("Bstats1") }
    if (ennemi == true) { stats1.classList.add("Estats1") }
    carte.append(stats1);
    let attaque = document.createElement("div"); // attaque
    attaque.className = "carte_Attaque";
    if (board == true) { attaque.classList.add("Battaque") }
    if (ennemi == true) { attaque.classList.add("Eattaque") }
    stats1.append(attaque);
    let vie = document.createElement("div"); // vie
    vie.className = "carte_Vie";
    if (board == true) { vie.classList.add("Bvie") }
    if (ennemi == true) { vie.classList.add("Evie") }
    stats1.append(vie);
    return carte;
}

const carteInfo = [
    ["Kiran", ""], //New Units
    ["Fjorm", ""],
    ["Silas", "Taunt"],
    ["Orochi", ""],
    ["Conrad", "Charge"],
    ["Ross", ""],
    ["Nino", "Battlecry"], //Spawn a minion
    ["Caeda", "Taunt"],
    ["Quan", ""],
    ["Sophia", "Battlecry"], //Leech 1 hp from the opponent's hero
    ["Julius", "Battlecry"], //Draw a card
    ["Shanna", "Taunt, Charge"],
    ["Roy", "Charge"],
    ["Kjelle", "Taunt"],
    ["Silque", "Battlecry"], //Restore 4 hp to your hero
    ["Mareeta", "Battlecry"], //Deal 2 to the opponent's hero
    ["Nagi", "Taunt"],
    ["Azelle", "Battlecry"], //Deal 2 to all enemy minions
    ["Greil", "Battlecry"], //Increase attack of your minions by 1
    ["Ingrid", ""],
    ["Louise", "Battlecry"], //Leech 2 HP from the opponent's hero
    ["Hector", "Taunt"],
    ["Hilda", "Taunt"],
    ["Reinhardt", "Battlecry"], //Spawn 2 minions
    ["Wolt", "Battlecry"], //Spawn a minion
    ["Eliwood", "Charge"],
    ["Gatrie", "Taunt"],
    ["Fiora", ""],
    ["Perceval", "Battlecry"], //Draw 2 cards
    ["Idunn", ""],
    ["Claude", "Charge"],
    ["Byleth", "Taunt"],
    ["Alm", ""],
    ["Ashnard", "Battlecry"], //Destroy all minions
    ["Lilith", "Battlecry"], //Increase HP of your minions by 2
    ["Lilina", "Taunt, Battlecry"], //Set attack and health of all minions to 3
    ["Ewan", "PlayCard"], //Every time you play a card, gain +1/+1
    ["Gerome", "StartTurn"], //At the start of your turn, deal 2 to the opponent's hero
    ["Corrin_Male", "StartTurn"], //At the start of your turn, deal 3 to the opponent's hero
    ["Raigh", "Battlecry"], //Deal 1 damage to all other characters
    ["Lyon_Child", "Charge"], //After killing a minion, gain +1/+2
    ["Arete", "Battlecry"], //Destroy a random enemy minion
    ["Lyon", "Battlecry"], //Gain +1/+1 for each card in your hand
    ["Julia_Legendary", "Battlecry"], //Gain +1/+1 for each minion on the board
    ["Henry", "Battlecry"], //Deal 3 hp to your hero
    ["Iago", "Battlecry"], //Deal 3 hp to your hero
    ["Lysithea", "Battlecry"], //Your opponent discards a random card
    ["Ephraim&Lyon", "Battlecry"], //Take control of a random enemy minion
    ["Fae", "Taunt, Battlecry"], //Add 2 1/1 taunt minions to your hand
    ["Roy_Legendary", "StartTurn"], //At the start of your turn, spawn a 2/2 minion with taunt
    ["Lyon_Fallen", "StartTurn"], //At the start of your turn, destroy all minions
    ["Owain", ""],
    ["Tiki", "Charge, Battlecry"], //Gain +1/+1 for each 1 attack minion you control
    ["Lyn_Brave", "Battlecry"], //Spawn 4 1/1 minions with charge
    ["Leif&Seliph", "Battlecry"], //Destroy all enemy minions, -2 hero HP for each killed
    ["Lucina_Brave", "Battlecry"], //Give your taunt minions +2/+2
    ["Tiki_Legendary", "Taunt, Battlecry"], //Spawn a 2/1 charge minion
    ["Pent", "Battlecry"], //Deal 6 to the opponent's hero
    ["Seliph", "Battlecry"], //Increase attack of your minions by 2
    ["Silque", "Battlecry"], //Give a random friendly minion +1/+1
    ["Merric", "HeroPower"], //After using your hero power, deal 1 damage to all enemies
    ["Fir", "HeroPower"], //After using your hero power, leech 2 HP from the opponent's hero
    ["Selena", "HeroPower"], //After using your hero power, deal 2 damage to all enemies
    ["Minerva", "Deathrattle"], //Draw a card
    ["Duessel", "Deathrattle"], //Spawn a 7/7 card with taunt
    ["Wolf", "Taunt, Deathrattle"], //Destroy a random enemy minion
    ["Yarne", "Charge, Deathrattle"], //Spawn a 2/1 charge minion
    ["Olwen", "Deathrattle"], //Give your minions +1/+1
    ["Tailtiu", "Taunt, Deathrattle"], //Deal 2 damage to all characters
    ["Marth", "Deathrattle"], //Restore 5 HP to your hero
    ["Hardin", "Battlecry"], //Destroy all taunt minions
    ["Innes", "Deathrattle"], //Deal 2 to the opponent's hero
    ["Ishtar", "Deathrattle"], //Spawn 2 2/3 minions
    ["Oscar", "Battlecry"], //Gain a crystal
    ["Tharja", "Deathrattle"], //Restore 5 health to the opponent's hero
    ["Veronica", "Deathrattle"], //Restore 5 health to the opponent's hero
    ["Eir", "Deathrattle"], //Restore 5 health to the opponent's hero
    ["Nanna", "Deathrattle"], //Restore 4 health to both heroes
    ["Julia", "Battlecry"], //Silence ALL minions
    ["Gordin", "Taunt"],
    ["Robin_Male", "Battlecry"], //Give taunt to your left most minion
    ["Julia_Mythic", "Cannot_Attack"],
    ["Chrom", "Stealth"], //At the start of your turn, gain +1/+1
    ["Shinon_Ninja", "Stealth"],
    ["Micaiah", "Battlecry"], //Give your stealth minions +2/+2
    ["Natasha", "Stealth"], //At the start of your turn, give +1 hp to a random friendly minion
    ["Lugh", "Stealth"],
    ["Annand", "Stealth"],
    ["Igrene", "Stealth"],
    ["Cordelia", "Stealth"],
    ["Myrrh", "Stealth, Charge"],
    ["Laslow", "Charge, Taunt, Battlecry"], //Add a random card to your hand
    ["Siguard&Deirdre", "EndTurn"], //At the end of your turn, reduce the cost of your cards (in hand) by 1
    ["Ike_Brave", "EndTurn"], //At the end of your turn, deal 1 damage to all enemies
    ["94", "Charge, Taunt, Deathrattle"], //Spawn a 3-1 charge and a 1-3 taunt minion
    ["95", "Battlecry"], //Your opponent discards a random card
    ["96", "Stealth, Taunt, Battlecry"], //All minions transform into one that costs 1 less
    ["97", "Battlecry"], //Confuse a random enemy minion
    ["98", "Charge, Battlecry"], //Confuse a random enemy minion
    ["99", "Taunt, Battlecry"], //Confuse a random enemy minion
    ["100", "Stealth, Battlecry"], //Confuse a random enemy minion
    ["101", "Battlecry"] //Return a random friendly minion to your hand
];

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