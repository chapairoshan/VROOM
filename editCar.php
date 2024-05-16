<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Car</title>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <style>
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
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
        }
        input[type="text"] {
            width: 100%;
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
        /* Style for Status dropdown */
        select {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
            background-repeat: no-repeat;
            background-position: calc(100% - 10px) center;
            background-size: 18px;
        }

        input[type="submit"]:hover {
            background-color: #45a049;
        }
        /* Style for Go Back button */
        button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #008CBA;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px; /* Add space between the form and button */
        }
        button:hover {
            background-color: #005f79;
        }
    </style>
</head>
<body>
    <h2>Edit Car Details</h2>
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

    // Fetch car details based on serial number
    if (isset($_GET['serialNumber'])) {
        $serialNumber = $_GET['serialNumber'];
        
        // Check if the form is submitted with the updated car details
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Retrieve the updated car details from the form
            $carName = $_POST['carName'];
            $carBrand = $_POST['carBrand'];
            $carType = $_POST['carType'];
            $vehicleNumber = $_POST['vehicleNumber'];
            $status = $_POST['status'];

            // Update the car details in the database
            $sql = "UPDATE Cars SET CarName=?, CarBrand=?, CarType=?, VehicleNumber=?, Status=? WHERE SerialNumber=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssssi", $carName, $carBrand, $carType, $vehicleNumber, $status, $serialNumber);
            
            if ($stmt->execute()) {
                // If update is successful, show success message using Toastify.js
                echo "<script src='https://cdn.jsdelivr.net/npm/toastify-js'></script>";
                echo "<script>
                        Toastify({
                            text: 'Car details updated successfully!',
                            duration: 3000,
                            gravity: 'bottom',
                            position: 'right',
                            backgroundColor: '#4CAF50',
                            stopOnFocus: true,
                        }).showToast();
                    </script>";
            } else {
                // If update fails, show error message using Toastify.js
                echo "<script src='https://cdn.jsdelivr.net/npm/toastify-js'></script>";
                echo "<script>
                        Toastify({
                            text: 'Failed to update car details!',
                            duration: 3000,
                            gravity: 'bottom',
                            position: 'right',
                            backgroundColor: '#f44336',
                            stopOnFocus: true,
                        }).showToast();
                    </script>";
            }
        }

        // Fetch car details from the database
        $sql = "SELECT * FROM Cars WHERE SerialNumber = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $serialNumber);
        $stmt->execute();
        $result = $stmt->get_result();
        $car = $result->fetch_assoc();
    } else {
        echo "Serial number not provided.";
    }
    ?>

    <!-- Car details form -->
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?serialNumber=' . $serialNumber; ?>" method="post">
        <label for="carName">Car Name:</label>
        <input type="text" id="carName" name="carName" value="<?php echo isset($car['CarName']) ? $car['CarName'] : ''; ?>"><br><br>
        
        <label for="carBrand">Car Brand:</label>
        <input type="text" id="carBrand" name="carBrand" value="<?php echo isset($car['CarBrand']) ? $car['CarBrand'] : ''; ?>"><br><br>
        
        <label for="carType">Car Type:</label>
        <input type="text" id="carType" name="carType" value="<?php echo isset($car['CarType']) ? $car['CarType'] : ''; ?>"><br><br>
        
        <label for="vehicleNumber">Vehicle Number:</label>
        <input type="text" id="vehicleNumber" name="vehicleNumber" value="<?php echo isset($car['VehicleNumber']) ? $car['VehicleNumber'] : ''; ?>"><br><br>
        
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="Available" <?php if(isset($car['Status']) && $car['Status'] == 'Available') echo 'selected'; ?>>Available</option>
            <option value="Unavailable" <?php if(isset($car['Status']) && $car['Status'] == 'Unavailable') echo 'selected'; ?>>Unavailable</option>
        </select><br><br>
        
        <input type="hidden" name="serialNumber" value="<?php echo $serialNumber; ?>">
        <input type="submit" value="Update">
    </form>

    <!-- Go back button -->
    <button onclick="window.location.href='manage.html'">Go Back</button>
</body>
</html>
