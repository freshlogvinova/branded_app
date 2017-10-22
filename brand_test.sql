-- MySQL dump 10.13  Distrib 5.6.31, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: brand_test
-- ------------------------------------------------------
-- Server version	5.6.31-0ubuntu0.15.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `id_content` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(4000) DEFAULT NULL,
  `list` varchar(4000) DEFAULT NULL,
  `btn_text` varchar(400) DEFAULT NULL,
  `link_to` varchar(400) DEFAULT NULL,
  `page` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_content`),
  KEY `page` (`page`),
  CONSTRAINT `contents_ibfk_1` FOREIGN KEY (`page`) REFERENCES `page` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (1,'Your own news app for your employees','Reach out to your target group\nCurate what is important\nCombine internal with external contents\nLow maintenance costs with equal results\nTruly native app with your branding','mehr erfahren','https://tchop.io',1);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id_items` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(4000) DEFAULT NULL,
  `page` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_items`),
  KEY `page` (`page`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`page`) REFERENCES `page` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'video.mp4',1),(2,'video.mp4',2),(3,'video2.mp4',1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `page`
--

DROP TABLE IF EXISTS `page`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(4000) DEFAULT NULL,
  `logo` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `page`
--

LOCK TABLES `page` WRITE;
/*!40000 ALTER TABLE `page` DISABLE KEYS */;
INSERT INTO `page` VALUES (1,'tchop','logo_tchop.png'),(2,'bvg','logo_bvg.png'),(3,'group','logo_tchop.png'),(4,'opel','logo_bvg.png'),(5,'unicef','logo_unicef.png'),(6,'wernsing','logo_wernsing.png');
/*!40000 ALTER TABLE `page` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `styles`
--

DROP TABLE IF EXISTS `styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `styles` (
  `id_styles` int(11) NOT NULL AUTO_INCREMENT,
  `bck_color` varchar(400) DEFAULT NULL,
  `text_color` varchar(400) DEFAULT NULL,
  `btn_color` varchar(400) DEFAULT NULL,
  `btn_bck_color` varchar(400) DEFAULT NULL,
  `page` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_styles`),
  KEY `page` (`page`),
  CONSTRAINT `styles_ibfk_1` FOREIGN KEY (`page`) REFERENCES `page` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `styles`
--

LOCK TABLES `styles` WRITE;
/*!40000 ALTER TABLE `styles` DISABLE KEYS */;
INSERT INTO `styles` VALUES (1,'#f2f2f0','#212121','#ffffff','#f6704d',1);
/*!40000 ALTER TABLE `styles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-20 17:34:15
