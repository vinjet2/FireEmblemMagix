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
            
        }
        setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});
