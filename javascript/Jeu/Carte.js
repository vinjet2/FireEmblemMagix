function carte(id,board,ennemi) {
    var carte = document.createElement("div"); // Carte
    carte.className = "carte";
    if (board == true){carte.classList.add("B")}
    if (ennemi == true){carte.classList.add("E")}
    carte.setAttribute("id", id);
    var stats = document.createElement("div"); // stats
    stats.className = "carte_Stats";
    if (board == true){stats.classList.add("Bstats")}
    if (ennemi == true){stats.classList.add("Estats")}
    carte.append(stats);
    var cost = document.createElement("div"); // cost
    cost.className = "carte_Cost";
    if (board == true){cost.classList.add("Bcost")}
    if (ennemi == true){cost.classList.add("Ecost")}
    stats.append(cost);
    var effect = document.createElement("div"); // effect
    effect.className = "carte_Effect";
    if (board == true){effect.classList.add("Beffect")}
    if (ennemi == true){effect.classList.add("Eeffect")}
    stats.append(effect);
    var portrait = document.createElement("div"); // portrait
    portrait.className = "carte_Portrait";
    if (board == true){portrait.classList.add("Bportrait")}
    if (ennemi == true){portrait.classList.add("Eportrait")}
    carte.append(portrait);
    var mecanique = document.createElement("div"); // mecanique
    mecanique.className = "carte_Mecanique";
    carte.append(mecanique);
    var stats1 = document.createElement("div"); // stats1
    stats1.className = "carte_Stats1";
    if (board == true){stats1.classList.add("Bstats1")}
    if (ennemi == true){stats1.classList.add("Estats1")}
    carte.append(stats1);
    var attaque = document.createElement("div"); // attaque
    attaque.className = "carte_Attaque";
    if (board == true){attaque.classList.add("Battaque")}
    if (ennemi == true){attaque.classList.add("Eattaque")}
    stats1.append(attaque);
    var vie = document.createElement("div"); // vie
    vie.className = "carte_Vie";
    if (board == true){vie.classList.add("Bvie")}
    if (ennemi == true){vie.classList.add("Evie")}
    stats1.append(vie);
    return carte;
}