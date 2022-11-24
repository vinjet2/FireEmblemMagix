<?php
    require_once("action/StatsAction.php");

    $action = new StatsAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>
<div class="stats">

</div>
<?php
    require_once("partial/footer.php");