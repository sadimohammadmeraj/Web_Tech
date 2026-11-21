
const form = document.getElementById("adminForm");

// Get input fields
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Get error message elements
const userNameError = document.getElementById("userNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Form Submit Event
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Clear previous error messages
    userNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

    let isValid = true;

    // Username Validation
    if (username.value.trim() === "") {
        userNameError.textContent = "Username is required";
        isValid = false;
    }
    else if (username.value.trim() !== "admin") {
        userNameError.textContent = "Invalid username";
        isValid = false;
    }

    // Email Validation
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    }
    else if (email.value.trim() !== "admin123@gmail.com") {
        emailError.textContent = "Invalid email address";
        isValid = false;
    }

    // Password Validation
    if (password.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }
    else if (password.value !== "admin123") {
        passwordError.textContent = "Incorrect password";
        isValid = false;
    }

    // If all fields are valid
    if (isValid) {
        alert("Login Successful!");

        // Redirect to  admin dashboard
        window.location.href = "adminDashboard.html";
    }

});

// Clear Button Event
form.addEventListener("reset", function() {

    userNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

});
