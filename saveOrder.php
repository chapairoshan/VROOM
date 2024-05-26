<?php
// Check if the saveOrder parameter is set in the POST request
if (isset($_POST['saveOrder'])) {
    // Establish a database connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "newappdata";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetching data from the POST request
    $cName = $_POST['cName'];
    $cEmail = $_POST['cEmail'];
    $cMobile = $_POST['cMobile'];
    $cartype = $_POST['cartype'];
    $carbrand = $_POST['carbrand'];
    $fueltype = $_POST['fueltype'];
    $pickdate = $_POST['pickdate'];
    $dropdate = $_POST['dropdate'];
    $username = $_POST['username'];
    $spclMessage = $_POST['spclMsg'];
    // Prepare and execute statement to insert data into database
    $stmt = $conn->prepare("INSERT INTO PreviousOrders (FullName, PhoneNumber, DateOrderPickup, DateOrderDrop, CarSelected, FuelType, BrandSelected, username, spclMsg) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $cName, $cMobile, $pickdate, $dropdate, $cartype, $fueltype, $carbrand, $username, $spclMessage);

    // Execute the statement
    if ($stmt->execute()) {
        echo "success"; // Send success response back to JavaScript function
    } else {
        echo "Error executing query: " . $conn->error; // Send error response back to JavaScript function
    }

    // Close database connection
    $stmt->close();
    $conn->close();
}
?>
