<?php
// registrar.php: Recibe datos del formulario y registra un nuevo usuario
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "proyecto";

// Recibir datos del formulario (POST)
$usuario = isset($_POST['usuario']) ? trim($_POST['usuario']) : '';
$correo = isset($_POST['correo']) ? trim($_POST['correo']) : '';
$contrasena = isset($_POST['contrasena']) ? $_POST['contrasena'] : '';

if ($usuario && $correo && $contrasena) {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    // Encriptar la contraseña
    $hash = password_hash($contrasena, PASSWORD_DEFAULT);
    // Preparar y ejecutar la consulta
    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, correo, contrasena) VALUES (?, ?, ?)");
    if (!$stmt) {
        echo "Error en prepare: " . $conn->error;
        $conn->close();
        exit;
    }
    $stmt->bind_param("sss", $usuario, $correo, $hash);
    if ($stmt->execute()) {
        echo "Registro exitoso";
    } else {
        if ($conn->errno == 1062) {
            echo "El usuario o correo ya existe.";
        } else {
            echo "Error SQL: " . $stmt->error . " | Código: " . $stmt->errno . " | Datos: usuario=$usuario, correo=$correo";
        }
    }
    $stmt->close();
    $conn->close();
} else {
    echo "Faltan datos obligatorios.";
}
?>
