<?php
    require_once("action/CommonAction.php");

    class LobbyAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
			$result = null;
			$messageErreur = null;

			// Deconnexion
            if ($_GET["logout"] ?? NULL === "true") {
				if (isset($_SESSION["key"])) {
					$key = [];
					$key = $_SESSION["key"];

					$result = parent::callAPI("signout", "key");

					if ($result === "INVALID KEY") {

					}
					else {
						unset($_SESSION["key"]);
                        parent::isSignOut();
						$_SESSION["visibility"] = parent::$VISIBILITY_PUBLIC;
						header("location:index.php");
						exit;
					}
					return [];
				}
			}
			// Creation d'une Partie
			if (isset($_GET["partie"])) {
				if (isset($_SESSION["key"])) {
					$data = [];
					$data["key"] = $_SESSION["key"];
					$data["type"] = $_GET["partie"];

					$result = parent::callAPI("games/auto-match", $data);

					if ($result === "DECK_INCOMPLETE") {
						$messageErreur = "Votre Deck est incomplet";
					}
					else if ($result === "INVALID_KEY") {
						$messageErreur = "Problème de cléf";
					}
					else if ($result === "INVALID_GAME_TYPE") {
						$messageErreur = "Problème de GameType";
					}
					else if ($result === "MAX_DEATH_THRESHOLD_REACHED") {
						$messageErreur = "Vous êtes Mort MaxDeath Threshold";
					}
					else {
						header("location:board.php");
                		exit;
					}
				}
			}
			return compact("messageErreur", "result");
        }
    }