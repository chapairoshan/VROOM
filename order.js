console.log("file accessed! order.js")

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

function saveOrder(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    var cName = document.getElementById('cName').value;
    var cEmail = document.getElementById('cEmail').value;
    var cMobile = document.getElementById('cMobile').value;
    var cartype = document.getElementById('car-type').value;
    var carbrand = document.getElementById('car-brand').value;
    var fueltype = document.getElementById('fuel-type').value;
    var pickdate = document.getElementById('pickup-date').value;
    var dropdate = document.getElementById('drop-date').value;
    var username = localStorage.getItem('username');
    var spclMsg = document.getElementById('spclMessage').value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = this.responseText.trim();
            console.log(response);
            if (response === "success") {
                Toastify({
                    text: "Car booked successfully!",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "green"
                    },
                    stopOnFocus: true
                }).showToast();
                setTimeout(() => {
                    location.reload();
                }, 3000);
            } else {
                console.log("Failed to store order");
                Toastify({
                    text: "Failed to store order",
                    duration: 3000,
                    gravity: "top",
                    position: "right",
                    style: {
                        background: "red"
                    },
                    stopOnFocus: true
                }).showToast();
            }
        } else if (this.readyState == 4) {
            console.error("Server error", this.status, this.statusText);
        }
    };

    xhr.open("POST", "saveOrder.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("saveOrder=true&cName=" + cName + "&cEmail=" + cEmail + "&cMobile=" + cMobile + "&cartype=" + cartype + "&carbrand=" + carbrand + "&fueltype=" + fueltype + "&pickdate=" + pickdate + "&dropdate=" + dropdate + "&username=" + username + "&spclMsg=" + spclMsg);
}
