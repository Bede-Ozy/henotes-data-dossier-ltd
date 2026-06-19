/**
 * Questions Configuration for Cognitive Load Demonstration Game
 * Exposes window.industryQuestions containing simplified, symbol-based,
 * and arithmetic datasets for all technical levels.
 */

const createQuestions = (prefix) => {
  const processing = [
    // Color combinations
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
    {
      id: `${prefix}_proc_4`,
      instruction: "Answer the following color combinations as quickly as possible.",
      prompt: `<span class="color-inline"><span class="color-indicator" style="background-color: #000000;"></span>Black</span> + <span class="color-inline"><span class="color-indicator" style="background-color: #ffffff; border: 2px solid #d1d5db;"></span>White</span> = ?`,
      options: ["Brown", "Gray", "Blue", "Silver"],
      answer: "Gray"
    },
    {
      id: `${prefix}_proc_5`,
      instruction: "Answer the following color combinations as quickly as possible.",
      prompt: `<span class="color-inline"><span class="color-indicator" style="background-color: #ff3b30;"></span>Red</span> + <span class="color-inline"><span class="color-indicator" style="background-color: #ffffff; border: 2px solid #d1d5db;"></span>White</span> = ?`,
      options: ["Pink", "Orange", "Yellow", "Light Blue"],
      answer: "Pink"
    },
    // Simple Math
    {
      id: `${prefix}_proc_6`,
      instruction: "Solve the following equations as quickly as possible.",
      prompt: "4 + 29 - 11 = ?",
      options: ["18", "22", "24", "26"],
      answer: "22"
    },
    {
      id: `${prefix}_proc_7`,
      instruction: "Solve the following equations as quickly as possible.",
      prompt: "15 * 3 = ?",
      options: ["35", "40", "45", "50"],
      answer: "45"
    },
    {
      id: `${prefix}_proc_8`,
      instruction: "Solve the following equations as quickly as possible.",
      prompt: "100 / 4 + 5 = ?",
      options: ["25", "30", "35", "40"],
      answer: "30"
    },
    {
      id: `${prefix}_proc_9`,
      instruction: "Solve the following equations as quickly as possible.",
      prompt: "50 - 18 + 7 = ?",
      options: ["39", "41", "45", "25"],
      answer: "39"
    },
    {
      id: `${prefix}_proc_10`,
      instruction: "Solve the following equations as quickly as possible.",
      prompt: "8 * 6 - 8 = ?",
      options: ["48", "42", "40", "38"],
      answer: "40"
    }
  ];

  const recognition = [
    // Color Recognition
    {
      id: `${prefix}_rec_1`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #ff9500; box-shadow: 0 8px 20px rgba(255, 149, 0, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
      options: ["Green", "Orange", "Purple", "Brown"],
      answer: "Orange"
    },
    {
      id: `${prefix}_rec_2`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #34c759; box-shadow: 0 8px 20px rgba(52, 199, 89, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
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
    {
      id: `${prefix}_rec_4`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #8e8e93; box-shadow: 0 8px 20px rgba(142, 142, 147, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
      options: ["Brown", "Gray", "Blue", "Silver"],
      answer: "Gray"
    },
    {
      id: `${prefix}_rec_5`,
      instruction: "Identify the color you see.",
      prompt: `<div class="dashboard-color-container"><div class="color-circle" style="background-color: #ff2d55; box-shadow: 0 8px 20px rgba(255, 45, 85, 0.3);"></div><div class="question-text">What color is this?</div></div>`,
      options: ["Pink", "Orange", "Yellow", "Light Blue"],
      answer: "Pink"
    },
    // Simple Math KPI Select
    {
      id: `${prefix}_rec_6`,
      instruction: "Select the matching number you are shown.",
      prompt: `<div class="dashboard-kpi-container"><div class="bold-number">22</div><div class="question-text">Select the matching number.</div></div>`,
      options: ["18", "22", "24", "26"],
      answer: "22"
    },
    {
      id: `${prefix}_rec_7`,
      instruction: "Select the matching number you are shown.",
      prompt: `<div class="dashboard-kpi-container"><div class="bold-number">45</div><div class="question-text">Select the matching number.</div></div>`,
      options: ["35", "40", "45", "50"],
      answer: "45"
    },
    {
      id: `${prefix}_rec_8`,
      instruction: "Select the matching number you are shown.",
      prompt: `<div class="dashboard-kpi-container"><div class="bold-number">30</div><div class="question-text">Select the matching number.</div></div>`,
      options: ["25", "30", "35", "40"],
      answer: "30"
    },
    {
      id: `${prefix}_rec_9`,
      instruction: "Select the matching number you are shown.",
      prompt: `<div class="dashboard-kpi-container"><div class="bold-number">39</div><div class="question-text">Select the matching number.</div></div>`,
      options: ["39", "41", "45", "25"],
      answer: "39"
    },
    {
      id: `${prefix}_rec_10`,
      instruction: "Select the matching number you are shown.",
      prompt: `<div class="dashboard-kpi-container"><div class="bold-number">40</div><div class="question-text">Select the matching number.</div></div>`,
      options: ["48", "42", "40", "38"],
      answer: "40"
    }
  ];

  return { processing, recognition };
};

window.industryQuestions = {
  aviation: {
    name: "Aviation",
    ...createQuestions("av")
  },
  finance: {
    name: "Finance",
    ...createQuestions("fin")
  },
  healthcare: {
    name: "Healthcare",
    ...createQuestions("hc")
  },
  retail: {
    name: "Retail",
    ...createQuestions("ret")
  },
  manufacturing: {
    name: "Manufacturing",
    ...createQuestions("mfg")
  }
};
