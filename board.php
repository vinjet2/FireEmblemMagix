<?php
    require_once("action/BoardAction.php");

    $action = new BoardAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="javascript/Jeu/jeu.js"></script>
<script src="javascript/Jeu/Carte.js"></script>
<div class="board">
    <div class="ennemis">
        <div class="ennemis_UI">
            <div class="ennemis_Portrait"></div>
            <div class="ennemis_Hand">
                <!--<div class="ennemis_card"></div>-->
            </div>
            <div class="ennemis_Health">30</div>
            <div class="ennemis_Mana">5</div>
            <div class="ennemis_Deck">10</div>
        </div>
        <div class="ennemis_Board">
            <div class="chat"></div>
            <div class="surrender" onclick="action('SURRENDER')">Surrender</div>
            <div class="ennemis_Cards">
                <!--<div class="carte E">
                    <div class="carte_Stats Estats">
                        <div class="carte_Cost Ecost">2</div>
                        <div class="carte_Effect Eeffect"></div>
                    </div>
                    <div class="carte_Portrait Eportrait"></div>
                    <div class="carte_Mecanique"></div>
                    <div class="carte_Stats1 Estats1">
                        <div class="carte_Attaque Eattaque">2</div>
                        <div class="carte_Vie Evie">3</div>
                    </div>
                </div>-->
            </div>
            <div class="timer"></div>
        </div>
    </div>
    <div class="player">
        <div class="player_Board">
            <div class="player_Cards">
                <!--<div class="carte B">
                    <div class="carte_Stats Bstats">
                        <div class="carte_Cost Bcost">2</div>
                        <div class="carte_Effect Beffect"></div>
                    </div>
                    <div class="carte_Portrait Bportrait"></div>
                    <div class="carte_Mecanique"></div>
                    <div class="carte_Stats1 Bstats1">
                        <div class="carte_Attaque Battaque">2</div>
                        <div class="carte_Vie Bvie">3</div>
                    </div>
                </div>-->
            </div>
        </div>
        <div class="player_UI">
            <div class="player_Portrait"></div>
            <div class="player_Hand">
               <!-- <div class="carte H">
                    <div class="carte_Stats">
                        <div class="carte_Cost">2</div>
                        <div class="carte_Effect"></div>
                    </div>
                    <div class="carte_Portrait"></div>
                    <div class="carte_Mecanique"></div>
                    <div class="carte_Stats1">
                        <div class="carte_Attaque">2</div>
                        <div class="carte_Vie">3</div>
                    </div>
                </div>
                <div class="carte H">
                    <div class="carte_Stats">
                        <div class="carte_Cost">2</div>
                        <div class="carte_Effect"></div>
                    </div>
                    <div class="carte_Portrait"></div>
                    <div class="carte_Mecanique"></div>
                    <div class="carte_Stats1">
                        <div class="carte_Attaque">2</div>
                        <div class="carte_Vie">3</div>
                    </div>
                </div>-->
            </div>
            <div class="player_Info">
                <div class="player_Stats">
                    <div class="player_Health">35</div>
                    <div class="player_Mana">10</div>
                    <div class="player_Deck">30</div>
                </div>
                <div class="player_Options">
                    <div class="endTurn" onclick="action('END_TURN')">End Turn</div>
                    <div class="player_HeroPower" onclick="action('HERO_POWER')">Hero Power</div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
    require_once("partial/footer.php");