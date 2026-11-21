
// ========================================
// GET HTML ELEMENTS
// ========================================

const userTable = document.getElementById("userTable");
const totalUsers = document.getElementById("totalUsers");
const activeUsers = document.getElementById("activeUsers");
const inactiveUsers = document.getElementById("inactiveUsers");

const searchUser = document.getElementById("searchUser");
const statusFilter = document.getElementById("statusFilter");
const noUsers = document.getElementById("noUsers");

const userModal = document.getElementById("userModal");
const detailsModal = document.getElementById("detailsModal");

const userForm = document.getElementById("userForm");


// ========================================
// LOAD USERS FROM LOCAL STORAGE
// ========================================

let users = JSON.parse(localStorage.getItem("users")) || [];


// Give existing users a default status and ID
users.forEach(function(user, index) {

    if (!user.id) {
        user.id = "USER-" + (index + 1);
    }

    if (!user.status) {
        user.status = "Active";
    }

});

saveUsers();


// ========================================
// SAVE USERS
// ========================================

function saveUsers() {

    localStorage.setItem("users", JSON.stringify(users));

}


// ========================================
// UPDATE SUMMARY CARDS
// ========================================

function updateSummary() {

    totalUsers.textContent = users.length;

    const activeCount = users.filter(function(user) {
        return user.status === "Active";
    }).length;

    const inactiveCount = users.filter(function(user) {
        return user.status === "Inactive";
    }).length;

    activeUsers.textContent = activeCount;
    inactiveUsers.textContent = inactiveCount;

}


// ========================================
// DISPLAY USERS
// ========================================

function displayUsers(userList) {

    userTable.innerHTML = "";

    updateSummary();

    noUsers.textContent = "";

    if (userList.length === 0) {

        noUsers.textContent = "No users found.";

        return;
    }

    userList.forEach(function(user) {

        const actualIndex = users.indexOf(user);

        const row = document.createElement("tr");


        // User ID
        const idCell = document.createElement("td");
        idCell.textContent = user.id;


        // Name
        const nameCell = document.createElement("td");
        nameCell.textContent = user.name || user.username || "N/A";


        // Email
        const emailCell = document.createElement("td");
        emailCell.textContent = user.email || "N/A";


        // Status
        const statusCell = document.createElement("td");

        const statusBadge = document.createElement("span");

        statusBadge.textContent = user.status;
        statusBadge.className = user.status === "Active"
            ? "status status-active"
            : "status status-inactive";

        statusCell.appendChild(statusBadge);


        // Registration Date
        const dateCell = document.createElement("td");

        dateCell.textContent = user.registrationDate
            ? new Date(user.registrationDate).toLocaleDateString()
            : "N/A";


        // Actions
        const actionsCell = document.createElement("td");


        // View Button
        const viewButton = document.createElement("button");

        viewButton.textContent = "View";
        viewButton.className = "action-btn view-btn";

        viewButton.addEventListener("click", function() {
            viewUser(actualIndex);
        });


        // Edit Button
        const editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.className = "action-btn edit-btn";

        editButton.addEventListener("click", function() {
            editUser(actualIndex);
        });


        // Activate / Deactivate Button
        const statusButton = document.createElement("button");

        statusButton.textContent = user.status === "Active"
            ? "Deactivate"
            : "Activate";

        statusButton.className = "action-btn status-btn";

        statusButton.addEventListener("click", function() {
            toggleUserStatus(actualIndex);
        });


        // Delete Button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "action-btn delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteUser(actualIndex);
        });


        actionsCell.append(
            viewButton,
            editButton,
            statusButton,
            deleteButton
        );


        row.append(
            idCell,
            nameCell,
            emailCell,
            statusCell,
            dateCell,
            actionsCell
        );

        userTable.appendChild(row);

    });

}


// ========================================
// SEARCH AND FILTER
// ========================================

function filterUsers() {

    const searchValue = searchUser.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filteredUsers = users.filter(function(user) {

        const name = (user.name || user.username || "").toLowerCase();
        const email = (user.email || "").toLowerCase();

        const matchesSearch =
            name.includes(searchValue) ||
            email.includes(searchValue);

        const matchesStatus =
            selectedStatus === "all" ||
            user.status === selectedStatus;

        return matchesSearch && matchesStatus;

    });

    displayUsers(filteredUsers);

}

searchUser.addEventListener("input", filterUsers);

statusFilter.addEventListener("change", filterUsers);


// ========================================
// OPEN ADD USER MODAL
// ========================================

document.getElementById("addUserBtn").addEventListener("click", function() {

    userForm.reset();

    document.getElementById("editUserId").value = "";

    document.getElementById("userModalTitle").textContent = "Add New User";

    document.getElementById("userPassword").required = true;

    userModal.classList.add("show");

});


// ========================================
// ADD / EDIT USER FORM
// ========================================

userForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const editId = document.getElementById("editUserId").value;

    const name = document.getElementById("userName").value.trim();
    const email = document.getElementById("userEmail").value.trim();

    const password = document.getElementById("userPassword").value;

    const status = document.getElementById("userStatus").value;


    // Check duplicate email
    const duplicateEmail = users.some(function(user) {

        return user.email.toLowerCase() === email.toLowerCase() &&
            String(user.id) !== editId;

    });

    if (duplicateEmail) {

        alert("This email address is already registered!");

        return;
    }


    // Edit existing user
    if (editId !== "") {

        const userIndex = users.findIndex(function(user) {
            return String(user.id) === editId;
        });

        if (userIndex === -1) {
            alert("User not found.");
            return;
        }

        users[userIndex].name = name;
        users[userIndex].email = email;
        users[userIndex].status = status;

        // Only update password if a new one was entered
        if (password.trim() !== "") {
            users[userIndex].password = password;
        }

        alert("User updated successfully!");

    }

    // Add new user
    else {

        if (password.trim() === "") {
            alert("Please enter a password.");
            return;
        }

        const newUser = {

            id: "USER-" + Date.now(),

            name: name,

            email: email,

            password: password,

            status: status,

            registrationDate: new Date().toISOString()

        };

        users.push(newUser);

        alert("New user added successfully!");

    }

    saveUsers();

    closeUserModal();

    filterUsers();

});


// ========================================
// EDIT USER
// ========================================

function editUser(index) {

    const user = users[index];

    document.getElementById("editUserId").value = user.id;

    document.getElementById("userName").value =
        user.name || user.username || "";

    document.getElementById("userEmail").value = user.email || "";

    document.getElementById("userPassword").value = "";

    document.getElementById("userPassword").required = false;

    document.getElementById("userStatus").value = user.status;

    document.getElementById("userModalTitle").textContent = "Edit User";

    userModal.classList.add("show");

}


// ========================================
// VIEW USER DETAILS
// ========================================

function viewUser(index) {

    const user = users[index];

    document.getElementById("detailId").textContent = user.id;

    document.getElementById("detailName").textContent =
        user.name || user.username || "N/A";

    document.getElementById("detailEmail").textContent =
        user.email || "N/A";

    document.getElementById("detailStatus").textContent =
        user.status;

    document.getElementById("detailDate").textContent =
        user.registrationDate
            ? new Date(user.registrationDate).toLocaleDateString()
            : "N/A";

    detailsModal.classList.add("show");

}


// ========================================
// ACTIVATE / DEACTIVATE USER
// ========================================

function toggleUserStatus(index) {

    const user = users[index];

    if (user.status === "Active") {

        const confirmation = confirm(
            "Do you want to deactivate this user?"
        );

        if (!confirmation) {
            return;
        }

        user.status = "Inactive";

    } else {

        user.status = "Active";

    }

    saveUsers();

    filterUsers();

}


// ========================================
// DELETE USER
// ========================================

function deleteUser(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmation) {
        return;
    }

    users.splice(index, 1);

    saveUsers();

    alert("User deleted successfully!");

    filterUsers();

}


// ========================================
// CLOSE MODALS
// ========================================

function closeUserModal() {

    userModal.classList.remove("show");

}

function closeDetailsModal() {

    detailsModal.classList.remove("show");

}

document.getElementById("closeUserModal").addEventListener("click", closeUserModal);

document.getElementById("closeDetailsModal").addEventListener("click", closeDetailsModal);


// Close modal when clicking outside
window.addEventListener("click", function(event) {

    if (event.target === userModal) {
        closeUserModal();
    }

    if (event.target === detailsModal) {
        closeDetailsModal();
    }

});


// ========================================
// UNIVERSITY SUBMENU
// ========================================

const universityToggle = document.getElementById("universityToggle");

const universitySubmenu = document.getElementById("universitySubmenu");

universityToggle.addEventListener("click", function(event) {

    event.preventDefault();

    universitySubmenu.classList.toggle("show");

});


// ========================================
// LOGOUT
// ========================================

document.getElementById("logoutBtn").addEventListener("click", function() {

    const confirmation = confirm("Are you sure you want to logout?");

    if (confirmation) {

        window.location.href = "adminLogin.html";

    }

});


// ========================================
// INITIAL DISPLAY
// ========================================

displayUsers(users);
