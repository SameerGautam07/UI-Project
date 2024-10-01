let chemicalSupplies = [];
let selectedRow = null;
let isAscending = true;

// Fetch JSON data from the file and load it into the table
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        chemicalSupplies = data; // Assign the fetched data to the chemicalSupplies array
        loadTableData(); // Load the table with the fetched data
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

// Function to load the table with data
function loadTableData() {
    const tableBody = document.getElementById("chemical-table-body");
    tableBody.innerHTML = ""; // Clear the table before loading new data

    chemicalSupplies.forEach(chemical => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${chemical.id}</td>
            <td>${chemical.name}</td>
            <td>${chemical.vendor}</td>
            <td>${chemical.density}</td>
            <td>${chemical.viscosity}</td>
            <td>${chemical.packaging}</td>
            <td>${chemical.packSize}</td>
            <td>${chemical.unit}</td>
            <td>${chemical.quantity}</td>
            <td><button onclick="editRow(${chemical.id})">Edit</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to sort the table by the column index
function sortTable(index) {
    const rows = Array.from(document.getElementById("chemical-table-body").rows);
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[index].textContent;
        const cellB = rowB.cells[index].textContent;
        return isAscending ? (cellA > cellB ? 1 : -1) : (cellA < cellB ? 1 : -1);
    });
    isAscending = !isAscending;

    const tableBody = document.getElementById("chemical-table-body");
    tableBody.innerHTML = ""; // Clear the table
    rows.forEach(row => tableBody.appendChild(row)); // Append sorted rows
}

// Function to open the edit modal with the selected row's data
function editRow(id) {
    selectedRow = chemicalSupplies.find(chem => chem.id === id);
    if (selectedRow) {
        document.getElementById("chemicalName").value = selectedRow.name;
        document.getElementById("vendor").value = selectedRow.vendor;
        document.getElementById("density").value = selectedRow.density;
        document.getElementById("viscosity").value = selectedRow.viscosity;
        document.getElementById("packaging").value = selectedRow.packaging;
        document.getElementById("packSize").value = selectedRow.packSize;
        document.getElementById("unit").value = selectedRow.unit;
        document.getElementById("quantity").value = selectedRow.quantity;

        document.getElementById("editModal").style.display = "flex"; // Show the modal
    }
}

// Save changes from the modal back to the array and reload the table
document.getElementById("save-changes").addEventListener("click", () => {
    if (selectedRow) {
        selectedRow.name = document.getElementById("chemicalName").value;
        selectedRow.vendor = document.getElementById("vendor").value;
        selectedRow.density = parseFloat(document.getElementById("density").value);
        selectedRow.viscosity = parseFloat(document.getElementById("viscosity").value);
        selectedRow.packaging = document.getElementById("packaging").value;
        selectedRow.packSize = parseFloat(document.getElementById("packSize").value);
        selectedRow.unit = document.getElementById("unit").value;
        selectedRow.quantity = parseFloat(document.getElementById("quantity").value);

        document.getElementById("editModal").style.display = "none"; // Close the modal
        loadTableData(); // Reload the table with updated data
    }
});

// Close the edit modal when the close button is clicked
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("editModal").style.display = "none"; // Close the modal
});

// Load the data when the page is loaded
window.onload = loadTableData;
