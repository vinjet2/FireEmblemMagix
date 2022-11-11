<?php
    require_once("action/CommonAction.php");

    class AjaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = null;
            $data = [];
            $data["key"] = $_SESSION["key"];

            if (isset($_POST["action"])){
                $data["type"] = $_POST["action"];
                if (isset($_POST["uid"])){
                    $data["uid"] = $_POST["uid"];
                }
                if (isset($_POST["targetuid"])){
                    $data["targetuid"] = $_POST["targetuid"];
                }
                $result = parent::callAPI("games/action", $data);
            }
            else{
                $result = parent::callAPI("games/state", $data);
            }
            return compact("result");
        }
    }