<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Driver</title>
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
        input[type="text"],
        select {
            width: calc(100% - 22px);
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
            display: block;
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
    <h2>Edit Driver Details</h2>
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

    // Fetch Driver details based on serial number
    if (isset($_GET['DriverID'])) {
        $DriverID = $_GET['DriverID'];
        
        // Check if the form is submitted with the updated driver details
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Retrieve the updated Driver details from the form
            $driverName = $_POST['driverName'];
            $License = $_POST['License'];
            $Address = $_POST['Address'];
            $phoneNumber = $_POST['phoneNumber'];
            $status = $_POST['status'];

            // Update the Driver details in the database
            $sql = "UPDATE Drivers SET DriverName=?, License=?, Address=?, PhoneNumber=?, Status=? WHERE DriverID=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssssi", $driverName, $License, $Address, $phoneNumber, $status, $DriverID);
            
            if ($stmt->execute()) {
                // If update is successful, show success message using Toastify.js
                echo "<script src='https://cdn.jsdelivr.net/npm/toastify-js'></script>";
                echo "<script>
                        Toastify({
                            text: 'Driver details updated successfully!',
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
                            text: 'Failed to update Driver details!',
                            duration: 3000,
                            gravity: 'bottom',
                            position: 'right',
                            backgroundColor: '#f44336',
                            stopOnFocus: true,
                        }).showToast();
                    </script>";
            }
        }

        // Fetch Driver details from the database
        $sql = "SELECT * FROM Drivers WHERE DriverID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $DriverID);
        $stmt->execute();
        $result = $stmt->get_result();
        $Driver = $result->fetch_assoc();
    } else {
        echo "Serial number not provided.";
    }
    ?>

    <!-- Driver details form -->
    <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]) . '?DriverID=' . $DriverID; ?>" method="post">
        <label for="driverName">Driver Name:</label>
        <input type="text" id="driverName" name="driverName" value="<?php echo isset($Driver['DriverName']) ? $Driver['DriverName'] : ''; ?>"><br><br>
        
        <label for="License">Driver License:</label>
        <input type="text" id="License" name="License" value="<?php echo isset($Driver['License']) ? $Driver['License'] : ''; ?>"><br><br>
        
        <label for="Address">Driver Address:</label>
        <input type="text" id="Address" name="Address" value="<?php echo isset($Driver['Address']) ? $Driver['Address'] : ''; ?>"><br><br>
        
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" name="phoneNumber" value="<?php echo isset($Driver['PhoneNumber']) ? $Driver['PhoneNumber'] : ''; ?>"><br><br>
        
        <label for="status">Status:</label>
        <select id="status" name="status">
            <option value="Available" <?php if(isset($Driver['Status']) && $Driver['Status'] == 'Available') echo 'selected'; ?>>Available</option>
            <option value="Unavailable" <?php if(isset($Driver['Status']) && $Driver['Status'] == 'Unavailable') echo 'selected'; ?>>Unavailable</option>
        </select><br><br>
        
        <input type="hidden" name="DriverID" value="<?php echo $DriverID; ?>">
        <input type="submit" value="Update">
    </form>

    <!-- Go back button -->
    <button onclick="window.location.href='manage2.html'">Go Back</button>
</body>
</html>
