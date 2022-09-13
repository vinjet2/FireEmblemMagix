<?php
    require_once("action/CommonAction.php");

    class IndexAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $hasConnectionError = false;
            $data = [];
            $result = null;
            $data["username"] = $_POST["username"] ?? NULL;
            $data["password"] = $_POST["password"] ?? NULL;

            if (isset($_POST["username"]) && isset($_POST["password"])) {
                $result = parent::callAPI("signin", $data);

                if ($result === "INVALID_USERNAME_PASSWORD") {
                    $hasConnectionError = true;
                }
                else {
                    $key = $result ->key;
                    $_SESSION["key"] = $key;
                    $_SESSION["username"] = $_POST["username"];
                    $_SESSION["visibility"] = parent::$VISIBILITY_MEMBER;
                    header("location:lobby.php");
                    exit;
                }
            }

            return compact("hasConnectionError", "data", "result");
        }
    }