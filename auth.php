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

// Handle login request
if(isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password
    $hashed_password = hash('sha256', $password);

    // Prepare and execute statement
    $stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
    $stmt->bind_param("ss", $username, $hashed_password);
    if ($stmt->execute()) {
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "success";
        } else {
            echo "failure";
        }
    } else {
        // Print error to console
        echo "Error executing login query: " . $conn->error;
    }
}

// Handle signup request
if(isset($_POST['signup'])) {
    $fullName = $_POST['fullName'];
    $address = $_POST['address'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Hash the password
    $hashed_password = hash('sha256', $password);

    // Prepare and execute statement
    $stmt = $conn->prepare("INSERT INTO users (full_name, address, email, mobile, username, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $fullName, $address, $email, $mobile, $username, $hashed_password);
    if ($stmt->execute()) {
        echo "success";
    } else {
        // Print error to console
        echo "Error executing signup query: " . $conn->error;
    }
}

if(isset($_POST['contactus'])) {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $stmt = $conn->prepare("INSERT INTO contactus (name, phone, email, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $phone, $email, $message);
    if ($stmt->execute()) {
        echo "success";
    } else {
        echo "Error executing contact us query: " . $conn->error;
    }
}

if(isset($_POST['saveCars'])) {
    // saveCars=true&carName=" + carName + "&carBrand=" + carBrand + "&VehicleNumber=" + VehicleNumber + "&carType=" + carType);
    $carName = $_POST['fullName'];
    $carBrand = $_POST['address'];
    $VehicleNumber = $_POST['email'];
    $carType = $_POST['mobile'];
    $image = $_POST['image'];
    $password = $_POST['password'];

    // Prepare and execute statement
    $stmt = $conn->prepare("INSERT INTO Cars (CarName, CarBrand, CarType, VehicleNumber, Image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fullName, $address, $email, $mobile, $username, $hashed_password, $image);
    if ($stmt->execute()) {
        echo "success";
    } else {
        // Print error to console
        echo "Error executing signup query: " . $conn->error;
    }
}

$conn->close();
?>
