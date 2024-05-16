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

// Check if the orderID is provided in the request
if (isset($_GET['orderID'])) {
    $orderID = $_GET['orderID'];

    // Prepare and execute the cancelation statement
    $stmt = $conn->prepare("UPDATE PreviousOrders SET Status = 'Cancelled' WHERE OrderID = ?");
    $stmt->bind_param("i", $orderID);
    
    if ($stmt->execute()) {
        // If cancelation is successful, return a success message
        echo json_encode(["success" => true, "message" => "Order canceled successfully!"]);
    } else {
        // If there's an error during cancelation, return an error message
        echo json_encode(["success" => false, "error" => "Error canceling order"]);
    }
} else {
    // If orderID is not provided, return an error message
    echo json_encode(["success" => false, "error" => "OrderID not provided"]);
}

if (isset($_GET['deleteID'])) {
    $orderID = $_GET['deleteID'];

    // Prepare and execute the delete statement
    $stmt = $conn->prepare("DELETE FROM PreviousOrders WHERE OrderID = ?");
    $stmt->bind_param("i", $orderID);
    
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
