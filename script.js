console.log("file accessed! 1")

function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    const reserveButton = document.querySelector(".reserve-button");
    const closeButton = document.getElementById("close-button");

    if (reserveButton) {
        reserveButton.addEventListener("click", openPopup);
    }

    if (closeButton) {
        closeButton.addEventListener("click", closePopup);
    }
});

//second reserve

document.addEventListener('DOMContentLoaded', function() {
    // Function to open the reservation popup
    function openPopup() {
        document.getElementById('popup').classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

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

const reserveButtons = document.querySelectorAll(".reserve-button");
if (reserveButtons) {
    reserveButtons.forEach(button => {
        button.addEventListener("click", openPopup);
    });
}

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

function login() {
    document.getElementById("errorMessage").style.display = "none";
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;
    var errorMessage = document.getElementById("errorMessage");

    if (!isValidUsername(username)) {
        document.getElementById('loginUsername').setAttribute("placeholder", "Enter a valid username");
        errorMessage.innerText = "**Enter a valid username**";
        errorMessage.style.display = "block";
        return;
    } 

    if (!isValidPassword(password)) {
        document.getElementById('loginPassword').setAttribute("placeholder", "Enter a valid password");
        errorMessage.innerText = "**Enter a valid password**";
        errorMessage.style.display = "block";
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var response = this.responseText;
                if (response.trim() === "success") {
                    if(username==="admin"){
                        window.location.replace("admintask.html");
                        alert("Admin login successful");
                        return;
                    }
                    window.location.replace("index2.html");
                    alert("Login successful");
                } else {
                    errorMessage.innerText = "**Invalid username or password**";
                    errorMessage.style.display = "block";
                    return;
                }
            } else {
                alert("An error occurred while processing your request.");
            }
        }
    };
    xhr.open("POST", "auth.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("login=true&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
}

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
        alert("Passwords do not match");
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

                alert("Sign up successful. You can now log in.");
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

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    contactUs();
});

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
            generateDMTableRows(data.messages)

        });
}

// Function to dynamically generate table rows from JSON data
function generateROTableRows(data) {
    const tableBody = document.getElementById('orders-table-body');
    if (!tableBody) return;
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
        `;
        
        tableBody.appendChild(row);
    });
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
            <td>${item.VehicleNumber}</td>
            <td>${item.Status}</td>
            <td>
                <button id="editButton">Edit</button>
                <button id="deleteButton">Delete</button>
            </td>
        `;
        // Append the new row to the existing table body
        tableBody.appendChild(row);
    });
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
                resolve(); // Resolve the promise if upload is successful
            } else {
                console.error('Error uploading image:', response.statusText);
                reject('Error uploading image');
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
            reject(error);
        });
    });
}

function saveCars() {
    var carName = document.getElementById('carName').value;
    var carBrand = document.getElementById('carBrand').value;
    var vehicleNumber = document.getElementById('vehicleNumber').value;
    var carType = document.getElementById('carType').value;

    uploadImage().then(() => {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = this.responseText;
                console.log(response);
                if (response.trim() === "success") {
                    console.log("stored")
                } else {
                    console.log("bug feature");
                }
            }
        };
        xhr.open("POST", "addCars.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("saveCars=true&carName=" + carName + "&carBrand=" + carBrand + "&VehicleNumber=" + vehicleNumber + "&carType=" + carType);
    }).catch(error => {
        console.error('Error:', error);
        alert("Image upload failed. Please try again.");
    });
}

