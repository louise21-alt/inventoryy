document.addEventListener('DOMContentLoaded', function() {
    // Get the checkbox element
    const checkbox = document.getElementById('checkbox');

    // Get the tables section
    const tablesSection = document.querySelector('.tablesSection');

    // Array for storing inventory items
    const inventoryItems = [];

    // Function for checking if an item exists already
    function checkIfExists(item, inventoryItems) {
        return inventoryItems.includes(item);
    }

    // Function for adding new item or updating quantity in the inventory
    document.getElementById('inputForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Getting the item from the input field
        const item = document.getElementById('item').value;

        // Getting the quantity from the input field
        const quantity = document.getElementById('quantity').value;

        // We can't let an input field be empty
        if (item.length === 0 || quantity.length === 0) {
            alert("Fill out the form first");
        } else {
            // Check if item already exists
            const updated = updateQuantity(item, quantity);

            if (!updated) {
                // If item doesn't exist, add it to the inventory
                inventoryItems.push(item);
                appendItemToTable(item, quantity);
            }
        }
    });

    // Checkbox event listener
    checkbox.addEventListener('change', function(e) {
        e.preventDefault();
        if (checkbox.checked == true) {
            tablesSection.style.display = "block";
        } else {
            tablesSection.style.display = "none";
        }
    });

    // Function for updating quantity if item exists
    function updateQuantity(item, quantity) {
        const tableRows = document.querySelectorAll('table tr');

        for (let i = 1; i < tableRows.length; i++) {
            const itemName = tableRows[i].querySelector('td:first-child').textContent;
            if (itemName === item) {
                // Update the quantity
                tableRows[i].querySelector('td:last-child').textContent = quantity;
                return true; // Item found and quantity updated
            }
        }
        return false; // Item not found
    }

    // Function to append item to the table
    function appendItemToTable(item, quantity) {
        // create the table row element for storing items
        const trElement = document.createElement('tr');

        // create table data for storing item name
        const tdElementForItemName = document.createElement('td');
        tdElementForItemName.textContent = item;

        // create table data for storing quantity 
        const tdElementForQty = document.createElement('td');
        tdElementForQty.textContent = quantity;
        tdElementForQty.addEventListener('click', function() {
            editQuantity(tdElementForQty);
        });

        // adding table data elements to the table row
        trElement.appendChild(tdElementForItemName);
        trElement.appendChild(tdElementForQty);

        // adding table row element to the table
        document.getElementById('inventoryTable').appendChild(trElement);
    }

    // Function for editing quantity
    function editQuantity(tdElementForQty) {
        const currentValue = tdElementForQty.textContent;
        const input = document.createElement('input');
        input.type = 'number';
        input.value = currentValue;
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const newValue = input.value;
                tdElementForQty.textContent = newValue;
            }
        });
        tdElementForQty.textContent = '';
        tdElementForQty.appendChild(input);
        input.focus();
    }
});
