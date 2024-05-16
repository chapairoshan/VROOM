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

// Define $targetFile variable
$targetFile = "";

// Handle image upload
if (isset($_FILES['image'])) {
    // Specify the directory where you want to save the uploaded images
    $uploadDirectory = "driver/";

    // Check if the directory exists, if not, create it
    if (!file_exists($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    // Get the temporary filename of the uploaded file
    $tempFile = $_FILES['image']['tmp_name'];

    $fileName = uniqid() . '_' . $_FILES['image']['name'];

    // Generate a unique filename to avoid overwriting existing files
    $targetFile = $uploadDirectory . $fileName;

    // Move the uploaded file to the specified directory
    if (move_uploaded_file($tempFile, $targetFile)) {
        // Image uploaded successfully
        echo json_encode(["success" => true, "fileName" => $fileName]); // Return success and targetFile
    } else {
        // Error uploading image
        echo json_encode(["success" => false, "error" => "Error uploading image"]);
    }
}

if (isset($_POST['saveDrivers'])) {
    $driverName = $_POST['driverName'];
    $license = $_POST['license'];
    $phoneNumber = $_POST['phoneNumber'];
    $address = $_POST['address'];

    // Get the targetFile value from the POST data
    $fileName = isset($_POST['fileName']) ? $_POST['fileName'] : "";

    // Prepare and execute statement
    $stmt = $conn->prepare("INSERT INTO Drivers (DriverName, License, Address, PhoneNumber, Image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $driverName, $license, $address, $phoneNumber, $fileName);
    if ($stmt->execute()) {
        echo "success";
    } else {
        // Print error to console
        echo "Error executing signup query: " . $conn->error;
    }
}

$conn->close();
?>
