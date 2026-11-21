
// Get HTML elements
const totalUsers = document.getElementById("totalUsers");
const activeUsers = document.getElementById("activeUsers");
const newUsers = document.getElementById("newUsers");
const totalNotifications = document.getElementById("totalNotifications");

const activityTable = document.getElementById("activityTable");

// Get registered users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Get notifications from localStorage
let notifications = JSON.parse(localStorage.getItem("notifications")) || [];

// Update dashboard statistics
totalUsers.textContent = users.length;

// Count active users
activeUsers.textContent = users.filter(function(user) {
    return user.status === "Active";
}).length;

// Count recent registrations (last 7 days)
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

newUsers.textContent = users.filter(function(user) {
    return user.registrationDate &&
        new Date(user.registrationDate) >= sevenDaysAgo;
}).length;

// Update notification count
totalNotifications.textContent = notifications.length;


// Display Recent Activities
function displayActivities() {

    activityTable.innerHTML = "";

    if (users.length === 0) {
        activityTable.innerHTML = `
            <tr>
                <td colspan="4">No recent activities available.</td>
            </tr>
        `;
        return;
    }

    // Show latest five registered users
    const recentUsers = users.slice(-5).reverse();

    recentUsers.forEach(function(user) {

        const row = document.createElement("tr");

        const date = user.registrationDate
            ? new Date(user.registrationDate).toLocaleDateString()
            : "Not available";

        const nameCell = document.createElement("td");
        nameCell.textContent = user.name || "Unknown";

        const activityCell = document.createElement("td");
        activityCell.textContent = "Registered";

        const dateCell = document.createElement("td");
        dateCell.textContent = date;

        const statusCell = document.createElement("td");
        statusCell.textContent = user.status || "Active";

        row.append(nameCell, activityCell, dateCell, statusCell);

        activityTable.appendChild(row);
    });
}

displayActivities();


// Logout Button
document.getElementById("logoutBtn").addEventListener("click", function() {

    let confirmLogout = confirm("Are you sure you want to logout?");

    if (confirmLogout) {
        window.location.href = "adminLogin.html";
    }

});
