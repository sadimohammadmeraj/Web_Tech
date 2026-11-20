
const form = document.getElementById("adminForm");

// Get input fields
const name = document.getElementById("name");
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
    if (name.value.trim() === "") {
        userNameError.textContent = "Username is required";
        isValid = false;
    }

    // Email Validation
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    }
    else if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        emailError.textContent = "Enter a valid email address";
        isValid = false;
    }

    // Password Validation
    if (password.value.trim() === "") {
        passwordError.textContent = "Password is required";
        isValid = false;
    }
    else if (password.value.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters";
        isValid = false;
    }

    // If all fields are valid
    if (isValid) {
        alert("Login Successful!");

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    }

});

// Clear Button Event
form.addEventListener("reset", function() {

    userNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";

});
