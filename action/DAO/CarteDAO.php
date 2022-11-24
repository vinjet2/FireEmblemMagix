<?php
    require_once("action/DAO/Connection.php");

    class CarteDAO {

        public static function getCartes() {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("SELECT * from cartes");

            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();

            return $statement->fetchALL();
        }

        public static function addCarte($carte) {
            $connection = Connection::getConnection();

            $statement = $connection->prepare("INSERT INTO cartes() VALUES (?)");
            $statement->bindParam(1, $carte);
            $statement->setFetchMode(PDO::FETCH_ASSOC);
            $statement->execute();
        }

        public static function emptyCartes() {
            $connection = Connection::getConnection();

            
        }
    }