<?php
    require_once("action/lobbyAction.php");

    $action = new lobbyAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<?php
    require_once("partial/footer.php");