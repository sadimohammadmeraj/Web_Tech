
// Option 1: Password Recovery
function passwordRecovery() {

    let email = prompt("Enter your registered email:");

    if (email === null || email.trim() === "") {
        alert("Please enter your email address.");
    }
    else if (email.trim() === "admin123@gmail.com") {
        alert("Password recovery request submitted successfully!");
    }
    else {
        alert("Email address not registered!");
    }
}


// Option 2: Try Another Way
function tryAnotherWay() {

    let choice = prompt(
        "Choose another verification method:\n1. Username\n2. Email"
    );

    if (choice === "1") {

        let username = prompt("Enter your username:");

        if (username === "admin") {
            alert("Username verified successfully!");
        }
        else if (username !== null) {
            alert("Invalid username!");
        }

    }

    else if (choice === "2") {

        let email = prompt("Enter your registered email:");

        if (email === "admin123@gmail.com") {
            alert("Email verified successfully!");
        }
        else if (email !== null) {
            alert("Invalid email!");
        }

    }

    else if (choice !== null) {
        alert("Invalid selection!");
    }

}


// Option 3: Contact Support
function contactSupport() {

    alert(
        "For account assistance, please contact:\n\n" +
        "Email: admin123@gmail.com"
    );

}
