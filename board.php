<?php
    require_once("action/BoardAction.php");

    $action = new BoardAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="javascript/Jeu/carteInfo.js"></script>
<script src="javascript/Jeu/Carte.js"></script>
<script src="javascript/Jeu/jeu.js"></script>
<script src="javascript/Jeu/chat_Style.js"></script>
<iframe id="chat" style="width:600px;height:210px;display:none;position:absolute;" onload="applyStyles(this)"
src="https://magix.apps-de-cours.com/server/#/chat/<?= $_SESSION["key"] ?>">
</iframe>
<div class="message_erreur"></div>
<div class="Character"></div>
<div class="board">
    <div class="ennemis">
        <div class="ennemis_UI">
            <div class="ennemis_Portrait"></div>
            <div class="ennemis_Hand"></div>
            <div class="ennemis_Health"></div>
            <div class="ennemis_Mana"></div>
            <div class="ennemis_Deck"></div>
        </div>
        <div class="ennemis_Board">
            <div id="log" class="info_log" style="display:none"></div>
            <div class="description">
                <div class="description_portrait"></div>
                <div class="description_mechanique"></div>
                <div class="description_nom"></div>
            </div>
            <div class="ennemis_Cards"></div>
        </div>
    </div>
    <div class="player">
        <div class="player_Board">
        <div class="options_Board">
                <div class="surrender" onclick="action('SURRENDER')">Surrender</div>
                <div class="button_chat" onclick="showChat()">Chat</div>
                <script>
                    let activate = false;
                    function showChat() {
                        activate = !activate
                        if (!activate){
                            document.getElementById("chat").style.display="none";
                        }
                        else {
                            document.getElementById("chat").style.display="block";
                        }
                    }
			    </script>
                <div class="log" onclick="showInfo()">Log</div>
                <script>
                    let activate1 = false;
                    function showInfo() {
                        activate1 = !activate1
                        if (!activate1){
                            document.getElementById("log").style.display="none";
                        }
                        else {
                            document.getElementById("log").style.display="block";
                        }
                    }
			    </script>
                <div class="timer"></div>
            </div>
            <div class="player_Cards"></div>
        </div>
        <div class="player_UI">
            <div class="player_Portrait"></div>
            <div class="player_Hand"></div>
            <div class="player_Info">
                <div class="player_Stats">
                    <div class="player_Health"></div>
                    <div class="player_Mana"></div>
                    <div class="player_Deck"></div>
                </div>
                <div class="player_Options">
                    <div class="endTurn" onclick="action('END_TURN')">End Turn</div>
                    <div class="player_HeroPower" onclick="action('HERO_POWER')">HeroPower</div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
    require_once("partial/footer.php");