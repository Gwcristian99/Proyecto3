<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proyecto";

// Crear conexión
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
	die("Conexión fallida: " . $conn->connect_error);
}

// Crear base de datos si no existe
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) !== TRUE) {
	die("Error creando la base de datos: " . $conn->error);
}

// Seleccionar la base de datos
$conn->select_db($dbname);

// Crear tabla de usuarios si no existe
$sql = "CREATE TABLE IF NOT EXISTS usuarios (
	id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	usuario VARCHAR(50) NOT NULL UNIQUE,
	correo VARCHAR(100) NOT NULL UNIQUE,
	contrasena VARCHAR(255) NOT NULL,
	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if ($conn->query($sql) !== TRUE) {
	die("Error creando la tabla de usuarios: " . $conn->error);
}

// Puedes cerrar la conexión si solo quieres crear la base y tabla
$conn->close();
?>
