<?php
    require_once("action/CommonAction.php");

    class BoardAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $result = null;

            
            return [];
        }
    }