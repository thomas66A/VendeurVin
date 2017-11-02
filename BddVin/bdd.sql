-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:8889
-- Généré le :  Mar 31 Octobre 2017 à 15:50
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `BddVin`
--

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id` int(11) NOT NULL,
  `produit` varchar(255) NOT NULL,
  `catProduit` varchar(255) NOT NULL,
  `vendeurId` int(11) NOT NULL,
  `vendu` int(11) NOT NULL,
  `prix` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Contenu de la table `produit`
--

INSERT INTO `produit` (`id`, `produit`, `catProduit`, `vendeurId`, `vendu`, `prix`, `nom`, `description`) VALUES
(5, 'vin', 'blanc', 2, 0, 12, 'Muscat de rivesaltes', 'Vin doux naturel. Idéal pour accompagner un dessert.'),
(6, 'vin', 'blanc', 2, 0, 5, 'Vin blanc sec', 'Pour accompagner un plat de fruit de mer.'),
(7, 'vin', 'rose', 2, 0, 3, 'Le ptit ros', 'Vin rosé de consommation courante.'),
(8, 'vin', 'rouge', 2, 1, 4, 'Le canon', 'Vin de pays, origine Le Roussillon.'),
(9, 'vin', 'blanc', 2, 0, 12, 'Petillant du soleil', 'Vin sec pétillant, avec de fines bulles.'),
(10, 'vin', 'blanc', 3, 0, 7, 'Blanc des sables', 'Vin sec, d\'origine catalane.'),
(11, 'vin', 'blanc', 3, 1, 12, 'Muscat de Lunuel', 'Vin doux naturel, très fruité.'),
(12, 'vin', 'rose', 3, 0, 12, 'Rosé des vents', 'Vin rosé très fruité, mais avec une certaine amertume, convient pour les plats de poisson.'),
(13, 'vin', 'rouge', 3, 0, 6, 'Rouge du roussillon', 'Un bon petit vin de pays.'),
(14, 'vin', 'rouge', 3, 0, 15, 'Le boisé', 'Grenache, vin doux naturel.'),
(15, 'vin', 'rouge', 3, 0, 5, 'Le canon du maréchal', 'Vin rouge de pays. Origine Pays catalan'),
(16, 'vin', 'rose', 3, 0, 2, 'Rosé rose', 'Petit vin rosé, bien sec.'),
(17, 'vin', 'rose', 3, 0, 2, 'Rosé rose', 'Petit vin rosé, bien sec.'),
(18, 'vin', 'blanc', 3, 1, 3, 'blanc sec', 'vin blanc.'),
(24, 'vin', 'blanc', 3, 0, 18, 'Muscat de Noel', 'Vin de fete, Pour reussir la nouvelle année'),
(25, 'vin', 'rose', 4, 0, 8, 'Rosé des sables', 'Un rosé digne des grands crus.'),
(26, 'vin', 'blanc', 4, 0, 4, 'Blanco', 'Un petit blanc sans prétention.'),
(27, 'vin', 'rose', 2, 1, 5, 'Rosé de Camargue', 'Vin muri au mistral'),
(28, 'vin', 'rouge', 4, 0, 18, 'Grenade Rouge', 'Vin doux naturel, à base de grenache.'),
(29, 'vin', 'blanc', 4, 0, 12, 'Muscat de Rivesaltes', 'Vin doux naturel, origine contrôlé'),
(30, 'vin', 'rose', 4, 0, 12, 'Rose bonbon', 'Vin avec une belle robe bien candie'),
(31, 'vin', 'rouge', 2, 0, 6, 'Le Canon du Marechal', 'Vin de pays. Origine Pays Catalan');

-- --------------------------------------------------------

--
-- Structure de la table `stockage`
--

CREATE TABLE `stockage` (
  `id` int(11) NOT NULL,
  `cat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `idVendeur` int(11) NOT NULL,
  `admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `mdp`, `idVendeur`, `admin`) VALUES
(1, 'admin', 'admin', 1, 1),
(2, 'vendeur2', 'vendeur2', 2, 0),
(3, 'vendeur3', 'vendeur3', 3, 0),
(4, 'vendeur4', 'vendeur4', 4, 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `stockage`
--
ALTER TABLE `stockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `stockage`
--
ALTER TABLE `stockage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;