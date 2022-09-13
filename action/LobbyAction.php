<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            if ($_GET["logout"] ?? NULL === "true") {

				if (isset($_SESSION["key"])) {
					$key = [];
					$key = $_SESSION["key"];

					$result = parent::callAPI("signout", "key");

					if ($result === "INVALID KEY") {

					}
					else {
						unset($_SESSION["key"]);
						$_SESSION["visibility"] = parent::$VISIBILITY_PUBLIC;
						header("location:index.php");
						exit;
					}
					return [];
				}
			}
        }
    }