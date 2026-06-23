/**
 * Questions Configuration for Cognitive Load Demonstration Game
 * Exposes window.industryQuestions containing simplified, symbol-based,
 * and arithmetic datasets for all technical levels.
 */

// Helper to generate the trend chart SVG with data labels
const getTrendChartSVG = (type, values) => {
  if (type === 'rising') {
    return `
      <div class="trend-chart-box">
        <svg class="trend-svg" viewBox="0 0 100 40" style="overflow: visible;">
          <line x1="0" y1="35" x2="100" y2="35" class="trend-grid" />
          <line x1="0" y1="20" x2="100" y2="20" class="trend-grid" />
          <line x1="0" y1="5" x2="100" y2="5" class="trend-grid" />
          <path d="M10,32 L35,26 L60,14 L90,6" class="trend-line rising" fill="none" />
          <circle cx="10" cy="32" r="2" fill="#10b981" />
          <circle cx="35" cy="26" r="2" fill="#10b981" />
          <circle cx="60" cy="14" r="2" fill="#10b981" />
          <circle cx="90" cy="6" r="3.5" fill="#10b981" />
          <text x="10" y="24" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[0]}</text>
          <text x="35" y="18" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[1]}</text>
          <text x="60" y="6" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[2]}</text>
          <text x="90" y="14" font-size="5.5" fill="#10b981" text-anchor="middle" font-weight="bold">${values[3]}</text>
        </svg>
      </div>
    `;
  }
  if (type === 'falling') {
    return `
      <div class="trend-chart-box">
        <svg class="trend-svg" viewBox="0 0 100 40" style="overflow: visible;">
          <line x1="0" y1="35" x2="100" y2="35" class="trend-grid" />
          <line x1="0" y1="20" x2="100" y2="20" class="trend-grid" />
          <line x1="0" y1="5" x2="100" y2="5" class="trend-grid" />
          <path d="M10,6 L35,14 L60,26 L90,32" class="trend-line falling" fill="none" />
          <circle cx="10" cy="6" r="2" fill="#ef4444" />
          <circle cx="35" cy="14" r="2" fill="#ef4444" />
          <circle cx="60" cy="26" r="2" fill="#ef4444" />
          <circle cx="90" cy="32" r="3.5" fill="#ef4444" />
          <text x="10" y="14" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[0]}</text>
          <text x="35" y="22" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[1]}</text>
          <text x="60" y="34" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[2]}</text>
          <text x="90" y="24" font-size="5.5" fill="#ef4444" text-anchor="middle" font-weight="bold">${values[3]}</text>
        </svg>
      </div>
    `;
  }
  if (type === 'stable') {
    return `
      <div class="trend-chart-box">
        <svg class="trend-svg" viewBox="0 0 100 40" style="overflow: visible;">
          <line x1="0" y1="35" x2="100" y2="35" class="trend-grid" />
          <line x1="0" y1="20" x2="100" y2="20" class="trend-grid" />
          <line x1="0" y1="5" x2="100" y2="5" class="trend-grid" />
          <path d="M10,20 L35,20 L60,20 L90,20" class="trend-line stable" fill="none" />
          <circle cx="10" cy="20" r="2" fill="#3b82f6" />
          <circle cx="35" cy="20" r="2" fill="#3b82f6" />
          <circle cx="60" cy="20" r="2" fill="#3b82f6" />
          <circle cx="90" cy="20" r="3.5" fill="#3b82f6" />
          <text x="10" y="12" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[0]}</text>
          <text x="35" y="12" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[1]}</text>
          <text x="60" y="12" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[2]}</text>
          <text x="90" y="12" font-size="5.5" fill="#3b82f6" text-anchor="middle" font-weight="bold">${values[3]}</text>
        </svg>
      </div>
    `;
  }
  if (type === 'fluctuating') {
    return `
      <div class="trend-chart-box" style="width: 180px; height: 90px;">
        <svg class="trend-svg" viewBox="0 0 100 40" style="overflow: visible;">
          <line x1="0" y1="35" x2="100" y2="35" class="trend-grid" />
          <line x1="0" y1="20" x2="100" y2="20" class="trend-grid" />
          <line x1="0" y1="5" x2="100" y2="5" class="trend-grid" />
          <path d="M10,30 L30,18 L50,24 L70,12 L90,20" class="trend-line stable" fill="none" style="stroke: #3b82f6;" />
          <circle cx="10" cy="30" r="1.5" fill="#3b82f6" />
          <circle cx="30" cy="18" r="1.5" fill="#3b82f6" />
          <circle cx="50" cy="24" r="1.5" fill="#3b82f6" />
          <circle cx="70" cy="12" r="3" fill="#ef4444" />
          <circle cx="90" cy="20" r="1.5" fill="#3b82f6" />
          <text x="10" y="25" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[0]}</text>
          <text x="30" y="13" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[1]}</text>
          <text x="50" y="19" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[2]}</text>
          <text x="70" y="6" font-size="6" fill="#ef4444" font-weight="bold" text-anchor="middle">${values[3]}</text>
          <text x="90" y="15" font-size="5.5" fill="#0f172a" text-anchor="middle" font-weight="bold">${values[4]}</text>
        </svg>
      </div>
    `;
  }
  return '';
};

// Generate scatter plot dots HTML (mostly Purple, with one Green odd color dot)
const getScatterDotsHTML = () => {
  return `
    <div class="scatter-dots-container">
      <span class="scatter-dot" style="left: 12%; top: 22%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 28%; top: 55%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 42%; top: 38%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 58%; top: 72%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 74%; top: 28%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 18%; top: 68%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 82%; top: 50%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 38%; top: 18%; background-color: #af52de;"></span>
      <!-- The odd dot: Green -->
      <span class="scatter-dot" style="left: 52%; top: 60%; background-color: #34c759; box-shadow: 0 0 10px rgba(52, 199, 89, 0.6); border: 2px solid rgba(255,255,255,0.8);"></span>
      <span class="scatter-dot" style="left: 64%; top: 12%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 8%; top: 45%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 78%; top: 76%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 32%; top: 32%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 68%; top: 46%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 22%; top: 14%; background-color: #af52de;"></span>
      <span class="scatter-dot" style="left: 50%; top: 30%; background-color: #af52de;"></span>
    </div>
    <div class="question-text">What is the odd color?</div>
  `;
};

// Generate questions for a specific industry
const getIndustryQuestions = (name, prefix, configs) => {
  const processing = [
    // 1-3. Colors
    {
      id: `${prefix}_proc_1`,
      instruction: "Answer the following color combinations as quickly as possible.",
      prompt: `<span class="color-inline"><span class="color-indicator" style="background-color: #ff3b30;"></span>Red</span> + <span class="color-inline"><span class="color-indicator" style="background-color: #ffcc00;"></span>Yellow</span> = ?`,
      options: ["Green", "Orange", "Purple", "Brown"],
      answer: "Orange"
    },
    {
      id: `${prefix}_proc_2`,
      instruction: "Answer the following color combinations as quickly as possible.",
      prompt: `<span class="color-inline"><span class="color-indicator" style="background-color: #007aff;"></span>Blue</span> + <span class="color-inline"><span class="color-indicator" style="background-color: #ffcc00;"></span>Yellow</span> = ?`,
      options: ["Purple", "Green", "Orange", "Black"],
      answer: "Green"
    },
    {
      id: `${prefix}_proc_3`,
      instruction: "Answer the following color combinations as quickly as possible.",
      prompt: `<span class="color-inline"><span class="color-indicator" style="background-color: #ff3b30;"></span>Red</span> + <span class="color-inline"><span class="color-indicator" style="background-color: #007aff;"></span>Blue</span> = ?`,
      options: ["Green", "Orange", "Purple", "Pink"],
      answer: "Purple"
    },
    // 4-7. Industry specific processing
    {
      id: `${prefix}_proc_4`,
      instruction: "Analyze the data sequence as quickly as possible.",
      prompt: configs.q4_prompt,
      options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
      answer: "Increasing"
    },
    {
      id: `${prefix}_proc_5`,
      instruction: "Analyze the data sequence as quickly as possible.",
      prompt: configs.q5_prompt,
      options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
      answer: "Decreasing"
    },
    {
      id: `${prefix}_proc_6`,
      instruction: "Find the requested value from the dataset as quickly as possible.",
      prompt: configs.q6_prompt,
      options: configs.q6_options,
      answer: configs.q6_answer
    },
    {
      id: `${prefix}_proc_7`,
      instruction: "Analyze the data sequence as quickly as possible.",
      prompt: configs.q7_prompt,
      options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
      answer: "Stable"
    },
    // 8-10. Industry specific processing math/calculations
    {
      id: `${prefix}_proc_8`,
      instruction: "Calculate the business metric value as quickly as possible.",
      prompt: configs.q8_prompt,
      options: configs.q8_options,
      answer: configs.q8_answer
    },
    {
      id: `${prefix}_proc_9`,
      instruction: "Calculate the business metric value as quickly as possible.",
      prompt: configs.q9_prompt,
      options: configs.q9_options,
      answer: configs.q9_answer
    },
    {
      id: `${prefix}_proc_10`,
      instruction: "Calculate the business metric value as quickly as possible.",
      prompt: configs.q10_prompt,
      options: configs.q10_options,
      answer: configs.q10_answer
    }
  ];

  const recognition = [
    // 1-3. Color recognition
    {
      id: `${prefix}_rec_1`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #ff9500; box-shadow: 0 8px 20px rgba(255, 149, 0, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
      options: ["Green", "Orange", "Purple", "Brown"],
      answer: "Orange"
    },
    {
      id: `${prefix}_rec_2`,
      instruction: "Identify the odd color from the scatter dots.",
      prompt: getScatterDotsHTML(),
      options: ["Purple", "Green", "Orange", "Black"],
      answer: "Green"
    },
    {
      id: `${prefix}_rec_3`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #af52de; box-shadow: 0 8px 20px rgba(175, 82, 222, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
      options: ["Green", "Orange", "Purple", "Pink"],
      answer: "Purple"
    },
    // 4-7. SVG trend recognition
    {
      id: `${prefix}_rec_4`,
      instruction: "Identify the trend shown in the chart.",
      prompt: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">${getTrendChartSVG('rising', configs.q4_vals)}<div class="question-text">${configs.q4_title}</div></div>`,
      options: ["Rising", "Falling", "Stable", "Fluctuating"],
      answer: "Rising"
    },
    {
      id: `${prefix}_rec_5`,
      instruction: "Identify the trend shown in the chart.",
      prompt: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">${getTrendChartSVG('falling', configs.q5_vals)}<div class="question-text">${configs.q5_title}</div></div>`,
      options: ["Rising", "Falling", "Stable", "Fluctuating"],
      answer: "Falling"
    },
    {
      id: `${prefix}_rec_6`,
      instruction: "Identify the peak value shown in the chart.",
      prompt: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">${getTrendChartSVG('fluctuating', configs.q6_chart_vals)}<div class="question-text">${configs.q6_title}</div></div>`,
      options: configs.q6_options,
      answer: configs.q6_answer
    },
    {
      id: `${prefix}_rec_7`,
      instruction: "Identify the trend shown in the chart.",
      prompt: `<div style="display: flex; flex-direction: column; align-items: center; text-align: center; width: 100%;">${getTrendChartSVG('stable', configs.q7_vals)}<div class="question-text">${configs.q7_title}</div></div>`,
      options: ["Rising", "Falling", "Stable", "Fluctuating"],
      answer: "Stable"
    },
    // 8-10. KPI Recognition
    {
      id: `${prefix}_rec_8`,
      instruction: "Identify the business KPI value.",
      prompt: `<div class="kpi-cards-row"><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q8_kpi_title}</span><span class="kpi-value">${configs.q8_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q9_kpi_title}</span><span class="kpi-value">${configs.q9_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q10_kpi_title}</span><span class="kpi-value">${configs.q10_kpi_value}</span></div></div><div class="kpi-question">What is the number of active users?</div>`,
      options: configs.q8_options,
      answer: configs.q8_kpi_value
    },
    {
      id: `${prefix}_rec_9`,
      instruction: "Identify the business KPI value.",
      prompt: `<div class="kpi-cards-row"><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q8_kpi_title}</span><span class="kpi-value">${configs.q8_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q9_kpi_title}</span><span class="kpi-value">${configs.q9_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q10_kpi_title}</span><span class="kpi-value">${configs.q10_kpi_value}</span></div></div><div class="kpi-question">What is the customer churn rate?</div>`,
      options: configs.q9_options,
      answer: configs.q9_kpi_value
    },
    {
      id: `${prefix}_rec_10`,
      instruction: "Identify the business KPI value.",
      prompt: `<div class="kpi-cards-row"><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q8_kpi_title}</span><span class="kpi-value">${configs.q8_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q9_kpi_title}</span><span class="kpi-value">${configs.q9_kpi_value}</span></div><div class="dashboard-kpi-card"><span class="kpi-label">${configs.q10_kpi_title}</span><span class="kpi-value">${configs.q10_kpi_value}</span></div></div><div class="kpi-question">What is the customer acquisition cost?</div>`,
      options: configs.q10_options,
      answer: configs.q10_kpi_value
    }
  ];

  return { name, processing, recognition };
};

// Configurations for all 5 industries
const configs = {
  aviation: {
    q4_prompt: "Delay record: Gate A: 10m ➔ Gate B: 20m ➔ Gate C: 30m.<br>What delay trend is occurring?",
    q5_prompt: "Fuel Indicator: 120L ➔ 90L ➔ 60L.<br>What is the status?",
    q6_prompt: "Fuel Price log:<br>Mon: $3.10 | Tue: $3.40 | Wed: $3.25 | Thu: $3.50 | Fri: $3.35<br><br>What is the peak fuel price?",
    q6_options: ["$3.40", "$3.50", "$3.25", "$3.35"],
    q6_answer: "$3.50",
    q7_prompt: "Wind Speed: 15 kts ➔ 15 kts ➔ 15 kts.<br>What is the trend?",
    
    q8_prompt: "If last month's active users was 2,400 and we grew by 600 users, what is the current MAU?",
    q8_options: ["2,000", "3,000", "4,000", "5,000"],
    q8_answer: "3,000",
    q9_prompt: "We had 300 customers, and 9 of them cancelled. What is the churn rate?",
    q9_options: ["1%", "2%", "3%", "5%"],
    q9_answer: "3%",
    q10_prompt: "Marketing spend was $900 for 30 acquired customers. What is the CAC?",
    q10_options: ["$15", "$20", "$30", "$45"],
    q10_answer: "$30",

    q4_title: "Delay Status",
    q4_vals: ["10m", "20m", "30m", "40m"],
    q5_title: "Fuel Level Status",
    q5_vals: ["120L", "90L", "60L", "30L"],
    q6_title: "What is the peak fuel price?",
    q6_chart_vals: ["$3.10", "$3.40", "$3.25", "$3.50", "$3.35"],
    q7_title: "Wind Speed Status",
    q7_vals: ["15 kts", "15 kts", "15 kts", "15 kts"],

    q8_kpi_title: "Monthly Active Users (MAU)",
    q8_kpi_value: "3,000",
    q9_kpi_title: "Customer Churn Rate",
    q9_kpi_value: "3%",
    q10_kpi_title: "Customer Acquisition Cost (CAC)",
    q10_kpi_value: "$30"
  },
  finance: {
    q4_prompt: "Net Income: Q1: $10k ➔ Q2: $20k ➔ Q3: $30k.<br>What income trend is occurring?",
    q5_prompt: "Stock Price: 120p ➔ 90p ➔ 60p.<br>What is the stock price trend?",
    q6_prompt: "Stock Price log:<br>Mon: $310 | Tue: $340 | Wed: $325 | Thu: $350 | Fri: $335<br><br>What is the peak stock price?",
    q6_options: ["$340", "$350", "$325", "$335"],
    q6_answer: "$350",
    q7_prompt: "Interest Rate: 1.5% ➔ 1.5% ➔ 1.5%.<br>What is the interest rate trend?",
    
    q8_prompt: "If last month's active users was 2,400 and we grew by 600 users, what is the current MAU?",
    q8_options: ["2,000", "3,000", "4,000", "5,000"],
    q8_answer: "3,000",
    q9_prompt: "We had 300 customers, and 9 of them cancelled. What is the churn rate?",
    q9_options: ["1%", "2%", "3%", "5%"],
    q9_answer: "3%",
    q10_prompt: "Marketing spend was $900 for 30 acquired customers. What is the CAC?",
    q10_options: ["$15", "$20", "$30", "$45"],
    q10_answer: "$30",

    q4_title: "Net Income Status",
    q4_vals: ["$10k", "$20k", "$30k", "$40k"],
    q5_title: "Stock Price Status",
    q5_vals: ["$120", "$90", "$60", "$30"],
    q6_title: "What is the peak stock price?",
    q6_chart_vals: ["$310", "$340", "$325", "$350", "$335"],
    q7_title: "Interest Rate Status",
    q7_vals: ["1.5%", "1.5%", "1.5%", "1.5%"],

    q8_kpi_title: "Monthly Active Users (MAU)",
    q8_kpi_value: "3,000",
    q9_kpi_title: "Customer Churn Rate",
    q9_kpi_value: "3%",
    q10_kpi_title: "Customer Acquisition Cost (CAC)",
    q10_kpi_value: "$30"
  },
  healthcare: {
    q4_prompt: "Patient Heart Rate: 60 bpm ➔ 80 bpm ➔ 100 bpm.<br>What heart rate trend is occurring?",
    q5_prompt: "Blood Pressure: 120 mmHg ➔ 90 mmHg ➔ 60 mmHg.<br>What is the blood pressure trend?",
    q6_prompt: "Temperature log:<br>8 AM: 98.6°F | 10 AM: 99.4°F | 12 PM: 99.0°F | 2 PM: 100.5°F | 4 PM: 99.2°F<br><br>What is the peak temperature?",
    q6_options: ["99.4°F", "100.5°F", "99.0°F", "99.2°F"],
    q6_answer: "100.5°F",
    q7_prompt: "Oxygen Saturation: 98% ➔ 98% ➔ 98%.<br>What is the oxygen level trend?",
    
    q8_prompt: "If last month's active users was 2,400 and we grew by 600 users, what is the current MAU?",
    q8_options: ["2,000", "3,000", "4,000", "5,000"],
    q8_answer: "3,000",
    q9_prompt: "We had 300 customers, and 9 of them cancelled. What is the churn rate?",
    q9_options: ["1%", "2%", "3%", "5%"],
    q9_answer: "3%",
    q10_prompt: "Marketing spend was $900 for 30 acquired customers. What is the CAC?",
    q10_options: ["$15", "$20", "$30", "$45"],
    q10_answer: "$30",

    q4_title: "Patient Heart Rate",
    q4_vals: ["60 bpm", "80 bpm", "100 bpm", "120 bpm"],
    q5_title: "Blood Pressure Status",
    q5_vals: ["120 mmHg", "90 mmHg", "60 mmHg", "40 mmHg"],
    q6_title: "What is the peak temperature?",
    q6_chart_vals: ["98.6°F", "99.4°F", "99.0°F", "100.5°F", "99.2°F"],
    q7_title: "Oxygen Level Status",
    q7_vals: ["98%", "98%", "98%", "98%"],

    q8_kpi_title: "Monthly Active Users (MAU)",
    q8_kpi_value: "3,000",
    q9_kpi_title: "Customer Churn Rate",
    q9_kpi_value: "3%",
    q10_kpi_title: "Customer Acquisition Cost (CAC)",
    q10_kpi_value: "$30"
  },
  retail: {
    q4_prompt: "Daily Sales: 10 units ➔ 20 units ➔ 30 units.<br>What sales trend is occurring?",
    q5_prompt: "Inventory Level: 120 units ➔ 90 units ➔ 60 units.<br>What is the inventory trend?",
    q6_prompt: "Daily Traffic log:<br>Mon: 310 | Tue: 340 | Wed: 325 | Thu: 350 | Fri: 335<br><br>What is the peak foot traffic?",
    q6_options: ["340", "350", "325", "335"],
    q6_answer: "350",
    q7_prompt: "Conversion Rate: 1.5% ➔ 1.5% ➔ 1.5%.<br>What is the conversion rate trend?",
    
    q8_prompt: "If last month's active users was 2,400 and we grew by 600 users, what is the current MAU?",
    q8_options: ["2,000", "3,000", "4,000", "5,000"],
    q8_answer: "3,000",
    q9_prompt: "We had 300 customers, and 9 of them cancelled. What is the churn rate?",
    q9_options: ["1%", "2%", "3%", "5%"],
    q9_answer: "3%",
    q10_prompt: "Marketing spend was $900 for 30 acquired customers. What is the CAC?",
    q10_options: ["$15", "$20", "$30", "$45"],
    q10_answer: "$30",

    q4_title: "Daily Sales Status",
    q4_vals: ["10", "20", "30", "40"],
    q5_title: "Inventory Status",
    q5_vals: ["120", "90", "60", "30"],
    q6_title: "What is the peak foot traffic?",
    q6_chart_vals: ["310", "340", "325", "350", "335"],
    q7_title: "Conversion Rate Status",
    q7_vals: ["1.5%", "1.5%", "1.5%", "1.5%"],

    q8_kpi_title: "Monthly Active Users (MAU)",
    q8_kpi_value: "3,000",
    q9_kpi_title: "Customer Churn Rate",
    q9_kpi_value: "3%",
    q10_kpi_title: "Customer Acquisition Cost (CAC)",
    q10_kpi_value: "$30"
  },
  manufacturing: {
    q4_prompt: "Machine Temp: 100°C ➔ 120°C ➔ 140°C.<br>What temperature trend is occurring?",
    q5_prompt: "Fuel Pressure: 120 psi ➔ 90 psi ➔ 60 psi.<br>What is the pressure trend?",
    q6_prompt: "Output log:<br>Mon: 310 | Tue: 340 | Wed: 325 | Thu: 350 | Fri: 335<br><br>What is the peak output?",
    q6_options: ["340", "350", "325", "335"],
    q6_answer: "350",
    q7_prompt: "Defect Rate: 1.5% ➔ 1.5% ➔ 1.5%.<br>What is the defect rate trend?",
    
    q8_prompt: "If last month's active users was 2,400 and we grew by 600 users, what is the current MAU?",
    q8_options: ["2,000", "3,000", "4,000", "5,000"],
    q8_answer: "3,000",
    q9_prompt: "We had 300 customers, and 9 of them cancelled. What is the churn rate?",
    q9_options: ["1%", "2%", "3%", "5%"],
    q9_answer: "3%",
    q10_prompt: "Marketing spend was $900 for 30 acquired customers. What is the CAC?",
    q10_options: ["$15", "$20", "$30", "$45"],
    q10_answer: "$30",

    q4_title: "Machine Temp Status",
    q4_vals: ["100°C", "120°C", "140°C", "160°C"],
    q5_title: "Fuel Pressure Status",
    q5_vals: ["120 psi", "90 psi", "60 psi", "30 psi"],
    q6_title: "What is the peak output?",
    q6_chart_vals: ["310", "340", "325", "350", "335"],
    q7_title: "Defect Rate Status",
    q7_vals: ["1.5%", "1.5%", "1.5%", "1.5%"],

    q8_kpi_title: "Monthly Active Users (MAU)",
    q8_kpi_value: "3,000",
    q9_kpi_title: "Customer Churn Rate",
    q9_kpi_value: "3%",
    q10_kpi_title: "Customer Acquisition Cost (CAC)",
    q10_kpi_value: "$30"
  }
};

window.industryQuestions = {
  aviation: getIndustryQuestions("Aviation", "av", configs.aviation),
  finance: getIndustryQuestions("Finance", "fin", configs.aviation),
  healthcare: getIndustryQuestions("Healthcare", "hc", configs.aviation),
  retail: getIndustryQuestions("Retail", "ret", configs.aviation),
  manufacturing: getIndustryQuestions("Manufacturing", "mfg", configs.aviation)
};
