console.log("login js accessed!");

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
                    // Session started, handle login success
                    if(username === "admin") {
                        let message = "Admin login successful";
                        loginSuccess(message);
                        setTimeout(redirect(), 5000);
                        window.location.replace("admintask.html");
                    } else {
                        // Set session variable in localStorage
                        localStorage.setItem("username", username);
                        window.location.replace("index2.html");
                        alert("Login successful");
                    }
                } else {
                    errorMessage.innerText = "**Invalid username or password**";
                    errorMessage.style.display = "block";
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

// Function to check if the user is logged in
function checkLogin() {
    var username = localStorage.getItem("username");
    if(username) {
        // User is logged in, perform necessary actions
        document.getElementById("username").innerText = username; // Display username dynamically
    } else if (!window.location.pathname.endsWith("log.html")) {
        // User is not logged in and not on the login page, redirect to login page
        window.location.replace("log.html"); // Replace with your login page URL
    }
}

// Function to sign out
function signOut() {
    localStorage.removeItem("username");
    window.location.replace("log.html"); // Redirect to login page after sign out
}

function isValidUsername(username) {
    return username.trim() !== "" && username.length >= 4;
}

function isValidPassword(password) {
    return password.trim() !== "" && password.length >= 8;
}

// Call the checkLogin function on page load to maintain login state across pages
checkLogin();