/**
 * Interactive Session Content and Logic
 */

const sessionsData = {
    1: {
        title: "Session 1: Excel Fundamentals",
        icon: "ri-table-2",
        html: `
            <div class="session-badge">Session 1</div>
            <h2 class="session-title">Excel Fundamentals</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Understand basic Excel operations and formatting.</li>
                    <li>Learn how cell referencing works in formulas.</li>
                    <li>Master basic functions: SUM, AVERAGE, MIN, and MAX.</li>
                </ul>
            </div>
            
            <div class="explanation" style="margin-bottom: 25px;">
                <p>Welcome to your first session! Let's start with the absolute basics. Formulas are the heart of Data Analysis in Excel. You can perform calculations, extract information, and manipulate contents of cells.</p>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-font-color"></i> Data Formatting</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Formatting changes how data <em>looks</em> without changing its actual value. For example, setting numbers to Currency format adds the Naira symbol and commas, making it easier to read.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-format"><i class="ri-money-naira-box-line"></i> Format as Currency</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Table</button>
                </div>

                <div class="result-box empty" id="s1-res-format">
                    Click the button to see formatting in action.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-links-line"></i> Cell Referencing Techniques</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Referencing allows formulas to dynamically use values from other cells. The <code>$</code> (dollar sign) acts as a lock. It locks whatever is immediately to its right.</p>
                    <ul style="margin-left: 20px; font-size: 0.95em; line-height: 1.6;">
                        <li><strong>Relative Reference (<code>A1</code>):</strong> Unlocked. Dragging down changes the row (A2, A3). Dragging right changes the column (B1, C1).</li>
                        <li><strong>Absolute Reference (<code>$A$1</code>):</strong> Fully locked. Locks the column (A) and row (1). Does not change no matter where you copy it.</li>
                        <li><strong>Mixed Reference - Lock Column (<code>$A1</code>):</strong> Locks the column so it never moves from A. The row is free to change.</li>
                        <li><strong>Mixed Reference - Lock Row (<code>A$1</code>):</strong> Locks the row so it never moves from 1. The column is free to change.</li>
                    </ul>
                    <p class="text-muted" style="margin-top: 10px; font-size: 0.9em;"><i class="ri-information-fill"></i> <strong>Pro Tip:</strong> Pressing <code>F4</code> on your keyboard while typing a formula quickly cycles through these reference types (A1 → $A$1 → A$1 → $A1).</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-outline" id="s1-btn-ref-rel"><i class="ri-arrow-right-down-line"></i> Simulate A1</button>
                    <button class="btn-action btn-outline" id="s1-btn-ref-abs"><i class="ri-lock-2-line"></i> Simulate $A$1</button>
                    <button class="btn-action btn-outline" id="s1-btn-ref-mixcol"><i class="ri-pushpin-line"></i> Simulate $A1</button>
                    <button class="btn-action btn-outline" id="s1-btn-ref-mixrow"><i class="ri-pushpin-line"></i> Simulate A$1</button>
                </div>

                <div class="result-box empty" id="s1-res-ref">
                    Select a referencing type above to see how it behaves when copied across cells!
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-add-circle-line"></i> The SUM Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=SUM(number1, [number2]...)</code> function is used to add all numbers in a specified range of cells. Instead of writing <code>=A1+A2+A3</code>, you just use <code>=SUM(A1:A3)</code>.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>number1</code>: The first number, cell reference, or cell range you want to add.</li>
                        <li><code>[number2]...</code>: Additional numbers or ranges to add (optional).</li>
                    </ul>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-sum"><i class="ri-calculator-line"></i> Calculate Total Revenue</button>
                </div>

                <div class="result-box empty" id="s1-res-sum">
                    Click the button to perfectly sum the revenue.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-divide-line"></i> The AVERAGE Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=AVERAGE(number1, [number2]...)</code> function calculates the mathematical mean of a range of cells, automatically ignoring any empty cells within the range.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>number1</code>: The first number, cell reference, or range.</li>
                        <li><code>[number2]...</code>: Additional numbers or ranges (optional).</li>
                    </ul>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-avg"><i class="ri-funds-line"></i> Find Average Quantity</button>
                </div>

                <div class="result-box empty" id="s1-res-avg">
                    Click the button to find the average quantity sold.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-arrow-up-circle-line"></i> The MAX Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=MAX(number1, [number2]...)</code> function instantly returns the largest numerical value in a selected range of cells. Great for finding the best-performing metrics.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>number1</code>: The first number, cell reference, or range.</li>
                        <li><code>[number2]...</code>: Additional numbers or ranges (optional).</li>
                    </ul>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-max"><i class="ri-arrow-up-line"></i> Find Highest Sale</button>
                </div>

                <div class="result-box empty" id="s1-res-max">
                    Click to instantly spot the biggest sale value.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-arrow-down-circle-line"></i> The MIN Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=MIN(number1, [number2]...)</code> function returns the smallest numerical value in a selected range of cells. Useful for identifying worst-performing metrics or minimum thresholds.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>number1</code>: The first number, cell reference, or range.</li>
                        <li><code>[number2]...</code>: Additional numbers or ranges (optional).</li>
                    </ul>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-min"><i class="ri-arrow-down-line"></i> Find Lowest Sale</button>
                </div>

                <div class="result-box empty" id="s1-res-min">
                    Click to spot the smallest transaction value.
                </div>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p><strong>Task 1:</strong> How would you reference the cell containing the word "Lagos" in the sample dataset above if you wanted to lock its row but not its column?</p>
                <p><strong>Task 2:</strong> Try calculating mentally or with paper what the AVERAGE of all quantities is.</p>
            </div>
        `,
        initLogic: () => {
            // Re-render table into new containers
            if (typeof renderTable === 'function') {
                renderTable();
            }

            // Ensure the global data table is visible
            const globalData = document.getElementById('dataPreviewSection');
            if (globalData) globalData.style.display = 'block';

            // FORMATTING
            document.getElementById('s1-btn-format').addEventListener('click', () => {
                let data = JSON.parse(JSON.stringify(currentDataState));
                data = data.map(r => ({
                    ...r,
                    // Simulate formatting
                    unitPrice: '₦' + Number(r.unitPrice).toLocaleString() + '.00',
                    totalPrice: '₦' + Number(r.totalPrice).toLocaleString() + '.00'
                }));
                updateDataset(data);

                document.getElementById('s1-res-format').innerHTML = `
                    <strong>Currency Format Applied!</strong><br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <em>Explanation:</em> The UnitPrice and TotalPrice columns now display the currency symbol and decimals. The actual math isn't changed, just the look.
                    </div>
                `;
            });

            // REFERENCING
            const refRes = document.getElementById('s1-res-ref');

            document.getElementById('s1-btn-ref-rel').addEventListener('click', () => {
                refRes.className = "result-box"; refRes.style.backgroundColor = "#EFF6FF"; refRes.style.borderColor = "var(--secondary-color)";
                refRes.innerHTML = `
                    <strong>Relative Reference (<code>=F2</code>):</strong> <br>
                    <div style="margin-top:10px; font-size:0.95rem; line-height:1.6;">
                        Formula starts at <code>=F2</code>. <br>
                        Dragged 1 cell DOWN: it becomes <code>=F3</code>. <em>(Row increases)</em><br>
                        Dragged 1 cell RIGHT: it becomes <code>=G2</code>. <em>(Column increases)</em>
                    </div>
                `;
            });

            document.getElementById('s1-btn-ref-abs').addEventListener('click', () => {
                refRes.className = "result-box"; refRes.style.backgroundColor = "#EFF6FF"; refRes.style.borderColor = "var(--secondary-color)";
                refRes.innerHTML = `
                    <strong>Absolute Reference (<code>=$F$2</code>):</strong> <br>
                    <div style="margin-top:10px; font-size:0.95rem; line-height:1.6;">
                        Formula starts at <code>=$F$2</code>. <br>
                        Dragged 1 cell DOWN: it stays <code>=$F$2</code>.<br>
                        Dragged 1 cell RIGHT: it stays <code>=$F$2</code>.<br>
                        <strong>Use Case:</strong> Multiplying all Sales by a fixed 5% VAT rate stored in a specific cell.
                    </div>
                `;
            });

            document.getElementById('s1-btn-ref-mixcol').addEventListener('click', () => {
                refRes.className = "result-box"; refRes.style.backgroundColor = "#EFF6FF"; refRes.style.borderColor = "var(--secondary-color)";
                refRes.innerHTML = `
                    <strong>Locking the Column (<code>=$F2</code>):</strong> <br>
                    <div style="margin-top:10px; font-size:0.95rem; line-height:1.6;">
                        Formula starts at <code>=$F2</code>. <br>
                        Dragged 1 cell DOWN: it becomes <code>=$F3</code>. <em>(Row moves freely)</em><br>
                        Dragged 1 cell RIGHT: it stays <code>=$F2</code>. <strong>(Column F is locked!)</strong><br>
                        <strong>Use Case:</strong> Referencing a column of ID numbers while dragging formulas across different metric columns.
                    </div>
                `;
            });

            document.getElementById('s1-btn-ref-mixrow').addEventListener('click', () => {
                refRes.className = "result-box"; refRes.style.backgroundColor = "#EFF6FF"; refRes.style.borderColor = "var(--secondary-color)";
                refRes.innerHTML = `
                    <strong>Locking the Row (<code>=F$2</code>):</strong> <br>
                    <div style="margin-top:10px; font-size:0.95rem; line-height:1.6;">
                        Formula starts at <code>=F$2</code>. <br>
                        Dragged 1 cell DOWN: it stays <code>=F$2</code>. <strong>(Row 2 is locked!)</strong><br>
                        Dragged 1 cell RIGHT: it becomes <code>=G$2</code>. <em>(Column moves freely)</em><br>
                        <strong>Use Case:</strong> Referencing a row of Monthly headers while dragging formulas down through various categories.
                    </div>
                `;
            });

            // SUM
            document.getElementById('s1-btn-sum').addEventListener('click', () => {
                const data = currentDataState;
                const total = data.reduce((sum, row) => sum + (typeof row.totalPrice === 'number' ? row.totalPrice : parseFloat(row.totalPrice.replace(/[^0-9.-]+/g, ""))), 0);
                document.getElementById('s1-res-sum').innerHTML = `
                    <strong>Total Revenue:</strong> ₦${total.toLocaleString()}<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=SUM(H2:H6)</code><br><br>
                        <em>Explanation:</em> The colon (<code>:</code>) is used to specify a continuous range of cells to be calculated. For example, <code>H2:H6</code> handles everything from H2 down to H6.
                    </div>
                `;
                highlightColumn('totalPrice');
            });

            // AVERAGE
            document.getElementById('s1-btn-avg').addEventListener('click', () => {
                const data = currentDataState;
                let sum = data.reduce((acc, row) => acc + row.quantity, 0);
                let avg = (sum / data.length).toFixed(1);
                document.getElementById('s1-res-avg').innerHTML = `
                    <strong>Average Quantity:</strong> ${avg} items<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=AVERAGE(F2:F6)</code>
                    </div>
                `;
                highlightColumn('quantity');
            });

            // MAX
            document.getElementById('s1-btn-max').addEventListener('click', () => {
                const data = currentDataState;
                const prices = data.map(o => (typeof o.totalPrice === 'number' ? o.totalPrice : parseFloat(o.totalPrice.replace(/[^0-9.-]+/g, ""))));
                let max = Math.max(...prices);
                let rowIndex = prices.findIndex(p => p === max);
                document.getElementById('s1-res-max').innerHTML = `
                    <strong>Highest Sale:</strong> ₦${max.toLocaleString()}<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=MAX(H2:H6)</code>
                    </div>
                `;
                highlightRows([rowIndex]);
            });

            // MIN
            document.getElementById('s1-btn-min').addEventListener('click', () => {
                const data = currentDataState;
                const prices = data.map(o => (typeof o.totalPrice === 'number' ? o.totalPrice : parseFloat(o.totalPrice.replace(/[^0-9.-]+/g, ""))));
                let min = Math.min(...prices);
                let rowIndex = prices.findIndex(p => p === min);
                document.getElementById('s1-res-min').innerHTML = `
                    <strong>Lowest Sale:</strong> ₦${min.toLocaleString()}<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=MIN(H2:H6)</code>
                    </div>
                `;
                highlightRows([rowIndex]);
            });
        }
    },
    2: {
        title: "Session 2: Logical Functions",
        icon: "ri-function-line",
        html: `
            <div class="session-badge">Session 2</div>
            <h2 class="session-title">Logical Functions</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Understand logical evaluations (TRUE/FALSE).</li>
                    <li>Master the <code>IF</code> function for conditional logic.</li>
                    <li>Utilize conditional aggregation: <code>SUMIF</code>, <code>COUNTIF</code>.</li>
                </ul>
            </div>
            
            <div class="explanation" style="margin-bottom: 25px;">
                <p>Data isn't just about calculations; it's about decision-making. Logical functions allow Excel to make automated decisions based on the conditions you set within your data.</p>
            </div>

            <!-- Block 1: Understanding IF -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the IF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=IF()</code> function asks Excel to perform a test, and tells it what to do based on the result. The syntax is:</p>
                    <p style="background: #F8FAFC; padding: 10px; border-left: 4px solid var(--secondary-color); font-family: monospace; font-size: 1.1em; color: #334155;">
                        =IF(logical_test, value_if_true, value_if_false)
                    </p>
                    <ul style="margin-top: 15px; margin-bottom: 15px;">
                        <li><strong>logical_test:</strong> The condition you are checking (e.g., Is Quantity >= 10?).</li>
                        <li><strong>value_if_true:</strong> What to do if the test passes (e.g., Output "Wholesale").</li>
                        <li><strong>value_if_false:</strong> What to do if the test fails (e.g., Output "Retail").</li>
                    </ul>
                    <p><strong>Let's look at an example using our data:</strong></p>
                    <p>We want to categorize orders by package size based on their <code>Quantity</code> (Column F). If an order has a quantity of 10 or more, we'll label it as <strong>"Wholesale"</strong>. If it is less than 10, we'll label it as <strong>"Retail"</strong>.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s2-btn-if-learn"><i class="ri-play-circle-line"></i> Simulate This Example</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Table</button>
                </div>

                <div class="result-box empty" id="s2-res-if-learn">
                    Click to simulate the IF function logic on the dataset.
                </div>
            </div>

            <!-- Block 2: IF input exercise -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The IF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Now that you've seen how the parameters work, it's your turn to write the formula!</p>
                    <p><strong>Scenario:</strong> You're analyzing the dataset. We want to dynamically create a customer tag. If the <strong>TotalPrice</strong> is strictly greater than 30,000, tag it as <strong>"large buyer"</strong>. Otherwise, tag it as <strong>"retail buyer"</strong>.</p>
                    <p>Assuming we are evaluating the very first data row, where TotalPrice is in cell <strong>H2</strong>, write the formula below.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s2-input-if" class="input-control" placeholder='e.g., =IF(H2>30000, "large buyer", "retail buyer")' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s2-btn-submit-if"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>

                <div class="result-box empty" id="s2-res-if">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- Block 3: Understanding COUNTIF -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the COUNTIF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=COUNTIF(range, criteria)</code> function counts the number of cells that meet a specific condition.</p>
                    <ul style="margin-top: 15px; margin-bottom: 15px;">
                        <li><strong>range:</strong> The group of cells you want to check (e.g., Column I, containing Payment Methods).</li>
                        <li><strong>criteria:</strong> What you are looking for in that range (e.g., "POS").</li>
                    </ul>
                    <p><strong>Example Scenario:</strong> You want to know exactly how many transactions were paid for using POS.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s2-btn-pos-learn"><i class="ri-play-circle-line"></i> Simulate This Example</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>

                <div class="result-box empty" id="s2-res-pos-learn">
                    Click to run COUNTIF for POS transactions.
                </div>
            </div>

            <!-- Block 4: COUNTIF Exercise -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The COUNTIF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You're planning targeted marketing for the Lagos region because growth has been slow. First, you need to count how many orders came specifically from the "Lagos" region (in cells B2 to B6).</p>
                    <p>Assuming your <code>Region</code> data is exclusively in cells B2 to B6, write the formula below.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s2-input-countif" class="input-control" placeholder='e.g., =COUNTIF(A1:A5, "Lagos")' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s2-btn-submit-countif"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>

                <div class="result-box empty" id="s2-res-countif">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- Block 5: Understanding SUMIF -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the SUMIF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=SUMIF(range, criteria, [sum_range])</code> function adds up values in one column based on a condition set in another column.</p>
                    <ul style="margin-top: 15px; margin-bottom: 15px;">
                        <li><strong>range:</strong> The cells to evaluate based on the criteria (e.g., Column B for Region).</li>
                        <li><strong>criteria:</strong> What you are looking for (e.g., "Lagos").</li>
                        <li><strong>sum_range:</strong> The actual cells containing the numbers to total up (e.g., Column H for TotalPrice).</li>
                    </ul>
                    <p><strong>Example Scenario:</strong> Calculate the total sales revenue generated exclusively from Lagos.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s2-btn-lagos-learn"><i class="ri-play-circle-line"></i> Simulate This Example</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>

                <div class="result-box empty" id="s2-res-lagos-learn">
                    Click to run SUMIF for Lagos sales.
                </div>
            </div>

            <!-- Block 6: SUMIF Exercise -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The SUMIF Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You're reviewing payment methods due to high POS transaction fees. You need to calculate the total revenue (TotalPrice) but <em>only</em> for transactions paid via POS.</p>
                    <p>Assume Payment Methods are in cells I2 to I6, and TotalPrice is in cells H2 to H6. Write the formula below.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s2-input-sumif" class="input-control" placeholder='e.g., =SUMIF(I2:I6, "POS", H2:H6)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s2-btn-submit-sumif"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>

                <div class="result-box empty" id="s2-res-sumif">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- Block 7: Filtering -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-filter-3-line"></i> Data Filtering</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Filtering temporarily hides rows that do not meet your criteria. Use the dropdown below to simulate filtering the dataset by Region.</p>
                </div>
                
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                
                <div class="actions-row" style="align-items: center;">
                    <select class="input-control" id="s2-region-filter" style="width: 250px;">
                        <option value="all">-- Filter By Region --</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="kano">Kano</option>
                        <option value="Lagos">Lagos</option>
                        <option value="ABUJA">Abuja</option>
                    </select>
                </div>

                <div class="result-box empty" id="s2-res-filter">
                    Select a region to apply the filter.
                </div>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p><strong>Task:</strong> Explain what the difference is between a logical evaluation and an aggregation function in Excel based on what you have learned!</p>
            </div>
        `,
        initLogic: () => {
            if (typeof renderTable === 'function') {
                renderTable();
            }

            const globalData = document.getElementById('dataPreviewSection');
            if (globalData) globalData.style.display = 'none';

            // IF learning simulation
            document.getElementById('s2-btn-if-learn').addEventListener('click', () => {
                const resBox = document.getElementById('s2-res-if-learn');
                const data = currentDataState;
                const wholesaleCount = data.filter(r => r.quantity >= 10).length;
                const isFirstRowWholesale = data[0].quantity >= 10;

                resBox.className = "result-box";
                resBox.style.backgroundColor = "#EFF6FF";
                resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `
                    <strong>Explanation:</strong><br>
                    <div style="margin-top:10px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=IF(F2>=10, "Wholesale", "Retail")</code><br><br>
                        <em>How it works:</em> Excel looks at cell F2 (${data[0].quantity}). Is ${data[0].quantity} >= 10? <strong>${isFirstRowWholesale ? 'Yes.' : 'No.'}</strong>
                        Therefore, it returns <strong>"${isFirstRowWholesale ? 'Wholesale' : 'Retail'}"</strong>. The visual highlights below show all ${wholesaleCount} items that would qualify as "Wholesale".
                    </div>
                `;

                const indices = data.map((r, i) => r.quantity >= 10 ? i : -1).filter(i => i !== -1);
                highlightRows(indices);
            });

            // IF logic
            document.getElementById('s2-btn-submit-if').addEventListener('click', () => {
                const inputVal = document.getElementById('s2-input-if').value.trim();
                const resBox = document.getElementById('s2-res-if');

                if (!inputVal) {
                    resBox.className = "result-box empty";
                    resBox.innerHTML = "Please enter a formula.";
                    return;
                }

                let normalized = inputVal.toUpperCase().replace(/\s+/g, '');

                // Allow valid logical permutations
                const isValid = normalized === '=IF(H2>30000,"LARGEBUYER","RETAILBUYER")' ||
                    normalized === 'IF(H2>30000,"LARGEBUYER","RETAILBUYER")' ||
                    normalized === '=IF($H$2>30000,"LARGEBUYER","RETAILBUYER")';

                if (isValid) {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#F0FDF4";
                    resBox.style.borderColor = "#86EFAC";
                    resBox.style.color = "#166534";
                    resBox.innerHTML = `
                        <strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Excellent. The logic clearly states: check if TotalPrice (H2) is > 30000. If TRUE, evaluating to <em>"large buyer"</em>, if FALSE, evaluating to <em>"retail buyer"</em>.<br><br>
                            If you apply this to H2 in the dataset, H2 is 1079 (which is not > 30000), so the outcome for row 1 is <strong>retail buyer</strong>!
                        </div>
                    `;
                    highlightColumn('totalPrice');
                } else {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#FEF2F2";
                    resBox.style.borderColor = "#FCA5A5";
                    resBox.style.color = "#991B1B";
                    resBox.innerHTML = `
                        <strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Make sure you structured it accurately: <code>=IF(H2>30000, "large buyer", "retail buyer")</code>. Remember you need the equals sign, quotes around text, and commas to separate arguments.
                        </div>
                    `;
                }
            });

            // COUNTIF Learn
            document.getElementById('s2-btn-pos-learn').addEventListener('click', () => {
                const data = currentDataState;
                const posCount = data.filter(r => r.paymentMethod.toUpperCase() === 'POS').length;
                document.getElementById('s2-res-pos-learn').innerHTML = `
                    <strong>Explanation:</strong><br>
                    <div style="margin-top:10px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=COUNTIF(I2:I6, "POS")</code><br><br>
                        <em>How it works:</em> Excel looks at cells I2 through I6. Every time it finds the word "POS", it adds 1 to the count. It found ${posCount} POS transactions.
                    </div>
                `;

                const indices = data.map((r, i) => r.paymentMethod.toUpperCase() === 'POS' ? i : -1).filter(i => i !== -1);
                highlightRows(indices);
            });

            // COUNTIF Exercise
            document.getElementById('s2-btn-submit-countif').addEventListener('click', () => {
                const inputVal = document.getElementById('s2-input-countif').value.trim();
                const resBox = document.getElementById('s2-res-countif');

                if (!inputVal) {
                    resBox.className = "result-box empty";
                    resBox.innerHTML = "Please enter a formula.";
                    return;
                }

                let normalized = inputVal.toUpperCase().replace(/\s+/g, '');
                const isValid = normalized === '=COUNTIF(B2:B6,"LAGOS")' ||
                    normalized === 'COUNTIF(B2:B6,"LAGOS")' ||
                    normalized === '=COUNTIF($B$2:$B$6,"LAGOS")';

                if (isValid) {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#F0FDF4";
                    resBox.style.borderColor = "#86EFAC";
                    resBox.style.color = "#166534";
                    const count = currentDataState.filter(r => r.region.toUpperCase() === 'LAGOS').length;
                    resBox.innerHTML = `
                        <strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Correct! The formula checks the Region column (B2:B6) and accurately counts the number of "Lagos" appearances. Evaluates to: <strong>${count}</strong>.
                        </div>
                    `;
                    highlightColumn('region');
                } else {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#FEF2F2";
                    resBox.style.borderColor = "#FCA5A5";
                    resBox.style.color = "#991B1B";
                    resBox.innerHTML = `
                        <strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Check your syntax. It should be: <code>=COUNTIF(B2:B6, "Lagos")</code>.
                        </div>
                    `;
                }
            });

            // SUMIF Learn
            document.getElementById('s2-btn-lagos-learn').addEventListener('click', () => {
                const data = currentDataState;
                const lagosSales = data.filter(r => r.region.toLowerCase() === 'lagos')
                    .reduce((sum, r) => sum + r.totalPrice, 0);

                document.getElementById('s2-res-lagos-learn').innerHTML = `
                    <strong>Explanation:</strong><br>
                    <div style="margin-top:10px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=SUMIF(B2:B6, "Lagos", H2:H6)</code><br><br>
                        <em>How it works:</em> Excel checks column B for "Lagos". Whenever it finds it, it looks across to the same row in column H and adds that number to the running total. Result: ₦${lagosSales.toLocaleString()}
                    </div>
                `;

                const indices = data.map((r, i) => r.region.toLowerCase() === 'lagos' ? i : -1).filter(i => i !== -1);
                highlightRows(indices);
            });

            // SUMIF Exercise
            document.getElementById('s2-btn-submit-sumif').addEventListener('click', () => {
                const inputVal = document.getElementById('s2-input-sumif').value.trim();
                const resBox = document.getElementById('s2-res-sumif');

                if (!inputVal) {
                    resBox.className = "result-box empty";
                    resBox.innerHTML = "Please enter a formula.";
                    return;
                }

                let normalized = inputVal.toUpperCase().replace(/\s+/g, '');
                const isValid = normalized === '=SUMIF(I2:I6,"POS",H2:H6)' ||
                    normalized === 'SUMIF(I2:I6,"POS",H2:H6)' ||
                    normalized === '=SUMIF($I$2:$I$6,"POS",$H$2:$H$6)';

                if (isValid) {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#F0FDF4";
                    resBox.style.borderColor = "#86EFAC";
                    resBox.style.color = "#166534";
                    const sum = currentDataState.filter(r => r.paymentMethod.toUpperCase() === 'POS').reduce((acc, r) => acc + r.totalPrice, 0);
                    resBox.innerHTML = `
                        <strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Excellent! The formula identifies POS transactions in column I, and sums the corresponding values from column H. Total Revenue for POS is: <strong>₦${sum.toLocaleString()}</strong>.
                        </div>
                    `;
                    highlightColumn('paymentMethod');
                } else {
                    resBox.className = "result-box";
                    resBox.style.backgroundColor = "#FEF2F2";
                    resBox.style.borderColor = "#FCA5A5";
                    resBox.style.color = "#991B1B";
                    resBox.innerHTML = `
                        <strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br>
                        <div style="margin-top:10px; font-size:0.95rem;">
                            Check your syntax. It should be: <code>=SUMIF(I2:I6, "POS", H2:H6)</code>. Ensure you have the range, criteria, and sum_range correctly ordered.
                        </div>
                    `;
                }
            });

            document.getElementById('s2-region-filter').addEventListener('change', (e) => {
                const region = e.target.value.toLowerCase();
                const resBox = document.getElementById('s2-res-filter');
                const allData = getDataset();

                if (region === 'all') {
                    resetData();
                    resBox.innerHTML = `Filter cleared. Showing all data.`;
                } else {
                    const filtered = baseData.filter(r => r.region.toLowerCase() === region);
                    updateDataset(filtered);
                    resBox.innerHTML = `<strong>Filtered List:</strong> ${filtered.length} rows matched region '${region}'.`;
                }
            });
        }
    },
    3: {
        title: "Session 3: Data Cleaning",
        icon: "ri-eraser-line",
        html: `
            <div class="session-badge">Session 3</div>
            <h2 class="session-title">Data Cleaning Operations</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Handle messy text formatting (TRIM, PROPER, SUBSTITUTE).</li>
                    <li>Remove duplicate entries.</li>
                    <li>Extract specific text strings (LEFT, MID, RIGHT) and Text-to-Columns.</li>
                </ul>
            </div>
            
            <div class="explanation">
                <p>As you can see from our Sample Dataset, the text is a mess. Variations in cases ("kano" vs "PORT HARCOURT") makes analysis impossible. The golden rule of data analysis: <em>Garbage in, garbage out</em>. We must clean it first.</p>
            </div>

            <!-- PROPER -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the PROPER Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=PROPER(text)</code> function changes the first letter of each word to uppercase, and all other letters to lowercase.</p>
                    <p><strong>Example Scenario:</strong> The <em>Region</em> column contains messy capitalization (e.g., "kano", "PORT HARCOURT"). We can standardize this so pivot tables don't read "kano" and "Kano" as two different cities!</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>text</code>: The cell reference or text string you want to accurately capitalize.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-proper-learn"><i class="ri-play-circle-line"></i> Simulate =PROPER()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s3-res-proper-learn">
                    Click to simulate the PROPER function on the Region column.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The PROPER Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You're creating an invoice and noticed the <em>Product</em> column also has messy capitalization (e.g., "laptop", "smartPhone"). Let's fix this.</p>
                    <p>Assuming the Product data is in cell <strong>C2</strong>. Write the formula to properly capitalize it.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s3-input-proper" class="input-control" placeholder='e.g., =PROPER(C2)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s3-btn-submit-proper"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s3-res-proper">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- TRIM -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the TRIM Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=TRIM(text)</code> function safely removes all extra spaces from text except for single spaces between words.</p>
                    <p><strong>Example Scenario:</strong> Hidden trailing spaces often cause VLOOKUP to fail. For example, <code>"Lagos "</code> is not functionally equal to <code>"Lagos"</code> behind the scenes.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>text</code>: The cell reference or text string containing accidental spaces you want to clean.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-trim-learn"><i class="ri-play-circle-line"></i> Simulate =TRIM()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s3-res-trim-learn">
                    Click to simulate removing trailing spaces on Category.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The TRIM Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You've exported bank statements, but the <em>PaymentMethod</em> column contains accidental formatting spaces from the database export.</p>
                    <p>Assuming PaymentMethod is in cell <strong>I2</strong>, write the formula to trim any unexpected spaces.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s3-input-trim" class="input-control" placeholder='e.g., =TRIM(I2)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s3-btn-submit-trim"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s3-res-trim">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- LEFT -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the LEFT Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=LEFT(text, [num_chars])</code> function extracts a specified number of characters from the start of a text string.</p>
                    <p><strong>Example Scenario:</strong> The <em>TransactionCode</em> uniquely identifies the city code in the first 3 letters (e.g., PHC-2023-SLS). We can extract just "PHC".</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>text</code>: The cell reference containing the source text.</li>
                        <li><code>[num_chars]</code>: The exact number of characters to extract starting from the far left.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-left-learn"><i class="ri-play-circle-line"></i> Simulate =LEFT()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s3-res-left-learn">
                    Click to extract prefixes.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The LEFT Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> We need to create a short code for referencing rows. We want the first 4 letters of the TransactionCode in cell <strong>A2</strong>.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s3-input-left" class="input-control" placeholder='e.g., =LEFT(A2, 4)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s3-btn-submit-left"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s3-res-left">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- MID -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the MID Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=MID(text, start_num, num_chars)</code> function extracts text from the middle of a string based on where you tell it to start and how many characters to take.</p>
                    <p><strong>Example Scenario:</strong> The Year is always embedded in the middle of our <em>TransactionCode</em> (e.g. PHC-**2023**-SLS), starting exactly at character position 5, and it contains 4 characters.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>text</code>: The cell reference containing the source text.</li>
                        <li><code>start_num</code>: The position of the first character you want to extract.</li>
                        <li><code>num_chars</code>: The exact number of characters to extract from that starting position.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-mid-learn"><i class="ri-play-circle-line"></i> Simulate =MID()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s3-res-mid-learn">
                    Click to extract substrings.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The MID Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> For a secondary system, the IT department needs you to grab a slice of the <em>TransactionCode</em> in cell <strong>A2</strong>. They want the 2 characters immediately following the prefix, meaning starting at position number 5 and choosing 2 characters.</p>
                    <p>Write the formula below.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s3-input-mid" class="input-control" placeholder='e.g., =MID(A2, 5, 2)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s3-btn-submit-mid"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s3-res-mid">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- RIGHT -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning the RIGHT Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>The <code>=RIGHT(text, [num_chars])</code> function extracts a specified number of characters from the end of a string.</p>
                    <p><strong>Example Scenario:</strong> In our <em>TransactionCode</em> (e.g. PHC-2023-SLS), the last 3 letters map to the department code. We want to pull those rightmost 3 letters.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>text</code>: The cell reference containing the source text.</li>
                        <li><code>[num_chars]</code>: The exact number of characters to extract starting from the far right.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-right-learn"><i class="ri-play-circle-line"></i> Simulate =RIGHT()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s3-res-right-learn">
                    Click to extract suffixes.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: The RIGHT Function</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You've been asked to fetch just the very last 2 letters of the TransactionCode in cell <strong>A2</strong> to sort them into sub-categories quickly.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s3-input-right" class="input-control" placeholder='e.g., =RIGHT(A2, 2)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s3-btn-submit-right"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s3-res-right">
                    Submit your formula to check if it's correct.
                </div>
            </div>

        `,
        initLogic: () => {
            if (typeof renderTable === 'function') {
                renderTable();
            }

            const toProper = (str) => {
                if (!str) return "";
                return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
            };

            // PROPER Learn
            document.getElementById('s3-btn-proper-learn').addEventListener('click', () => {
                let data = [...baseData];
                data = data.map(row => ({
                    ...row,
                    region: toProper(row.region)
                }));
                updateDataset(data);

                const resBox = document.getElementById('s3-res-proper-learn');
                resBox.className = "result-box";
                resBox.style.backgroundColor = "#EFF6FF";
                resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `
                    <strong>Explanation:</strong><br>
                    <div style="margin-top:10px; font-size:0.95rem;">
                        <strong>Formula Used:</strong> <code>=PROPER(B2)</code> downwards.<br><br>
                        <em>How it works:</em> Notice the Region column above. Excel transformed "kano" into "Kano" and "PORT HARCOURT" into "Port Harcourt".
                    </div>
                `;
                highlightColumn('region');
            });

            // PROPER Exercise
            document.getElementById('s3-btn-submit-proper').addEventListener('click', () => {
                const inputVal = document.getElementById('s3-input-proper').value.trim();
                const resBox = document.getElementById('s3-res-proper');
                if (!inputVal) { resBox.className = "result-box empty"; resBox.innerHTML = "Enter a formula."; return; }

                let normalized = inputVal.toUpperCase().replace(/\s+/g, '');
                if (normalized === '=PROPER(C2)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    let d = [...baseData].map(r => ({ ...r, product: toProper(r.product) }));
                    updateDataset(d); highlightColumn('product');
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. Apply =PROPER(C2) downwards and the product "smartPhone" turns into "Smartphone".</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">It should be: <code>=PROPER(C2)</code>.</div>`;
                }
            });

            // TRIM Learn
            document.getElementById('s3-btn-trim-learn').addEventListener('click', () => {
                let data = [...baseData];
                // Simulate trim visually by appending some spaces
                data = data.map((row, i) => i === 0 ? { ...row, category: " " + row.category + "   [TRIMMED]" } : { ...row, category: row.category + " [TRIMMED]" });
                updateDataset(data);

                const resBox = document.getElementById('s3-res-trim-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=TRIM(D2)</code><br><br>Any phantom white spaces before or after the text are deleted.</div>`;
                highlightColumn('category');
            });

            // TRIM Exercise
            document.getElementById('s3-btn-submit-trim').addEventListener('click', () => {
                const inputVal = document.getElementById('s3-input-trim').value.trim();
                const resBox = document.getElementById('s3-res-trim');
                if (!inputVal) { resBox.className = "result-box empty"; resBox.innerHTML = "Enter a formula."; return; }

                let normalized = inputVal.toUpperCase().replace(/\s+/g, '');
                if (normalized === '=TRIM(I2)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. This safely resolves weird invisible database export characters before and after the text.</div>`;
                    highlightColumn('paymentMethod');
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">It should be: <code>=TRIM(I2)</code>.</div>`;
                }
            });

            // LEFT Learn
            document.getElementById('s3-btn-left-learn').addEventListener('click', () => {
                let data = [...baseData];
                data = data.map(row => ({ ...row, transactionCode: row.transactionCode.substring(0, 3) }));
                updateDataset(data);

                const resBox = document.getElementById('s3-res-left-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=LEFT(A2, 3)</code><br><br>Excel extracted exactly 3 characters from the left edge of the code.</div>`;
                highlightColumn('transactionCode');
            });

            // LEFT Exercise
            document.getElementById('s3-btn-submit-left').addEventListener('click', () => {
                const inputVal = document.getElementById('s3-input-left').value.trim();
                const resBox = document.getElementById('s3-res-left');
                if (!inputVal) { resBox.className = "result-box empty"; resBox.innerHTML = "Enter a formula."; return; }

                let n = inputVal.toUpperCase().replace(/\s+/g, '');
                if (n === '=LEFT(A2,4)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    let d = [...baseData].map(r => ({ ...r, transactionCode: r.transactionCode.substring(0, 4) }));
                    updateDataset(d); highlightColumn('transactionCode');
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. Extracting 4 characters gave us: ${d[0].transactionCode}.</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">It should be: <code>=LEFT(A2, 4)</code>.</div>`;
                }
            });

            // MID Learn
            document.getElementById('s3-btn-mid-learn').addEventListener('click', () => {
                let data = [...baseData];
                data = data.map(row => ({ ...row, transactionCode: row.transactionCode.substring(4, 8) }));
                updateDataset(data);

                const resBox = document.getElementById('s3-res-mid-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=MID(A2, 5, 4)</code><br><br>Excel counts 5 spaces in (past the dash) and then cuts out exactly 4 characters to isolate the year.</div>`;
                highlightColumn('transactionCode');
            });

            // MID Exercise
            document.getElementById('s3-btn-submit-mid').addEventListener('click', () => {
                const inputVal = document.getElementById('s3-input-mid').value.trim();
                const resBox = document.getElementById('s3-res-mid');
                if (!inputVal) { resBox.className = "result-box empty"; resBox.innerHTML = "Enter a formula."; return; }

                let n = inputVal.toUpperCase().replace(/\s+/g, '');
                if (n === '=MID(A2,5,2)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    let d = [...baseData].map(r => ({ ...r, transactionCode: r.transactionCode.substring(4, 6) }));
                    updateDataset(d); highlightColumn('transactionCode');
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. Extracting 2 chars at pos 5 yields: ${d[0].transactionCode}.</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">It should be: <code>=MID(A2, 5, 2)</code>.</div>`;
                }
            });

            // RIGHT Learn
            document.getElementById('s3-btn-right-learn').addEventListener('click', () => {
                let data = [...baseData];
                data = data.map(row => ({ ...row, transactionCode: row.transactionCode.substring(row.transactionCode.length - 3) }));
                updateDataset(data);

                const resBox = document.getElementById('s3-res-right-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=RIGHT(A2, 3)</code><br><br>Excel pulled the 3 characters from the far right edge.</div>`;
                highlightColumn('transactionCode');
            });

            // RIGHT Exercise
            document.getElementById('s3-btn-submit-right').addEventListener('click', () => {
                const inputVal = document.getElementById('s3-input-right').value.trim();
                const resBox = document.getElementById('s3-res-right');
                if (!inputVal) { resBox.className = "result-box empty"; resBox.innerHTML = "Enter a formula."; return; }

                let n = inputVal.toUpperCase().replace(/\s+/g, '');
                if (n === '=RIGHT(A2,2)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    let d = [...baseData].map(r => ({ ...r, transactionCode: r.transactionCode.substring(r.transactionCode.length - 2) }));
                    updateDataset(d); highlightColumn('transactionCode');
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. Extracting two rightmost characters yielded: ${d[0].transactionCode}.</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">It should be: <code>=RIGHT(A2, 2)</code>.</div>`;
                }
            });
        }
    },
    4: {
        title: "Session 4: Power Query Simulation",
        icon: "ri-database-2-line",
        html: `
            <div class="session-badge">Session 4</div>
            <h2 class="session-title">Intro to Power Query</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Understand the ETL process: Extract, Transform, Load.</li>
                    <li>Automate data cleaning using Power Query.</li>
                </ul>
            </div>
            
            <!-- Block 1: Intro -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Understanding Power Query</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Power Query is Excel's data connectivity and data preparation technology. It allows you to create a sequence of transformation steps that can be run repeatedly without manual work.</p>
                    <p>Instead of manually using <code>PROPER</code>, <code>TRIM</code>, and Text-to-Columns every week, you can "record" these steps. The next time you get messy data, you just click "Refresh"!</p>
                </div>
            </div>

            <!-- Block 2: ETL -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-flashlight-line"></i> The ETL Concept</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <ul style="margin-top: 15px; margin-bottom: 15px;">
                        <li><strong>Extract:</strong> Pull data from a source (a folder, web API, database, or another Excel file).</li>
                        <li><strong>Transform:</strong> Clean it (fix dates, remove blanks, fix cases, split columns).</li>
                        <li><strong>Load:</strong> Push the cleaned data into a PivotTable or a clean Excel Sheet.</li>
                    </ul>
                </div>
            </div>

            <!-- Block 3: Simulation -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Simulated Power Query Workflow</h3>
                <p class="text-muted" style="margin-bottom:20px;">Click the automation steps to simulate how Power Query executes actions sequentially.</p>
                
                <div class="step-container">
                    <div class="step-circle" id="pq-step-1">1</div>
                    <div class="step-content" id="pq-desc-1">Import Data (Load raw messy dataset)</div>
                </div>
                <div class="step-container">
                    <div class="step-circle" id="pq-step-2">2</div>
                    <div class="step-content" id="pq-desc-2">Promote Headers & Parse Dates</div>
                </div>
                <div class="step-container">
                    <div class="step-circle" id="pq-step-3">3</div>
                    <div class="step-content" id="pq-desc-3">Format Text (Uppercase/Lowercase normalization)</div>
                </div>
                
                <div class="actions-row mt-3">
                    <button class="btn-action btn-success" id="s4-btn-run"><i class="ri-play-circle-line"></i> Run Full Query Workflow</button>
                    <button class="btn-action btn-outline" id="s4-btn-reset"><i class="ri-refresh-line"></i> Clear Query</button>
                </div>
            </div>
        `,
        initLogic: () => {
            document.getElementById('s4-btn-run').addEventListener('click', () => {
                const s1 = document.getElementById('pq-step-1');
                const c1 = document.getElementById('pq-desc-1');
                const s2 = document.getElementById('pq-step-2');
                const c2 = document.getElementById('pq-desc-2');
                const s3 = document.getElementById('pq-step-3');
                const c3 = document.getElementById('pq-desc-3');

                // Simulate step by step
                setTimeout(() => { s1.classList.add('active'); c1.classList.add('active'); resetData(); }, 300);
                setTimeout(() => { s2.classList.add('active'); c2.classList.add('active'); }, 1000);
                setTimeout(() => {
                    s3.classList.add('active'); c3.classList.add('active');
                    // clean data
                    let d = baseData.map(r => ({ ...r, region: r.region.toUpperCase(), product: r.product.toUpperCase() }));
                    updateDataset(d);
                }, 1800);
            });

            document.getElementById('s4-btn-reset').addEventListener('click', () => {
                document.querySelectorAll('.step-circle, .step-content').forEach(e => e.classList.remove('active'));
                resetData();
            });
        }
    },
    5: {
        title: "Session 5: Visualization in Excel",
        icon: "ri-pie-chart-line",
        html: `
            <div class="session-badge">Session 5</div>
            <h2 class="session-title">Visualizing Data</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Learn to insert and format different chart types in Excel.</li>
                    <li>Utilize Bar Charts, Line Charts, and Pie Charts effectively.</li>
                    <li>Understand chart elements (Legends, Axes, Data Labels).</li>
                </ul>
            </div>
            
            <!-- Block 1: Storytelling -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Data Storytelling</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Data tells a story, and charts are the best way to present it. Let's look at what charts to use:</p>
                    <ul style="margin-top: 15px; margin-bottom: 15px;">
                        <li><strong>Bar/Column Charts:</strong> Best for comparing categories (e.g., Sales by Region).</li>
                        <li><strong>Line Charts:</strong> Best for showing trends over time (e.g., Monthly Revenue).</li>
                        <li><strong>Pie Charts:</strong> Best for showing parts of a whole (e.g., Payment Method breakdown). <em>Warning: Don't use this if you have more than 5 categories!</em></li>
                    </ul>
                </div>
            </div>

            <!-- Block 2: Step by step -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-file-excel-2-line"></i> Excel Step-by-Step Guide</h3>
                <p>Follow these steps inside Microsoft Excel to visualize your data:</p>
                
                <ol style="margin-left: 20px; line-height: 1.8; margin-top: 15px; margin-bottom: 15px;">
                    <li><strong>Highlight Data:</strong> Select the columns you want to visualize (e.g., <code>Region</code> and <code>TotalPrice</code>).</li>
                    <li><strong>Insert Menu:</strong> Go to the <code>Insert</code> tab on the top ribbon.</li>
                    <li><strong>Recommended Charts:</strong> Click the <code>Recommended Charts</code> button to let Excel suggest the best fit.</li>
                    <li><strong>Select Chart:</strong> Choose a Clustered Column/Bar Chart.</li>
                    <li><strong>Formatting:</strong> Click the <code>+</code> icon next to the chart to add 'Data Labels' and update the 'Chart Title'.</li>
                </ol>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p>Based on our dataset, if you wanted to track whether we received more total orders in Q1 compared to Q2, what chart type would you insert?</p>
            </div>
        `,
        initLogic: () => {
            // No custom logic needed for this text-only guide
        }
    },
    6: {
        title: "Session 6: Advanced Formulas",
        icon: "ri-formula",
        html: `
            <div class="session-badge">Session 6</div>
            <h2 class="session-title">Advanced Formulas</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Master INDEX/MATCH vs VLOOKUP.</li>
                    <li>Perform multi-criteria checks using SUMIFS and COUNTIFS.</li>
                    <li>Utilize error handling with IFERROR.</li>
                </ul>
            </div>
            
            <!-- VLOOKUP -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning VLOOKUP</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code> searches for a value in the first column of a table and returns a value in the same row from another column.</p>
                    <p><strong>Example Scenario:</strong> Find the Region (Column B) for OrderID "ORD0313" (Column A). Since B is to the right of A, VLOOKUP works perfectly.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>lookup_value</code>: What you are looking for (e.g., "ORD0313").</li>
                        <li><code>table_array</code>: Where to look (the table range). The first column must contain the lookup_value.</li>
                        <li><code>col_index_num</code>: The column number in the table (starting from 1) to return the value from.</li>
                        <li><code>[range_lookup]</code>: TRUE for approximate match or FALSE (0) for an exact match.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row" style="align-items: center;">
                    <input type="text" class="input-control" id="s6-vlookup-learn-input" placeholder="e.g. ORD0313" value="ORD0313" style="width: 150px;">
                    <button class="btn-action btn-success" id="s6-btn-vlookup-learn"><i class="ri-play-circle-line"></i> Simulate =VLOOKUP()</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Data</button>
                </div>
                <div class="result-box empty" id="s6-res-vlookup-learn">
                    Simulate looking up an OrderID's region.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: VLOOKUP</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> What if you need to fetch the TotalPrice (Column H)? TotalPrice is the 8th column starting from OrderID.</p>
                    <p>Write the VLOOKUP formula to find the TotalPrice dynamically for Order ID <code>"ORD0313"</code>. The entire data is from A1 to I6, but assume your data range is A2:H6.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s6-input-vlookup" class="input-control" placeholder='e.g., =VLOOKUP("ORD0313", A2:H6, 8, 0)' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s6-btn-submit-vlookup"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s6-res-vlookup">
                    Submit your formula to check if it's correct.
                </div>
            </div>

            <!-- INDEX MATCH -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning INDEX / MATCH</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Limitation of VLOOKUP:</strong> It can only look to the <em>right</em>. If you had the TransactionCode (Column A) and wanted to lookup backwards, VLOOKUP fails.</p>
                    <p><code>=INDEX(return_array, MATCH(lookup_value, lookup_array, 0))</code> is a combo. <code>MATCH</code> finds the row number, and <code>INDEX</code> returns the value at that row anywhere!</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><strong>For MATCH:</strong> <code>lookup_value</code> is what you're finding, <code>lookup_array</code> is the target column to search, and <code>match_type</code> is 0 for exact match. It returns the row number!</li>
                        <li><strong>For INDEX:</strong> <code>array</code> is the column you want the final answer from, and you pass the MATCH result as the <code>row_num</code>.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row" style="align-items: center;">
                    <input type="text" class="input-control" id="s6-im-learn-input" placeholder="e.g. ORD0313" value="ORD0313" style="width: 150px;">
                    <button class="btn-action btn-success" id="s6-btn-im-learn"><i class="ri-play-circle-line"></i> Simulate INDEX/MATCH</button>
                </div>
                <div class="result-box empty" id="s6-res-im-learn">
                    Click to simulate.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: INDEX/MATCH</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Scenario:</strong> You know the PaymentMethod is "POS". You want to find out the <em>TransactionCode</em> for the first POS transaction.</p>
                    <p>Write the INDEX/MATCH formula to fetch the TransactionCode (Column A) based on finding "POS" in the PaymentMethod column (Column I).</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s6-input-im" class="input-control" placeholder='e.g., =INDEX(A2:A6, MATCH("POS", I2:I6, 0))' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s6-btn-submit-im"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s6-res-im">
                    Submit your formula.
                </div>
            </div>

            <!-- COUNTIFS -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning COUNTIFS</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><code>=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2...)</code> lets you count rows that meet <em>multiple</em> conditions simultaneously.</p>
                    <p><strong>Scenario:</strong> Count how many transactions were "Transfer" AND happened in "Lagos".</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>criteria_range1</code>: The first range of cells to test.</li>
                        <li><code>criteria1</code>: The condition that the first range must meet.</li>
                        <li>Pairs of <code>criteria_range</code> and <code>criteria</code> follow. All conditions must be true to be counted!</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s6-btn-countifs-learn"><i class="ri-play-circle-line"></i> Simulate =COUNTIFS()</button>
                </div>
                <div class="result-box empty" id="s6-res-countifs-learn">
                    Click to simulate.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: COUNTIFS</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Write a COUNTIFS formula to find out how many "Laptops" were paid for via "Transfer". Products are in Column C (C2:C6) and Payment Method in Column I (I2:I6).</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s6-input-countifs" class="input-control" placeholder='e.g., =COUNTIFS(C2:C6, "Laptop", I2:I6, "Transfer")' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s6-btn-submit-countifs"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s6-res-countifs">
                    Submit your formula.
                </div>
            </div>

            <!-- SUMIFS -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning SUMIFS</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><code>=SUMIFS(sum_range, criteria_range1, criteria1...)</code> sums values safely with multiple conditions. Note that <code>sum_range</code> is the <strong>first</strong> argument, unlike SUMIF!</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>sum_range</code>: The column of numbers you actually want to add up.</li>
                        <li><code>criteria_range1</code>, <code>criteria1</code>: The first column to evaluate and its condition.</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s6-btn-sumifs-learn"><i class="ri-play-circle-line"></i> Simulate =SUMIFS()</button>
                </div>
                <div class="result-box empty" id="s6-res-sumifs-learn">
                    Click to simulate.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: SUMIFS</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Sum up the <em>TotalPrice</em> (H2:H6) for all "Desktop" (C2:C6) transactions made in "Kano" (B2:B6).</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s6-input-sumifs" class="input-control" placeholder='e.g., =SUMIFS(H2:H6, C2:C6, "Desktop", B2:B6, "Kano")' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s6-btn-submit-sumifs"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s6-res-sumifs">
                    Submit your formula.
                </div>
            </div>

            <!-- IFERROR -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Learning IFERROR</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><code>=IFERROR(value, value_if_error)</code> hides ugly Excel errors like <code>#N/A</code> or <code>#DIV/0!</code> and replaces them with a clean message.</p>
                    <p><strong>Parameters:</strong></p>
                    <ul style="margin-left: 20px; font-size: 0.9em;">
                        <li><code>value</code>: The formula or expression that might cause an error (e.g., <code>100/0</code> or a failing <code>VLOOKUP</code>).</li>
                        <li><code>value_if_error</code>: What to display instead (e.g., "Not Found").</li>
                    </ul>
                </div>
                <div class="sync-data-table table-container" style="max-height: 250px; overflow-y: auto; margin-bottom: 15px; font-size: 0.9em; box-shadow: none; border: 1px solid var(--border-color);"></div>
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s6-btn-iferror-learn"><i class="ri-play-circle-line"></i> Simulate =IFERROR()</button>
                </div>
                <div class="result-box empty" id="s6-res-iferror-learn">
                    Click to simulate.
                </div>
            </div>

            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: IFERROR</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>Assume you did <code>=100/0</code> in Excel, which throws a divide by zero error. Wrap it in an IFERROR to output the text "Math Error" instead.</p>
                </div>
                <div style="background: #F8FAFC; padding: 15px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 15px;">
                    <label style="display:block; font-weight:600; margin-bottom: 8px;">Enter your Excel formula:</label>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="s6-input-iferror" class="input-control" placeholder='e.g., =IFERROR(100/0, "Math Error")' style="flex: 1; font-family: monospace; font-size: 1.1em;">
                        <button class="btn-action btn-success" id="s6-btn-submit-iferror"><i class="ri-check-line"></i> Submit Formula</button>
                    </div>
                </div>
                <div class="result-box empty" id="s6-res-iferror">
                    Submit your formula.
                </div>
            </div>
        `,
        initLogic: () => {
            if (typeof renderTable === 'function') { renderTable(); }

            // VLOOKUP Learn
            document.getElementById('s6-btn-vlookup-learn').addEventListener('click', () => {
                const val = document.getElementById('s6-vlookup-learn-input').value.trim();
                const resBox = document.getElementById('s6-res-vlookup-learn');
                if (!val) return;

                const matchIndex = baseData.findIndex(r => r.orderId.toUpperCase() === val.toUpperCase());
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                if (matchIndex === -1) {
                    resBox.innerHTML = `<strong>Error:</strong> ID not found. VLOOKUP returns #N/A.`;
                } else {
                    resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=VLOOKUP("${val}", A2:I6, 2, FALSE)</code><br><br>Excel looked down Column A, found "${val}", and went 2 columns across to return: <strong>${baseData[matchIndex].region}</strong>.</div>`;
                    highlightRows([matchIndex]);
                }
            });

            // VLOOKUP Exercise
            document.getElementById('s6-btn-submit-vlookup').addEventListener('click', () => {
                const inputVal = document.getElementById('s6-input-vlookup').value.trim().toUpperCase().replace(/\s+/g, '');
                const resBox = document.getElementById('s6-res-vlookup');

                if (inputVal === '=VLOOKUP("ORD0313",A2:H6,8,0)' || inputVal === '=VLOOKUP("ORD0313",A2:H6,8,FALSE)' || inputVal === 'VLOOKUP("ORD0313",A2:H6,8,FALSE)') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Correct. Column 8 corresponds to TotalPrice.</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">Check your syntax. <code>=VLOOKUP("ORD0313", A2:H6, 8, 0)</code></div>`;
                }
            });

            // INDEX MATCH Learn
            document.getElementById('s6-btn-im-learn').addEventListener('click', () => {
                const val = document.getElementById('s6-im-learn-input').value.trim();
                const resBox = document.getElementById('s6-res-im-learn');
                if (!val) return;

                const matchIndex = baseData.findIndex(r => r.orderId.toUpperCase() === val.toUpperCase());
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                if (matchIndex === -1) {
                    resBox.innerHTML = `<strong>Error:</strong> ID not found.`;
                } else {
                    resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=INDEX(B2:B6, MATCH("${val}", A2:A6, 0))</code><br><br><code>MATCH</code> computed row ${matchIndex + 1}. <code>INDEX</code> grabbed the value in row ${matchIndex + 1} of column B: <strong>${baseData[matchIndex].region}</strong>.</div>`;
                    highlightRows([matchIndex]);
                }
            });

            // INDEX MATCH Exercise
            document.getElementById('s6-btn-submit-im').addEventListener('click', () => {
                const inputVal = document.getElementById('s6-input-im').value.trim().toUpperCase().replace(/\s+/g, '');
                const resBox = document.getElementById('s6-res-im');
                if (inputVal === '=INDEX(A2:A6,MATCH("POS",I2:I6,0))' || inputVal === 'INDEX(A2:A6,MATCH("POS",I2:I6,0))' || inputVal === '=INDEX(A2:A6,MATCH("POS",I2:I6,FALSE))') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong><br><div style="margin-top:10px;">Perfect. You looked up backwards successfully!</div>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">Expected: <code>=INDEX(A2:A6, MATCH("POS", I2:I6, 0))</code></div>`;
                }
            });

            // COUNTIFS Learn
            document.getElementById('s6-btn-countifs-learn').addEventListener('click', () => {
                const resBox = document.getElementById('s6-res-countifs-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=COUNTIFS(I2:I6, "Transfer", B2:B6, "Lagos")</code><br><br>Checked two criteria! Output: 1.</div>`;
            });

            // COUNTIFS Exercise
            document.getElementById('s6-btn-submit-countifs').addEventListener('click', () => {
                const inputVal = document.getElementById('s6-input-countifs').value.trim().toUpperCase().replace(/\s+/g, '');
                const resBox = document.getElementById('s6-res-countifs');
                if (inputVal.includes('COUNTIFS(') && inputVal.includes('C2:C6,"LAPTOP"') && inputVal.includes('I2:I6,"TRANSFER"')) {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">Check your syntax. <code>=COUNTIFS(C2:C6, "Laptop", I2:I6, "Transfer")</code></div>`;
                }
            });

            // SUMIFS Learn
            document.getElementById('s6-btn-sumifs-learn').addEventListener('click', () => {
                const resBox = document.getElementById('s6-res-sumifs-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=SUMIFS(H2:H6, I2:I6, "Transfer", B2:B6, "Lagos")</code><br><br>Total was summed safely! Result: 1399</div>`;
            });

            // SUMIFS Exercise
            document.getElementById('s6-btn-submit-sumifs').addEventListener('click', () => {
                const inputVal = document.getElementById('s6-input-sumifs').value.trim().toUpperCase().replace(/\s+/g, '');
                const resBox = document.getElementById('s6-res-sumifs');
                if (inputVal.includes('SUMIFS(H2:H6') && inputVal.includes('C2:C6,"DESKTOP"') && inputVal.includes('B2:B6,"KANO"')) {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">Check your syntax. <code>=SUMIFS(H2:H6, C2:C6, "Desktop", B2:B6, "Kano")</code></div>`;
                }
            });

            // IFERROR Learn
            document.getElementById('s6-btn-iferror-learn').addEventListener('click', () => {
                const resBox = document.getElementById('s6-res-iferror-learn');
                resBox.className = "result-box"; resBox.style.backgroundColor = "#EFF6FF"; resBox.style.borderColor = "var(--secondary-color)";
                resBox.innerHTML = `<strong>Explanation:</strong><br><div style="margin-top:10px;"><strong>Formula:</strong> <code>=IFERROR(VLOOKUP("Missing", A2:I6, 2, FALSE), "Not Found")</code><br><br>Outputs "Not Found" instead of #N/A.</div>`;
            });

            // IFERROR Exercise
            document.getElementById('s6-btn-submit-iferror').addEventListener('click', () => {
                const inputVal = document.getElementById('s6-input-iferror').value.trim().toUpperCase().replace(/\s+/g, '');
                const resBox = document.getElementById('s6-res-iferror');
                if (inputVal === '=IFERROR(100/0,"MATHERROR")' || inputVal === 'IFERROR(100/0,"MATHERROR")') {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#F0FDF4"; resBox.style.borderColor = "#86EFAC"; resBox.style.color = "#166534";
                    resBox.innerHTML = `<strong><i class="ri-checkbox-circle-fill"></i> Pass!</strong>`;
                } else {
                    resBox.className = "result-box"; resBox.style.backgroundColor = "#FEF2F2"; resBox.style.borderColor = "#FCA5A5"; resBox.style.color = "#991B1B";
                    resBox.innerHTML = `<strong><i class="ri-close-circle-fill"></i> Incorrect</strong><br><div style="margin-top:10px;">Expected: <code>=IFERROR(100/0, "Math Error")</code></div>`;
                }
            });
        }
    },
    7: {
        title: "Session 7: PivotTables & Dashboards",
        icon: "ri-layout-masonry-line",
        html: `
            <div class="session-badge">Session 7</div>
            <h2 class="session-title">PivotTables & Slicers</h2>
            
            <div class="objective-list">
                <h4><i class="ri-focus-2-line"></i> Objectives</h4>
                <ul>
                    <li>Summarize massive datasets flawlessly with PivotTables.</li>
                    <li>Add Slicers for rapid, interactive filtering.</li>
                    <li>Build dashboard foundations.</li>
                </ul>
            </div>
            
            <!-- Block 1: Understanding PivotTables -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-book-read-line"></i> Understanding PivotTables</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>PivotTables allow you to drag and drop data fields to summarize metrics automatically.</p>
                    <p>Instead of manually writing <code>SUMIFS</code> or <code>COUNTIFS</code> a hundred times, a PivotTable groups your data by categories (e.g., rows for Region, columns for PaymentMethod) and aggregates the numbers instantly.</p>
                </div>
            </div>

            <!-- Block 2: Interactive Slicers -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-filter-3-line"></i> Interactive Slicers Simulation</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p>A slicer connects to PivotTables to act as a visual filter. When you click a Slicer, it filters the underlying PivotTable and any connected charts immediately—this is the foundation of an Excel Dashboard.</p>
                    <p class="text-muted" style="margin-top:10px;">Click the slicer buttons below to instantly filter the dataset and recalculate the Pivot Summary.</p>
                </div>
                
                <h5 style="margin-bottom: 8px;">Slicer: Payment Method</h5>
                <div class="actions-row">
                    <button class="btn-action btn-outline slicer-btn" data-slice="transfer"><i class="ri-bank-card-line"></i> Transfer</button>
                    <button class="btn-action btn-outline slicer-btn" data-slice="pos"><i class="ri-calculator-line"></i> POS</button>
                    <button class="btn-action btn-outline slicer-btn" data-slice="all" style="background:var(--secondary-color); color:white"><i class="ri-filter-off-line"></i> Clear Slicer</button>
                </div>

                <div class="result-box mt-3" id="s7-result">
                    <strong>Pivot Summary (Unfiltered):</strong><br>
                    Total Rows: 5<br>
                    Sum of Total Price: ₦110,085
                </div>
            </div>

            <!-- Block 3: Practical Exercise -->
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-keyboard-line"></i> Practical Exercise: PivotTables</h3>
                <div class="explanation" style="margin-bottom: 15px;">
                    <p><strong>Assignment:</strong> Open your Excel workbook. Insert a PivotTable.</p>
                    <ol style="margin-left:20px; line-height: 1.6;">
                        <li>Drag <code>Region</code> to the <strong>Rows</strong> area.</li>
                        <li>Drag <code>TotalPrice</code> to the <strong>Values</strong> area.</li>
                        <li>Format the values as Currency (₦).</li>
                    </ol>
                </div>
            </div>
        `,
        initLogic: () => {
            document.querySelectorAll('.slicer-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const sliceValue = e.target.getAttribute('data-slice') || e.target.closest('button').getAttribute('data-slice');

                    document.querySelectorAll('.slicer-btn').forEach(b => {
                        b.style.background = '';
                        b.style.color = '';
                        b.classList.add('btn-outline');
                    });

                    e.target.closest('button').style.background = 'var(--secondary-color)';
                    e.target.closest('button').style.color = 'white';

                    if (sliceValue === 'all') {
                        resetData();
                        const sum = baseData.reduce((acc, r) => acc + r.totalPrice, 0);
                        document.getElementById('s7-result').innerHTML = `
                            <strong>Pivot Summary (Unfiltered):</strong><br>
                            Total Rows: ${baseData.length}<br>
                            Sum of Total Price: ₦${sum.toLocaleString()}
                        `;
                    } else {
                        // case insensitive filter
                        const filtered = baseData.filter(r => r.paymentMethod.toLowerCase() === sliceValue);
                        updateDataset(filtered);

                        const sum = filtered.reduce((acc, r) => acc + r.totalPrice, 0);
                        document.getElementById('s7-result').innerHTML = `
                            <strong>Pivot Summary (Filtered: ${sliceValue.toUpperCase()}):</strong><br>
                            Total Rows: ${filtered.length}<br>
                            Sum of Total Price: ₦${sum.toLocaleString()}
                        `;
                    }
                });
            });
        }
    },
    8: {
        title: "Session 8: Final Project",
        icon: "ri-flag-2-line",
        html: `
            <div class="session-badge">Session 8</div>
            <h2 class="session-title">Capstone Project</h2>
            
            <div class="objective-list">
                <h4><i class="ri-book-open-line"></i> Project Brief</h4>
                <p>Welcome to the final capstone project. In this session, you will apply all the skills you've learned throughout this tutorial to a real-world dataset. Your task is to clean the data, perform a thorough analysis, and create meaningful visualizations.</p>
                
                <a href="Excel_Capstone_Data.xlsx" download class="btn-action btn-success" style="margin-top: 15px; text-decoration: none; width: 100%; justify-content: center;">
                    <i class="ri-download-cloud-2-line"></i> Download Capstone Dataset (.xlsx)
                </a>
            </div>
            
            <div class="interactive-zone" style="margin-bottom: 30px;">
                <h3 class="interactive-header"><i class="ri-tools-line"></i> Project Tasks</h3>
                
                <div class="task-section" style="margin-bottom: 25px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <span style="background: var(--secondary-color); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">A</span>
                        Data Cleaning
                    </h4>
                    <div class="explanation" style="margin-left: 32px;">
                        <p>Begin by cleaning the raw dataset. Ensure consistent formatting, handle missing values, and remove any duplicates or errors that might affect your analysis.</p>
                    </div>
                </div>

                <div class="task-section" style="margin-bottom: 25px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <span style="background: var(--secondary-color); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">B</span>
                        Data Analysis
                    </h4>
                    <div class="explanation" style="margin-left: 32px;">
                        <p>Answer the following management questions using Excel formulas or PivotTables:</p>
                        <ul style="margin-top: 10px; line-height: 1.8; list-style-type: none; padding-left: 0;">
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">i.</strong> <span>How many fashion transactions were recorded?</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">ii.</strong> <span>How much sales was recorded in the Groceries category?</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">iii.</strong> <span>How much in total did Sarah James sell as a sales rep?</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">iv.</strong> <span>How much discount was given to the customer with order id <strong>ORD1008</strong> and what product did that customer buy?</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">v.</strong> <span>What date was the order <strong>ORD1450</strong> made?</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">vi.</strong> <span>Shawn Martin claimed to have made an order of <em>Laptop Stand</em> and instead he got a <em>Face cream</em>. He lost his receipt but claims his order ID is <strong>ORD1443</strong>. As a data analyst, check this orderID and confirm the product he ordered.</span></li>
                        </ul>
                    </div>
                </div>

                <div class="task-section" style="margin-bottom: 10px;">
                    <h4 style="color: var(--secondary-color); margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                        <span style="background: var(--secondary-color); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">C</span>
                        Data Visualisation
                    </h4>
                    <div class="explanation" style="margin-left: 32px;">
                        <p>Create visual reports to present your findings:</p>
                        <ul style="margin-top: 10px; line-height: 1.8; list-style-type: none; padding-left: 0;">
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">i.</strong> <span>Visualise the sale of categories using a <strong>Bar Chart</strong>.</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">ii.</strong> <span>Visualise the <strong>Sales Trend</strong> for this supermarket.</span></li>
                            <li style="margin-bottom: 8px; display: flex; gap: 10px; align-items: flex-start;"><strong style="color: var(--text-muted); flex-shrink: 0;">iii.</strong> <span>Using a <strong>Pie Chart</strong>, present the number of Delivered, Pending and Returned products.</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="assignment-box" style="background:#F0FDF4; border-color:#86EFAC;">
                <h4 style="color: #166534;"><i class="ri-mail-send-line"></i> Project Submission</h4>
                <p>Once you have completed your analysis and built your dashboard, please submit your Excel workbook (.xlsx) directly to your instructor for review.</p>
                <p class="text-muted" style="margin-top: 10px; font-size: 0.85rem;"><i class="ri-information-line"></i> Ensure your file is named following the format: <code>YourName_Capstone_Project.xlsx</code></p>
            </div>
        `,
        initLogic: () => {
            // No specific logic needed for static project brief
        }
    }
};

window.sessionsData = sessionsData;
