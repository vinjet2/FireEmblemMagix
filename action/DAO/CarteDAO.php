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

        public static function addCarte($carte) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT $carte from cartes");
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            $Lacarte = $statement->fetchAll();

            if (sizeof($Lacarte) != 0){
                $statement = $connection->prepare("UPDATE cartes SET nbjouer=nbjouer+1 WHERE carte = (?)");
            }else {
                $statement = $connection->prepare("INSERT INTO cartes(carte, nbjouer) VALUES (?, 1)");
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