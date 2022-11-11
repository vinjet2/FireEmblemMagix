<?php
    require_once("action/CommonAction.php");

    class BoardAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $key = [];
			$key = $_SESSION["key"];
            $result = null;

            
            return compact("key");
        }
    }