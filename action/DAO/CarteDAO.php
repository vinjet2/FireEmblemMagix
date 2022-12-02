<?php
    require_once("action/DAO/Connection.php");
    require_once("action/constants.php");

    class CarteDAO {

        public static function getCartes() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * from cartes ORDER BY nbJouer");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchAll();
        }

        public static function addCarte($carte, $carteName) {
            $connection = Connection::getConnection();

            // $statement = $connection->prepare("SELECT $carte from cartes");
            $statement = $connection->prepare("SELECT * from cartes");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $Lescartes = $statement->fetchAll();
            $existe = false;
            foreach($Lescartes as $Lacarte){
                if ($Lacarte["carte"] == $carte){
                    $existe = true;
                }
            }

            if ($existe == false){
                $statement = $connection->prepare("INSERT INTO cartes(carte, carteName, nbjouer) VALUES (?, ?, 1)");
                $statement->bindParam(2, $carteName);
            }else {
                $statement = $connection->prepare("UPDATE cartes SET nbjouer=nbjouer+1 WHERE carte = (?)");
            } 
            $statement->bindParam(1, $carte);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

        public static function emptyCartes() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("DELETE FROM cartes");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }
    }