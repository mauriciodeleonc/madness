-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `catalogo`;
CREATE TABLE `catalogo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` tinytext,
  `precio` double DEFAULT NULL,
  `imagen` varchar(50) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `catalogo` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `categoria_id`, `created_at`) VALUES
(1,	'Tacos Vapor',	'Taco de Vapor Surtidos',	50,	NULL,	1,	'0000-00-00 00:00:00'),
(2,	'HotDogs',	'Hot Dogs ',	30,	NULL,	1,	NULL),
(3,	'Tostitos',	'Tostitos Preparados Elote,Crema y Salsas',	25,	NULL,	1,	NULL),
(4,	'Paletas Heladas',	'Paletas Heladas Varios Sabores',	10,	NULL,	1,	NULL),
(5,	'Churros',	'Churros paquetes  3 Piezas',	25,	NULL,	1,	NULL),
(6,	'Tequila Azul',	'Tequila Azul 750ml',	210,	NULL,	2,	NULL),
(7,	'Jose Cuervo Tradicional',	'Jose Cuervo Tradiciona 950ml',	270,	NULL,	2,	NULL),
(8,	'Chival Regal',	'Chivas Regal 750ml',	580,	NULL,	2,	NULL),
(9,	'Buchanan',	'Buchanan 750ml',	650,	NULL,	2,	NULL),
(10,	'Bacardi ',	'Bacardi 750 ',	140,	NULL,	2,	NULL),
(11,	'Matusalem',	'Matusalem 750ml',	150,	NULL,	2,	NULL),
(12,	'Dj Sencillo',	'PAquete DJ Sencillo 5 horas  Sistema Audio y Barra LED',	2950,	NULL,	3,	NULL),
(13,	'DJ Premium',	'DJ Sencillo + Iluminacion Ambiental (8 Barras LED)',	3500,	NULL,	3,	NULL),
(14,	'DJ Hora Extra',	'Hora Extra',	800,	NULL,	3,	NULL),
(15,	'Karaoke',	'5 Hr Servicio Pantalla , Microfonos y Persona Operando',	2350,	NULL,	3,	NULL),
(16,	'Rockola',	'Incluye Microfonos 5 Horas',	1300,	NULL,	3,	NULL),
(17,	'Mariachi',	'7 Canciones ',	3000,	NULL,	3,	NULL),
(18,	'Bartender Individual Sencillo',	'5 horas',	750,	NULL,	4,	NULL),
(19,	'Bartender Individual Premium',	'5 horas incluye jugos licores vasos desechables shots',	1700,	NULL,	4,	NULL),
(20,	'Bartender Hora Extra',	'Precio x Bartender',	300,	NULL,	4,	NULL),
(21,	'Mesero',	'5 Horas',	750,	NULL,	4,	NULL),
(22,	'Fotografo',	'1 hora',	1100,	NULL,	4,	NULL),
(23,	'Iluminacion Basica',	'8 Barras LED',	1100,	NULL,	5,	NULL),
(24,	'Iluminacion Intermedia',	'4 cabezas moviles , 2 rayo laser, 4 barras LED e Iluminacion ambiental',	2200,	NULL,	5,	NULL),
(25,	'Mesa Beer Pong',	'Incluye 3 Pelotas',	800,	NULL,	6,	NULL),
(26,	'Zanqueros',	'Animador Fiestas en Zancos precio x hora',	1200,	NULL,	6,	NULL);

DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE `cotizacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cliente` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dia_evento` date DEFAULT NULL,
  `hora_evento` time DEFAULT NULL,
  `direccion` text,
  `telefono` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `cotizacion_detalle`;
CREATE TABLE `cotizacion_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cotizacion_id` int(11) DEFAULT NULL,
  `catalogo_id` int(11) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `total` double DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `tipos`;
CREATE TABLE `tipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `descripcion` tinytext,
  `estatus` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `tipos` (`id`, `nombre`, `descripcion`, `estatus`, `created_at`) VALUES
(1,	'Comida',	NULL,	1,	'0000-00-00 00:00:00'),
(2,	'Bebida',	NULL,	1,	'0000-00-00 00:00:00'),
(3,	'Musica',	NULL,	1,	NULL),
(4,	'Personal',	NULL,	1,	NULL),
(5,	'Mobiliario',	NULL,	1,	NULL),
(6,	'Entretenimiento',	NULL,	1,	NULL);

-- 2017-06-05 22:52:20
