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
                    <li>Understand basic Excel operations and formulas (SUM, AVERAGE, MIN, MAX).</li>
                    <li>Learn how cell referencing works in formulas.</li>
                    <li>Basic data formatting principles.</li>
                </ul>
            </div>
            
            <div class="explanation">
                <p>Welcome to your first session! Let's start with the absolute basics. Formulas are the heart of Data Analysis in Excel. You can perform calculations, extract information, and manipulate contents of cells.</p>
                <br>
                <p><strong>Common Functions:</strong></p>
                <ul>
                    <li><code>=SUM()</code> - Adds values up.</li>
                    <li><code>=AVERAGE()</code> - Finds the mean.</li>
                    <li><code>=MAX()</code> & <code>=MIN()</code> - Returns the highest/lowest values.</li>
                </ul>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Try It Yourself (Interactive Demo)</h3>
                <p class="text-muted" style="margin-bottom: 20px;">Click the buttons below to see how these functions interact with the dataset table above.</p>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s1-btn-revenue"><i class="ri-calculator-line"></i> Calculate Total Revenue</button>
                    <button class="btn-action" id="s1-btn-max"><i class="ri-arrow-up-circle-line"></i> Find Highest Sale</button>
                    <button class="btn-action" id="s1-btn-avg"><i class="ri-funds-line"></i> Find Average Quantity</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Table</button>
                </div>

                <div class="result-box empty" id="s1-result">
                    Click a button to see the calculated result here.
                </div>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p><strong>Task 1:</strong> Using the sample data above, visually identify which region had the lowest sale quantity.</p>
                <p><strong>Task 2:</strong> Try calculating mentally or with paper what the SUM of all quantities is.</p>
            </div>
        `,
        initLogic: () => {
            document.getElementById('s1-btn-revenue').addEventListener('click', () => {
                const data = currentDataState;
                const total = data.reduce((sum, row) => sum + row.totalPrice, 0);
                document.getElementById('s1-result').innerHTML = `
                    <strong>Total Revenue:</strong> ₦${total.toLocaleString()}<br>
                    <div style="margin-top:15px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem; line-height:1.5;">
                        <strong>Excel Formula Used:</strong> <code>=SUM(H2:H6)</code><br><br>
                        <em>Explanation:</em> The colon (<code>:</code>) is used to specify a continuous range of cells to be calculated. For example, <code>H2:H6</code> means "add all cells from H2 through H6 together".<br><br>
                        <em>Pro Tip:</em> Alternatively, if you wanted to add only specific, non-continuous cells, you would use commas (<code>,</code>). For example, <code>=SUM(H2, H4, H6)</code> adds just those three specific cells!
                    </div>
                `;
                
                // Visual Highlight
                highlightColumn('totalPrice');
            });

            document.getElementById('s1-btn-max').addEventListener('click', () => {
                const data = currentDataState;
                let max = Math.max(...data.map(o => o.totalPrice));
                let rowIndex = data.findIndex(o => o.totalPrice === max);
                document.getElementById('s1-result').innerHTML = `
                    <strong>Highest Sale:</strong> ₦${max.toLocaleString()}<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=MAX(H2:H6)</code><br>
                        <em>Explanation:</em> This instantly scans rows 2 through 6 in column H and returns the single largest numerical value.
                    </div>
                `;
                
                // Visual Highlight
                highlightRows([rowIndex]);
            });

            document.getElementById('s1-btn-avg').addEventListener('click', () => {
                const data = currentDataState;
                let sum = data.reduce((acc, row) => acc + row.quantity, 0);
                let avg = (sum / data.length).toFixed(1);
                document.getElementById('s1-result').innerHTML = `
                    <strong>Average Quantity:</strong> ${avg} items<br>
                    <div style="margin-top:10px; padding:12px; background:#EFF6FF; border-left:4px solid var(--secondary-color); border-radius:4px; font-size:0.95rem;">
                        <strong>Excel Formula Used:</strong> <code>=AVERAGE(F2:F6)</code><br>
                        <em>Explanation:</em> Calculates the mathematical mean of all the values located within the range F2 to F6.
                    </div>
                `;
                
                // Visual Highlight
                highlightColumn('quantity');
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
                    <li>Master IF, AND, OR conditions.</li>
                    <li>Utilize conditional aggregation: SUMIF, COUNTIF.</li>
                    <li>Apply sorting and filtering dynamically.</li>
                </ul>
            </div>
            
            <div class="explanation">
                <p>Data isn't just about calculations; it's about decision-making. Logical functions allow Excel to make automated decisions based on the data conditions you set.</p>
                <br>
                <p>For example: <code>=SUMIF(Range, Criteria, Sum_Range)</code> can sum total sales <em>only</em> if the Region is "Lagos".</p>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Try It Yourself (Interactive Demo)</h3>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s2-btn-pos"><i class="ri-calculator-line"></i> Count POS Transactions</button>
                    <button class="btn-action" id="s2-btn-lagos"><i class="ri-map-pin-line"></i> Total Sales for Lagos</button>
                    <select class="input-control" id="s2-region-filter">
                        <option value="all">-- Filter By Region --</option>
                        <option value="Port Harcourt">Port Harcourt</option>
                        <option value="kano">Kano</option>
                        <option value="Lagos">Lagos</option>
                        <option value="ABUJA">Abuja</option>
                    </select>
                </div>

                <div class="result-box empty" id="s2-result">
                    Results will appear here.
                </div>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p><strong>Task:</strong> If you wrote a COUNTIF formula to find how many 'transfer' payments occurred, what would the result be?</p>
            </div>
        `,
        initLogic: () => {
            const resultBox = document.getElementById('s2-result');
            
            document.getElementById('s2-btn-pos').addEventListener('click', () => {
                const data = currentDataState;
                // Standardize casing for comparison since data is messy
                const posCount = data.filter(r => r.paymentMethod.toUpperCase() === 'POS').length;
                resultBox.innerHTML = `<strong>POS Count (COUNTIF):</strong> ${posCount} transactions`;
                
                const indices = data.map((r, i) => r.paymentMethod.toUpperCase() === 'POS' ? i : -1).filter(i => i !== -1);
                highlightRows(indices);
            });

            document.getElementById('s2-btn-lagos').addEventListener('click', () => {
                const data = currentDataState;
                const lagosSales = data.filter(r => r.region.toLowerCase() === 'lagos')
                                      .reduce((sum, r) => sum + r.totalPrice, 0);
                
                resultBox.innerHTML = `<strong>Lagos Sales (SUMIF):</strong> ₦${lagosSales.toLocaleString()}`;
                
                const indices = data.map((r, i) => r.region.toLowerCase() === 'lagos' ? i : -1).filter(i => i !== -1);
                highlightRows(indices);
            });

            document.getElementById('s2-region-filter').addEventListener('change', (e) => {
                const region = e.target.value.toLowerCase();
                const allData = getDataset(); // we keep a pristine base in data.js, but currentDataState handles filters
                
                if (region === 'all') {
                    resetData();
                    resultBox.innerHTML = `Filter cleared. Showing all data.`;
                } else {
                    const filtered = baseData.filter(r => r.region.toLowerCase() === region);
                    updateDataset(filtered);
                    resultBox.innerHTML = `<strong>Filtered List:</strong> ${filtered.length} rows matched region '${region}'.`;
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

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Try It Yourself (Interactive Demo)</h3>
                <p class="text-muted" style="margin-bottom:15px;">Watch the dataset table above transform immediately as we apply data cleaning steps.</p>
                
                <div class="actions-row">
                    <button class="btn-action btn-success" id="s3-btn-clean"><i class="ri-magic-line"></i> Fix Text Formatting (PROPER)</button>
                    <button class="btn-action" id="s3-btn-extract"><i class="ri-split-cells-vertical"></i> Extract Code Info (Text-to-Columns)</button>
                    <button class="btn-action btn-outline" onclick="resetData()"><i class="ri-refresh-line"></i> Reset Table to Messy</button>
                </div>

                <div class="result-box empty" id="s3-result">
                    Run a cleaning process.
                </div>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p>Identify the Excel functions you would use to extract the year "2023" from the <code>TransactionCode</code> "KAN-2023-SLS".</p>
            </div>
        `,
        initLogic: () => {
            const resultBox = document.getElementById('s3-result');

            document.getElementById('s3-btn-clean').addEventListener('click', () => {
                let data = [...currentDataState];
                
                // Capitalize first letters (PROPER Equivalent)
                const toProper = (str) => {
                    return str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
                };

                data = data.map(row => ({
                    ...row,
                    region: toProper(row.region),
                    product: toProper(row.product),
                    category: toProper(row.category),
                    paymentMethod: toProper(row.paymentMethod)
                }));

                updateDataset(data);
                resultBox.innerHTML = `<strong>Success:</strong> Applied PROPER and TRIM equivalent to textual columns. Notice the standard capitalization in the table above!`;
            });

            document.getElementById('s3-btn-extract').addEventListener('click', () => {
                let data = [...currentDataState];
                
                // Simulate Text-To-Columns / MID/LEFT
                data = data.map(row => {
                    const code = row.transactionCode; // format: PHC-2023-SLS
                    const parts = code.split('-');
                    return {
                        ...row,
                        city: parts[0] || "",
                        year: parts[1] || "",
                        type: parts[2] || ""
                    };
                });

                updateDataset(data);
                resultBox.innerHTML = `<strong>Success (Text-to-columns):</strong> Extracted 'City', 'Year', and 'Type' successfully into new columns.`;
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
            
            <div class="explanation">
                <p>Power Query is Excel's data connectivity and data preparation technology. It allows you to create a sequence of transformation steps that can be run repeatedly without manual work.</p>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Simulated Power Query Steps</h3>
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
                    let d = baseData.map(r => ({...r, region: r.region.toUpperCase(), product: r.product.toUpperCase()})); 
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
            
            <div class="explanation">
                <p>Data tells a story, and charts are the best way to present it. In this segment, we will guide you on how to turn your raw numbers into visual narratives using Microsoft Excel's robust charting engine.</p>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-file-excel-2-line"></i> Excel Step-by-Step Guide</h3>
                <p>Follow these steps inside Microsoft Excel to visualize your data:</p>
                
                <ol style="margin-left: 20px; line-height: 1.8; margin-top: 15px;">
                    <li><strong>Highlight Data:</strong> Select the columns you want to visualize (e.g., <code>Region</code> and <code>TotalPrice</code>).</li>
                    <li><strong>Insert Menu:</strong> Go to the <code>Insert</code> tab on the top ribbon.</li>
                    <li><strong>Recommended Charts:</strong> Click the <code>Recommended Charts</code> button to let Excel suggest the best fit.</li>
                    <li><strong>Select Chart:</strong> Choose a Clustered Column/Bar Chart.</li>
                    <li><strong>Formatting:</strong> Click the <code>+</code> icon next to the chart to add 'Data Labels' and update the 'Chart Title'.</li>
                </ol>
            </div>

            <div class="assignment-box">
                <h4><i class="ri-pencil-ruler-2-line"></i> Assignment</h4>
                <p>What chart type is best suited for showing the percentage breakdown of the <code>PaymentMethod</code> (e.g., Transfer vs POS)? Create one in your workbook.</p>
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
            
            <div class="explanation">
                <p>When VLOOKUP fails you (e.g., looking to the left), INDEX and MATCH become your best friends. Combined, they create the most dynamic lookup formula in Excel.</p>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-macbook-line"></i> Try It Yourself: Simulate INDEX/MATCH</h3>
                <p class="text-muted" style="margin-bottom:15px;">Enter an exact <code>OrderID</code> from the table to look up its Product and Price.</p>
                
                <div class="actions-row" style="align-items: center;">
                    <input type="text" class="input-control" id="s6-lookup-id" placeholder="e.g. ORD0313" style="width: 200px;">
                    <button class="btn-action btn-success" id="s6-btn-lookup"><i class="ri-search-line"></i> Lookup (Simulate)</button>
                </div>

                <div class="result-box empty" id="s6-result">
                    Enter an Order ID to begin lookup.
                </div>
            </div>
        `,
        initLogic: () => {
            document.getElementById('s6-btn-lookup').addEventListener('click', () => {
                const searchVal = document.getElementById('s6-lookup-id').value.trim().toUpperCase();
                const resultBox = document.getElementById('s6-result');
                const data = baseData; // lookup against untouched base data
                
                if (!searchVal) {
                    resultBox.innerHTML = `Please enter a valid Order ID.`;
                    return;
                }

                // Simulate match
                const matchIndex = data.findIndex(r => r.orderId.toUpperCase() === searchVal);
                
                if (matchIndex === -1) {
                    // Simulate IFERROR
                    resultBox.innerHTML = `<strong>#N/A Error Simulated:</strong> Order ID not found. You could wrap this in <code>=IFERROR(..., "Record missing")</code>`;
                } else {
                    const row = data[matchIndex];
                    resultBox.innerHTML = `<strong>Indexed Data:</strong> Order <code>${row.orderId}</code> is for <strong>${row.product}</strong>, total price: ₦${row.totalPrice.toLocaleString()}.`;
                    highlightRows([matchIndex]);
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
            
            <div class="explanation">
                <p>PivotTables allow you to drag and drop data fields to summarize metrics automatically. A slicer connects to PivotTables to act as a visual filter dashboard element.</p>
            </div>

            <div class="interactive-zone">
                <h3 class="interactive-header"><i class="ri-filter-3-line"></i> Slicer Simulation Dashboard</h3>
                <p class="text-muted" style="margin-bottom:15px;">Click the slicer buttons to instantly filter the dataset logic and recalculate table outcomes.</p>
                
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
                <h4><i class="ri-book-open-line"></i> Capstone Instructions</h4>
                <ul>
                    <li>1. Load and thoroughly clean a raw 1,000+ row dataset.</li>
                    <li>2. Apply advanced formulas to generate new metric columns.</li>
                    <li>3. Build an interactive Pivot Dashboard resolving 3 management queries.</li>
                    <li>4. Present actionable insights.</li>
                </ul>
            </div>
            
            <div class="explanation">
                <p>It’s time to put everything together. The goal of Data Analysis isn't just to make tables look pretty; it's to derive business truths from raw numbers. Download the final raw dataset provided by the instructor and complete the tasks outlined above.</p>
            </div>

            <div class="interactive-zone" style="background:#F0FDF4; border-color:#86EFAC;">
                <h3 class="interactive-header"><i class="ri-upload-cloud-2-line"></i> Project Submission</h3>
                <p class="text-muted" style="margin-bottom:15px;">Submit your completed Excel Workbook and a brief analytical insight summary.</p>
                
                <div style="margin-bottom: 15px;">
                    <label style="font-weight: 500; font-size: 0.9rem; display:block; margin-bottom:5px;">Write your top business insight here:</label>
                    <textarea class="input-control" rows="4" style="width: 100%; resize: vertical;" placeholder="E.g., Based on the dashboard, the highest grossing region was..."></textarea>
                </div>

                <div class="actions-row">
                    <button class="btn-action btn-outline" style="background:white"><i class="ri-attachment-line"></i> Attach Excel File (.xlsx)</button>
                    <button class="btn-action btn-success"><i class="ri-send-plane-line"></i> Submit Final Project</button>
                </div>
            </div>
        `,
        initLogic: () => {
            // Static UI logic
        }
    }
};

window.sessionsData = sessionsData;
