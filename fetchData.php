<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "newappdata";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM Cars";
$result = $conn->query($sql);

$cars = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cars[] = $row;
    }
}

$sql = "SELECT * FROM Drivers";
$result = $conn->query($sql);

$drivers = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $drivers[] = $row;
    }
}

// Uncomment if needed
/*
$sql = "SELECT * FROM LoyaltyPoints";
$result = $conn->query($sql);

$loyalty = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $loyalty[] =ß $row;
    }
}
*/

$sql = "SELECT * FROM users";
$result = $conn->query($sql);

$users = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

$sql = "SELECT * FROM PreviousOrders";
$result = $conn->query($sql);

$orders = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
}

$sql = "SELECT * FROM contactus";
$result = $conn->query($sql);

$messages = array();
if ($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        $messages[] = $row;
    }
}

$data = array(
    'cars' => $cars,
    'drivers' => $drivers,
    'orders' => $orders,
    'messages' => $messages,
    'users' => $users
);

header('Content-Type: application/json');
echo json_encode($data);

$conn->close();
?>
