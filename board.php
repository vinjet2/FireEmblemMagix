<?php
    require_once("action/BoardAction.php");

    $action = new BoardAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
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
            <div class="chat"></div>
            <div class="ennemis_Cards"></div>
            <div class="timer"></div>
        </div>
    </div>
    <div class="player">
        <div class="player_Board">

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
                    <div class="endTurn">End Turn</div>
                    <div class="player_HeroPower">Hero Power</div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php
    require_once("partial/footer.php");