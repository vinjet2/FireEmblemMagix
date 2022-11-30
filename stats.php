<?php
    require_once("action/StatsAction.php");

    $action = new StatsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<script src="javascript/Jeu/carteInfo.js"></script>
<div class="stats">
    <div class="result_stats">
        <?php
            foreach($data["cartes"] as $carte) {
                var_dump($carte);
                ?>
                <div class="result">
                    <p> ID : <?= $carte["carte"] ?></p>
                    <p>Personnage :  </p>
                    <p> Nombre de fois Jouer: <?= $carte["nbjouer"] ?></p>
                </div>
                <?php
            }
        ?>
    </div>
    <a href="stats.php?type=Delete"><div class="button_stats">Delete Stats</div></a>
    <a href="lobby.php"><div class="button_retour" id="feh" onmouseover="wakeupFeh()" onmouseout="sleepyFeh()"></div></a>
</div>
<script>
    function wakeupFeh() {document.getElementById("feh").style.backgroundImage = "url('images/UI/Feh_awake.png')";}

    function sleepyFeh() {document.getElementById("feh").style.backgroundImage = "url('images/UI/Feh_asleep.png')";}
</script>
<?php
    require_once("partial/footer.php");