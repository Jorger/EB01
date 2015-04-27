-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 27-04-2015 a las 16:38:34
-- Versión del servidor: 5.5.29
-- Versión de PHP: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `aplicacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(10) NOT NULL AUTO_INCREMENT,
  `identificacion` varchar(50) DEFAULT '0',
  `nombre` varchar(50) DEFAULT '0',
  `apellido` varchar(50) DEFAULT '0',
  `email` varchar(50) DEFAULT '0',
  `clave` varchar(50) DEFAULT '0',
  `usuario` varchar(50) DEFAULT '0',
  `fecha` varchar(20) DEFAULT '0',
  `hora` varchar(20) DEFAULT '0',
  PRIMARY KEY (`idusuario`),
  KEY `identificacion` (`identificacion`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=199 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `identificacion`, `nombre`, `apellido`, `email`, `clave`, `usuario`, `fecha`, `hora`) VALUES
(1, '12345', 'Juan', 'García', 'juan.garcia@correo.com', 'miclave', 'juan.garcia', '11/11/2014', '11:02:am'),
(2, '123165', 'James', 'Mccartney', 'paul.mccartney@thebeatles.com', '123456', 'paul.mccartney', '11/11/2014', '11:02:am'),
(3, '123456', 'Andrés', 'Pinzón', 'ostricajh@correo.com', 'password', 'andres.morales', '11/11/2014', '11:02:am'),
(4, '464646', 'William', 'Gates', 'bill.gates@microsoft.com.co', '12345678', 'bill.gates', '11/11/2014', '11:02:am'),
(5, '546342', 'Stevie', 'Wonder', 'stevie.wonder@correo.com', 'qwerty', 'stevie.wonder', '11/11/2014', '11:02:am'),
(6, '546464', 'Richard', 'Parkin', 'ringo.starr@beatles.com', 'abc123', 'richard.starr', '11/11/2014', '11:02:am'),
(7, '654464', 'Dumar', 'Otalora', 'dumar.otalora@correo.com', '123456789', 'dumar.otalora', '11/11/2014', '11:02:am'),
(8, '741258', 'William', 'Cacéres', 'william.caceres@correo.com', '111111', 'william.caceres', '11/11/2014', '11:02:am'),
(9, '3546464', 'Linus', 'Torvalds', 'linus.torvalds@linux.com', '1234567', 'linus.torvalds', '11/11/2014', '11:02:am'),
(10, '4061053', 'Cesar', 'Tunaroza', 'tunaroza.cesar@correo.com', 'iloveyou', 'cesar.tunaroza', '11/11/2014', '11:02:am'),
(11, '4253370', 'German', 'Mesa', 'sutekh1013@correo.com', 'adobe123', 'german.mesa', '11/11/2014', '11:02:am'),
(12, '5456464', 'Jairo', 'López', 'jairo.lopez@correo.com', '123123', 'jairo.lopez', '11/11/2014', '11:02:am'),
(13, '5642134', 'Jim', 'Morrison', 'jim.morrison@thedoors.com', 'Admin ', 'jim.morrison', '11/11/2014', '11:02:am'),
(14, '7180047', 'Antonio', 'Rojas', 'antoniojoserojas@correo.com', '1234567890', 'antonio.rojas', '11/11/2014', '11:02:am'),
(15, '7418529', 'Guillermo', 'García', 'guillermo.garcia@correo.com', '123456', 'guillermo.garcia', '11/11/2014', '11:02:am'),
(16, '7712437', 'Javier', 'Olaya', 'lojavi@correo.com', 'password', 'javier.olaya', '11/11/2014', '11:02:am'),
(17, '7714218', 'Luis', 'Chavarro', 'lueduar8021@correo.com', '12345678', 'luis.chavarro', '11/11/2014', '11:02:am'),
(18, '8101390', 'John', 'Arango', 'johnhack10@correo.com', 'qwerty', 'john.arango', '11/11/2014', '11:02:am'),
(19, '9396337', 'Javier', 'Pedraza', 'jlpleo@correo.com', 'abc123', 'javier.pedraza', '11/11/2014', '11:02:am'),
(20, '9399152', 'Juan', 'Gomez', 'jmiguel.gomez@correo.com', '123456789', 'juan.gomez', '11/11/2014', '11:02:am'),
(21, '11202308', 'Giovanny', 'Roa', 'giovannyroa.s@correo.com', '111111', 'giovanny.roa', '11/11/2014', '11:02:am'),
(22, '11215146', 'Carlos', 'Campos', 'cmauriciocamposh@correo.com', '1234567', 'carlos.campos', '11/11/2014', '11:02:am'),
(23, '11228483', 'Andres', 'Lopez', 'andrew.reload@correo.com', 'iloveyou', 'andres.lopez', '11/11/2014', '11:02:am'),
(24, '11255283', 'Christian', 'Garavito', 'christianandres89@correo.com', 'adobe123', 'christian.garavito', '11/11/2014', '11:02:am'),
(25, '11276127', 'Jorge', 'Rubiano', 'jorge.rubiano@correo.com', '111111', 'jorge.rubiano', '11/11/2014', '11:02:am'),
(26, '11355188', 'Camilo', 'Quiroga', 'camilo.schuler@correo.com', '1234567', 'camilo.quiroga', '11/11/2014', '11:02:am'),
(27, '11448244', 'John Hendrik', 'Galvis', 'jhadfgb@correo.es', 'iloveyou', 'johnhendrik.galvis', '11/11/2014', '11:02:am'),
(28, '12345698', 'John', 'Ono', 'john.lennon@thebeatles.com', 'adobe123', 'john.lennon', '11/11/2014', '11:02:am'),
(29, '13720254', 'Oscar', 'Gomez', 'oscarj1893@correo.com', '123123', 'oscar.gomez', '11/11/2014', '11:02:am'),
(30, '13992644', 'Cesar', 'Garcia', 'enterfaithnoise@correo.com', 'Admin ', 'cesar.garcia', '11/11/2014', '11:02:am'),
(31, '15876290', 'Ivan', 'Luna', 'ivanlunago@correo.com', '1234567890', 'ivan.luna', '11/11/2014', '11:02:am'),
(32, '19476149', 'Julio', 'Sayer', 'jh_sayerc@correo.com', 'letmein', 'julio.sayer', '11/11/2014', '11:02:am'),
(33, '19706844', 'Ciro', 'Berrio', 'ciaberrio@correo.com', 'photoshop', 'ciro.berrio', '11/11/2014', '11:02:am'),
(34, '20370558', 'Yesika', 'Sanchez', 'yesika_a5@correo.es', '1234', 'yesika.sanchez', '11/11/2014', '11:02:am'),
(35, '20626893', 'Lorena', 'Chiquiza', 'lorenachiquiza@correo.com', 'monkey', 'lorena.chiquiza', '11/11/2014', '11:02:am'),
(36, '23690673', 'Sandra', 'Cardenas', 'sandramaca77@correo.com', 'shadow', 'sandra.cardenas', '11/11/2014', '11:02:am'),
(37, '24341400', 'Sandra', 'Pineda', 'milesandra@correo.com', 'photoshop', 'sandra.pineda', '11/11/2014', '11:02:am'),
(38, '25290909', 'Johana', 'Perez', 'johanape17@correo.com', '111111', 'johana.perez', '11/11/2014', '11:02:am'),
(39, '26035789', 'Yumaris', 'Ñezco', 'gordalang@correo.com', '1234567', 'yumaris.ezco', '11/11/2014', '11:02:am'),
(40, '26175111', 'Gloria', 'Galvan', 'luci2727@correo.com', '1234567', 'gloria.galvan', '11/11/2014', '11:02:am'),
(41, '26670984', 'Cira', 'Baena', 'cira.baena@correo.com', 'iloveyou', 'cira.baena', '11/11/2014', '11:02:am'),
(42, '27895533', 'Zulay', 'Diez', 'pocha1007@correo.com', 'adobe123', 'zulay.diez', '11/11/2014', '11:02:am'),
(43, '28556277', 'Beatriz', 'Tovar', 'flakutovar441@correo.com', '123123', 'beatriz.tovar', '11/11/2014', '11:02:am'),
(44, '30080296', 'Luz', 'Garavito', 'friend_ito@correo.es', 'Admin ', 'luz.garavito', '11/11/2014', '11:02:am'),
(45, '31585939', 'Ana', 'Ruiz', 'milenaruiz@correo.com', '1234567890', 'ana.ruiz', '11/11/2014', '11:02:am'),
(46, '31790117', 'Sully', 'Castillo', 'sullya21@correo.com', 'letmein', 'sully.castillo', '11/11/2014', '11:02:am'),
(47, '32112346', 'Dave', 'Grohl', 'dave.grohl@foofighters.com', 'photoshop', 'dave.grohl', '11/11/2014', '11:02:am'),
(48, '35197975', 'Diana', 'Perdomo', 'dianamarcelaperdomo@correo.com', '1234', 'diana.perdomo', '11/11/2014', '11:02:am'),
(49, '35425444', 'Angelica', 'Rodriguez', 'otalorapatricia@correo.com', 'monkey', 'angelica.rodriguez', '11/11/2014', '11:02:am'),
(50, '35427453', 'Nancy', 'Cuervo', 'namicu@correo.com', 'shadow', 'nancy.cuervo', '11/11/2014', '11:02:am'),
(51, '35696016', 'Neila', 'Potes', 'castipo@correo.com', 'photoshop', 'neila.potes', '11/11/2014', '11:02:am'),
(52, '36290209', 'Diana', 'Rodriguez', 'mylerca@correo.com', '111111', 'diana.rodriguez', '11/11/2014', '11:02:am'),
(53, '36301113', 'Maria', 'Bonilla', 'mariangelicabonilla@correo.com', '1234567', 'maria.bonilla', '11/11/2014', '11:02:am'),
(54, '36719075', 'Johana', 'Sanchez', 'johana_isabelita@correo.com', 'iloveyou', 'johana.sanchez', '11/11/2014', '11:02:am'),
(55, '37080418', 'Angela', 'Martinez', 'angelama246@correo.com', 'adobe123', 'angela.martinez', '11/11/2014', '11:02:am'),
(56, '39046582', 'Rocio Del', 'Rivas', 'pilita782004@correo.com', '123123', 'rociodel.rivas', '11/11/2014', '11:02:am'),
(57, '39577968', 'Johana', 'Rios', 'jariben@correo.com', 'Admin ', 'johana.rios', '11/11/2014', '11:02:am'),
(58, '39580257', 'Natalia', 'Gutierrez', 'natik717@correo.com', '1234567890', 'natalia.gutierrez', '11/11/2014', '11:02:am'),
(59, '39731894', 'Lilia', 'Reyes', 'rocioreyes16@correo.com', 'letmein', 'lilia.reyes', '11/11/2014', '11:02:am'),
(60, '40330820', 'Brenda', 'Guevara', 'brenatgue@correo.com', 'photoshop', 'brenda.guevara', '11/11/2014', '11:02:am'),
(61, '43640590', 'Deisy', 'Cardona', 'deisycardona@correo.com', '1234', 'deisy.cardona', '11/11/2014', '11:02:am'),
(62, '52101928', 'Olga', 'Santana', 'olgasanq27@correo.com', 'photoshop', 'olga.santana', '11/11/2014', '11:02:am'),
(63, '52280116', 'Diana', 'Rubio', 'dmarcelarubiop75@correo.com', '1234', 'diana.rubio', '11/11/2014', '11:02:am'),
(64, '52519239', 'Luz', 'Rincon', 'adryrinb@correo.com', 'monkey', 'luz.rincon', '11/11/2014', '11:02:am'),
(65, '52664633', 'Kelly', 'Hospital', 'flordeloto830@correo.com', 'shadow', 'kelly.hospital', '11/11/2014', '11:02:am'),
(66, '52853855', 'Sonia', 'Camacho', 'sonia.camacho@correo.com', 'photoshop', 'sonia.camacho', '11/11/2014', '11:02:am'),
(67, '52868222', 'Franchesca', 'Hernandez', 'cheka2925@correo.com', '111111', 'franchesca.hernandez', '11/11/2014', '11:02:am'),
(68, '52888308', 'Leydy', 'Torres', 'lcarotorres@correo.es', '1234567', 'leydy.torres', '11/11/2014', '11:02:am'),
(69, '52904407', 'Wendy', 'Gantiva', 'nairobi56@correo.com', 'iloveyou', 'wendy.gantiva', '11/11/2014', '11:02:am');