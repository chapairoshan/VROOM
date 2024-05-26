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

if (isset($_POST['passwordChange'])) {
    $cp = $_POST['currentPassword'];
    $np = $_POST['newPassword'];
    $username = $_POST['username'];

    $hcp = hash('sha256', $cp);

    // Retrieve the current password hash for the 'admin' user
    $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check if any rows are returned
    if ($stmt->num_rows > 0) {
        // Bind the result
        $stmt->bind_result($storedPassword);
        $stmt->fetch();

        // Verify the current password
        if (($hcp == $storedPassword)) {
            $newPasswordHash = hash('sha256', $np);

            // Prepare and execute SQL statement to update the password
            $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
            $updateStmt->bind_param("ss", $newPasswordHash, $username);

            if ($updateStmt->execute()) {
                echo "success";
            } else {
                echo "Error updating password: " . $conn->error;
            }

            // Close the update statement
            $updateStmt->close();
        } else {
            echo $hcp, $storedPassword;
        }
    } else {
        echo "User not found";
    }

    // Close the select statement
    $stmt->close();
}




$conn->close();
?>
