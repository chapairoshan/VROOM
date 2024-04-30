document.addEventListener("DOMContentLoaded", function() {
    const loginBtn = document.getElementById("loginBtn"); // Get the login button
    const loginContainer = document.getElementById("loginContainer"); // Get the login container

    // Add click event listener to the login button
    loginBtn.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default behavior of the link

        // Toggle the display of the login container
        if (loginContainer.style.display === "block") {
            loginContainer.style.display = "none";
        } else {
            loginContainer.style.display = "block";
        }
    });
});
