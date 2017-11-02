System.register("NewAdd", ["ControleBdd"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ControleBdd_1, NewAdd;
    return {
        setters: [
            function (ControleBdd_1_1) {
                ControleBdd_1 = ControleBdd_1_1;
            }
        ],
        execute: function () {
            NewAdd = (function () {
                function NewAdd() {
                    this.$WhiteWine = [];
                    this.$PinkWine = [];
                    this.$RedWine = [];
                }
                NewAdd.prototype.setVendeurId = function (id) {
                    this.vendeurid = id;
                };
                NewAdd.prototype.getVendeurId = function () {
                    return this.vendeurid;
                };
                NewAdd.prototype.setCat = function (cat) {
                    this.cat = cat;
                };
                NewAdd.prototype.getCat = function () {
                    return this.cat;
                };
                NewAdd.prototype.addNewWine = function (cat, idVendor, prix, nom, description) {
                    var controlebdd = new ControleBdd_1.ControleBdd();
                    controlebdd.putInBdd(cat, idVendor, prix, nom, description);
                };
                return NewAdd;
            }());
            exports_1("NewAdd", NewAdd);
        }
    };
});
System.register("ControleBdd", ["Vendeur"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var Vendeur_1, ControleBdd;
    return {
        setters: [
            function (Vendeur_1_1) {
                Vendeur_1 = Vendeur_1_1;
            }
        ],
        execute: function () {
            ControleBdd = (function () {
                function ControleBdd() {
                }
                ControleBdd.prototype.insererDansBdd = function (aEnvoyer, aujourdhui) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/enregistrer",
                        method: "post",
                        dataType: "json",
                        data: {
                            aEnvoyer: aEnvoyer,
                            aujourdhui: aujourdhui
                        },
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                };
                ;
                ControleBdd.prototype.chercherVente = function (id) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/returnBdd",
                        method: "post",
                        dataType: "json",
                        data: {
                            id: id
                        },
                        success: function (data) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].vendu == 1) {
                                    var voir = "<div class='produit " + data[i].catProduit + "' draggable='true' id='" + data[i].catProduit + data[i].id + "' data-cat='" + data[i].catProduit + "' data-nom='" + data[i].nom + "' data-prix='" + data[i].prix + "'  data-description='" + data[i].description + "'>";
                                    voir += "<p>" + data[i].nom + "</p>";
                                    voir += "</div>";
                                    $("#ici").append(voir);
                                }
                                else {
                                    var voir = "<div class='produit " + data[i].catProduit + "' draggable='true' id='" + data[i].catProduit + data[i].id + "' data-cat='" + data[i].catProduit + "' data-nom='" + data[i].nom + "' data-prix='" + data[i].prix + "'  data-description='" + data[i].description + "'>";
                                    voir += "<p>" + data[i].nom + "</p>";
                                    voir += "</div>";
                                    $("#" + data[i].catProduit).append(voir);
                                }
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                };
                ControleBdd.prototype.putInBdd = function (catProduit, vendeurId, prix, nom, description) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/newproduit",
                        method: "post",
                        dataType: "json",
                        data: {
                            catProduit: catProduit,
                            vendeurId: vendeurId,
                            prix: prix,
                            nom: nom,
                            description: description
                        },
                        success: function (data) {
                            console.log(data);
                            if (data) {
                                $("#prix").html("");
                                $("#nomvin").html("");
                                $("#description").html("");
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                };
                ControleBdd.prototype.controleNom = function (nom, mdp, app) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/login",
                        method: "post",
                        dataType: "json",
                        data: {
                            nom: nom,
                            mdp: mdp
                        },
                        success: function (data) {
                            console.log(data);
                            if (data) {
                                $("#login").fadeOut("slow", "swing");
                                $("#titre").fadeOut("slow", "swing");
                                if (data.admin == true) {
                                }
                                else if (data.nom != "admin") {
                                    app.vendeur = new Vendeur_1.Vendeur();
                                    app.vendeur.setVendeur(data.nom);
                                    app.vendeur.setVendeurId(data.idVendeur);
                                    console.log(app.vendeur);
                                    app.vendeur.loadPageVendeur();
                                }
                            }
                            else {
                                alert("Un erreur dans votre login");
                            }
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                };
                ControleBdd.prototype.ajoutVente = function (item, vendeurId, vendu) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/addToVendor",
                        method: "post",
                        dataType: "json",
                        data: {
                            item: item,
                            vendeurId: vendeurId,
                            vendu: vendu
                        },
                        success: function (data) {
                            console.log(data);
                        },
                        error: function (error) {
                            console.log(error);
                        }
                    });
                };
                return ControleBdd;
            }());
            exports_2("ControleBdd", ControleBdd);
        }
    };
});
System.register("Vendeur", ["ControleBdd"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var ControleBdd_2, Vendeur;
    return {
        setters: [
            function (ControleBdd_2_1) {
                ControleBdd_2 = ControleBdd_2_1;
            }
        ],
        execute: function () {
            Vendeur = (function () {
                function Vendeur() {
                    this.$VendorSales = [];
                    this.$vente = [];
                }
                Vendeur.prototype.setVendeur = function (vendeur) {
                    this.vendeur = vendeur;
                };
                Vendeur.prototype.getVendeur = function () {
                    return this.vendeur;
                };
                Vendeur.prototype.setVendeurId = function (id) {
                    this.$vendeurId = id;
                };
                Vendeur.prototype.getVendeurId = function () {
                    return this.$vendeurId;
                };
                Vendeur.prototype.setMdp = function (mdp) {
                    this.$mdp = mdp;
                };
                Vendeur.prototype.getMdp = function () {
                    return this.$mdp;
                };
                Vendeur.prototype.addSale = function (item) {
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vendu = 1;
                    var vente = controlebdd.ajoutVente(item, this.$vendeurId, vendu);
                };
                Vendeur.prototype.supVente = function (item) {
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vendu = 0;
                    var vente = controlebdd.ajoutVente(item, this.$vendeurId, vendu);
                };
                Vendeur.prototype.loadPageVendeur = function () {
                    $("#ici").html("");
                    $(".categorie").html("");
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vente = controlebdd.chercherVente(this.$vendeurId);
                    console.log(this.$vendeurId);
                    $("#ici1").html("Nom du vendeur: " + this.vendeur);
                };
                Vendeur.prototype.controleVendeurSelectionner = function () {
                    return true;
                };
                return Vendeur;
            }());
            exports_3("Vendeur", Vendeur);
        }
    };
});
System.register("App", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var App;
    return {
        setters: [],
        execute: function () {
            App = (function () {
                function App() {
                    this.$item = $(".produit");
                    this.$item.prop("draggable", true);
                    this.$container = $(".conteneur");
                }
                return App;
            }());
            exports_4("App", App);
        }
    };
});
System.register("main", ["App", "NewAdd", "Vendeur", "ControleBdd"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var App_1, NewAdd_1, Vendeur_2, ControleBdd_3, app, controlebdd, $container;
    return {
        setters: [
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (NewAdd_1_1) {
                NewAdd_1 = NewAdd_1_1;
            },
            function (Vendeur_2_1) {
                Vendeur_2 = Vendeur_2_1;
            },
            function (ControleBdd_3_1) {
                ControleBdd_3 = ControleBdd_3_1;
            }
        ],
        execute: function () {
            app = new App_1.App();
            app.vendeur = new Vendeur_2.Vendeur();
            app.newadd = new NewAdd_1.NewAdd();
            controlebdd = new ControleBdd_3.ControleBdd();
            $("#blanc").html("");
            $("#rose").html("");
            $("#rouge").html("");
            $(".nom1").click(function () {
                var $idVendeur = $(this).data("id");
                var vendeurname = $(this).attr("id");
                $container = "";
                app.newadd.setVendeurId($idVendeur);
                app.vendeur.setVendeurId($idVendeur);
                app.vendeur.setVendeur(vendeurname);
                $(".categorie").html("");
                app.vendeur.loadPageVendeur();
            });
            $(document).on("click", ".addWine", function () {
                var $idVendeur = $(this).data("id");
                var unVendeur = app.newadd.getVendeurId();
                console.log(unVendeur);
                var cat = $(this).data("cat");
                app.newadd.setCat(cat);
                if (unVendeur) {
                    $("#descriptVin").css("display", "flex");
                }
                else {
                    alert("Vous n'avez pas selectionné de vendeur");
                }
            });
            $(document).on("click", ".validWine", function () {
                var $v = app.newadd.getVendeurId();
                $("#descriptVin").css("display", "none");
                if ($v) {
                    var cat = app.newadd.getCat();
                    var prix = $("#prix").val();
                    var nom = $("#nomvin").val();
                    var description = $("#description").val();
                    app.newadd.addNewWine(cat, $v, prix, nom, description);
                    app.vendeur.loadPageVendeur();
                    $("#prix").val("");
                    $("#nomvin").val("");
                    $("#description").val("");
                }
                else {
                    alert("Vous n'avez pas selectionné de vendeur");
                }
            });
            app.$container.on("dragover", function (event) {
                event.preventDefault();
            });
            $(document).on("dragstart", ".produit", function (event) {
                var dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).attr("id"));
                dragEvent.dataTransfer.setData("origin", $(this).parent().attr("id"));
            });
            app.$container.on("drop", function (event) {
                var dragEvent = event.originalEvent;
                var unVendeur = app.vendeur.controleVendeurSelectionner();
                if (unVendeur) {
                    var id = dragEvent.dataTransfer.getData("id");
                    var idorigin = dragEvent.dataTransfer.getData("origin");
                    var a = $(this).data("cat");
                    var b = $("#" + id).data("cat");
                    var idVin = parseInt(id.replace(/([^\d]*)/, ''));
                    if (b == a || a == "all") {
                        var $currentItem = $("#" + id);
                        var $origin = $("#" + idorigin);
                        var $container = $(this);
                        $container.append($currentItem);
                    }
                    if (a == "all") {
                        var vente = app.vendeur.addSale(idVin);
                    }
                    else if (a == b) {
                        var vente = app.vendeur.supVente(idVin);
                    }
                }
                else {
                    $("#ici1").html("Pas de vendeur selectionner");
                }
            });
            $("#ValidLogin").click(function () {
                var nom = $("#nom").val();
                var mdp = $("#pwd").val();
                controlebdd.controleNom(nom, mdp, app);
                if (nom != "admin") {
                    $(".nom1").fadeOut("slow", "swing");
                    $(".addWine").fadeOut("slow", "swing");
                }
                if (nom == "admin") {
                    $(".nom1").fadeIn("slow", "swing");
                }
            });
            $("#logout").click(function () {
                $("#login").fadeIn("slow", "swing");
                $("#titre").fadeIn("slow", "swing");
                $(".nom1").fadeOut("slow", "swing");
                $("#ici1").fadeOut("slow", "swing");
                $(".addWine").fadeIn("slow", "swing");
                $("#nom").val("");
                $("#pwd").val("");
                $("#blanc").html("");
                $("#rose").html("");
                $("#rouge").html("");
                $("#ici").html("");
            });
            $(document).on("mouseover", ".produit", function () {
                var nom = $(this).data("nom");
                var description = $(this).data("description");
                var prix = $(this).data("prix");
                var cat = $(this).data("cat");
                switch (cat) {
                    case "blanc":
                        var bgc = "url(img/blanc.png)";
                        break;
                    case "rose":
                        var bgc = "url(img/rose.png)";
                        break;
                    case "rouge":
                        var bgc = "url(img/rouge.png)";
                        break;
                }
                var showDescript = "<div class='showDescription'><div id='show'><h1 id='titreS'>" + nom + "</h1>";
                showDescript += "<div id='abox'><p id='texte'>" + description + "</p></div>";
                showDescript += "<h3 id='decript'>" + prix + "€</h3></div>";
                $(".putShow").append(showDescript);
                $(".showDescription").css("background-image", bgc);
            });
            $(document).on("mouseout", ".produit", function () {
                $(".putShow").html("");
            });
        }
    };
});
//# sourceMappingURL=main.js.map