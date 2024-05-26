<?php

session_start();

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Boxicons -->
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" type="text/css" href="editProfile.css">
    <link rel="stylesheet" href="use.css">

    <?php include 'include.php'; ?>
</head>

<body>
    <header>
        <nav>
            <a href="index.php" class="logo">
                <img src="icon/Black Modern Car Automotive Logo (1).png" alt="Vroom Logo">
            </a>
            <a class="homeStyle" href="index.php">Home</a>
            <a href="About.php">About Us</a>
            <a href="rent.php">Rent a Car</a>
            <a href="contact.php">Contact us</a>
            <?php if (isset($_SESSION['LoggedIn']) && $_SESSION['LoggedIn'] == true) { ?>
                <a href="use.php" class="user"> <img src="icon/user.png" alt=""></a>
                <li id="username"><?= $_SESSION['name'] ?></li>
            <?php } ?>
            <?php if (isset($_SESSION['LoggedIn']) && $_SESSION['LoggedIn'] == true) { ?>
                <a href="logout.php" class="sign-in-btn">Log Out</a>
            <?php } else { ?>
                <a href="Log.php" class="sign-in-btn">Log In</a>
            <?php } ?>
        </nav>
    </header>
    <section id="sidebar">
        <a href="#" class="profile brand" id="profile-btn">
            <img src="driver/d1.jpg" class="profile-img">
            <span class="text"><?= $_SESSION["username"] ?></span>
        </a>
        <ul class="side-menu top">

            <li>
                <a href="use.php">
                    <i class='bx bxs-book'></i>
                    <span class="text"> Current Booking</span>
                </a>
            </li>

            <li>
                <a href="use.php">
                    <i class='bx bxs-book'></i>
                    <span class="text">Recent Bookings</span>
                </a>
            </li>

            <li>
                <a href="use.php">
                    <i class='bx bxs-message-dots'></i>
                    <span class="text">Loyalty</span>
                </a>

            </li>
            <li>
                <a href="#">
                    <i class='bx bxs-like'></i>
                    <span class="text">Offer</span>
                </a>
            </li>
            <li>
                <a href="editProfile.php">
                    <i class='bx bxs-message-dots'></i>
                    <span class="text">Loyalty</span>
                </a>

            </li>
            <li>
                <a href="editProfile.php">
                    <i class='bx bxs-cog'></i>
                    <span class="text">Edit Profile</span>
                </a>
            </li>
            <li>
                <a href="usersett.php">
                    <i class='bx bxs-cog'></i>
                    <span class="text">Settings</span>
                </a>
            </li>
        </ul>
    </section>
    <div class="container">
        <h1>Edit Profile</h1>
        <form method="post" id="editProfileForm">
            <label for="fname">Full Name:</label><br>
            <input type="text" id="fname" name="fullname" value=<?php echo $_SESSION['name'] ?>><br>
            <label for="email">Email:</label><br>
            <input type="email" id="email" name="email" value=<?php echo $_SESSION['email'] ?>><br>
            <label for="address">Address:</label><br>
            <input type="text" id="address" name="address" value=<?php echo $_SESSION['address'] ?>><br>
            <label for="contact">Contact Number:</label><br>
            <input type="tel" id="contact" name="contact" value=<?php echo $_SESSION['mobile'] ?>><br>
            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password"><br>
            <label for="password">Re-enter Password:</label><br>
            <input type="password" id="confirm-password" name="confirm-password"><br>
            <input type="submit" value="Save">
            <input type="button" value="Cancel">
        </form>
    </div>
</body>
<script src="js/editProfile.js"></script>

</html>