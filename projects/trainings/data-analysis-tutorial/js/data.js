/**
 * Mock Dataset for the Interactive Data Analysis Tutorial
 * As requested by the tutorial requirements
 */

let baseData = [
    { orderId: "ORD0317", region: "Port Harcourt", product: "bread", category: "bakery", date: "17-07-2023", quantity: 1, unitPrice: 1079, totalPrice: 1079, paymentMethod: "POS", transactionCode: "PHC-2023-SLS" },
    { orderId: "ORD0789", region: "kano", product: "SUGAR", category: "FOOD", date: "16-04-2023", quantity: 7, unitPrice: 1695, totalPrice: 11865, paymentMethod: "TRANSFER", transactionCode: "KAN-2023-SLS" },
    { orderId: "ORD0313", region: "PORT HARCOURT", product: "BEANS", category: "FOOD", date: "11/3/2023", quantity: 13, unitPrice: 3559, totalPrice: 46267, paymentMethod: "transfer", transactionCode: "PHC-2023-RET" },
    { orderId: "ORD0559", region: "Lagos", product: "milk", category: "dairy", date: "20-10-2023", quantity: 10, unitPrice: 3265, totalPrice: 32650, paymentMethod: "transfer", transactionCode: "LAG-2023-INV" },
    { orderId: "ORD0293", region: "ABUJA", product: "beans", category: "Food", date: "17-12-2023", quantity: 16, unitPrice: 1139, totalPrice: 18224, paymentMethod: "POS", transactionCode: "ABJ-2023-RET" }
];

// State variables for current app state
let currentDataState = [...baseData];
let sortState = { column: null, direction: 'asc' };

/**
 * Resets the data to its original messy state
 */
function resetData() {
    currentDataState = JSON.parse(JSON.stringify(baseData));
    renderTable();
}

/**
 * Helper to get the dataset for global calculations
 */
function getDataset() {
    return currentDataState;
}

/**
 * Helper to update dataset entirely
 */
function updateDataset(newData) {
    currentDataState = [...newData];
    renderTable();
}

/**
 * Maps camelCase keys to Header Display Names
 */
const headerMap = {
    orderId: "OrderID",
    region: "Region",
    product: "Product",
    category: "Category",
    date: "Date",
    quantity: "Quantity",
    unitPrice: "UnitPrice",
    totalPrice: "TotalPrice",
    paymentMethod: "PaymentMethod",
    transactionCode: "TransactionCode",
    city: "City",       // Dynamically added later
    year: "Year",       // Dynamically added later
    type: "Type"        // Dynamically added later
};

/**
 * Renders the HTML table into the designated container
 */
function renderTable() {
    const container = document.getElementById('dataTableContainer');
    if (!container) return;

    if (currentDataState.length === 0) {
        container.innerHTML = '<p class="text-muted">No data available.</p>';
        return;
    }

    // Generate Headers
    const keys = Object.keys(currentDataState[0]);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let tableHTML = `<table>
        <thead>
            <tr>
                <th style="width: 40px; text-align: center; background: #E2E8F0; border-right: 1px solid var(--border-color);">&nbsp;</th>
                ${keys.map((key, i) => `<th style="text-align: center; background: #E2E8F0; color: #475569; font-weight: 600;">${alphabet[i]}</th>`).join('')}
            </tr>
            <tr>
                <th style="text-align: center; background: #E2E8F0; color: #475569; border-right: 1px solid var(--border-color);">1</th>
                ${keys.map(key => {
                    let icon = '';
                    if (sortState.column === key) {
                        icon = sortState.direction === 'asc' ? ' <i class="ri-arrow-up-s-line"></i>' : ' <i class="ri-arrow-down-s-line"></i>';
                    }
                    return `<th onclick="sortTable('${key}')">${headerMap[key] || key}${icon}</th>`;
                }).join('')}
            </tr>
        </thead>
        <tbody>`;

    // Generate Rows
    currentDataState.forEach((row, index) => {
        tableHTML += `<tr id="row-${index}">
            <td style="text-align: center; background: #F8FAFC; color: #475569; font-weight: 600; border-right: 1px solid var(--border-color);">${index + 2}</td>
            ${keys.map(key => `<td data-key="${key}">${row[key]}</td>`).join('')}
        </tr>`;
    });

    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}

/**
 * Basic sorting algorithm
 */
function sortTable(columnKey) {
    if (sortState.column === columnKey) {
        sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
        sortState.column = columnKey;
        sortState.direction = 'asc';
    }

    currentDataState.sort((a, b) => {
        let valA = a[columnKey];
        let valB = b[columnKey];
        
        // Number comparison
        if (typeof valA === 'number' && typeof valB === 'number') {
            return sortState.direction === 'asc' ? valA - valB : valB - valA;
        }
        
        // String comparison
        valA = String(valA).toLowerCase();
        valB = String(valB).toLowerCase();
        
        if (valA < valB) return sortState.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortState.direction === 'asc' ? 1 : -1;
        return 0;
    });

    renderTable();
}

/**
 * Highlights specific rows or columns entirely for visual effects
 */
function highlightRows(indices) {
    // Remove all previous highlights
    document.querySelectorAll('tbody tr').forEach(tr => tr.classList.remove('highlight-row'));
    document.querySelectorAll('td').forEach(td => td.style.backgroundColor = '');

    if (indices && indices.length > 0) {
        indices.forEach(index => {
            const row = document.getElementById(`row-${index}`);
            if (row) row.classList.add('highlight-row');
        });
    }
}

function highlightColumn(columnKey) {
     // Remove all previous highlights
    document.querySelectorAll('td').forEach(td => td.style.backgroundColor = '');
    
    document.querySelectorAll(`td[data-key="${columnKey}"]`).forEach(td => {
        td.style.backgroundColor = '#FEF3C7';
    });
}
