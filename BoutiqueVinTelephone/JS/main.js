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
            NewAdd = class NewAdd {
                constructor() {
                    this.$WhiteWine = [];
                    this.$PinkWine = [];
                    this.$RedWine = [];
                }
                setVendeurId(id) {
                    this.vendeurid = id;
                }
                getVendeurId() {
                    return this.vendeurid;
                }
                setCat(cat) {
                    this.cat = cat;
                }
                getCat() {
                    return this.cat;
                }
                addNewWine(cat, idVendor, prix, nom, description) {
                    var controlebdd = new ControleBdd_1.ControleBdd();
                    controlebdd.putInBdd(cat, idVendor, prix, nom, description);
                }
            };
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
            ControleBdd = class ControleBdd {
                insererDansBdd(aEnvoyer, aujourdhui) {
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
                }
                ;
                chercherVente(id) {
                    $.ajax({
                        url: "http://localhost:8888/BddVin/returnBdd",
                        method: "post",
                        dataType: "json",
                        data: {
                            id: id
                        },
                        success: function (data) {
                            //console.log(data);
                            for (var i = 0; i < data.length; i++) {
                                //console.log(data[i].catProduit);
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
                }
                putInBdd(catProduit, vendeurId, prix, nom, description) {
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
                }
                controleNom(nom, mdp, app) {
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
                                if (data.admin == true) {
                                    $("#nom").val("");
                                    $("#pwd").val("");
                                    alert("Apply destinée au vendeur, l'admin n'a accés qu'au travers du site en ligne");
                                }
                                else if (data.nom != "admin") {
                                    $(".nom1").fadeOut("slow", "swing");
                                    $("#login").fadeOut("slow", "swing");
                                    $("#global").fadeIn("slow", "swing");
                                    $("#logout").fadeIn("slow", "swing");
                                    $("#dispo").css("display", "flex");
                                    $("#titre").html(data.nom);
                                    $("#mesventes").fadeIn("slow", "swing");
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
                }
                ajoutVente(item, vendeurId, vendu) {
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
                }
            };
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
            Vendeur = class Vendeur {
                constructor() {
                    this.$VendorSales = [];
                    this.$vente = [];
                }
                setVendeur(vendeur) {
                    this.vendeur = vendeur;
                }
                getVendeur() {
                    return this.vendeur;
                }
                setVendeurId(id) {
                    this.$vendeurId = id;
                }
                getVendeurId() {
                    return this.$vendeurId;
                }
                setMdp(mdp) {
                    this.$mdp = mdp;
                }
                getMdp() {
                    return this.$mdp;
                }
                addSale(item) {
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vendu = 1;
                    var vente = controlebdd.ajoutVente(item, this.$vendeurId, vendu);
                }
                supVente(item) {
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vendu = 0;
                    var vente = controlebdd.ajoutVente(item, this.$vendeurId, vendu);
                }
                loadPageVendeur() {
                    $("#ici").html("");
                    $(".categorie").html("");
                    var controlebdd = new ControleBdd_2.ControleBdd();
                    var vente = controlebdd.chercherVente(this.$vendeurId);
                    console.log(this.$vendeurId);
                    $("#ici1").html("Nom du vendeur: " + this.vendeur);
                }
                controleVendeurSelectionner() {
                    // if(this.$vendeurId){
                    //     return this.$vendeurId;
                    // }
                    // else{
                    //     return "Pas bon";
                    // }
                    return true;
                }
            };
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
            App = class App {
                constructor() {
                    this.$item = $(".produit");
                    this.$item.prop("draggable", true);
                    this.$container = $(".conteneur");
                }
            };
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
                //console.log($idVendeur + " " + vendeurname);
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
                const dragEvent = event.originalEvent;
                dragEvent.dataTransfer.setData("id", $(this).attr("id"));
                dragEvent.dataTransfer.setData("origin", $(this).parent().attr("id"));
            });
            app.$container.on("drop", function (event) {
                const dragEvent = event.originalEvent;
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
            });
            $("#logout").click(function () {
                $("#login").fadeIn("slow", "swing");
                $("#titre").html("GESTION VENDEUR DE VIN");
                $(".nom1").fadeOut("slow", "swing");
                $("#logout").fadeOut("slow", "swing");
                $("#ici1").fadeOut("slow", "swing");
                $(".addWine").fadeIn("slow", "swing");
                $("#dispo").css("display", "none");
                $("#nom").val("");
                $("#pwd").val("");
                $("#blanc").html("");
                $("#rose").html("");
                $("#mesventes").html("");
                $("#rouge").html("");
                $("#ici").html("");
            });
            $(document).on("mouseover", ".produit", function () {
                //$(".putShow").html("");
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
                //$(".categorie").html("");
                //app.vendeur.loadPageVendeur();       
            });
            $(document).on("mouseout", ".produit", function () {
                $(".putShow").html("");
            });
        }
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRTL05ld0FkZC50cyIsIlRTL0NvbnRyb2xlQmRkLnRzIiwiVFMvVmVuZGV1ci50cyIsIlRTL0FwcC50cyIsIlRTL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7WUFFQSxTQUFBO2dCQVdJO29CQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBRXZCLENBQUM7Z0JBQ0QsWUFBWSxDQUFDLEVBQVM7b0JBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixDQUFDO2dCQUVELFlBQVk7b0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzFCLENBQUM7Z0JBRUQsTUFBTSxDQUFDLEdBQVU7b0JBQ2IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsTUFBTTtvQkFDRixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDcEIsQ0FBQztnQkFJRCxVQUFVLENBQUMsR0FBVSxFQUFFLFFBQWUsRUFBRSxJQUFXLEVBQUUsR0FBVSxFQUFFLFdBQWtCO29CQUczRSxJQUFJLFdBQVcsR0FBZSxJQUFJLHlCQUFXLEVBQUUsQ0FBQztvQkFDaEQsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBSXBFLENBQUM7YUFFSixDQUFBOztRQUFBLENBQUM7Ozs7Ozs7Ozs7Ozs7O1lDN0NGLGNBQUE7Z0JBR0EsY0FBYyxDQUFDLFFBQWUsRUFBRSxVQUFjO29CQUMxQyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUNILEdBQUcsRUFBRywwQ0FBMEM7d0JBQ2hELE1BQU0sRUFBRyxNQUFNO3dCQUNmLFFBQVEsRUFBRyxNQUFNO3dC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QyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7b0JBQ0wsS0FBSyxPQUFPO3dCQUNaLElBQUksR0FBRyxHQUFHLG9CQUFvQixDQUFDO3dCQUMvQixLQUFLLENBQUM7b0JBQ04sS0FBSyxNQUFNO3dCQUNYLElBQUksR0FBRyxHQUFHLG1CQUFtQixDQUFDO3dCQUM5QixLQUFLLENBQUM7b0JBQ04sS0FBSyxPQUFPO3dCQUNaLElBQUksR0FBRyxHQUFHLG9CQUFvQixDQUFDO3dCQUMvQixLQUFLLENBQUM7Z0JBQ2QsQ0FBQztnQkFDRCxJQUFJLFlBQVksR0FBRyw4REFBOEQsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDO2dCQUNsRyxZQUFZLElBQUksK0JBQStCLEdBQUcsV0FBVyxHQUFHLFlBQVksQ0FBQztnQkFDN0UsWUFBWSxJQUFJLG1CQUFtQixHQUFHLElBQUksR0FBRyxjQUFjLENBQUM7Z0JBQzVELENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkQsMkJBQTJCO2dCQUMzQix1Q0FBdUM7WUFDL0MsQ0FBQyxDQUFDLENBQUE7WUFDRixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUU7Z0JBQzlCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sZUJkZCB9IGZyb20gXCIuL0NvbnRyb2xlQmRkXCI7XG5pbXBvcnQgeyBBcHAgfSBmcm9tIFwiLi9BcHBcIjtcbmV4cG9ydCBjbGFzcyBOZXdBZGR7XG4gICAgcHVibGljIGFkZFdpbmUgIDogSlF1ZXJ5O1xuICAgIHB1YmxpYyB2ZW5kZXVyaWQgOiBudW1iZXI7XG4gICAgcHVibGljICRXaGl0ZVdpbmUgOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyAkUGlua1dpbmUgOiBBcnJheTxhbnk+O1xuICAgIHB1YmxpYyAkUmVkV2luZSA6IEFycmF5PGFueT47XG4gICAgcHVibGljIE51bVdoaXRlIDogbnVtYmVyO1xuICAgIHB1YmxpYyBOdW1Sb3NlIDogbnVtYmVyO1xuICAgIHB1YmxpYyBOdW1Sb3VnZSA6IG51bWJlcjtcbiAgICBwdWJsaWMgTnVtVmVuZG9ycyA6IG51bWJlcjtcbiAgICBwdWJsaWMgY2F0IDogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRXaGl0ZVdpbmUgPSBbXTtcbiAgICAgICAgdGhpcy4kUGlua1dpbmUgPSBbXTtcbiAgICAgICAgdGhpcy4kUmVkV2luZSA9IFtdO1xuICAgICAgICBcbiAgICB9XG4gICAgc2V0VmVuZGV1cklkKGlkOm51bWJlcil7XG4gICAgICAgIHRoaXMudmVuZGV1cmlkID0gaWQ7XG4gICAgfVxuXG4gICAgZ2V0VmVuZGV1cklkKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnZlbmRldXJpZDtcbiAgICB9XG5cbiAgICBzZXRDYXQoY2F0OnN0cmluZyl7XG4gICAgICAgIHRoaXMuY2F0ID0gY2F0O1xuICAgIH1cblxuICAgIGdldENhdCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5jYXQ7XG4gICAgfVxuXG4gICAgXG4gICAgXG4gICAgYWRkTmV3V2luZShjYXQ6c3RyaW5nLCBpZFZlbmRvcjpudW1iZXIsIHByaXg6bnVtYmVyLCBub206c3RyaW5nLCBkZXNjcmlwdGlvbjpzdHJpbmcpe1xuICAgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgIHZhciBjb250cm9sZWJkZDpDb250cm9sZUJkZCA9IG5ldyBDb250cm9sZUJkZCgpO1xuICAgICAgICAgICAgY29udHJvbGViZGQucHV0SW5CZGQoY2F0LCBpZFZlbmRvciwgcHJpeCwgbm9tLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgXG4gICAgfVxuICAgIFxufSIsImltcG9ydCB7IFZlbmRldXIgfSBmcm9tIFwiLi9WZW5kZXVyXCI7XG5pbXBvcnQgeyBOZXdBZGQgfSBmcm9tIFwiLi9OZXdBZGRcIjtcbmltcG9ydCB7IEFwcCB9IGZyb20gXCIuL0FwcFwiO1xuZXhwb3J0IGNsYXNzIENvbnRyb2xlQmRke1xuXG5cbmluc2VyZXJEYW5zQmRkKGFFbnZveWVyOnN0cmluZywgYXVqb3VyZGh1aTphbnkpe1xuICAgICQuYWpheCh7XG4gICAgICAgIHVybCA6IFwiaHR0cDovL2xvY2FsaG9zdDo4ODg4L0JkZFZpbi9lbnJlZ2lzdHJlclwiLFxuICAgICAgICBtZXRob2QgOiBcInBvc3RcIixcbiAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcbiAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgIGFFbnZveWVyOiBhRW52b3llcixcbiAgICAgICAgICAgIGF1am91cmRodWk6IGF1am91cmRodWlcbiAgICAgICAgfSxcbiAgICAgICAgc3VjY2VzcyA6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcbn07XG5jaGVyY2hlclZlbnRlKGlkOm51bWJlcil7XG4gICAgXG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsIDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvQmRkVmluL3JldHVybkJkZFwiLFxuICAgICAgICBtZXRob2QgOiBcInBvc3RcIixcbiAgICAgICAgZGF0YVR5cGUgOiBcImpzb25cIixcbiAgICAgICAgZGF0YSA6IHtcbiAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGFbaV0uY2F0UHJvZHVpdCk7XG4gICAgICAgICAgICAgICBpZihkYXRhW2ldLnZlbmR1PT0xKXtcbiAgICAgICAgICAgICAgIHZhciB2b2lyID0gXCI8ZGl2IGNsYXNzPSdwcm9kdWl0IFwiICsgZGF0YVtpXS5jYXRQcm9kdWl0ICsgXCInIGRyYWdnYWJsZT0ndHJ1ZScgaWQ9J1wiKyBkYXRhW2ldLmNhdFByb2R1aXQrZGF0YVtpXS5pZCArICBcIicgZGF0YS1jYXQ9J1wiICsgZGF0YVtpXS5jYXRQcm9kdWl0ICsgXCInIGRhdGEtbm9tPSdcIiArIGRhdGFbaV0ubm9tICsgXCInIGRhdGEtcHJpeD0nXCIgKyBkYXRhW2ldLnByaXggKyBcIicgIGRhdGEtZGVzY3JpcHRpb249J1wiICsgZGF0YVtpXS5kZXNjcmlwdGlvbiArIFwiJz5cIjtcbiAgICAgICAgICAgICAgIHZvaXIgKz0gXCI8cD5cIiArIGRhdGFbaV0ubm9tICsgIFwiPC9wPlwiO1xuICAgICAgICAgICAgICAgdm9pciArPSBcIjwvZGl2PlwiO1xuICAgICAgICAgICAgICAgJChcIiNpY2lcIikuYXBwZW5kKHZvaXIpOyAgXG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB2b2lyID0gXCI8ZGl2IGNsYXNzPSdwcm9kdWl0IFwiICsgZGF0YVtpXS5jYXRQcm9kdWl0ICsgXCInIGRyYWdnYWJsZT0ndHJ1ZScgaWQ9J1wiKyBkYXRhW2ldLmNhdFByb2R1aXQrZGF0YVtpXS5pZCArICBcIicgZGF0YS1jYXQ9J1wiICsgZGF0YVtpXS5jYXRQcm9kdWl0ICsgXCInIGRhdGEtbm9tPSdcIiArIGRhdGFbaV0ubm9tICsgXCInIGRhdGEtcHJpeD0nXCIgKyBkYXRhW2ldLnByaXggKyBcIicgIGRhdGEtZGVzY3JpcHRpb249J1wiICsgZGF0YVtpXS5kZXNjcmlwdGlvbiArIFwiJz5cIjtcbiAgICAgICAgICAgICAgICB2b2lyICs9IFwiPHA+XCIgKyBkYXRhW2ldLm5vbSArICBcIjwvcD5cIjtcbiAgICAgICAgICAgICAgICB2b2lyICs9IFwiPC9kaXY+XCI7XG4gICAgICAgICAgICAgICAgJChcIiNcIiArIGRhdGFbaV0uY2F0UHJvZHVpdCkuYXBwZW5kKHZvaXIpO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgXG4gICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pXG59XG5wdXRJbkJkZChjYXRQcm9kdWl0OnN0cmluZywgdmVuZGV1cklkOm51bWJlciwgcHJpeDpudW1iZXIsIG5vbTpzdHJpbmcsIGRlc2NyaXB0aW9uOnN0cmluZyl7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsIDogXCJodHRwOi8vbG9jYWxob3N0Ojg4ODgvQmRkVmluL25ld3Byb2R1aXRcIixcbiAgICAgICAgbWV0aG9kIDogXCJwb3N0XCIsXG4gICAgICAgIGRhdGFUeXBlIDogXCJqc29uXCIsXG4gICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICBjYXRQcm9kdWl0OiBjYXRQcm9kdWl0LFxuICAgICAgICAgICAgdmVuZGV1cklkOiB2ZW5kZXVySWQsXG4gICAgICAgICAgICBwcml4OnByaXgsXG4gICAgICAgICAgICBub206bm9tLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ZGVzY3JpcHRpb25cblxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTsgXG4gICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICAkKFwiI3ByaXhcIikuaHRtbChcIlwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI25vbXZpblwiKS5odG1sKFwiXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjZGVzY3JpcHRpb25cIikuaHRtbChcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbmNvbnRyb2xlTm9tKG5vbTphbnksIG1kcDphbnksIGFwcDogQXBwKXtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmwgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9CZGRWaW4vbG9naW5cIixcbiAgICAgICAgbWV0aG9kIDogXCJwb3N0XCIsXG4gICAgICAgIGRhdGFUeXBlIDogXCJqc29uXCIsXG4gICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICBub206IG5vbSxcbiAgICAgICAgICAgIG1kcDogbWRwXG4gICAgICAgIH0sXG4gICAgICAgIHN1Y2Nlc3MgOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihkYXRhKXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGRhdGEuYWRtaW49PXRydWUpe1xuICAgICAgICAgICAgICAgICAgICAkKFwiI25vbVwiKS52YWwoXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICQoXCIjcHdkXCIpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJBcHBseSBkZXN0aW7DqWUgYXUgdmVuZGV1ciwgbCdhZG1pbiBuJ2EgYWNjw6lzIHF1J2F1IHRyYXZlcnMgZHUgc2l0ZSBlbiBsaWduZVwiKTsgXG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoZGF0YS5ub20gIT0gXCJhZG1pblwiKXtcbiAgICAgICAgICAgICAgICAkKFwiLm5vbTFcIikuZmFkZU91dChcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjbG9naW5cIikuZmFkZU91dChcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjZ2xvYmFsXCIpLmZhZGVJbihcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjbG9nb3V0XCIpLmZhZGVJbihcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAgICAgICAgICQoXCIjZGlzcG9cIikuY3NzKFwiZGlzcGxheVwiLFwiZmxleFwiKTtcbiAgICAgICAgICAgICAgICAkKFwiI3RpdHJlXCIpLmh0bWwoZGF0YS5ub20pO1xuICAgICAgICAgICAgICAgICQoXCIjbWVzdmVudGVzXCIpLmZhZGVJbihcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAgICAgICAgIGFwcC52ZW5kZXVyID0gbmV3IFZlbmRldXIoKTtcbiAgICAgICAgICAgICAgICBhcHAudmVuZGV1ci5zZXRWZW5kZXVyKGRhdGEubm9tKTtcbiAgICAgICAgICAgICAgICBhcHAudmVuZGV1ci5zZXRWZW5kZXVySWQoZGF0YS5pZFZlbmRldXIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGFwcC52ZW5kZXVyKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGFwcC52ZW5kZXVyLmxvYWRQYWdlVmVuZGV1cigpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBhbGVydChcIlVuIGVycmV1ciBkYW5zIHZvdHJlIGxvZ2luXCIpO1xuICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yIDogZnVuY3Rpb24oIGVycm9yKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuYWpvdXRWZW50ZShpdGVtOm51bWJlciwgdmVuZGV1cklkOm51bWJlciwgdmVuZHU6bnVtYmVyKXtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmwgOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODg4OC9CZGRWaW4vYWRkVG9WZW5kb3JcIixcbiAgICAgICAgbWV0aG9kIDogXCJwb3N0XCIsXG4gICAgICAgIGRhdGFUeXBlIDogXCJqc29uXCIsXG4gICAgICAgIGRhdGEgOiB7XG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxuICAgICAgICAgICAgdmVuZGV1cklkOiB2ZW5kZXVySWQsXG4gICAgICAgICAgICB2ZW5kdTp2ZW5kdVxuICAgICAgICB9LFxuICAgICAgICBzdWNjZXNzIDogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgOiBmdW5jdGlvbiggZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9XG4gICAgfSlcbn1cbn1cblxuIiwiaW1wb3J0IHsgQ29udHJvbGVCZGQgfSBmcm9tIFwiLi9Db250cm9sZUJkZFwiO1xuZXhwb3J0IGNsYXNzIFZlbmRldXJ7XG4gICAgcHVibGljIHZlbmRldXIgOiBzdHJpbmc7XG4gICAgcHVibGljICR2ZW5kZXVySWQgOiBudW1iZXI7XG4gICAgcHVibGljICRtZHAgOiBzdHJpbmc7XG4gICAgcHVibGljICRWZW5kb3JTYWxlcyA6IEFycmF5PGFueT47XG4gICAgcHVibGljICR2ZW50ZSA6IEFycmF5PGFueT47XG5cblxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRWZW5kb3JTYWxlcyA9IFtdO1xuICAgICAgICB0aGlzLiR2ZW50ZSA9IFtdO1xuICAgICAgICAgICAgXG4gICAgfVxuICAgIHNldFZlbmRldXIodmVuZGV1cjpzdHJpbmcpe1xuICAgICAgICB0aGlzLnZlbmRldXIgPSB2ZW5kZXVyO1xuICAgIH1cbiAgICBnZXRWZW5kZXVyKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnZlbmRldXI7XG4gICAgfVxuXG4gICAgc2V0VmVuZGV1cklkKGlkOm51bWJlcil7XG4gICAgICAgIHRoaXMuJHZlbmRldXJJZCA9IGlkO1xuICAgIH1cblxuICAgIGdldFZlbmRldXJJZCgpe1xuICAgICAgICByZXR1cm4gdGhpcy4kdmVuZGV1cklkO1xuICAgICAgICBcbiAgICB9XG4gICAgc2V0TWRwKG1kcDogc3RyaW5nKXtcbiAgICAgICAgdGhpcy4kbWRwID0gbWRwO1xuICAgIH1cblxuICAgIGdldE1kcCgpe1xuICAgICAgICByZXR1cm4gdGhpcy4kbWRwO1xuICAgIH1cblxuICAgIGFkZFNhbGUoaXRlbTogbnVtYmVyKXsgXG4gICAgICAgIHZhciBjb250cm9sZWJkZDpDb250cm9sZUJkZCA9IG5ldyBDb250cm9sZUJkZCgpO1xuICAgICAgICB2YXIgdmVuZHUgPSAxO1xuICAgICAgICB2YXIgdmVudGU6YW55ID0gY29udHJvbGViZGQuYWpvdXRWZW50ZShpdGVtLCB0aGlzLiR2ZW5kZXVySWQsIHZlbmR1KTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3VwVmVudGUoaXRlbTogbnVtYmVyKXtcbiAgICAgICAgdmFyIGNvbnRyb2xlYmRkOkNvbnRyb2xlQmRkID0gbmV3IENvbnRyb2xlQmRkKCk7XG4gICAgICAgIHZhciB2ZW5kdSA9IDA7XG4gICAgICAgIHZhciB2ZW50ZTphbnkgPSBjb250cm9sZWJkZC5ham91dFZlbnRlKGl0ZW0sIHRoaXMuJHZlbmRldXJJZCwgdmVuZHUpO1xuICAgIH1cbiAgICBsb2FkUGFnZVZlbmRldXIoKXtcbiAgICAgICAgJChcIiNpY2lcIikuaHRtbChcIlwiKTtcbiAgICAgICAgJChcIi5jYXRlZ29yaWVcIikuaHRtbChcIlwiKTtcbiAgICAgICAgdmFyIGNvbnRyb2xlYmRkOkNvbnRyb2xlQmRkID0gbmV3IENvbnRyb2xlQmRkKCk7XG4gICAgICAgIHZhciB2ZW50ZTphbnkgPSBjb250cm9sZWJkZC5jaGVyY2hlclZlbnRlKHRoaXMuJHZlbmRldXJJZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHZlbmRldXJJZCk7XG4gICAgICAgICQoXCIjaWNpMVwiKS5odG1sKFwiTm9tIGR1IHZlbmRldXI6IFwiICsgdGhpcy52ZW5kZXVyKTtcbiAgICB9XG4gICAgIGNvbnRyb2xlVmVuZGV1clNlbGVjdGlvbm5lcigpe1xuICAgIFxuICAgICAgICAvLyBpZih0aGlzLiR2ZW5kZXVySWQpe1xuXG4gICAgICAgIC8vICAgICByZXR1cm4gdGhpcy4kdmVuZGV1cklkO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICByZXR1cm4gXCJQYXMgYm9uXCI7XG4gICAgICAgIC8vIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgXG4gICAgfVxuICAgIFxuICAgIFxuICAgIFxuICAgIFxufVxuIiwiaW1wb3J0IHsgVmVuZGV1ciB9IGZyb20gXCIuL1ZlbmRldXJcIjtcbmltcG9ydCB7IE5ld0FkZCB9IGZyb20gXCIuL05ld0FkZFwiO1xuXG5leHBvcnQgY2xhc3MgQXBwIHtcblxuICAgIHB1YmxpYyAkaXRlbTogSlF1ZXJ5O1xuICAgIHB1YmxpYyAkY29udGFpbmVyOiBKUXVlcnk7XG4gICAgcHVibGljIHZlbmRldXI6IFZlbmRldXI7XG4gICAgcHVibGljIG5ld2FkZDogTmV3QWRkO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy4kaXRlbSA9ICQoXCIucHJvZHVpdFwiKTtcbiAgICAgICAgdGhpcy4kaXRlbS5wcm9wKFwiZHJhZ2dhYmxlXCIsIHRydWUpO1xuICAgICAgICB0aGlzLiRjb250YWluZXIgPSAkKFwiLmNvbnRlbmV1clwiKTtcbiAgICB9XG5cblxufSIsImltcG9ydCB7IEFwcCB9IGZyb20gXCIuL0FwcFwiO1xuaW1wb3J0IHsgTmV3QWRkIH0gZnJvbSBcIi4vTmV3QWRkXCI7XG5pbXBvcnQgeyBWZW5kZXVyIH0gZnJvbSBcIi4vVmVuZGV1clwiO1xuaW1wb3J0IHsgQ29udHJvbGVCZGQgfSBmcm9tIFwiLi9Db250cm9sZUJkZFwiO1xudmFyIGFwcDpBcHAgPSBuZXcgQXBwKCk7XG5hcHAudmVuZGV1cj0gbmV3IFZlbmRldXIoKTtcbmFwcC5uZXdhZGQgPSBuZXcgTmV3QWRkKCk7XG52YXIgY29udHJvbGViZGQ6Q29udHJvbGVCZGQgPSBuZXcgQ29udHJvbGVCZGQoKTtcbnZhciAkY29udGFpbmVyOmFueTtcbiQoXCIjYmxhbmNcIikuaHRtbChcIlwiKTtcbiQoXCIjcm9zZVwiKS5odG1sKFwiXCIpO1xuJChcIiNyb3VnZVwiKS5odG1sKFwiXCIpO1xuJChcIi5ub20xXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkaWRWZW5kZXVyID0gJCh0aGlzKS5kYXRhKFwiaWRcIik7IFxuICAgICAgICB2YXIgdmVuZGV1cm5hbWU9ICQodGhpcykuYXR0cihcImlkXCIpICBcbiAgICAgICAgLy9jb25zb2xlLmxvZygkaWRWZW5kZXVyICsgXCIgXCIgKyB2ZW5kZXVybmFtZSk7XG4gICAgICAgICRjb250YWluZXI9XCJcIjtcbiAgICAgICAgYXBwLm5ld2FkZC5zZXRWZW5kZXVySWQoJGlkVmVuZGV1cik7XG4gICAgICAgIGFwcC52ZW5kZXVyLnNldFZlbmRldXJJZCgkaWRWZW5kZXVyKTtcbiAgICAgICAgYXBwLnZlbmRldXIuc2V0VmVuZGV1cih2ZW5kZXVybmFtZSk7XG4gICAgICAgICQoXCIuY2F0ZWdvcmllXCIpLmh0bWwoXCJcIik7XG4gICAgICAgIGFwcC52ZW5kZXVyLmxvYWRQYWdlVmVuZGV1cigpO1xuICAgICAgICBcbn0pXG5cbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5hZGRXaW5lXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRpZFZlbmRldXIgPSAkKHRoaXMpLmRhdGEoXCJpZFwiKTtcbiAgICAgICAgdmFyIHVuVmVuZGV1ciA9IGFwcC5uZXdhZGQuZ2V0VmVuZGV1cklkKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKHVuVmVuZGV1cik7XG4gICAgICAgIHZhciBjYXQgPSAkKHRoaXMpLmRhdGEoXCJjYXRcIik7XG4gICAgICAgIGFwcC5uZXdhZGQuc2V0Q2F0KGNhdCk7XG4gICAgICAgIGlmKHVuVmVuZGV1cil7XG4gICAgICAgICAgICAgICAgJChcIiNkZXNjcmlwdFZpblwiKS5jc3MoXCJkaXNwbGF5XCIsXCJmbGV4XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIG4nYXZleiBwYXMgc2VsZWN0aW9ubsOpIGRlIHZlbmRldXJcIiApO1xuICAgICAgICB9XG59KVxuXG5cbiQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi52YWxpZFdpbmVcIixmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJHYgPSBhcHAubmV3YWRkLmdldFZlbmRldXJJZCgpXG4gICAgICAgICQoXCIjZGVzY3JpcHRWaW5cIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgaWYoJHYpe1xuICAgICAgICB2YXIgY2F0ID0gYXBwLm5ld2FkZC5nZXRDYXQoKTtcbiAgICAgICAgdmFyIHByaXggPSAkKFwiI3ByaXhcIikudmFsKCkgYXMgbnVtYmVyO1xuICAgICAgICB2YXIgbm9tID0gJChcIiNub212aW5cIikudmFsKCkgYXMgc3RyaW5nO1xuICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbCgpIGFzIHN0cmluZztcbiAgICAgICAgYXBwLm5ld2FkZC5hZGROZXdXaW5lKGNhdCwgJHYsIHByaXgsIG5vbSwgZGVzY3JpcHRpb24pO1xuICAgICAgICBhcHAudmVuZGV1ci5sb2FkUGFnZVZlbmRldXIoKTtcbiAgICAgICAgJChcIiNwcml4XCIpLnZhbChcIlwiKTtcbiAgICAgICAgJChcIiNub212aW5cIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI2Rlc2NyaXB0aW9uXCIpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiVm91cyBuJ2F2ZXogcGFzIHNlbGVjdGlvbm7DqSBkZSB2ZW5kZXVyXCIgKTtcbiAgICAgICAgfVxufSlcblxuYXBwLiRjb250YWluZXIub24oXCJkcmFnb3ZlclwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cblxuJChkb2N1bWVudCkub24oXCJkcmFnc3RhcnRcIixcIi5wcm9kdWl0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgY29uc3QgZHJhZ0V2ZW50OiBEcmFnRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50IGFzIERyYWdFdmVudDtcbiAgICAgICAgZHJhZ0V2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKCBcImlkXCIsICQodGhpcykuYXR0cihcImlkXCIpICk7XG4gICAgICAgIGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSggXCJvcmlnaW5cIiwgJCh0aGlzKS5wYXJlbnQoKS5hdHRyKFwiaWRcIikgKTtcblxufSk7XG5cbmFwcC4kY29udGFpbmVyLm9uKFwiZHJvcFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGNvbnN0IGRyYWdFdmVudDogRHJhZ0V2ZW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XG4gICAgICAgIHZhciB1blZlbmRldXIgPSBhcHAudmVuZGV1ci5jb250cm9sZVZlbmRldXJTZWxlY3Rpb25uZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGlmKHVuVmVuZGV1cil7XG4gICAgICAgIHZhciBpZCA9IGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSggXCJpZFwiICk7XG4gICAgICAgIHZhciBpZG9yaWdpbiA9IGRyYWdFdmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YSggXCJvcmlnaW5cIiApO1xuICAgICAgICB2YXIgYSA9ICQodGhpcykuZGF0YShcImNhdFwiKTtcbiAgICAgICAgdmFyIGIgPSAkKCBcIiNcIitpZCApLmRhdGEoXCJjYXRcIik7XG4gICAgICAgIHZhciBpZFZpbiA9IHBhcnNlSW50KGlkLnJlcGxhY2UoLyhbXlxcZF0qKS8sICcnKSk7XG4gICAgICAgIGlmKGIgPT0gYSB8fCBhID09IFwiYWxsXCIpe1xuICAgICAgICB2YXIgJGN1cnJlbnRJdGVtID0gJCggXCIjXCIraWQgKTtcbiAgICAgICAgdmFyICRvcmlnaW4gPSAkKFwiI1wiK2lkb3JpZ2luKTtcbiAgICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMpO1xuICAgICAgICAkY29udGFpbmVyLmFwcGVuZCggJGN1cnJlbnRJdGVtICk7XG4gICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgaWYoYSA9PSBcImFsbFwiKXtcbiAgICAgICAgICAgICAgICB2YXIgdmVudGUgPSBhcHAudmVuZGV1ci5hZGRTYWxlKGlkVmluKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGEgPT0gYil7XG4gICAgICAgICAgICAgICAgdmFyIHZlbnRlID0gYXBwLnZlbmRldXIuc3VwVmVudGUoaWRWaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAkKFwiI2ljaTFcIikuaHRtbChcIlBhcyBkZSB2ZW5kZXVyIHNlbGVjdGlvbm5lclwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbn0pO1xuXG5cbiQoXCIjVmFsaWRMb2dpblwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbm9tOmFueSA9ICQoXCIjbm9tXCIpLnZhbCgpO1xuICAgICAgICB2YXIgbWRwOmFueSA9ICQoXCIjcHdkXCIpLnZhbCgpO1xuICAgICAgICBjb250cm9sZWJkZC5jb250cm9sZU5vbShub20sIG1kcCwgYXBwKTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgXG59KVxuJChcIiNsb2dvdXRcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIiNsb2dpblwiKS5mYWRlSW4oXCJzbG93XCIsXCJzd2luZ1wiKTtcbiAgICAgICAgJChcIiN0aXRyZVwiKS5odG1sKFwiR0VTVElPTiBWRU5ERVVSIERFIFZJTlwiKTtcbiAgICAgICAgJChcIi5ub20xXCIpLmZhZGVPdXQoXCJzbG93XCIsXCJzd2luZ1wiKTtcbiAgICAgICAgJChcIiNsb2dvdXRcIikuZmFkZU91dChcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAkKFwiI2ljaTFcIikuZmFkZU91dChcInNsb3dcIixcInN3aW5nXCIpO1xuICAgICAgICAkKFwiLmFkZFdpbmVcIikuZmFkZUluKFwic2xvd1wiLFwic3dpbmdcIik7XG4gICAgICAgICQoXCIjZGlzcG9cIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKTtcbiAgICAgICAgJChcIiNub21cIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI3B3ZFwiKS52YWwoXCJcIik7XG4gICAgICAgICQoXCIjYmxhbmNcIikuaHRtbChcIlwiKTtcbiAgICAgICAgJChcIiNyb3NlXCIpLmh0bWwoXCJcIik7XG4gICAgICAgICQoXCIjbWVzdmVudGVzXCIpLmh0bWwoXCJcIik7XG4gICAgICAgICQoXCIjcm91Z2VcIikuaHRtbChcIlwiKTtcbiAgICAgICAgJChcIiNpY2lcIikuaHRtbChcIlwiKTtcbn0pXG4kKGRvY3VtZW50KS5vbihcIm1vdXNlb3ZlclwiLFwiLnByb2R1aXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8kKFwiLnB1dFNob3dcIikuaHRtbChcIlwiKTtcbiAgICAgICAgdmFyIG5vbSA9ICQodGhpcykuZGF0YShcIm5vbVwiKTtcbiAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gJCh0aGlzKS5kYXRhKFwiZGVzY3JpcHRpb25cIik7XG4gICAgICAgIHZhciBwcml4ID0gJCh0aGlzKS5kYXRhKFwicHJpeFwiKTtcbiAgICAgICAgdmFyIGNhdCA9ICQodGhpcykuZGF0YShcImNhdFwiKTtcbiAgICAgICAgc3dpdGNoIChjYXQpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJibGFuY1wiOlxuICAgICAgICAgICAgICAgIHZhciBiZ2MgPSBcInVybChpbWcvYmxhbmMucG5nKVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJyb3NlXCI6XG4gICAgICAgICAgICAgICAgdmFyIGJnYyA9IFwidXJsKGltZy9yb3NlLnBuZylcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicm91Z2VcIjpcbiAgICAgICAgICAgICAgICB2YXIgYmdjID0gXCJ1cmwoaW1nL3JvdWdlLnBuZylcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2hvd0Rlc2NyaXB0ID0gXCI8ZGl2IGNsYXNzPSdzaG93RGVzY3JpcHRpb24nPjxkaXYgaWQ9J3Nob3cnPjxoMSBpZD0ndGl0cmVTJz5cIiArIG5vbSArIFwiPC9oMT5cIjtcbiAgICAgICAgc2hvd0Rlc2NyaXB0ICs9IFwiPGRpdiBpZD0nYWJveCc+PHAgaWQ9J3RleHRlJz5cIiArIGRlc2NyaXB0aW9uICsgXCI8L3A+PC9kaXY+XCI7XG4gICAgICAgIHNob3dEZXNjcmlwdCArPSBcIjxoMyBpZD0nZGVjcmlwdCc+XCIgKyBwcml4ICsgXCLigqw8L2gzPjwvZGl2PlwiO1xuICAgICAgICAkKFwiLnB1dFNob3dcIikuYXBwZW5kKHNob3dEZXNjcmlwdCk7XG4gICAgICAgICQoXCIuc2hvd0Rlc2NyaXB0aW9uXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgYmdjKTtcbiAgICAgICAgLy8kKFwiLmNhdGVnb3JpZVwiKS5odG1sKFwiXCIpO1xuICAgICAgICAvL2FwcC52ZW5kZXVyLmxvYWRQYWdlVmVuZGV1cigpOyAgICAgICBcbn0pXG4kKGRvY3VtZW50KS5vbihcIm1vdXNlb3V0XCIsXCIucHJvZHVpdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAkKFwiLnB1dFNob3dcIikuaHRtbChcIlwiKTtcbn0pO1xuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
