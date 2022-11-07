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