<?php
    require_once("action/CommonAction.php");
    require_once("action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $gamestate = json_encode($action->execute());

    //var_dump($gamestate);
    echo $gamestate;
?>