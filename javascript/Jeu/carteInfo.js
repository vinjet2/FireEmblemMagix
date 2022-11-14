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