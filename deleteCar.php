<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "newappdata"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the serial number is provided in the request
if (isset($_GET['serialNumber'])) {
    $serialNumber = $_GET['serialNumber'];

    // Prepare and execute the delete statement
    $stmt = $conn->prepare("DELETE FROM Cars WHERE SerialNumber = ?");
    $stmt->bind_param("i", $serialNumber);
    
    if ($stmt->execute()) {
        // If deletion is successful, return a success message
        echo json_encode(["success" => true]);
    } else {
        // If there's an error during deletion, return an error message
        echo json_encode(["success" => false, "error" => "Error deleting car"]);
    }
} else {
    // If serial number is not provided, return an error message
    echo json_encode(["success" => false, "error" => "Serial number not provided"]);
}

// Close the database connection
$conn->close();
?>
