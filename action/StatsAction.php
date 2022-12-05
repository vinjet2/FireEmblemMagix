<?php
    require_once("action/CommonAction.php");
    require_once("action/DAO/CarteDAO.php");

    class StatsAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_MEMBER);
        }

        protected function executeAction() {
            $cartes = CarteDAO::getCartes();

            // Vider les valeurs de la Base de Donnée
            if(isset($_GET["type"])) {
                if ($_GET["type"] == "Delete"){
                    CarteDAO::emptyCartes();
                }
            }

            return compact("cartes");
        }
    }