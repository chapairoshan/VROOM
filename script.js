console.log("file accessed! 1")

function openPopup() {
    const popup = document.getElementById("popup");
    if (!popup) {
        console.error("Popup element not found.");
        return;
    }
    popup.style.display = "block";

    fetch('fetchData.php')
        .then(response => response.json())
        .then(data => {
            if (!data || !data.cars) {
                console.error("Data is invalid:", data);
                return;
            }
            const username = localStorage.getItem('username');
            var currentUser = data.users.find(user => user.username === username);
            if (currentUser) {
                // Set the value of the cName input field to the full name of the current user
                var cNameInput = document.getElementById('cName');
                cNameInput.value = currentUser.full_name;
                var cEmailInput = document.getElementById('cEmail');
                cEmailInput.value = currentUser.email;
                var cMobileInput = document.getElementById('cMobile');
                cMobileInput.value = currentUser.mobile;
            } else {
                console.error("User not found:", username);
            }
            // Function to populate select options
            function populateSelect(selectId, options) {
                let select = document.getElementById(selectId);
                if (!select) {
                    console.error("Select element not found:", selectId);
                    return;
                }
                options.forEach(option => {
                    let optionElement = document.createElement("option");
                    optionElement.value = option;
                    optionElement.textContent = option;
                    select.appendChild(optionElement);
                });
            }

            // Extract unique car types, brands, and names from the data
            let carNames = [];
            let carBrands = [];
            let carTypes = [];
            data.cars.forEach(car => {
                if (!carNames.includes(car.CarName)) {
                    carNames.push(car.CarName);
                }
                if (!carBrands.includes(car.CarBrand)) {
                    carBrands.push(car.CarBrand);
                }
                if (!carTypes.includes(car.CarType)) {
                    carTypes.push(car.CarType);
                }
            });

            // Populate select options
            populateSelect("car-type", carNames);
            populateSelect("car-brand", carBrands);
            populateSelect("fuel-type", carTypes);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const reserveButton = document.querySelector(".reserve-button");
    const closeButton = document.getElementById("close-button");

    // if (reserveButton) {
    //     reserveButton.addEventListener("click", openPopup);
    // }

    if (closeButton) {
        closeButton.addEventListener("click", closePopup);
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Function to open the reservation popup
    // function openPopup() {
    //     document.getElementById('popup').classList.remove('hidden');
    //     document.body.style.overflow = 'hidden'; // Prevent scrolling
    // }

    // Function to close the reservation popup
    function closePopup() {
        document.getElementById('popup').classList.add('hidden');
        document.body.style.overflow = 'auto'; // Allow scrolling
    }

    // Function to open the reservation popup for repopup
    function openRepopup() {
        document.getElementById('repopup').classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close the reservation popup for repopup
    function reclosePopup() {
        document.getElementById('repopup').classList.add('hidden');
        document.body.style.overflow = 'auto'; // Allow scrolling
    }

    // Close the reservation popup for repopup when clicking outside of it
    window.onclick = function(event) {
        if (event.target == document.getElementById('repopup')) {
            reclosePopup();
        }
    };
});


function togglePopup() {
    var white = document.getElementById('white');
    white.style.display = white.style.display === 'none' ? 'block' : 'none';
}


      
// to show description


function showDescription(carType) {
    let titleElement = document.getElementById('car-title');
    let infoElement = document.getElementById('car-info');

    if (titleElement && infoElement) {
        let description = document.getElementById('popup');
        description.classList.remove('hidden');

        if (carType === 'SUV') {
            titleElement.textContent = 'SUV';
            infoElement.textContent = 'SUVs are a type of vehicle that combines elements of a traditional passenger car with features from off-road vehicles, such as higher ground clearance and four-wheel drive capabilities. They often offer more space and versatility compared to sedans or hatchbacks.';
        } else if (carType === 'Sedans') {
            titleElement.textContent = 'Sedans';
            infoElement.textContent = 'Sedans are passenger cars with separate compartments for engine, passenger, and cargo, typically characterized by two rows of seating and a fixed roof. They are designed primarily for passenger transportation rather than cargo or towing.';
        } else if (carType === 'Economy') {
            titleElement.textContent = 'Economy Cars';
            infoElement.textContent = 'Economy vehicles are compact cars that prioritize cost-effectiveness in terms of purchase price, fuel efficiency, and maintenance. They are typically smaller in size, making them easy to maneuver and park in urban environments.';
        }
    } else {
        console.error("Element with id 'car-title' or 'car-info' not found.");
    }
}

// const reserveButtons = document.querySelectorAll(".reserve-button");
// if (reserveButtons) {
//     reserveButtons.forEach(button => {
//         button.addEventListener("click", openPopup);
//     });
// }

const closeButton = document.getElementById("close-button");
if (closeButton) {
    closeButton.addEventListener("click", closePopup);
}

const carSections = document.querySelectorAll(".car-section");
if (carSections) {
    carSections.forEach(section => {
        section.addEventListener("click", function() {
            showDescription(section.dataset.name);
        });
    });
}

function loginSuccess(message){
    var popup = document.getElementById('successPopup');
    var messageElement = document.getElementById('popupMessage');
    messageElement.textContent = message; // Set the message content
    popup.style.display = 'block';
}

// function login() {
//     document.getElementById("errorMessage").style.display = "none";
//     var username = document.getElementById('loginUsername').value;
//     var password = document.getElementById('loginPassword').value;
//     var errorMessage = document.getElementById("errorMessage");

//     if (!isValidUsername(username)) {
//         document.getElementById('loginUsername').setAttribute("placeholder", "Enter a valid username");
//         errorMessage.innerText = "**Enter a valid username**";
//         errorMessage.style.display = "block";
//         return;
//     } e

//     if (!isValidPassword(password)) {
//         document.getElementById('loginPassword').setAttribute("placeholder", "Enter a valid password");
//         errorMessage.innerText = "**Enter a valid password**";
//         errorMessage.style.display = "block";
//         return;
//     }

//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function() {
//         if (this.readyState == 4) {
//             if (this.status == 200) {
//                 var response = this.responseText;
//                 if (response.trim() === "success") {
//                     if(username==="admin"){
//                         let message = "Admin login successful";
//                         loginSuccess(message);
//                         setTimeout(redirect(), 5000);
//                         window.location.replace("admintask.html");
//                         return;
//                     }
//                     window.location.replace("index2.html");
//                     alert("Login successful");
//                 } else {
//                     errorMessage.innerText = "**Invalid username or password**";
//                     errorMessage.style.display = "block";
//                     return;
//                 }
//             } else {
//                 alert("An error occurred while processing your request.");
//             }
//         }
//     };
//     xhr.open("POST", "auth.php", true);
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.send("login=true&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
// }

function isValidUsername(username) {
    return username.trim() !== "" && username.length >= 4;
}

function isValidPassword(password) {
    return password.trim() !== "" && password.length >= 8;
}



function signup() {
    document.getElementById("errorMessage").style.display = "none";
    var fullName = document.getElementById('signupFullName').value;
    var address = document.getElementById('signupAddress').value;
    var email = document.getElementById('signupEmail').value;
    var mobile = document.getElementById('signupMobile').value;
    var username = document.getElementById('signupUsername').value;
    var password = document.getElementById('signupPassword').value;
    var verifypassword = document.getElementById('verifyPassword').value;

    if (mobile == "" || mobile < 10) {
        errorMessage.innerText = "Mobile number should be 10 digits long";
        errorMessage.style.display = "block";
        return;
    }

    if (!isValidUsername(username)) {
        errorMessage.innerText = "**Enter a valid username**";
        errorMessage.style.display = "block";
        return;
    } 

    if (!isValidPassword(password)) {
        errorMessage.innerText = "**Enter a valid password**";
        errorMessage.style.display = "block";
        return;
    }

    if (password != verifypassword){
        errorMessage.innerText = "**Password do not match**";
        errorMessage.style.display = "block";
        return;
    }
    console.log("value stored 1")

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log("value stored 2")

        if (this.readyState == 4 && this.status == 200) {
            console.log("1st if loop okay")
            var response = this.responseText;
            if (response.trim() === "success") {
                console.log("value stored final")
                localStorage.setItem("username", username);
                errorMessage.style.color = "green";
                errorMessage.innerText = "Signup Successful! Redirecting. . .";
                errorMessage.style.display = "block";
                setTimeout(() => {
                    window.location.replace("index2.html");
                }, 1000);
            } else {
                alert("Sign up failed. Please try again.");
            }
        }
    };

xhr.open("POST", "auth.php", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send("signup=true&fullName=" + fullName + "&address=" + address + "&email=" + email + "&mobile=" + mobile + "&username=" + username + "&password=" + password);
}

document.addEventListener("DOMContentLoaded", function() {
const contactForm = document.getElementById("contactForm");

// contactForm.addEventListener("submit", function(event) {
//     event.preventDefault();
//     contactUs();
// });

function contactUs() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;
    var email = document.getElementById('email').value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = this.responseText;
                if (response.trim() === "success") {
                    alert("Message sent successfully!");
                } else {
                    alert("Message sending failed. Please try again later.");
                }
            } else {
                alert("Error: " + this.status);
            }
        }
    };

    xhr.open("POST", "auth.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("contactus=true&name=" + encodeURIComponent(name) + "&phone=" + encodeURIComponent(phone) + "&email=" + encodeURIComponent(email) + "&message=" + encodeURIComponent(message));
}
});

function fetchAndDisplayData() {
    fetch('fetchData.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generateROTableRows(data.orders);
            generateCarsTableRows(data.cars);
            generateDriversTableRows(data.drivers);
            generateDMTableRows(data.messages);
            showCarimages(data.cars);
            showDriverimages(data.drivers);
            showUsers(data.users);
            ShowUserCurrentOrders(data.orders);
            ShowUserPreviousOrders(data.orders);
            showStats(data);

        });
}

function showStats(data) {
    // Get the total number of users, cars, bookings, and cancellations from the data object
    const totalUsers = data.users.length;
    const totalCars = data.cars.length;
    const totalBookings = data.orders.length;
    const totalCancellations = data.orders.filter(order => order.status === 'Cancelled').length;

    // Update the HTML elements with the calculated values
    document.getElementById('total-users').textContent = totalUsers;
    document.getElementById('total-cars').textContent = totalCars;
    document.getElementById('total-bookings').textContent = totalBookings;
    document.getElementById('total-cancellations').textContent = totalCancellations;
}


function generateROTableRows(data) {
    const tableBody = document.getElementById('orders-table-body');
    if (!tableBody) return;

    // Sort the data by Order ID in descending order (latest order first)
    data.sort((a, b) => b.OrderID - a.OrderID);

    // Clear the existing table rows
    tableBody.innerHTML = '';

    // Function to handle sorting by status
    const sortByStatus = (a, b) => {
        const statusOrder = { 'Active': 0, 'Completed': 1, 'Cancelled': 2 };
        return statusOrder[a.status] - statusOrder[b.status];
    };

    // Sort the data by status
    data.sort(sortByStatus);

    // Loop through the sorted data and generate table rows
    data.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.username}</td>
            <td>${order.PhoneNumber}</td>
            <td>${order.DateOrderPickup}</td>
            <td>${order.DateOrderDrop}</td>
            <td>${order.CarSelected}</td>
            <td>${order.FuelType}</td>
            <td>${order.BrandSelected}</td>
            <td>${order.status}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Example usage:
// Assuming you have your data array defined somewhere, e.g., const orders = [...];
// generateROTableRows(orders);
// Example usage:
// Assuming you have your data array defined somewhere, e.g., const orders = [...];
// generateROTableRows(orders);


// Example usage:
// Assuming you have your data array defined somewhere, e.g., const orders = [...];
// generateROTableRows(orders);


function getRD(){
    
}

function generateCarsTableRows(data) {
    const tableBody = document.getElementById('cars-table-body');
    if (!tableBody) return;

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.SerialNumber}</td>
            <td>${item.CarName}</td>
            <td>${item.CarBrand}</td>
            <td>${item.CarType}</td>
            <td>${item.pph}</td>
            <td>${item.VehicleNumber}</td>
            <td>${item.Status}</td>
            <td>
                <button onclick="editCar(${item.SerialNumber})" id="editButton">Edit</button>
                <button onclick="deleteCar(${item.SerialNumber})" id="deleteButton">Delete</button>
            </td>
        `;
        // Append the new row to the existing table body
        tableBody.appendChild(row);
    });
}

function showUsers(data) {
    const tableBody = document.getElementById('user-table-body');
    if (!tableBody) return;

    data.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.full_name}</td>
            <td>${user.address}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>${user.username}</td>
            <td>${user.loyalty_points}</td>
        `;
        // Append the new row to the existing table body
        tableBody.appendChild(row);
    });
}

function ShowUserCurrentOrders(data) {
    const tableBody = document.getElementById('user-current-orders');
    if (!tableBody) return;
    let num = 1;
    data.forEach(order => {
        if(order.username == localStorage.getItem('username') && order.status == 'Active'){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${num}</td>
                <td>${order.PhoneNumber}</td>
                <td>${order.DateOrderPickup}</td>
                <td>${order.DateOrderDrop}</td>
                <td>${order.CarSelected}</td>
                <td>${order.FuelType}</td>
                <td>${order.BrandSelected}</td>
                <td>
                <button onclick="editOrder(${order.OrderID})" id="editButton">Hire Driver</button>
                <button onclick="cancelOrder(${order.OrderID})" id="deleteButton">Cancel</button>
                </td>

            `;
            // Append the new row to the existing table body
            tableBody.appendChild(row);
            num++;
        }
    });
}

function cancelOrder(orderID) {
    // Show the custom confirmation modal
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'block';

    // Add event listener to the confirm cancel button
    document.getElementById('confirmCancelBtn').addEventListener('click', function() {
        // Send a request to the server to cancel the order
        fetch(`cancelOrder.php?orderID=${orderID}`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                // Display success message using Toastify
                Toastify({
                    text: "Order canceled successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                // Display error message using Toastify
                Toastify({
                    text: "Error canceling order",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                    stopOnFocus: true
                }).showToast();
                console.error('Error canceling order:', response.statusText);
            }
        })
        .catch(error => {
            // Display error message using Toastify
            Toastify({
                text: "Error canceling order",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
                stopOnFocus: true
            }).showToast();
            console.error('Error canceling order:', error);
        });

        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });

    // Add event listener to the cancel cancel button
    document.getElementById('cancelCancelBtn').addEventListener('click', function() {
        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });
}



function ShowUserPreviousOrders(data) {
    const tableBody = document.getElementById('user-previous-orders');
    if (!tableBody) return;
    let status_check = ['Cancelled', 'Completed'];
    let num = 1;
    data.forEach(order => {
        status_value = order.status;
        if(order.username == localStorage.getItem('username') && status_check.includes(status_value)){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${num}</td> 
                <td>${order.PhoneNumber}</td>
                <td>${order.DateOrderPickup}</td>
                <td>${order.DateOrderDrop}</td>
                <td>${order.CarSelected}</td>
                <td>${order.FuelType}</td>
                <td>${order.BrandSelected}</td>
                <td>
                <button onclick="deleteOrder(${order.OrderID})" id="deleteButton">Delete</button>
                </td>
            `;
            // Append the new row to the existing table body
            tableBody.appendChild(row);
            num++;
        }
    });
}

function deleteCar(serialNumber) {
    // Show the custom confirmation modal
    const confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'block';

    // Add event listener to the confirm delete button
    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
        // Send a request to the server to delete the car
        fetch(`deleteCar.php?serialNumber=${serialNumber}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Display success message using Toastify
                Toastify({
                    text: "Car deleted successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                // Display error message using Toastify
                Toastify({
                    text: "Error deleting car",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                    stopOnFocus: true
                }).showToast();
                console.error('Error deleting car:', response.statusText);
            }
        })
        .catch(error => {
            // Display error message using Toastify
            Toastify({
                text: "Error deleting car",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
                stopOnFocus: true
            }).showToast();
            console.error('Error deleting car:', error);
        });

        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });

    // Add event listener to the cancel delete button
    document.getElementById('cancelDeleteBtn').addEventListener('click', function() {
        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });
}

function deleteOrder(deleteID) {
    // Show the custom confirmation modal
    const confirmationModal = document.getElementById('confirmationModal');
    document.getElementById('confirmationMessage').textContent = "Are you sure you want to delete this order permanently";
    confirmationModal.style.display = 'block';

    // Add event listener to the confirm delete button
    document.getElementById('confirmCancelBtn').addEventListener('click', function() {
        // Send a request to the server to delete the car
        fetch(`cancelOrder.php?deleteID=${deleteID}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Display success message using Toastify
                Toastify({
                    text: "Order deleted successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                // Display error message using Toastify
                Toastify({
                    text: "Error deleting Order",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "red",
                    stopOnFocus: true
                }).showToast();
                console.error('Error deleting Order:', response.statusText);
            }
        })
        .catch(error => {
            // Display error message using Toastify
            Toastify({
                text: "Error deleting Order",
                duration: 3000,
                gravity: "top",
                position: "right",
                backgroundColor: "red",
                stopOnFocus: true
            }).showToast();
            console.error('Error deleting Order:', error);
        });

        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });

    // Add event listener to the cancel delete button
    document.getElementById('cancelCancelBtn').addEventListener('click', function() {
        // Hide the confirmation modal
        confirmationModal.style.display = 'none';
    });
}



function editCar(serialNumber) {
    window.location.href = `editCar.php?serialNumber=${serialNumber}`;
}

function generateDMTableRows(data) {
    const tableBody = document.getElementById('messages-table-body');
    if (!tableBody) return;
    data.forEach(dm => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${dm.name}</td>
            <td>${dm.email}</td>
            <td>${dm.phone}</td>
            <td>${dm.message}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showCarimages(data) {
    console.log("inside show cars");
    const listBody = document.getElementById('car-collection-list');
    if (!listBody) return;
    let i = 0;
    data.forEach(item => {
        const list = document.createElement('li');
        list.innerHTML = `
            <img src="image/${item.Image}" alt="Car ${++i} - ${item.Image}">
            <i onclick="showCarInfo('${item.CarName}', '${item.CarBrand}', '${item.CarType}', '${item.SerialNumber}', '${item.Status}', '${item.VehicleNumber}', '${item.pph}')" class='bx bx-dots-vertical-rounded'></i>  
        `;
        listBody.appendChild(list);
    });
}

function showCarInfo(carName, carBrand, carType, serialNumber, status, vehicleNumber, pph) {
    const carInfoContainer = document.getElementById('info-popup');

    // HTML content to display the car information
    const carInfoHTML = `
        <div>
            <span onclick="infoHide()" class="info-close">&times;</span>
            <h2>Car Information</h2>
            <p><strong>Car ID:</strong> ${serialNumber}</p>
            <p><strong>Name:</strong> ${carName}</p>
            <p><strong>Brand:</strong> ${carBrand}</p>
            <p><strong>Type:</strong> ${carType}</p>
            <p><strong>Status:</strong> ${status}</p>
            <p><strong>Vehicle Number:</strong> ${vehicleNumber}</p>
            <p><strong>Price per hour:</strong> ${pph}</p>
        </div>
    `;

    carInfoContainer.innerHTML = carInfoHTML;

    carInfoContainer.style.display = 'block';
}

function infoHide(){
    document.getElementById('info-popup').style.display = 'none';
}




fetchAndDisplayData();

function uploadImage() {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        const imageInput = document.getElementById('image');
        const file = imageInput.files[0]; // Get the selected file
        formData.append('image', file);
        console.log("mid");
        console.log(formData);
        console.log("end");

        fetch('addCars.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Image uploaded successfully');
                return response.json(); // Parse the JSON response
            } else {
                console.error('Error uploading image:', response.statusText);
                reject('Error uploading image');
            }
        })
        .then(data => {
            resolve(data.fileName); // Resolve with the targetFile value
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            reject(error);
        });
    });
}

function saveCars(fileName) {
    var carName = document.getElementById('carName').value;
    var carBrand = document.getElementById('carBrand').value;
    var vehicleNumber = document.getElementById('vehicleNumber').value;
    var pph = document.getElementById('pph').value;
    var carType = document.getElementById('carType').value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            console.log(response);
            if (response.trim() === "success") {
                Toastify({
                    text: "Car saved successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                console.log("bug feature");
            }
        }
    };
    xhr.open("POST", "addCars.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("saveCars=true&carName=" + carName + "&carBrand=" + carBrand + "&pph=" + pph + "&VehicleNumber=" + vehicleNumber + "&carType=" + carType + "&fileName=" + fileName);
}


// Function to handle the save button click
function saveButton() {
    // Call uploadImage first, then saveCars with the returned targetFile
    uploadImage()
        .then(fileName => {
            saveCars(fileName);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Image upload failed. Please try again.");
        });
}

function checkLogin(){
    if(localStorage.getItem('username')){
        if(localStorage.getItem('username') == "admin"){
            window.location.replace("admintask.html");
            return;
        }
        window.location.replace("index2.html");
    } else {
        window.location.replace("log.html");
    }
}

function saveOrder() {
    var cName = document.getElementById('cName').value;
    var cEmail = document.getElementById('cEmail').value;
    var cMobile = document.getElementById('cMobile').value;
    var cartype = document.getElementById('car-type').value;
    var carbrand = document.getElementById('car-brand').value;
    var fueltype = document.getElementById('fuel-type').value;
    var pickdate = document.getElementById('pickup-date').value;
    var dropdate = document.getElementById('drop-date').value;
    var username = localStorage.getItem('username');

    var xhr = new XMLHttpRequest();
    console.log(cName);
    xhr.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4) {
            var response = this.responseText;
            console.log(response);
            if (response.trim() === "success") {
                Toastify({
                    text: "Car booked successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                console.log("Failed to store order");
            }
        }
    };
    xhr.open("POST", "saveOrder.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("saveOrder=true&cName=" + cName + "&cEmail=" + cEmail + "&cMobile=" + cMobile + "&cartype=" + cartype + "&carbrand=" + carbrand + "&fueltype=" + fueltype + "&pickdate=" + pickdate + "&dropdate=" + dropdate + "&username=" + username);
}

function uploadDriverImage() {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        const imageInput = document.getElementById('driver-image');
        const file = imageInput.files[0]; // Get the selected file
        formData.append('image', file);
        console.log("mid");
        console.log(formData);
        console.log("end");

        fetch('addDrivers.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                console.log('Image uploaded successfully');
                return response.json(); // Parse the JSON response
            } else {
                console.error('Error uploading image:', response.statusText);
                reject('Error uploading image');
            }
        })
        .then(data => {
            resolve(data.fileName); // Resolve with the targetFile value
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            reject(error);
        });
    });
}

function saveDrivers(fileName) {
    var driverName = document.getElementById('driverName').value;
    var license = document.getElementById('licenseNum').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var address = document.getElementById('address').value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText;
            console.log(response);
            if (response.trim() === "success") {
                Toastify({
                    text: "Driver Saved successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    backgroundColor: "green",
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                console.log("error");
            }
        }
    };
    xhr.open("POST", "addDrivers.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("saveDrivers=true&driverName=" + driverName + "&license=" + license + "&phoneNumber=" + phoneNumber + "&address=" + address + "&fileName=" + fileName);
}


// Function to handle the save button click
function saveDriverButton() {
    // Call uploadImage first, then saveDrivers with the returned targetFile
    uploadDriverImage()
        .then(fileName => {
            saveDrivers(fileName);
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Image upload failed. Please try again.");
        });
}

function showDriverimages(data) {
    const listBody = document.getElementById('Drivers-collection-list');
    if (!listBody) return;
    let i = 0;
    data.forEach(item => {
        const list = document.createElement('li');
        list.innerHTML = `
            <img src="driver/${item.Image}" alt="Driver ${++i} - ${item.Image}">
            <i onclick="showDriverInfo('${item.DriverName}', '${item.License}', '${item.Address}', '${item.PhoneNumber}', '${item.Status}', '${item.DriverID}')" class='bx bx-dots-vertical-rounded'></i>  
        `;
        listBody.appendChild(list);
    });
}

function showDriverInfo(DriverName, License, Address, PhoneNumber, Status, DriverID) {
    const driverInfoContainer = document.getElementById('info-popup');

    // HTML content to display the driver information
    const driverInfoHTML = `
        <div>
            <span onclick="infoHide()" class="info-close">&times;</span>
            <h2>Driver Information</h2>
            <p><strong>Driver ID:</strong> ${DriverID}</p>
            <p><strong>Name:</strong> ${DriverName}</p>
            <p><strong>License No.:</strong> ${License}</p>
            <p><strong>Status:</strong> ${Status}</p>
            <p><strong>Phone Number:</strong> ${PhoneNumber}</p>
            <p><strong>Address:</strong> ${Address}</p>
        </div>
    `;

    driverInfoContainer.innerHTML = driverInfoHTML;

    driverInfoContainer.style.display = 'block';
}

function generateDriversTableRows(data) {
    const tableBody = document.getElementById('drivers-table-body');
    if (!tableBody) return;
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.DriverID}</td>
            <td>${item.DriverName}</td>
            <td>${item.License}</td>
            <td>${item.PhoneNumber}</td>
            <td>${item.Address}</td>
            <td>${item.Status}</td>
            <td>
                <button onclick="window.location.href = 'editDriver.php?DriverID=${item.DriverID}'" id="editButton">Edit</button>
                <button onclick="editDriver(${item.DriverID})" id="deleteButton">Delete</button>
            </td>
        `;
        // Append the new row to the existing table body
        tableBody.appendChild(row);
    });
}

