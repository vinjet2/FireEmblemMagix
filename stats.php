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
                $nbcarte = sizeof($data["cartes"]);
                ?>
                <div class="result">
                    <p>ID : <?= $carte["carte"] ?></p>
                    <p>Personnage : <?= $carte["cartename"] ?></p>
                    <div style="background-image:url(images/Cartes/<?= $carte["cartename"] ?>.png);background-size:100%;min-width:20vh;min-height:10vh;"></div>
                    <p>Nombre de fois Jouer : <?= $carte["nbjouer"] ?></p>
                    <p>Pourcentage : <?= ($carte["nbjouer"] * 100)/ $nbcarte ?> %</p>
                </div>
                <?php
            }
        ?>
    </div>
    <a href="stats.php?type=Delete"><div class="button_stats">Delete Stats</div></a>
    <div class="exit_stats"><a href="lobby.php"><div class="button_retour" id="feh" onmouseover="wakeupFeh()" onmouseout="sleepyFeh()"></div></a></div>
    
</div>
<script>
    function wakeupFeh() {document.getElementById("feh").style.backgroundImage = "url('images/UI/Feh_awake.png')";}

    function sleepyFeh() {document.getElementById("feh").style.backgroundImage = "url('images/UI/Feh_asleep.png')";}
</script>
<?php
    require_once("partial/footer.php");