-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 25 juil. 2022 à 00:28
-- Version du serveur : 8.0.28
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mon_p'ti_blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `comment` text NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `user_id`, `post_id`, `created_at`, `updated_at`) VALUES
(2, 'Tu t\'interesse aux artistes bretons maintenant?!:)', 14, 36, '2022-07-24 08:43:37', NULL),
(3, 'Je te le fais pas dire, à Vitry-sur-Seine oùu j\'habite, au 9ème étage, j\'ai 4 degrés en plus!!', 14, 14, '2022-07-24 08:45:09', NULL),
(4, 'Ha le bassin d\'arcachon, vraiment joli comme coin', 14, 9, '2022-07-24 08:45:50', NULL),
(5, 'Attention, tu vas finir par faire un élevage de chèvres:)', 14, 84, '2022-07-24 08:52:20', NULL),
(6, 'Passes à la maison pour débriefer!', 14, 37, '2022-07-24 09:13:05', NULL),
(7, 'Thibault écoutes ton père, pour une fois, haha!:)', 14, 40, '2022-07-24 09:14:02', NULL),
(8, 'Hâte de revenir en août!', 14, 80, '2022-07-24 09:15:53', NULL),
(9, 'Un peu gros comme chat!', 14, 81, '2022-07-24 09:16:26', NULL),
(10, 'Ha il est trop beau!', 15, 7, '2022-07-24 11:08:36', NULL),
(11, 'On arrive!!', 15, 15, '2022-07-24 11:10:07', NULL),
(12, 'Le tournage est en Ecosse brrrr!', 15, 25, '2022-07-24 11:11:24', NULL),
(13, 'Aie aie:)', 15, 52, '2022-07-24 11:13:11', NULL),
(14, 'Mais tu peins maintenant?!', 15, 91, '2022-07-24 11:16:00', NULL),
(15, 'Dans ma branche aussi, ils abusent!', 17, 20, '2022-07-24 11:21:24', NULL),
(16, 'Ils fait un peu froid quand même', 17, 30, '2022-07-24 11:22:12', NULL),
(17, 'Tiens je le connais pas celui-là', 17, 35, '2022-07-24 11:22:42', NULL),
(18, 'Splendide!', 17, 38, '2022-07-24 11:23:42', NULL),
(19, 'Whoua c\'était comment?!', 17, 47, '2022-07-24 11:24:15', NULL),
(20, 'Et oui, c\'est grâce à eux que tu peux jouer aux jeux vidéos', 17, 47, '2022-07-24 11:25:25', NULL),
(21, 'J\'espère que c\'est du Java', 17, 71, '2022-07-24 11:25:59', NULL),
(22, 'Je suis pas sûr qu\'il existe de litières adaptées en France...', 17, 83, '2022-07-24 11:27:05', NULL),
(23, 'J\'en suis!', 19, 13, '2022-07-24 11:29:54', NULL),
(24, 'C\'est àa l\'ancienne ton truk', 19, 35, '2022-07-24 11:31:08', NULL),
(25, 'Rhoo 20 ans de retard, fais du synthé!', 19, 36, '2022-07-24 11:31:42', NULL),
(26, 'J\'en pense que tu deviens capitaliste un ti peu là non?', 19, 42, '2022-07-24 11:32:28', NULL),
(27, 'Y\'a des gens payés pour ramasser non? Donc c\'est leur faute', 19, 44, '2022-07-24 11:33:11', NULL),
(28, 'On en reparle quand j\'aurai les moyens', 19, 45, '2022-07-24 11:33:36', NULL),
(29, 'Microsoft!! Pour jouer à Mount & Blade!', 19, 57, '2022-07-24 11:34:12', NULL),
(30, 'Mais tu vires vraiment nordiste!', 19, 70, '2022-07-24 11:36:25', NULL),
(31, 'Et voilà, un vrai geek!', 19, 71, '2022-07-24 11:37:01', NULL),
(32, 'Et beaucoup de bretons aussi!', 19, 78, '2022-07-24 11:37:53', NULL),
(33, 'Un chien de traineau maintenant, et puis quoi encore...', 19, 86, '2022-07-24 11:39:08', NULL),
(34, 'Présent!', 20, 12, '2022-07-24 11:40:42', NULL),
(35, 'Haha c\'est vrai qu\'il n\'y a pas de rubrique \'Jeux\'', 20, 16, '2022-07-24 11:41:44', '2022-07-24 12:32:25'),
(36, 'Je te vois bien dans les cages', 20, 48, '2022-07-24 12:36:31', NULL),
(37, 'Microsoft! Vive Rocket League!', 20, 57, '2022-07-24 12:38:05', NULL),
(38, 'On y sera l\'année prochaine', 20, 62, '2022-07-24 12:38:38', NULL),
(39, 'Souviens-toi comment tu as fini la dernière fois!', 20, 70, '2022-07-24 12:39:22', NULL),
(40, 'C\'est les bonnes résolutions', 20, 74, '2022-07-24 12:40:16', NULL),
(41, 'Mais la guiness c\'est surtout en Irlande', 20, 78, '2022-07-24 12:40:59', NULL),
(42, 'Cette histoire se terminera au pôle nord', 20, 86, '2022-07-24 12:41:53', NULL),
(43, 'Me manque un peu de mousse sous les aisselles', 20, 92, '2022-07-24 12:42:38', NULL),
(44, 'LOL', 22, 16, '2022-07-24 12:44:04', NULL),
(45, 'Ce soir jsuis dispo!', 22, 17, '2022-07-24 12:44:54', NULL),
(46, 'Moi!', 22, 27, '2022-07-24 12:45:50', NULL),
(47, 'Alors, tu veux nous quitter?', 22, 42, '2022-07-24 12:46:26', NULL),
(48, 'Jsuis bien d\'accord!', 22, 48, '2022-07-24 12:47:27', NULL),
(49, 'T\'es revenu de ton voyage?', 22, 62, '2022-07-24 12:48:09', NULL),
(50, 'Je connais quelqu\'un qui est trop doué, je pourrai te le présenter si tu veux', 22, 93, '2022-07-24 12:48:47', NULL),
(51, 'Je connais quelqu\'un!', 23, 10, '2022-07-24 12:49:58', NULL),
(52, 'Faut moins conduire, et utiliser plus le vélo', 23, 14, '2022-07-24 12:50:37', NULL),
(53, 'En avant pour les Gipsys', 23, 41, '2022-07-24 12:51:14', NULL),
(54, 'Cela ne va pas les empêcher de gagner toujours autant', 23, 46, '2022-07-24 12:51:54', NULL),
(55, 'Whouaa trop la classe!', 23, 93, '2022-07-24 12:52:20', NULL),
(56, 'Magnifique!', 24, 34, '2022-07-24 12:54:05', NULL),
(57, 'Beuurk', 24, 44, '2022-07-24 12:54:32', NULL),
(58, 'Tu comptes investir?', 24, 45, '2022-07-24 12:55:00', NULL),
(59, 'Il faut qu\'on vienne te voir!', 25, 8, '2022-07-24 12:57:45', NULL),
(60, 'Encore?!', 25, 20, '2022-07-24 12:59:18', NULL),
(61, 'Moi!', 25, 25, '2022-07-24 12:59:43', NULL),
(62, 'Mmm les bons p\'tis plats', 25, 51, '2022-07-24 13:02:37', NULL),
(63, 'Pas sûr que ça rentre dans la maison', 25, 89, '2022-07-24 13:03:58', NULL),
(64, 'Mais c\'est tout beau!', 25, 91, '2022-07-24 13:04:33', NULL),
(65, 'Trop compliqué pour moi!!', 27, 11, '2022-07-24 13:39:13', NULL),
(66, 'Faut que je me fasse un perso', 27, 12, '2022-07-24 13:40:09', NULL),
(67, 'C\'est bien Riff ça!', 27, 43, '2022-07-24 14:34:21', NULL),
(68, 'Ou bien des motifs arc en ciel', 27, 46, '2022-07-24 14:35:09', NULL),
(69, 'Et bien, que d\'ambitions!', 28, 42, '2022-07-24 14:39:55', NULL),
(70, 'Bien tous les deux!', 28, 57, '2022-07-24 14:41:26', NULL),
(71, 'Viens plutôt faire de la boxe avec moi!', 28, 71, '2022-07-24 14:42:28', NULL),
(72, 'On viens te voir après l\'entraînement mon chéri', 29, 17, '2022-07-24 14:50:02', NULL),
(73, 'Mais qu\'est-ce que c\'est quue cette histoire?', 30, 20, '2022-07-24 14:54:45', NULL),
(74, 'Sympa, à quand la démo?', 30, 21, '2022-07-24 14:55:23', NULL),
(75, 'Je veux bien son talent', 30, 25, '2022-07-24 14:56:06', NULL),
(76, 'J\'adore ce rendu!', 30, 54, '2022-07-24 14:57:19', NULL),
(77, 'C\'est trop beau ce point de vue, c\'est en Bretagne?', 31, 8, '2022-07-24 15:01:13', NULL),
(78, 'Il faut qu\'on s\'y retrouve un de ces quatre', 31, 9, '2022-07-24 15:02:07', NULL),
(79, 'C\'est mon personnage préféré dans Harry Potter', 31, 25, '2022-07-24 15:03:30', NULL),
(80, 'C\'est top!', 31, 55, '2022-07-24 15:04:58', NULL),
(81, 'On essaiera ça ensemble la prochaine fois:) Nous aussi ça nous tente', 31, 56, '2022-07-24 15:05:48', NULL),
(82, 'Mais tu es allé en Irlande récemment?', 31, 70, '2022-07-24 15:06:21', '2022-07-24 15:07:10'),
(83, 'Un peu gros quand même, pas sûr que je laisse Alice seul avec lui', 31, 89, '2022-07-24 15:08:53', NULL),
(84, 'Une sorte de joute générationnelle en quelque sorte', 32, 40, '2022-07-24 15:12:46', NULL),
(85, 'Attention au régime! :)', 32, 52, '2022-07-24 15:13:53', NULL),
(86, 'Fais nous rêver!', 32, 81, '2022-07-24 15:14:51', NULL),
(87, 'Whaouf!', 32, 89, '2022-07-24 15:15:31', NULL),
(88, 'Famille d\'artistes!', 32, 91, '2022-07-24 15:16:01', NULL),
(89, 'Aie désolé pour toi', 33, 20, '2022-07-24 21:43:14', NULL),
(90, 'Miam miam!', 33, 51, '2022-07-24 21:44:21', NULL),
(91, 'Mon péché mignon', 33, 52, '2022-07-24 21:44:47', NULL),
(92, 'Wow!!', 34, 20, '2022-07-24 21:57:10', NULL),
(93, 'Trop beau, je voudrai y être!!', 34, 55, '2022-07-24 22:01:17', NULL),
(94, 'La dernière fois on est allé voir du Monet, c\'était génial!', 34, 95, '2022-07-24 22:02:28', NULL),
(95, 'Les gars faut que j\'assiste à ça!', 35, 12, '2022-07-24 22:06:52', NULL),
(96, 'Quand tu es embauché ça serait bien que tu m\'arrange un créneau pour tourner sur les lieux:)', 35, 42, '2022-07-24 22:09:13', NULL),
(97, 'Dans le futur il fera bon d\'être ingénieur IA ou programmeur', 36, 29, '2022-07-24 22:44:01', NULL),
(98, 'Je viens d\'acheter ma maison en Côtes d\'Armor, il faut que tu viennes me voir, tu me fera écouter du Didier Squiban', 36, 35, '2022-07-24 22:46:00', NULL),
(99, 'Je te l\'assure, c\'est déjà le cas!', 36, 60, '2022-07-24 22:48:35', NULL),
(100, 'Encore une entreprise qui est aspirée par la sphère capitalistique', 37, 58, '2022-07-24 22:51:23', NULL),
(101, 'Je savais pas que tu aimais les chiens:)', 37, 86, '2022-07-24 22:52:34', NULL),
(102, 'La Bretagne ça vous gagne', 38, 36, '2022-07-24 23:02:05', NULL),
(103, 'Haha Simba contre Rafiki!', 38, 40, '2022-07-24 23:04:00', NULL),
(104, 'Toi t\'es un vrai!', 38, 70, '2022-07-24 23:04:34', NULL),
(105, 'Thibault le codeur fou', 38, 71, '2022-07-24 23:05:46', NULL),
(106, 'Et du soleil, contrairement à skon dit', 38, 78, '2022-07-24 23:06:20', NULL),
(107, 'C\'est top, bravo Bernard!', 38, 91, '2022-07-24 23:06:58', NULL),
(108, 'C\'est quand qu\'on se voit?', 39, 16, '2022-07-24 23:09:51', NULL),
(109, 'C\'est quand qu\'on te voit sur un terrain?:)', 39, 48, '2022-07-24 23:10:59', NULL),
(110, 'Ce qu\'il produit est superbe!', 40, 35, '2022-07-24 23:13:04', NULL),
(111, 'Quelle fluidité, et quel phrasé dans son jeu!', 40, 36, '2022-07-24 23:14:02', NULL),
(112, 'Je finis ma formation et je postule!', 40, 69, '2022-07-24 23:15:02', NULL),
(113, 'Merci pour l\'info en tout cas!', 40, 69, '2022-07-24 23:15:17', NULL),
(114, 'Penses à t\'aérer tout de même', 40, 71, '2022-07-24 23:16:00', NULL),
(115, 'Elle me fait toujours autant rire cette photo', 41, 32, '2022-07-24 23:17:39', NULL),
(116, 'J\'adore ce joueur!', 41, 65, '2022-07-24 23:19:10', NULL),
(118, 'Je me suis tout de suite dis : \'ça c\'est pour Arnault\' XD', 41, 69, '2022-07-24 23:20:13', NULL),
(119, 'J\'avoue mdr', 42, 32, '2022-07-24 23:23:49', NULL),
(120, 'LOL bonne soif!', 42, 70, '2022-07-24 23:24:55', NULL),
(121, 'T\'es fouu', 42, 71, '2022-07-24 23:25:20', NULL),
(122, 'Il est trop choupi', 42, 90, '2022-07-24 23:26:01', NULL),
(123, 'Ho ça te fera pas de mal :)', 43, 74, '2022-07-24 23:27:49', NULL),
(124, 'Sublime!!', 44, 36, '2022-07-24 23:29:41', NULL),
(125, 'Bon courage, ça a l\'air passionnant', 44, 66, '2022-07-24 23:30:22', NULL),
(126, 'Faudra également que j\'y pense mdr', 44, 74, '2022-07-24 23:31:06', NULL),
(127, 'Mais il faut déjà que tu t\'occupes de Yo!', 44, 85, '2022-07-24 23:32:43', NULL),
(128, 'Ha prépares toi bien!', 46, 71, '2022-07-24 23:34:48', NULL),
(129, 'Très joli ville', 47, 68, '2022-07-24 23:37:20', NULL),
(130, 'Il a déjà l\'air plus commode que celui que tu as chez toi:)', 48, 7, '2022-07-24 23:39:30', NULL),
(131, 'Treès belles photos', 48, 9, '2022-07-24 23:40:13', NULL),
(132, 'Whouhou y\'en a qui s\'amusent', 48, 11, '2022-07-24 23:40:57', NULL),
(133, 'lol', 48, 28, '2022-07-24 23:41:38', NULL),
(134, 'En plus c\'est souvent codé en python, spécial serpentard dédidace', 48, 29, '2022-07-24 23:42:35', NULL),
(135, 'Match très sérré je présume', 48, 42, '2022-07-24 23:44:34', NULL),
(136, 'Linux?', 48, 57, '2022-07-24 23:45:21', NULL),
(137, 'Fallait un arbitre pour départager:)', 48, 57, '2022-07-24 23:45:46', NULL),
(138, 'Mmm il faut être inventif si tu veux qu\'ils te gardent', 48, 58, '2022-07-24 23:46:18', NULL),
(139, 'Passage obligé à mon avis', 48, 59, '2022-07-24 23:47:02', NULL),
(140, 'Merci de penser à nous', 48, 62, '2022-07-24 23:48:04', NULL),
(141, 'On verra bien!! Sacré Elon Musk', 48, 67, '2022-07-24 23:49:49', NULL),
(142, 'Nat et ses chats!', 49, 7, '2022-07-25 00:17:29', NULL),
(143, 'Gourmand va!', 49, 73, '2022-07-25 00:19:21', NULL),
(144, 'Ho non mais c\'est quoi ce truc!', 49, 82, '2022-07-25 00:19:58', NULL),
(145, 'Courage, on débriefera après', 50, 37, '2022-07-25 00:22:20', NULL),
(146, 'Haha soulard!', 50, 70, '2022-07-25 00:23:10', NULL),
(147, 'Ouai ben regardes celui que t\'as chez toi, c\'est le même haha', 50, 82, '2022-07-25 00:24:06', NULL),
(148, 'Mon chien n\'en fait qu\'une bouchée', 51, 88, '2022-07-25 00:27:23', NULL),
(149, 'Ho that is very faboulous', 51, 91, '2022-07-25 00:28:21', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `youtube_id` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `title`, `youtube_id`, `description`, `link`, `tag`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Post de bienvenue', NULL, 'Bonjour tout le monde, en tant qu\'administrateur de ce site je vous souhaite une très bonne expérience en terme d\'échanges et de bienveillance les uns envers les autres', NULL, 'Divers', 1, '2022-07-23 12:26:44', NULL),
(2, 'Modération', NULL, 'En tant qu\'administrateur de ce site je serai vigilant à tout manque de respect, je vous demande donc de faire preuve de respect les uns envers les autres', NULL, 'Divers', 1, '2022-07-23 12:28:44', NULL),
(3, 'Mettre un tag à son post', NULL, 'Même si cela n\'est pas obligatoire vous pouvez mettre un tag à chacun de vos posts car de cette manière cela permet aux utilisateurs de pouvoir les filtrer et donc de ne consulter que les posts associés aux tag sélectionné. Si vous ne sélectionnez aucun tag le post se verra alors associé automatiquement au tag \'Divers\'', NULL, 'Divers', 1, '2022-07-23 12:32:47', NULL),
(4, 'Taille pour vos images', NULL, 'Je tiens à vous prévenir que la taille maximale pour chacune de vos images sera de 200 ko', NULL, 'Divers', 1, '2022-07-23 12:40:32', '2022-07-23 13:20:14'),
(7, 'Mon prochain chat', NULL, 'Tellement préssé, n\'hésitez pas à me dire ce que vous en pensez', NULL, 'Animaux', 14, '2022-07-23 14:39:10', NULL),
(8, 'Voici la Pointe du Groin', '3_9OSYJEp3Q', 'Tellement magnifique, quel pittoresque!', NULL, 'Nature', 15, '2022-07-23 14:45:28', '2022-07-24 21:28:40'),
(9, 'Manger des huîtres au Cap Ferret', NULL, 'Le Cap ferret c\'est pas mal non plus, on est bien avec cette environnante et toutes ces pistes cyclables.', NULL, 'Ville', 17, '2022-07-23 14:51:42', '2022-07-23 14:52:18'),
(10, 'Qui veut louer un Fender', 'LLiQQRxacSI', 'Instrument de concert utilisée beaucoup pour le rendu professionnel. Le tarif à la location est de 100 euros la journée', 'https://www.thomann.de/fr/fender_guitares_electroniques.html', 'Art', 19, '2022-07-23 14:57:20', NULL),
(11, 'Algorythme avance et arbres binaire', 'fAAZixBzIAI', 'Travail sur les arbres binaires avec la récursivité', NULL, 'Informatique', 20, '2022-07-23 15:01:09', NULL),
(12, 'On se réveille les gars!! Préparez vos fiches!!', NULL, 'Je vous préviens que je serai sans pitié durant cette session de jeu gnarkgnark.', NULL, 'Divers', 22, '2022-07-23 15:04:14', NULL),
(13, 'Jam ce soir', NULL, 'Yo les gars, on va jammer ce soir?! RDV 20h au Baratin!', NULL, 'Art', 23, '2022-07-23 15:07:25', NULL),
(14, 'Mais quelle chaleur', NULL, 'Quelqu\'un pourrait me dire pourquoi il fait aussi chaud?', NULL, 'Ecologie', 24, '2022-07-23 15:09:38', NULL),
(15, 'Souillac en famille', NULL, 'Bonne retrouvaille en famille dans le sud ouest', NULL, 'Divers', 25, '2022-07-23 15:13:23', NULL),
(16, 'Session de Sea of Thieves', 'LyciAuYCrB4', 'Je vais pas mettre ce post dans la catégorie \'Informatique\' franchement', NULL, 'Divers', 27, '2022-07-23 15:16:52', NULL),
(17, 'On va boxer ce soir?', NULL, 'Qui m\'accompagne pour boxer à Place d\'italie?', NULL, 'Sport', 28, '2022-07-23 15:20:46', NULL),
(18, 'Petite salade chinoise', NULL, 'Miam miam', NULL, 'Cuisine', 29, '2022-07-23 15:22:54', NULL),
(19, 'Petite église en islande', NULL, 'Magnifique, ça donne envie d\'y aller', NULL, 'Divers', 30, '2022-07-23 15:28:49', '2022-07-24 21:32:40'),
(20, 'Baisse de salaire chez AlloCine', NULL, 'Mais c\'est vraiment la crise là?!', NULL, 'Entreprise', 31, '2022-07-23 15:30:29', NULL),
(21, 'Super tuto de graphisme', 'xLnW8Ii-Gq8', 'Si vous n\'osez toujours pas vous lancer je vous le recommande fortemment!', NULL, 'Informatique', 32, '2022-07-23 15:32:41', NULL),
(25, 'Qui aime Hermione dans le film Harry Potter', NULL, 'J\'adore ce personnage!!', NULL, 'Divers', 32, '2022-07-23 15:39:56', NULL),
(26, 'Ma famille, ma vie', NULL, 'Quel bonheur d\'être avec mes enfants', NULL, 'Divers', 34, '2022-07-23 15:41:52', NULL),
(27, 'Qui est chaud pour une partie de warhammer?', NULL, 'Cet aprem chez moi pour environ 15h...', NULL, 'Divers', 35, '2022-07-23 15:43:32', NULL),
(28, 'J\'essaie de trouver la voie du régime', NULL, 'Aidez-moi de grâce', NULL, 'Cuisine', 36, '2022-07-23 15:45:16', NULL),
(29, 'Mais quand je pense qu\'un jour les machines remplaceront surement les gens', NULL, 'Ils veulent nous monter les uns contre les autres, créer un revenu universel peu élevé et empêcher les ascensions individuelles', NULL, 'Informatique', 37, '2022-07-23 15:48:16', NULL),
(30, 'Poudlard pour faire ses études', NULL, 'Qu\'est-ce que j\'aimerai renaître pour vivre ça', NULL, 'Divers', 38, '2022-07-23 16:01:05', NULL),
(31, 'L\'Ecosse', NULL, 'Quel voyage!', NULL, 'Nature', 39, '2022-07-23 16:03:29', NULL),
(32, 'Un exemple pour nous tous', '6pImiQAvLwE', 'Ha il est beau notre président', NULL, 'Politique', 40, '2022-07-23 16:11:28', NULL),
(33, 'Quelle photographie incroyable', NULL, 'Je tiens à honorer les photographes professionnels car il faut tout de même beaucoup d\'abnégation pour obtenir des clichés pareils', NULL, 'Nature', 41, '2022-07-23 16:14:26', NULL),
(34, 'Photo panorama', NULL, 'Celle-ci aussi Stéphane!', NULL, 'Nature', 14, '2022-07-23 16:16:06', NULL),
(35, 'Un de mes pianistes préférés: Didier Squiban', 'GbgbuAdkphU', 'Très breton, très jazz également, des fois on touche la perfection', NULL, 'Art', 48, '2022-07-23 16:21:58', NULL),
(36, 'Erwan Menguy: très grand flûtiste breton', 's2OsJzotquc', 'Fluide, souple, poétique...fabuleux. Il faut regarder Egon', NULL, 'Art', 48, '2022-07-23 16:23:43', NULL),
(37, 'Trop de patient aux urgences pour cas covid', NULL, 'C\'est un truc de fou, on a même plus le temps de prendre de pause, mais combien de temps cela va t\'il durer?!', NULL, 'Science', 49, '2022-07-23 16:27:02', NULL),
(38, 'Ciel étoilé splendide', NULL, 'J\'ai passé ma soirée à contempler le ciel avec mon mini téléscope', NULL, 'Science', 50, '2022-07-23 16:29:05', NULL),
(39, 'Les océans coulent sous le plastique', NULL, 'Mais quand est-ce qu\'on arrêtera ça!', NULL, 'Science', 15, '2022-07-23 16:31:40', NULL),
(40, 'Java > Javascript', NULL, 'Thibault ça suffit de faire du Javascript!! Ce n\'est pas un vrai langage de programmation', NULL, 'Informatique', 17, '2022-07-23 16:35:14', NULL),
(41, 'Flamenco rumba!!', NULL, 'Concert ce soir! Venez nombreuux les copains!', NULL, 'Art', 19, '2022-07-23 16:37:28', NULL),
(42, 'Travailler à Google vs travailler à Netflix', NULL, 'Qu\'en pensez-vous?', NULL, 'Entreprise', 20, '2022-07-23 16:39:19', '2022-07-24 21:37:38'),
(43, 'Riff skin', NULL, 'Pas mal classe pour une tapette elfique :)', NULL, 'Divers', 22, '2022-07-23 16:41:41', NULL),
(44, 'Trop de plastique!!', NULL, 'Mais il me gave les gens et leur satané individualisme!! On s\'allonge sur le plastque du coup?!', NULL, 'Ecologie', 23, '2022-07-23 16:44:27', NULL),
(45, 'Les voitures électriques', NULL, 'Qu\'en pensez-vous?', NULL, 'Ecologie', 23, '2022-07-23 16:48:46', NULL),
(46, 'Assemblée', NULL, 'Je me demande si un design tout de vert ne serait pas plus énergique, pour leur éviter de dormir.', NULL, 'Politique', 24, '2022-07-23 16:51:40', NULL),
(47, 'La Maison Blanche', NULL, 'Sacrément impressionnant!', 'https://fr.wikipedia.org/wiki/Quartier_de_la_Maison-Blanche', 'Politique', 25, '2022-07-23 16:54:31', NULL),
(48, 'Le hockey ça c\'est du sport', 'EXH8kBROJCY', 'En plus ils font une 3ème mi-temps après chaque match', NULL, 'Sport', 27, '2022-07-23 16:57:37', NULL),
(49, 'En avant pour la finale au stade!', NULL, 'Sacré ambiance d\'ici!', NULL, 'Sport', 28, '2022-07-23 16:59:21', NULL),
(50, 'Des fajitas ce soir?', NULL, 'Qui veut venir est le bienvenue', NULL, 'Cuisine', 29, '2022-07-23 17:00:44', '2022-07-23 17:03:00'),
(51, 'Le taboulet ça plait toujours autant', NULL, 'Et ce n\'est pas trop calorique, ce qui évite d\'avoir trop chaud pendant la digestion', NULL, 'Cuisine', 30, '2022-07-23 17:05:19', NULL),
(52, 'Les glaces Agendas', NULL, 'Toujours aussi dur de résister', NULL, 'Cuisine', 31, '2022-07-23 17:06:44', NULL),
(54, 'Le Digital Painting', NULL, 'Très prometteur comme technique', NULL, 'Art', 32, '2022-07-23 17:08:36', NULL),
(55, 'Lieu très spirituel au Japon', NULL, 'J\'en ai profité pour faire mon yoga', NULL, 'Divers', 33, '2022-07-23 17:10:29', NULL),
(56, 'La permaculture', NULL, 'On pense fortement à s\'y mettre', NULL, 'Ecologie', 34, '2022-07-23 17:12:12', NULL),
(57, 'Mac vs Microsoft', NULL, 'Vous choisissez quoi?', NULL, 'Entreprise', 35, '2022-07-23 17:14:35', NULL),
(58, 'Travailler chez Netflix ça a l\'air cool', NULL, 'Qu\'en pensez-vous?', NULL, 'Entreprise', 36, '2022-07-23 17:17:09', NULL),
(59, 'Le C++', NULL, 'Qu\'en pensez-de l\'apprendre pour devenir meilleur programmeur', NULL, 'Informatique', 37, '2022-07-23 17:18:26', NULL),
(60, 'L\'Irlande', NULL, 'J\'ai envie d\'être un hobbit', NULL, 'Nature', 37, '2022-07-23 17:22:18', NULL),
(61, 'Le code informatique', NULL, 'Dire qu\'il y en a pour passer des journées là-dessus', NULL, 'Nature', 38, '2022-07-23 17:24:39', NULL),
(62, 'Dublin', NULL, 'Quelle ville', NULL, 'Ville', 39, '2022-07-23 17:25:56', NULL),
(63, 'Tour eiffel', NULL, 'Notre monument, montant si haut dans le ciel', NULL, 'Ville', 40, '2022-07-23 17:27:12', NULL),
(64, 'Tokyo', NULL, 'Petite photo du Japon', NULL, 'Ville', 41, '2022-07-23 17:29:08', NULL),
(65, 'Robert Pires', NULL, 'Hommage à un grand joueur français', NULL, 'Sport', 42, '2022-07-23 17:30:54', NULL),
(66, 'Maisons en terre', NULL, 'Voici la nouvelle formation dans laquelle je me lance', NULL, 'Ecologie', 43, '2022-07-23 17:32:35', NULL),
(67, 'L\'évolution de SpaceX', NULL, 'Pensez-vous que la colonisation de Mars soit possible?', NULL, 'Science', 44, '2022-07-23 18:11:44', NULL),
(68, 'Seattle, une ville à Découvrir', NULL, 'Il s\'agit d\'une ville très verte', NULL, 'Ville', 46, '2022-07-23 18:13:58', NULL),
(69, 'San Francisco recrute des data scientist', NULL, 'Je vais avoir un entretien, on m\'a dit beaucoup de bien de cette ville', NULL, 'Ville', 47, '2022-07-23 18:17:05', NULL),
(70, 'Le temple de la guiness se trouve à Dublin', NULL, 'Ne pas oublier d\'y faire un tour', NULL, 'Ville', 48, '2022-07-23 18:19:08', NULL),
(71, 'L\'algo l\'algooo!', 'oBt53YbR9Kk', 'Je sors pas de la journée, ça y\'est!', NULL, 'Informatique', 48, '2022-07-23 18:20:25', NULL),
(72, 'L\'hydrogène, c\'est pour bientôt', NULL, 'En plus ça va créer de l\'emploi', NULL, 'Science', 49, '2022-07-23 18:23:15', NULL),
(73, 'Le curry vert', NULL, 'Elle me manque Françoise, à nous faire de bons petis plats, mmm...', NULL, 'Cuisine', 50, '2022-07-23 18:25:02', NULL),
(74, 'Une bonne salade grecque pour l\'été', NULL, 'Sans modération bien entendu :)', NULL, 'Cuisine', 48, '2022-07-23 18:26:40', NULL),
(75, 'Ho ma petite Caméliaaa', NULL, 'Je t\'aimeuu)', NULL, 'Plantes', 51, '2022-07-23 18:29:17', NULL),
(76, 'Mes hortensias', NULL, 'En direct de mon jardins', NULL, 'Plantes', 51, '2022-07-23 18:30:15', NULL),
(77, 'Un joli Magnolia', NULL, 'Très apprécié en Bretagne', NULL, 'Plantes', 51, '2022-07-23 18:31:31', NULL),
(78, 'Beaucoup de Glycine en Bretagne', NULL, 'Et beaucoup d\'abeilles par la même occasion', NULL, 'Plantes', 48, '2022-07-23 18:32:45', NULL),
(79, 'Le Romarin de Côte d\'Azur', NULL, 'Pratique, plus besoin d\'aller l\'acheter, il n\'y a qu\'à se pencher pour le cueillir', NULL, 'Plantes', 49, '2022-07-23 18:34:32', NULL),
(80, 'Mes rhododendrons', NULL, 'Photo prise de mon jardin!', NULL, 'Plantes', 15, '2022-07-23 18:36:14', NULL),
(81, 'Lynx des neiges', NULL, 'Des fois je rêve un peu trop', NULL, 'Animaux', 15, '2022-07-23 18:38:06', NULL),
(82, 'Manoul', NULL, 'La nature produit des choses bien curieuses', NULL, 'Animaux', 14, '2022-07-23 18:39:15', NULL),
(83, 'Voilà le Guépard', NULL, 'Voilà du vrai bon gros matou', NULL, 'Animaux', 50, '2022-07-23 18:54:34', NULL),
(84, 'Le berger australien', NULL, 'J\'en veux un, ils sont trop beaux', NULL, 'Animaux', 49, '2022-07-23 18:56:46', NULL),
(85, 'Moi je suis plutôt pour l\'Epagneul Breton', NULL, 'Et oui c\'est lui le plus mignon', NULL, 'Animaux', 51, '2022-07-23 19:00:09', NULL),
(86, 'Et le husky alors?', NULL, 'Il me donne des frissons', NULL, 'Animaux', 48, '2022-07-23 19:01:47', NULL),
(87, 'Attention à la préservation du Léopard des neiges', NULL, 'Il faut laisser cette espèce tranquille dans son habitat naturel', NULL, 'Animaux', 46, '2022-07-23 19:04:20', NULL),
(88, 'Attention à l\'ours Kodiac si vous vous balladez en Alaska', NULL, 'Mais quelle énorme bête!!', NULL, 'Animaux', 44, '2022-07-23 19:09:37', NULL),
(89, 'Les ours polaires sont\'ils les plus mignons?', NULL, 'Qu\'en pensez-vous?', NULL, 'Animaux', 34, '2022-07-23 19:12:40', NULL),
(90, 'Mon nouveau chiot!!', NULL, 'Les enfants sont aux anges', NULL, 'Animaux', 40, '2022-07-23 19:14:12', NULL),
(91, 'Un petit weekend à faire de l\'aquarelle', NULL, 'Weekend plutôt créatif', NULL, 'Art', 17, '2022-07-23 19:19:21', NULL),
(92, 'Tiens Grend\'Harb, c\'est toi', NULL, 'Je trouve que ça te représente bien', NULL, 'Divers', 22, '2022-07-23 19:21:47', NULL),
(93, 'Le digital painting est vraiment fascinant', NULL, 'Voici quelques oeuvres plus belles les uns que les autres', NULL, 'Art', 24, '2022-07-23 19:23:43', NULL),
(94, 'Expo de William Turner', NULL, 'Quel talent', NULL, 'Art', 25, '2022-07-23 19:29:59', NULL),
(95, 'Expo de Vincent Van Gogh', NULL, 'C\'était fantastique', NULL, 'Art', 31, '2022-07-23 19:31:08', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `post_images`
--

CREATE TABLE `post_images` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `post_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post_images`
--

INSERT INTO `post_images` (`id`, `name`, `post_id`) VALUES
(1, 'welcome_posts_images_1_1658579204649.jpg', 1),
(2, 'max-size_posts_images_4_1658582414846.jpg', 4),
(7, 'chartreux1_posts_images_7_1658587150194.jpg', 7),
(9, 'cap-ferret1_post_img_9_image_0_1658587938490.jpg', 9),
(10, 'cap-ferret2_post_img_9_image_1_1658587938490.jpg', 9),
(11, 'cap-ferret3_post_img_9_image_2_1658587938490.jpg', 9),
(12, 'fender_posts_images_10_1658588240590.jpg', 10),
(13, 'binary-tree_posts_images_11_1658588469700.jpg', 11),
(14, 'dwarf-warrior_posts_images_12_1658588654519.jpg', 12),
(15, 'salade-chinoise_posts_images_18_1658589774351.jpg', 18),
(19, 'hermione1_post_img_25_image_0_1658590796656.jpg', 25),
(20, 'hermione2_post_img_25_image_1_1658590796656.jpg', 25),
(21, 'kids1_posts_images_26_1658590912129.jpg', 26),
(22, 'warhammer_posts_images_27_1658591012693.jpg', 27),
(23, 'salad_posts_images_28_1658591116692.jpg', 28),
(24, 'machine-learning_posts_images_29_1658591296568.jpg', 29),
(25, 'poudlard1_posts_images_30_1658592065241.jpg', 30),
(26, 'cliff1_post_img_31_image_0_1658592209498.jpg', 31),
(27, 'scottland1_post_img_31_image_1_1658592209498.jpg', 31),
(28, 'macron1_posts_images_32_1658592688518.jpg', 32),
(29, 'weather-photographer-of-the-year-2021_posts_images_33_1658592866157.jpg', 33),
(30, 'landscape1_posts_images_34_1658592966129.jpg', 34),
(31, 'didier-squiban_posts_images_35_1658593318650.jpg', 35),
(32, 'erwan-menguy_posts_images_36_1658593423714.jpg', 36),
(33, 'covid_posts_images_37_1658593622128.jpg', 37),
(34, 'stars1_posts_images_38_1658593745452.jpg', 38),
(35, 'plastic-under-water_posts_images_39_1658593900720.jpg', 39),
(36, 'flamenco_posts_images_41_1658594248216.jpg', 41),
(38, 'google_post_img_42_image_1_1658594359840.jpg', 42),
(39, 'elfe-archer_posts_images_43_1658594501894.jpg', 43),
(40, 'plastic_posts_images_44_1658594667983.jpg', 44),
(41, 'electric-car_post_img_45_image_0_1658594926781.jpg', 45),
(42, 'electric-car2_post_img_45_image_1_1658594926781.jpg', 45),
(43, 'assembly-empty_post_img_46_image_0_1658595100123.jpg', 46),
(44, 'assembly-full_post_img_46_image_1_1658595100123.jpg', 46),
(45, 'white-house_posts_images_47_1658595271734.jpg', 47),
(46, 'hockey_posts_images_48_1658595457109.jpg', 48),
(47, 'stade-foot1_posts_images_49_1658595561939.jpg', 49),
(49, 'fajitas1_post_img_50_image_0_1658595780987.jpg', 50),
(50, 'fajitas2_post_img_50_image_1_1658595780987.jpg', 50),
(51, 'fajitas3_post_img_50_image_2_1658595780987.jpg', 50),
(52, 'taboulet1_post_img_51_image_0_1658595919980.jpg', 51),
(53, 'taboulet2_post_img_51_image_1_1658595919980.jpg', 51),
(54, 'agendas_posts_images_52_1658596004760.jpg', 52),
(55, 'dp1_post_img_54_image_0_1658596116349.jpg', 54),
(56, 'dp2_post_img_54_image_1_1658596116349.jpg', 54),
(57, 'dp3_post_img_54_image_2_1658596116349.jpg', 54),
(58, 'dp4_post_img_54_image_3_1658596116349.jpg', 54),
(59, 'monk-7010969_640_posts_images_55_1658596229726.jpg', 55),
(60, 'permaculture1_post_img_56_image_0_1658596332787.jpg', 56),
(61, 'permaculture2_post_img_56_image_1_1658596332787.jpg', 56),
(62, 'permaculture3_post_img_56_image_2_1658596332787.jpg', 56),
(63, 'mac_post_img_57_image_0_1658596475391.jpg', 57),
(64, 'microsoft_post_img_57_image_1_1658596475391.jpg', 57),
(65, 'netflix_posts_images_58_1658596629239.jpg', 58),
(66, 'c++-algo_posts_images_59_1658596706244.jpg', 59),
(67, 'irish-lake1_posts_images_60_1658596938341.jpg', 60),
(68, 'code-algo_posts_images_61_1658597079408.jpg', 61),
(69, 'dublin1_post_img_62_image_0_1658597156819.jpg', 62),
(70, 'dublin2_post_img_62_image_1_1658597156819.jpg', 62),
(71, 'dublin3_post_img_62_image_2_1658597156819.jpg', 62),
(72, 'dublin4_post_img_62_image_3_1658597156819.jpg', 62),
(73, 'tour-eiffel1_posts_images_63_1658597232046.jpg', 63),
(74, 'japan1_posts_images_64_1658597348236.jpg', 64),
(75, 'pires1_post_img_65_image_0_1658597454953.jpg', 65),
(76, 'pires2_post_img_65_image_1_1658597454953.jpg', 65),
(77, 'maison-terre1_post_img_66_image_0_1658597556001.jpg', 66),
(78, 'maison-terre3_post_img_66_image_1_1658597556001.jpg', 66),
(79, 'maison-terre4_post_img_66_image_2_1658597556001.jpg', 66),
(80, 'spacex_post_img_67_image_0_1658599904988.jpg', 67),
(81, 'spacex2_post_img_67_image_1_1658599904988.jpg', 67),
(82, 'spacex3_post_img_67_image_2_1658599904988.jpg', 67),
(83, 'spcex4_post_img_67_image_3_1658599904988.jpg', 67),
(84, 'seattle1_post_img_68_image_0_1658600038413.jpg', 68),
(85, 'seattle2_post_img_68_image_1_1658600038413.jpg', 68),
(86, 'san-francisco1_posts_images_69_1658600225833.jpg', 69),
(87, 'dublin-guiness_posts_images_70_1658600348734.jpg', 70),
(88, 'code-algo_posts_images_71_1658600425530.jpg', 71),
(89, 'hydrogen1_post_img_72_image_0_1658600595983.jpg', 72),
(90, 'hydrogen2_post_img_72_image_1_1658600595983.jpg', 72),
(91, 'curry-vert_post_img_73_image_0_1658600702692.jpg', 73),
(92, 'curry-vert2_post_img_73_image_1_1658600702692.jpg', 73),
(93, 'salade-grecque1_post_img_74_image_0_1658600800844.jpg', 74),
(94, 'salade-grecque2_post_img_74_image_1_1658600800844.jpg', 74),
(95, 'salade-grecque3_post_img_74_image_2_1658600800844.jpg', 74),
(96, 'salade-grecque4_post_img_74_image_3_1658600800844.jpg', 74),
(97, 'camelia1_posts_images_75_1658600957572.jpg', 75),
(98, 'hortensia_post_img_76_image_0_1658601015664.jpg', 76),
(99, 'orthensia1_post_img_76_image_1_1658601015664.jpg', 76),
(100, 'magnolia_posts_images_77_1658601091301.jpg', 77),
(101, 'glycine_posts_images_78_1658601165094.jpg', 78),
(102, 'rhododendron1_post_img_80_image_0_1658601374119.jpg', 80),
(103, 'rhododendron2_post_img_80_image_1_1658601374119.jpg', 80),
(104, 'lynx-neige1_post_img_81_image_0_1658601486613.jpg', 81),
(105, 'lynx-neige2_post_img_81_image_1_1658601486613.jpg', 81),
(106, 'manoul1_posts_images_82_1658601555529.jpg', 82),
(107, 'guepard1_post_img_83_image_0_1658602474204.jpg', 83),
(108, 'guepard2_post_img_83_image_1_1658602474204.jpg', 83),
(109, 'berger-australien1_posts_images_84_1658602606640.jpg', 84),
(110, 'epagneul-breton_post_img_85_image_0_1658602809291.jpg', 85),
(111, 'epagneul-breton2_post_img_85_image_1_1658602809291.jpg', 85),
(112, 'husky1_post_img_86_image_0_1658602907066.jpg', 86),
(113, 'husky2_post_img_86_image_1_1658602907066.jpg', 86),
(114, 'husky3_post_img_86_image_2_1658602907066.jpg', 86),
(115, 'leopard-neige_post_img_87_image_0_1658603060838.jpg', 87),
(116, 'leopard-neige2_post_img_87_image_1_1658603060838.jpg', 87),
(117, 'ours-kodiak_post_img_88_image_0_1658603377330.jpg', 88),
(118, 'ours-kodiak2_post_img_88_image_1_1658603377330.jpg', 88),
(119, 'ours-polaire1_post_img_89_image_0_1658603560490.jpg', 89),
(120, 'ours-polaire-2_post_img_89_image_1_1658603560490.jpg', 89),
(121, 'puppy1_posts_images_90_1658603652324.jpg', 90),
(122, 'aquarelle1_posts_images_91_1658603961206.jpg', 91),
(123, 'wizard_posts_images_92_1658604107169.png', 92),
(124, 'dp5_post_img_93_image_0_1658604223775.jpg', 93),
(125, 'dp6_post_img_93_image_1_1658604223775.jpg', 93),
(126, 'dp7_post_img_93_image_2_1658604223775.jpg', 93),
(127, 'dp8_post_img_93_image_3_1658604223775.jpg', 93),
(128, 'turner1_posts_images_94_1658604599280.jpg', 94),
(129, 'van-gogh4_post_img_95_image_0_1658604668331.jpg', 95),
(130, 'van-gogh6_post_img_95_image_1_1658604668331.jpg', 95),
(131, 'van-gogh-expo_post_img_95_image_2_1658604668331.jpg', 95),
(132, 'van-gogh-expo2_post_img_95_image_3_1658604668331.jpg', 95),
(133, 'pointe-du-groin_posts_images_8_1658698120355.jpg', 8),
(134, 'church_posts_images_19_1658698360417.jpg', 19),
(135, 'netflix_posts_images_42_1658698658495.jpg', 42);

-- --------------------------------------------------------

--
-- Structure de la table `post_likes`
--

CREATE TABLE `post_likes` (
  `id` int NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `post_likes`
--

INSERT INTO `post_likes` (`id`, `post_id`, `user_id`) VALUES
(1, 8, 14),
(2, 9, 14),
(3, 38, 14),
(4, 40, 14),
(5, 73, 14),
(6, 74, 14),
(8, 80, 14),
(9, 7, 15),
(10, 9, 15),
(11, 15, 15),
(12, 26, 15),
(13, 36, 15),
(14, 52, 15),
(15, 54, 15),
(16, 94, 15),
(17, 95, 15),
(18, 15, 17),
(19, 36, 17),
(20, 38, 17),
(21, 61, 17),
(22, 94, 17),
(23, 95, 17),
(24, 13, 19),
(25, 76, 19),
(26, 12, 20),
(27, 16, 20),
(28, 27, 20),
(29, 31, 20),
(30, 35, 20),
(31, 36, 20),
(32, 43, 20),
(33, 48, 20),
(34, 62, 20),
(35, 70, 20),
(36, 71, 20),
(37, 78, 20),
(38, 85, 20),
(39, 16, 22),
(40, 17, 22),
(41, 27, 22),
(42, 46, 22),
(43, 48, 22),
(44, 62, 22),
(45, 93, 22),
(46, 10, 23),
(47, 41, 23),
(48, 93, 23),
(49, 34, 24),
(50, 8, 25),
(51, 9, 25),
(52, 19, 25),
(53, 26, 25),
(54, 40, 25),
(55, 51, 25),
(56, 55, 25),
(57, 80, 25),
(58, 91, 25),
(59, 95, 25),
(60, 12, 27),
(61, 31, 27),
(62, 43, 27),
(63, 62, 27),
(64, 92, 27),
(65, 9, 28),
(66, 18, 28),
(67, 50, 28),
(68, 86, 28),
(69, 17, 29),
(70, 49, 29),
(71, 80, 29),
(72, 15, 30),
(73, 21, 30),
(74, 25, 30),
(75, 26, 30),
(76, 47, 30),
(77, 54, 30),
(78, 55, 30),
(79, 94, 30),
(80, 95, 30),
(81, 8, 31),
(82, 9, 31),
(83, 15, 31),
(84, 25, 31),
(85, 26, 31),
(86, 47, 31),
(87, 51, 31),
(88, 55, 31),
(89, 80, 31),
(90, 94, 31),
(91, 8, 32),
(92, 9, 32),
(93, 15, 32),
(94, 19, 32),
(95, 26, 32),
(96, 51, 32),
(97, 47, 32),
(98, 80, 32),
(99, 81, 32),
(100, 91, 32),
(101, 15, 33),
(102, 26, 33),
(103, 47, 33),
(104, 89, 33),
(105, 15, 34),
(106, 19, 34),
(107, 25, 34),
(108, 47, 34),
(109, 51, 34),
(110, 55, 34),
(111, 94, 34),
(112, 95, 34),
(113, 12, 35),
(114, 42, 35),
(115, 43, 35),
(116, 78, 35),
(117, 92, 35),
(118, 35, 36),
(119, 36, 36),
(120, 70, 36),
(121, 71, 37),
(122, 9, 38),
(123, 36, 38),
(124, 35, 38),
(125, 40, 38),
(126, 70, 38),
(127, 71, 38),
(128, 91, 38),
(129, 70, 39),
(130, 35, 40),
(131, 36, 40),
(132, 65, 40),
(133, 69, 40),
(134, 71, 40),
(135, 32, 41),
(136, 65, 41),
(137, 71, 41),
(138, 74, 41),
(139, 90, 41),
(140, 32, 42),
(141, 70, 42),
(142, 71, 42),
(143, 90, 42),
(144, 74, 43),
(145, 88, 43),
(146, 35, 44),
(147, 36, 44),
(148, 66, 44),
(149, 74, 44),
(150, 75, 44),
(151, 76, 44),
(152, 77, 44),
(153, 78, 44),
(154, 85, 44),
(155, 86, 44),
(156, 69, 46),
(157, 71, 46),
(158, 32, 47),
(159, 33, 47),
(160, 63, 47),
(161, 64, 47),
(162, 7, 48),
(163, 8, 48),
(164, 9, 48),
(165, 11, 48),
(166, 28, 48),
(167, 29, 48),
(168, 30, 48),
(169, 31, 48),
(170, 38, 48),
(171, 42, 48),
(172, 57, 48),
(173, 59, 48),
(174, 60, 48),
(175, 62, 48),
(176, 66, 48),
(177, 65, 48),
(178, 68, 48),
(179, 73, 48),
(180, 91, 48),
(181, 95, 48),
(182, 7, 49),
(183, 8, 49),
(184, 38, 49),
(185, 83, 49),
(186, 70, 50),
(187, 9, 51),
(188, 88, 51),
(189, 91, 51);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `passions` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_connection` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `image`, `description`, `passions`, `created_at`, `last_connection`) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$10$aibkH41exOIEXlTd3segD.9d1By64rUKmqKnXPto3vQnWqUExh.dK', 'admin', 'Admin_Profil_img_1658578501359.jpg', 'La loi c\'est moi!', 'Algo et langages de programmation', '2022-07-18 17:21:45', '2022-07-23 13:59:41'),
(14, 'Nathalie', 'nathalie@gmail.com', '$2b$10$9UUJORYbrbRzWwxov07gC.rm2Gpa/DYeyDDAK/NdKCkU2BiugBOnS', 'user', NULL, NULL, NULL, '2022-07-19 17:38:07', '2022-07-24 08:35:52'),
(15, 'Caroline', 'caroline@gmail.com', '$2b$10$8E5K0lF8ySmzZ64XP2O/I.G4hgsy4x9dQilqmKC9CK0.R1ByRWm2C', 'user', 'Caroline_Profil_img_1658278087538.png', 'J\'aime la Bretagne', 'Vive les huitres!', '2022-07-19 18:16:03', '2022-07-24 21:25:42'),
(17, 'Bernard', 'bernard@gmail.com', '$2b$10$t/qNuKgSNbTDkAYiH.S1W.z47miWmRmL2R9rhwpjpbIw1kVkXTrkC', 'user', 'Bernard_Profil_img_1658277753279.png', 'J\'aime les expo', 'Vive la marche', '2022-07-19 19:21:37', '2022-07-24 11:17:08'),
(19, 'Maxime', 'maxime@gmail.com', '$2b$10$tlSOwFYHvmgjPjxw5hTGke959rA7vj//cTUQ0q3UAw04Mck1M1dFa', 'user', NULL, NULL, NULL, '2022-07-22 20:38:28', '2022-07-24 11:29:07'),
(20, 'Thomas', 'thomas@gmail.com', '$2b$10$EA5SteUzGukfnYQEuR6E1u/7fAFJKUAZw4bijsjX8dJ3uZ7jan78a', 'user', NULL, NULL, NULL, '2022-07-22 20:38:44', '2022-07-24 21:35:16'),
(22, 'Sam', 'sam@gmail.com', '$2b$10$AuVAF.1uC99qv.F52poxd.QWRCmNnM7McjiTktJznsVLhp0iL7OGq', 'user', NULL, NULL, NULL, '2022-07-22 20:39:30', '2022-07-24 21:38:16'),
(23, 'Karim', 'karim@gmail.com', '$2b$10$FEFkNl/Xc7KbpSyQSJPdRumNNWIJuixZC5nhfVh4mGKs2kz30zHWm', 'user', NULL, NULL, NULL, '2022-07-22 20:39:49', '2022-07-24 12:49:05'),
(24, 'Peter', 'Peter@gmail.com', '$2b$10$UCjdI80FJZenmYrQzRRlUe1PZuCPvMEHC/37hHh8DGXJIgrIvGGRi', 'user', NULL, NULL, NULL, '2022-07-22 20:40:20', '2022-07-24 12:52:42'),
(25, 'Jean-Paul', 'jeanpaul@gmail.com', '$2b$10$dvGdrufW2A33UYerFWnYiO2.RyaS1I0AyzV9JHMPb76b.NlMw1VNW', 'user', NULL, NULL, NULL, '2022-07-22 20:43:26', '2022-07-24 12:55:48'),
(27, 'Nizar', 'nizar@gmail.com', '$2b$10$xfiuRc5Ux2MCdQGUY2NajOyV1uwh8E7e1OyhuScKc9568H2G9tYoi', 'user', NULL, NULL, NULL, '2022-07-22 20:48:03', '2022-07-24 13:05:31'),
(28, 'Laurent', 'laurent@gmail.com', '$2b$10$MscaqSeUma4/PfT40ZsbHeSTdAvzObd1oFwx0kMI6JxczNdocfCfC', 'user', NULL, NULL, NULL, '2022-07-22 21:01:05', '2022-07-24 14:36:46'),
(29, 'Irene', 'irene@gmail.com', '$2b$10$ykDieKjKuyCtufEx2XumJ.bEcinqaWYDJipne3AIAhzQJkQvCoU3.', 'user', NULL, NULL, NULL, '2022-07-22 21:01:18', '2022-07-24 14:43:39'),
(30, 'Lilianne', 'lilianne@gmail.com', '$2b$10$87kF2MnWp0l0gAhSgZRvmeqooU5D8UnLZBSVaBIoPuVh5NO1J21Qq', 'user', NULL, NULL, NULL, '2022-07-22 21:01:55', '2022-07-24 21:30:09'),
(31, 'Elodie', 'elodie@gmail.com', '$2b$10$164WFHvA0H7vHGscjV0uP.psINPabxNtLO0g5Hk6GV9L8Ocwa/vzW', 'user', NULL, NULL, NULL, '2022-07-22 21:02:13', '2022-07-24 14:59:35'),
(32, 'Romain', 'romain@gmail.com', '$2b$10$kRU21soqQR46If/ms7RPO.wuM2J5P3MJq3/krTKbnZurTebsYDuVu', 'user', NULL, NULL, NULL, '2022-07-22 21:02:49', '2022-07-24 15:09:37'),
(33, 'Aurore', 'aurore@gmail.com', '$2b$10$BJSXt316NeuXrgNkRwkxJuZqA5Z/AxcZSpCpNN8MMAftPEj1O0Vhe', 'user', NULL, NULL, NULL, '2022-07-22 21:03:06', '2022-07-24 21:41:35'),
(34, 'Céline', 'celine@gmail.com', '$2b$10$13kl.0yW15PeWOYaOpQQ6e8DSQutnU.n29OcalaaR0RwrBSBeLsM2', 'user', NULL, NULL, NULL, '2022-07-22 21:03:21', '2022-07-24 21:54:06'),
(35, 'Erwin', 'erwin@gmail.com', '$2b$10$.v0ev6Fki7gCc8hY7aWT/.L5PDW9KVdnhhSXVjNzlfOeIdc69Hj4y', 'user', NULL, NULL, NULL, '2022-07-22 21:03:56', '2022-07-24 22:03:03'),
(36, 'Antoine', 'antoine@gmail.com', '$2b$10$LSkyi3lUdv2RrRhzs.rffO79krpBj5t7beOHfhfxlNFJFLWuONOVG', 'user', NULL, NULL, NULL, '2022-07-22 21:04:40', '2022-07-24 22:11:07'),
(37, 'Gael', 'gael@gmail.com', '$2b$10$gbuIuMh6G1r/vZIX0plRiuC5P4AGXKApfh.oxfXh9lDBcU7MrsNR.', 'user', NULL, NULL, NULL, '2022-07-22 21:05:28', '2022-07-24 22:49:41'),
(38, 'Ronan', 'ronan@gmail.com', '$2b$10$4V.9FwJ8e/ZZk3gBhvwPpOc3M0/dbmcNsXOCu/7925dAdSrtAOxBW', 'user', NULL, NULL, NULL, '2022-07-22 22:41:39', '2022-07-24 22:52:51'),
(39, 'Laura', 'laura@gmail.com', '$2b$10$6.jmZPZrQQlOnpLR833gjuimhgvNTlYoZGnScmQz2R452ieoNwNea', 'user', NULL, NULL, NULL, '2022-07-22 22:44:04', '2022-07-24 23:08:37'),
(40, 'Arnault', 'arnault@gmail.com', '$2b$10$czTmR5O64AbxXAMsdYKwteP3joldQn2CM2HWk2gZ8aIBMTODwf.Ce', 'user', NULL, NULL, NULL, '2022-07-22 22:45:27', '2022-07-24 23:12:03'),
(41, 'Stéphane', 'stephane@gmail.com', '$2b$10$kj.Knpk0J.ay52W.QZQnD.uZ7z7h3zjlC8.eRVZ1oMsRFntybQSsy', 'user', NULL, NULL, NULL, '2022-07-22 22:46:14', '2022-07-24 23:16:30'),
(42, 'Cédric', 'cedric@gmail.com', '$2b$10$/9PDU7yvZirNOUA1GZX3DenOKNJmuhXFFuNu71AhanP6U3I7Jo4M.', 'user', NULL, NULL, NULL, '2022-07-22 22:46:35', '2022-07-24 23:22:44'),
(43, 'Aurélia', 'aurelia@gmail.com', '$2b$10$6sDvRQIpViByw.KoxKeIXuSgD8YNbP5A2gTWdwwJPQaczoSvkx1E6', 'user', NULL, NULL, NULL, '2022-07-22 22:47:31', '2022-07-24 23:26:18'),
(44, 'Anthony', 'anthony@gmail.com', '$2b$10$SDuEY/ryjEZWOSN/aDxQ5O1xPRJlgY6JsHXTwfoH1FQ/2CdFJSZUi', 'user', NULL, NULL, NULL, '2022-07-22 22:48:47', '2022-07-24 23:28:40'),
(46, 'Dominique', 'dominique@gmail.com', '$2b$10$gjQ2VNl727ssBgNQPtNS0ekrzoX0xGYfuWZHFclap4jFfsV5nHDVS', 'user', NULL, NULL, NULL, '2022-07-22 22:50:26', '2022-07-24 23:33:16'),
(47, 'Victor', 'victor@gmail.com', '$2b$10$qgqnZrDaRN6vEgwgOqARGe24PDgKRhzvd9.VVEFuuX43ShkLIGUzu', 'user', NULL, NULL, NULL, '2022-07-22 22:50:45', '2022-07-24 23:35:19'),
(48, 'Thibault', 'thibault@gmail.com', '$2b$10$NagDP68fogHu7Cqi2gHq1u9A6EgxqYvry5pU1oNxT.N6ABbLlrHPq', 'user', NULL, NULL, NULL, '2022-07-23 16:16:33', '2022-07-24 23:38:13'),
(49, 'Zabou', 'zabou@gmail.com', '$2b$10$ogcGOR.AXF7MYcjwJkou9uP.uiQwn150hV8MPX2lVVm8DCicyS7xS', 'user', NULL, NULL, NULL, '2022-07-23 16:16:52', '2022-07-24 23:54:32'),
(50, 'Bruno', 'bruno@gmail.com', '$2b$10$3bFE5rJiiuIgoxErnQ9kAe3eU/Cj9g0XYbDblIpuhjh7CvBjZmWK.', 'user', NULL, NULL, NULL, '2022-07-23 16:17:05', '2022-07-25 00:20:29'),
(51, 'Guy', 'guy@gmail.com', '$2b$10$mSXdUuxRzLpqXFN6VJa0vuvmFSvQwzrXlK5Bhl4qGTCuqVkzrdSYG', 'user', NULL, NULL, NULL, '2022-07-23 18:28:06', '2022-07-25 00:24:43');

-- --------------------------------------------------------

--
-- Structure de la table `user_friends`
--

CREATE TABLE `user_friends` (
  `id` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `friend_user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user_friends`
--

INSERT INTO `user_friends` (`id`, `status`, `user_id`, `friend_user_id`) VALUES
(1, 'active', 14, 15),
(2, 'active', 14, 17),
(3, 'active', 14, 24),
(4, 'active', 50, 14),
(5, 'active', 50, 49),
(6, 'active', 50, 48),
(7, 'active', 48, 14),
(8, 'active', 48, 15),
(9, 'active', 48, 17),
(11, 'active', 48, 20),
(12, 'active', 48, 28),
(13, 'active', 48, 31),
(14, 'active', 48, 35),
(15, 'active', 48, 36),
(16, 'active', 48, 40),
(17, 'active', 48, 44),
(18, 'active', 48, 47),
(19, 'active', 48, 43),
(20, 'active', 17, 50),
(21, 'active', 17, 15),
(22, 'active', 17, 25),
(23, 'active', 17, 28),
(24, 'active', 17, 31),
(25, 'active', 17, 32),
(26, 'active', 17, 38),
(27, 'active', 17, 51),
(28, 'active', 19, 48),
(29, 'active', 19, 20),
(30, 'active', 19, 23),
(31, 'active', 19, 35),
(32, 'active', 19, 51),
(33, 'active', 20, 22),
(34, 'active', 20, 27),
(35, 'active', 20, 28),
(36, 'active', 20, 35),
(37, 'active', 20, 39),
(38, 'active', 20, 51),
(39, 'active', 22, 24),
(40, 'active', 22, 27),
(41, 'active', 22, 28),
(42, 'active', 22, 35),
(43, 'active', 22, 39),
(44, 'active', 23, 20),
(45, 'active', 23, 24),
(46, 'active', 24, 27),
(47, 'active', 24, 39),
(48, 'active', 25, 30),
(49, 'active', 25, 31),
(50, 'active', 25, 32),
(51, 'active', 25, 33),
(52, 'active', 25, 34),
(53, 'active', 25, 15),
(54, 'active', 15, 31),
(55, 'active', 15, 32),
(56, 'active', 15, 33),
(57, 'active', 15, 34),
(58, 'active', 27, 39),
(59, 'active', 28, 29),
(60, 'active', 28, 35),
(61, 'active', 28, 51),
(62, 'active', 29, 15),
(63, 'active', 30, 31),
(64, 'active', 30, 32),
(65, 'active', 30, 33),
(66, 'active', 30, 34),
(67, 'active', 31, 32),
(68, 'active', 31, 33),
(69, 'active', 31, 34),
(70, 'active', 32, 33),
(71, 'active', 32, 34),
(72, 'active', 33, 34),
(73, 'active', 36, 37),
(74, 'active', 37, 48),
(75, 'active', 38, 48),
(76, 'active', 39, 48),
(77, 'active', 40, 41),
(78, 'active', 40, 42),
(79, 'active', 40, 47),
(80, 'active', 41, 42),
(81, 'active', 41, 47),
(82, 'active', 41, 48),
(83, 'active', 42, 47),
(84, 'active', 42, 48),
(85, 'active', 43, 44),
(86, 'active', 44, 51),
(87, 'active', 46, 48),
(88, 'active', 46, 47),
(89, 'active', 49, 14),
(90, 'active', 49, 15);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comment_user_id` (`user_id`),
  ADD KEY `fk_comment_post_id` (`post_id`);

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_user_Id` (`user_id`);

--
-- Index pour la table `post_images`
--
ALTER TABLE `post_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_post_id` (`post_id`);

--
-- Index pour la table `post_likes`
--
ALTER TABLE `post_likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_like_post_id` (`post_id`),
  ADD KEY `fk_like_user_id` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_friends`
--
ALTER TABLE `user_friends`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT pour la table `post_images`
--
ALTER TABLE `post_images`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT pour la table `post_likes`
--
ALTER TABLE `post_likes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT pour la table `user_friends`
--
ALTER TABLE `user_friends`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comment_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comment_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_post_user_Id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post_images`
--
ALTER TABLE `post_images`
  ADD CONSTRAINT `fk_image_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `post_likes`
--
ALTER TABLE `post_likes`
  ADD CONSTRAINT `fk_like_post_id` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_like_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
