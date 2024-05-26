<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "newappdata";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the serial number is provided in the request
if (isset($_GET['DriverID'])) {
    $DriverID = $_GET['DriverID'];

    // Prepare and execute the delete statement
    $stmt = $conn->prepare("DELETE FROM Drivers WHERE DriverID = ?");
    $stmt->bind_param("i", $DriverID);
    
    if ($stmt->execute()) {
        // If deletion is successful, return a success message
        echo json_encode(["success" => true]);
    } else {
        // If there's an error during deletion, return an error message
        echo json_encode(["success" => false, "error" => "Error deleting Driver"]);
    }
} else {
    // If serial number is not provided, return an error message
    echo json_encode(["success" => false, "error" => "DriverID not provided"]);
}

// Close the database connection
$conn->close();
?>
