<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "newappdata";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if(isset($_POST['username'])) {
    $sql = "SELECT username FROM PreviousOrders";
    $result = $conn->query($sql);

    $userOrders = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $userOrders[] = $row;
        }
    }

    $sql = "SELECT username FROM contactus";
    $result = $conn->query($sql);

    $userData = array();
    if ($result->num_rows > 0){
        while($row = $result->fetch_assoc()){
            $userData[] = $row;
        }
    }

    $data = array(
        'userOrders' => $userOrders,
        'userData' => $userData
    );

    header('Content-Type: application/json');
    echo json_encode($data);
}
$conn->close();
?>
