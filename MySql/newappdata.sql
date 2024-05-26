-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 26, 2024 at 06:22 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newappdata`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cars`
--

CREATE TABLE `Cars` (
  `SerialNumber` int(11) NOT NULL,
  `CarName` varchar(100) DEFAULT NULL,
  `CarBrand` varchar(100) DEFAULT NULL,
  `CarType` varchar(50) DEFAULT NULL,
  `pph` decimal(10,2) DEFAULT 0.00,
  `VehicleNumber` varchar(20) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Status` enum('Available','Unavailable') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cars`
--

INSERT INTO `Cars` (`SerialNumber`, `CarName`, `CarBrand`, `CarType`, `pph`, `VehicleNumber`, `Image`, `Status`) VALUES
(1, 'Kia Sonet', 'KIA', 'Petrol', 0.00, 'B AC 8587', '663080e9eb163_kia.jpg', 'Unavailable'),
(2, 'Rav4', 'Toyota', 'Petrol', 0.00, 'B AC 8734', '66308d2b34ecd_toyota.jpg', 'Unavailable'),
(3, 'Mercedes-Benz C63 S', 'Mercedes', 'Petrol', 999.99, 'B AA 1111', '6646255014b82_mecedes.webp', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `contactus`
--

CREATE TABLE `contactus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `contactus`
--

INSERT INTO `contactus` (`id`, `name`, `phone`, `email`, `message`, `created_at`) VALUES
(1, 'Roshan Chapai', '9805752350', 'hi@gmail.com', 'hi', '2024-04-23 04:27:16'),
(2, 'Simran Gurung', '1234567890', 'hii@gmail.com', 'hello', '2024-04-23 04:36:13'),
(3, 'Simran Gurung', '9805752350', 'hi@gmail.com', 'hello', '2024-04-23 04:41:31'),
(4, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', 'can i book a car?', '2024-04-23 04:49:13'),
(5, 'Pragati Kuinkel', '9805752350', 'pragati@gmail.com', 'I would like to book a car', '2024-04-23 04:59:23'),
(6, 'Rijan Neupane', '9869696969', 'neupanerijan@gmail.com', 'Roshan dai namaskar!!', '2024-05-02 05:39:58'),
(7, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', 'New message', '2024-05-06 19:05:23'),
(8, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', 'hi 2024', '2024-05-09 05:06:43'),
(9, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', 'ih', '2024-05-18 09:57:46'),
(10, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', 'ihh', '2024-05-18 09:59:29'),
(11, 'Roshan Chapai', '9805752350', 'roshanchapai@gmail.com', '123', '2024-05-21 07:52:30'),
(12, 'Bhunteyyyy', '9843567643', 'bhuntey@gmail.com', 'Hello, I was just checking the system', '2024-05-21 08:39:35');

-- --------------------------------------------------------

--
-- Table structure for table `Drivers`
--

CREATE TABLE `Drivers` (
  `DriverID` int(11) NOT NULL,
  `DriverName` varchar(255) NOT NULL,
  `License` varchar(50) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Status` enum('Available','Unavailable') DEFAULT 'Available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Drivers`
--

INSERT INTO `Drivers` (`DriverID`, `DriverName`, `License`, `Address`, `PhoneNumber`, `Image`, `Status`) VALUES
(1, 'Ram Kumar', '12345679', 'Kapan', '9812345678', '66459a83c26d4_d3.jpg', 'Available'),
(2, 'Karan Dahal', '00000000', 'Tokha', '9812345678', '664611116c3fe_karan.png', 'Available');

-- --------------------------------------------------------

--
-- Table structure for table `LoyaltyPoints`
--

CREATE TABLE `LoyaltyPoints` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Car` varchar(50) DEFAULT NULL,
  `Brand` varchar(50) DEFAULT NULL,
  `Points` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PreviousOrders`
--

CREATE TABLE `PreviousOrders` (
  `OrderID` int(11) NOT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(15) NOT NULL,
  `DateOrderPickup` date NOT NULL,
  `DateOrderDrop` date NOT NULL,
  `CarSelected` varchar(50) NOT NULL,
  `FuelType` varchar(20) NOT NULL,
  `BrandSelected` varchar(50) NOT NULL,
  `BookedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `username` varchar(50) DEFAULT NULL,
  `spclMsg` varchar(255) DEFAULT NULL,
  `status` enum('Active','Completed','Cancelled') NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `PreviousOrders`
--

INSERT INTO `PreviousOrders` (`OrderID`, `FullName`, `PhoneNumber`, `DateOrderPickup`, `DateOrderDrop`, `CarSelected`, `FuelType`, `BrandSelected`, `BookedAt`, `username`, `spclMsg`, `status`) VALUES
(1, 'Roshan Chapai', '9805752350', '2024-04-30', '2024-05-07', 'SUV', 'Electric', 'BYD', '2024-04-29 15:52:54', 'roshanchapai', 'hello', 'Cancelled'),
(2, 'Roshan Chapai', '9842229831', '2024-05-03', '2024-05-22', 'Sedan', 'Petrol', 'Toyota', '2024-04-29 17:10:02', 'newroshan', 'hello there', 'Cancelled'),
(3, 'Roshan Chapai', '9805752350', '2024-05-16', '2024-05-20', 'Kia Seltos', 'Petrol', 'KIA', '2024-05-06 21:42:33', 'roshanchapai', 'hi', 'Completed'),
(4, 'Chapai Roshan', '9805752350', '2024-06-08', '2024-06-15', 'Tata Nexon', 'Electric', 'TATA', '2024-05-06 21:45:18', 'roshanchapai', 'hi', 'Active'),
(5, 'Gaurav Sharma', '9887654321', '2024-05-22', '2024-05-23', 'Rav4', 'Petrol', 'Toyota', '2024-05-21 02:15:47', 'gaurav', 'k cha', 'Active'),
(6, 'Gaurav Sharma', '9887654321', '2024-05-25', '2024-05-30', 'Mercedes-Benz C63 S', 'Petrol', 'Mercedes', '2024-05-21 02:41:02', 'gaurav', 'sanchai?', 'Active'),
(7, 'Roshan Chapai', '9805752350', '2024-05-25', '2024-05-30', 'Kia Sonet', 'Petrol', 'KIA', '2024-05-21 07:16:27', 'roshanchapai', 'hi', 'Active'),
(8, 'Steve Karan', '9812345678', '2024-05-23', '2024-05-29', 'Kia Sonet', 'Petrol', 'KIA', '2024-05-21 08:20:58', 'stevekaran', 'Nice webiste. Full marks.', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `loyalty_points` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `address`, `email`, `mobile`, `username`, `password`, `loyalty_points`) VALUES
(1, 'roshan don', 'kapan', 'email@email.com', '9842229831', 'roshandai', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', 0.00),
(2, 'Roshan Chapai', 'Kapan', 'roshanchapai@gmail.com', '9805752350', 'roshan1', '5d2c755a287c6fa7f391e5a20296fd96166266e4dde323b4990e0abc47f9586d', 0.00),
(3, 'New User', 'Kapan', 'new@new.com', '9805752350', 'newuser', '9c9064c59f1ffa2e174ee754d2979be80dd30db552ec03e7e327e9b1a4bd594e', 0.00),
(4, 'New User', 'Kapan', 'new@new.com', '9805752350', 'newuser1', '9c9064c59f1ffa2e174ee754d2979be80dd30db552ec03e7e327e9b1a4bd594e', 0.00),
(5, 'Roshan Chapai', 'Kapan', 'roshanchapai@gmail.com', '9805752350', 'r123', '88567ae16a27e6271ffe2ea5e78df7f527ec90ee933de5992a76909ebed266bb', 0.00),
(6, 'random user', 'kapan', 'randomog@gmail.com', '1234567890', 'r124', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 0.00),
(7, 'Roshan Chapai', 'Kapan', 'roshanchapai@gmail.com', '9805752350', 'roshanchapai', '0b2fb543a17c3c6eb6f2bf5a697927712c89b0026806263a749f40ced5487adf', 0.00),
(8, 'admin', 'VROOM', 'admin@vroom.com', '9805752350', 'admin', 'ac9689e2272427085e35b9d3e3e8bed88cb3434828b43b86fc0596cad4c6e270', 0.00),
(9, 'Roshan Chapai', 'Dhapasi', 'roshanchapai@gmail.com', '9805752350', 'newroshan', '68cf705fbc9a78e47a47bd86080fd5e3779949a48520118c75d2d231a79b871e', 0.00),
(10, 'test user', 'test', 'test@test.com', '9812345678', 'testuser', 'ae5deb822e0d71992900471a7199d0d95b8e7c9d05c40a8245a281fd2c1d6684', 0.00),
(11, 'rohit chapai', 'toronto', 'rohit@gmail.com', '9812345678', 'rohitchapai', '20ce694ae01fc2228d52fccae9fc2a1ee8e8d5b73820d54f539d03d7a4664e91', 0.00),
(12, 'Gaurav Sharma', 'Kathmandu', 'gaurav@gmail.com', '9887654321', 'gaurav', '2211b4e371a79c7abbfbb0ef74979d26f03d1a1702690f44bfcfd211910ba100', 0.00),
(13, 'Aryan', 'dhapakhel', 'aryan@gmail.com', '9818236694', 'rn_dangol', '495c0c6adc308071481c6753a70c292892ce9c5fa90220a3c17b833a319e2c88', 0.00),
(14, 'Steve Karan', 'Tokha', 'karan@gmail.com', '9812345678', 'stevekaran', '05eca9ec4c808d2dae0e2958b530c6f63121cbd21db91e7895fce785a91cad4c', 0.00);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cars`
--
ALTER TABLE `Cars`
  ADD PRIMARY KEY (`SerialNumber`);

--
-- Indexes for table `contactus`
--
ALTER TABLE `contactus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Drivers`
--
ALTER TABLE `Drivers`
  ADD PRIMARY KEY (`DriverID`);

--
-- Indexes for table `LoyaltyPoints`
--
ALTER TABLE `LoyaltyPoints`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `PreviousOrders`
--
ALTER TABLE `PreviousOrders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cars`
--
ALTER TABLE `Cars`
  MODIFY `SerialNumber` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `contactus`
--
ALTER TABLE `contactus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Drivers`
--
ALTER TABLE `Drivers`
  MODIFY `DriverID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `LoyaltyPoints`
--
ALTER TABLE `LoyaltyPoints`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PreviousOrders`
--
ALTER TABLE `PreviousOrders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `LoyaltyPoints`
--
ALTER TABLE `LoyaltyPoints`
  ADD CONSTRAINT `loyaltypoints_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`id`);

--
-- Constraints for table `PreviousOrders`
--
ALTER TABLE `PreviousOrders`
  ADD CONSTRAINT `previousorders_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
