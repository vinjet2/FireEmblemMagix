<?php
    require_once("action/CommonAction.php");

    class AjaxStateAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = null;

            $data = [];
            $data = $_SESSION["key"];

            $result = parent::callAPI("games/state", $data);

            return compact("result");
        }
    }