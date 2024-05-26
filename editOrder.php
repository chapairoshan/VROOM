<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Order</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <style>  
        input[readonly] {
            background-color: #f2f2f2; /* Light gray background to indicate non-editable */
            border: none; /* Remove border */
            color: #555; /* Darker text color */
            pointer-events: none; /* Prevent clicking and focus */
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f2f2f2;
        }
        
        form {
            max-width: 500px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            text-align: center;
            margin-bottom: 20px;
        }
        label {
            display: inline-block;
            width: 45%; /* Adjust width as needed */
            margin-bottom: 10px;
            font-weight: bold;
        }
        input[type="text"], select {
            width: 50%; /* Adjust width as needed */
            display: inline-block;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        input[type="submit"] {
            width: 100%;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        button {
            width: 100%;
            padding: 10px;
            background-color: #008CBA;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
        }
        button:hover {
            background-color: #005f79;
        }
    </style>
</head>
<body>
    <h2 style="margin-top: 0px;"> Edit Order Details</h2>
    <?php
    // Establish database connection
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "newappdata";

    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Fetch order details based on OrderID
    if (isset($_GET['OrderID'])) {
        $OrderID = $_GET['OrderID'];
        
        // Check if the form is submitted with the updated order details
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Retrieve the updated order details from the form
            $fullName = $_POST['fullName'];
            $phoneNumber = $_POST['phoneNumber'];
            $dateOrderPickup = $_POST['dateOrderPickup'];
            $dateOrderDrop = $_POST['dateOrderDrop'];
            $carSelected = $_POST['carSelected'];
            $fuelType = $_POST['fuelType'];
            $brandSelected = $_POST['brandSelected'];
            $username = $_POST['username'];
            $spclMsg = $_POST['spclMsg'];
            $status = $_POST['status'];

            // Update the order details in the database
            $sql = "UPDATE PreviousOrders SET FullName=?, PhoneNumber=?, DateOrderPickup=?, DateOrderDrop=?, CarSelected=?, FuelType=?, BrandSelected=?, username=?, spclMsg=?, status=? WHERE OrderID=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ssssssssssi", $fullName, $phoneNumber, $dateOrderPickup, $dateOrderDrop, $carSelected, $fuelType, $brandSelected, $username, $spclMsg, $status, $OrderID);
            
            if ($stmt->execute()) {
                // If update is successful, show success message using Toastify.js
                echo "<script src='https://cdn.jsdelivr.net/npm/toastify-js'></script>";
                echo "<script>
                        Toastify({
                            text: 'Order details updated successfully!',
                            duration: 3000,
                            gravity: 'top',
                            position: 'right',
                            backgroundColor: '#4CAF50',
                            stopOnFocus: true,
                        }).showToast();
                    </script>";
                // Redirect to prevent resubmission on page reload
                // header("Location: {$_SERVER['REQUEST_URI']}");
                // exit();
            } else {
                // If update fails, show error message using Toastify.js
                echo "<script src='https://cdn.jsdelivr.net/npm/toastify-js'></script>";
                echo "<script>
                        Toastify({
                            text: 'Failed to update order details!',
                            duration: 3000,
                            gravity: 'top',
                            position: 'right',
                            backgroundColor: '#f44336',
                            stopOnFocus: true,
                        }).showToast();
                    </script>";
            }
        }

        // Fetch order details from the database
        $sql = "SELECT * FROM PreviousOrders WHERE OrderID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $OrderID);
        $stmt->execute();
        $result = $stmt->get_result();
        $order = $result->fetch_assoc();
    } else {
        echo "Order ID not provided.";
    }
    ?>

    <!-- Order details form -->
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?OrderID=' . $OrderID; ?>" method="post">
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" name="fullName" value="<?php echo isset($order['FullName']) ? $order['FullName'] : ''; ?>">

        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value="<?php echo isset($order['PhoneNumber']) ? $order['PhoneNumber'] : ''; ?>">

        <label for="dateOrderPickup">Date Order Pickup:</label>
        <input type="text" id="dateOrderPickup" name="dateOrderPickup" value="<?php echo isset($order['DateOrderPickup']) ? $order['DateOrderPickup'] : ''; ?>">

        <label for="dateOrderDrop">Date Order Drop:</label>
        <input type="text" id="dateOrderDrop" name="dateOrderDrop" value="<?php echo isset($order['DateOrderDrop']) ? $order['DateOrderDrop'] : ''; ?>">

        <label for="carSelected">Car Selected:</label>
        <input type="text" readonly id="carSelected" name="carSelected" value="<?php echo isset($order['CarSelected']) ? $order['CarSelected'] : ''; ?>">

        <label for="fuelType">Fuel Type:</label>
        <input type="text" readonly id="fuelType" name="fuelType" value="<?php echo isset($order['FuelType']) ? $order['FuelType'] : ''; ?>">

        <label for="brandSelected">Brand Selected:</label>
        <input type="text" readonly id="brandSelected" name="brandSelected" value="<?php echo isset($order['BrandSelected']) ? $order['BrandSelected'] : ''; ?>">

        <label for="username">Username:</label>
        <input type="text" readonly id="username" name="username" value="<?php echo isset($order['username']) ? $order['username'] : ''; ?>">

        <label for="spclMsg">Special Message:</label>
        <input type="text" id="spclMsg" name="spclMsg" value="<?php echo isset($order['spclMsg']) ? $order['spclMsg'] : ''; ?>">

        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="Active" <?php if(isset($order['status']) && $order['status'] == 'Active') echo 'selected'; ?>>Active</option>
            <option value="Completed" <?php if(isset($order['status']) && $order['status'] == 'Completed') echo 'selected'; ?>>Completed</option>
            <option value="Cancelled" <?php if(isset($order['status']) && $order['status'] == 'Cancelled') echo 'selected'; ?>>Cancelled</option>
        </select>

        <input type="hidden" name="OrderID" value="<?php echo $OrderID; ?>">
        <input type="submit" value="Update">
</form>

<!-- Go back button -->
<button onclick="window.location.href='use.html'">Go Back</button>


