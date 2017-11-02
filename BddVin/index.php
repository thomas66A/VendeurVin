<?php
require "flight/Flight.php";
require "enregistrement.php";

header("Access-Control-Allow-Origin: *");
Flight::route("/", function(){
    echo "Welcome service";
});
Flight::route("POST /enregistrer", function(){
    $date = Flight::request()->data["aujourdhui"];
    $mem = Flight::request()->data["aEnvoyer"];
    $data = inserer($date, $mem);
    
        echo json_encode($data);
    
});

Flight::route("POST /returnBdd", function(){
    $id = Flight::request()->data["id"];
    $data = GetContentInBdd($id);
    echo json_encode($data);  
});

Flight::route("POST /login", function(){
    $nom = Flight::request()->data["nom"];
    $mdp = Flight::request()->data["mdp"];
    $data = controleLogin($nom, $mdp);
    echo json_encode($data);  
});
Flight::route("POST /newproduit", function(){
    $cat = Flight::request()->data["catProduit"];
    $id = Flight::request()->data["vendeurId"];
    $prix = Flight::request()->data["prix"];
    $nom = Flight::request()->data["nom"];
    $description = Flight::request()->data["description"];
    $data = insererProduit($cat, $id, $prix, $nom, $description);
    echo json_encode($data);  
});

Flight::route("POST /addToVendor", function(){
    $item = Flight::request()->data["item"];
    $id = Flight::request()->data["vendeurId"];
    $vendu = Flight::request()->data["vendu"];
    $data = vendeurSales($item, $id, $vendu);
    echo json_encode($data);  
});

Flight::start();