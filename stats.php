<?php
    require_once("action/StatsAction.php");

    $action = new StatsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div class="stats">
    <div class="result_stats">
        <?php
            foreach($data["cartes"] as $carte) {
                ?>
                <p> <?= $carte["carte"] ?></p>
                <p> <?= $carte["nbJouer"] ?></p>
                <?php
                
            }
        ?>
    </div>
    <div class="button-stats"><a href="stats.php?type=Delete">Delete Stats</a></div>
</div>
<?php
    require_once("partial/footer.php");