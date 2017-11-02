<?php


    function inserer($date1, $mem){
        $mem = json_encode($mem);
        $connection = new PDO(
            "mysql:dbname=BddVin;host=localhost",
            "root",
            "root");
        $query = $connection->prepare("INSERT INTO stockage SET date1=:date1,mem=:mem");
        $query->execute(array(
            'date1'=>$date1,
            'mem'=>$mem
        ));
        return $connection->lastInsertId();
    };
    function GetContentInBdd($id){
        $connection = new PDO(
            "mysql:dbname=BddVin;host=localhost",
            "root",
            "root");
            $query = $connection->prepare("SELECT * FROM produit WHERE vendeurId=:id");
            $query->execute(array(
                'id'=>$id  
            ));
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
            
            if($result) return $result;
            else return false;
    };
    function controleLogin($nom, $mdp){
        $connection = new PDO(
            "mysql:dbname=BddVin;host=localhost",
            "root",
            "root");
            $query = $connection->prepare("SELECT * FROM user WHERE nom=:nom AND mdp=:mdp");
            $query->execute(array(  
                'nom'=>$nom,
                'mdp'=>$mdp 
            ));
            $result = $query->fetch(PDO::FETCH_ASSOC);
            return $result;
    }
    function insererProduit($cat, $id, $prix, $nom, $description){
        
        $connection = new PDO(
            "mysql:dbname=BddVin;host=localhost",
            "root",
            "root");
        $query = $connection->prepare("INSERT INTO produit SET produit=:produit,catProduit=:catProduit,vendeurId=:vendeurId,vendu=:vendu,prix=:prix,nom=:nom,description=:description");
        $query->execute(array(
            'produit'=>"vin",
            'catProduit'=>$cat,
            'vendeurId'=>$id,
            'vendu'=>0,
            'prix'=>$prix,
            'nom'=>$nom,
            'description'=>$description
        ));
        return true;
    };
    function vendeurSales($item, $id, $vendu){
        $connection = new PDO(
            "mysql:dbname=BddVin;host=localhost",
            "root",
            "root");
            $query = $connection->prepare("UPDATE produit SET vendu=:vendu WHERE id=:id AND vendeurId=:vendeurId");
            $query->execute(array(
                'id'=>$item,
                'vendeurId'=>$id,
                'vendu'=>$vendu
            ));
            return true;
    }

    // function login($nom, $prenom){
    //     $connection = new PDO(
    //         "mysql:dbname=API;host=localhost",
    //         "root",
    //         "root");
    //     $query = $connection->prepare("SELECT * FROM testApi WHERE nom=:nom AND prenom=:prenom");
    //     $query->execute(array(
    //         'nom'=>$nom,
    //         'prenom'=>$prenom
    //     ));
    //     $result = $query->fetch(PDO::FETCH_ASSOC);
    //     if($result){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
        
    //};