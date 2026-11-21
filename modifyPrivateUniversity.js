
const universities = [
    "American International University-Bangladesh (AIUB)",
    "BRAC University",
    "North South University (NSU)",
    "Daffodil International University (DIU)",
    "United International University (UIU)",
    "East West University (EWU)",
    "Ahsanullah University of Science and Technology (AUST)",
    "South East University (SEU)",
    "Independent University Bangladesh (IUB)",
    "Northern University Bangladesh (NUB)",
    "University of Liberal Arts Bangladesh (ULAB)",
    "Uttara University (UU)"
];

// Display universities
function displayUniversities(list) {
    const table = document.getElementById("universityTable");
    const noUniversity = document.getElementById("noUniversity");

    table.innerHTML = "";

    if (list.length === 0) {
        noUniversity.hidden = false;
        return;
    }

    noUniversity.hidden = true;

    list.forEach(function (name) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>
                <button class="edit-button" type="button">
                    Edit Info
                </button>
            </td>
            <td>
                <button class="remove-button" type="button">
                    Remove University
                </button>
            </td>
        `;

        table.appendChild(row);
    });
}

// Search universities
document.getElementById("searchUniversity").addEventListener("input", function () {
    const searchText = this.value.toLowerCase();

    const filteredUniversities = universities.filter(function (name) {
        return name.toLowerCase().includes(searchText);
    });

    displayUniversities(filteredUniversities);
});

// Show all universities when page loads
displayUniversities(universities);
