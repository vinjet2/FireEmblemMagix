<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<?php
    require_once("partial/footer.php");
