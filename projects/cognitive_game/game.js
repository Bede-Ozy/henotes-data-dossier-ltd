/**
 * Game Engine for Cognitive Load Demonstration Game
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Game State ---
  let currentIndustry = 'aviation';
  let currentRound = 1; // 1 = Processing, 2 = Recognition
  let questionIndex = 0;
  let responses = []; // Array of response objects: { id, type, correct, responseTime }
  let startTime = 0;
  let activeQuestions = [];
  let isDemoAnimating = false;

  // --- DOM Elements ---
  const screens = {
    welcome: document.getElementById('welcome-screen'),
    r1Intro: document.getElementById('r1-intro-screen'),
    r2Intro: document.getElementById('r2-intro-screen'),
    gameplay: document.getElementById('gameplay-screen'),
    results: document.getElementById('results-screen'),
    demo: document.getElementById('demo-screen')
  };

  const gameHeader = document.getElementById('game-header');
  const roundLabel = document.getElementById('current-round-label');
  const countLabel = document.getElementById('question-count-label');
  const progressBar = document.getElementById('game-progress-bar');
  const cardPrompt = document.getElementById('card-prompt');
  const cardInstruction = document.getElementById('card-instruction');
  const optionsBox = document.getElementById('options-box');

  const industrySelect = document.getElementById('industry-select');

  // Action Buttons
  const startBtn = document.getElementById('start-btn');
  const r1StartBtn = document.getElementById('r1-start-btn');
  const r2StartBtn = document.getElementById('r2-start-btn');
  const resultsRestartBtn = document.getElementById('results-restart-btn');
  const conceptDemoBtn = document.getElementById('concept-demo-btn');
  
  // Demo Elements
  const demoRawList = document.getElementById('demo-raw-list');
  const demoBrainLoader = document.getElementById('demo-brain-loader');
  const demoLoaderFill = document.getElementById('demo-loader-fill');
  const demoInsightCard = document.getElementById('demo-insight-card');
  const demoAnimateBtn = document.getElementById('demo-animate-btn');
  const demoBackBtn = document.getElementById('demo-back-btn');
  const demoRestartBtn = document.getElementById('demo-restart-btn');

  // --- Concept Demo Datasets by Industry ---
  const demoData = {
    aviation: {
      raw: ["Flight A: 12 min", "Flight B: 18 min", "Flight C: 25 min", "Flight D: 33 min", "Flight E: 41 min"],
      insight: "Flight Delays Increasing"
    },
    finance: {
      raw: ["Q1 Net: $1.2M", "Q2 Net: $1.8M", "Q3 Net: $2.5M", "Q4 Net: $3.3M", "Q5 Net: $4.1M"],
      insight: "Quarterly Net Income Rising"
    },
    healthcare: {
      raw: ["Pulse: 72 bpm", "Pulse: 85 bpm", "Pulse: 102 bpm", "Pulse: 124 bpm", "Pulse: 140 bpm"],
      insight: "Patient Heart Rate Rising Rapidly"
    },
    retail: {
      raw: ["Traffic: 120", "Traffic: 180", "Traffic: 250", "Traffic: 330", "Traffic: 410"],
      insight: "Customer Foot Traffic Increasing"
    },
    manufacturing: {
      raw: ["Spindle Temp: 185°F", "Spindle Temp: 192°F", "Spindle Temp: 204°F", "Spindle Temp: 218°F", "Spindle Temp: 230°F"],
      insight: "Machine Temperature Rising Critically"
    },
    military_aviation: {
      raw: ["Threat Alt: 25,000ft", "Threat Alt: 28,000ft", "Threat Alt: 31,000ft", "Threat Alt: 33,000ft", "Threat Alt: 35,000ft"],
      insight: "Threat Aircraft Altitude Rising"
    }
  };

  // --- Screen Routing ---
  function showScreen(screenToShow) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
      screen.classList.add('hidden');
    });
    // Show active screen
    screenToShow.classList.remove('hidden');

    // Toggle Header visibility
    if (screenToShow === screens.gameplay) {
      gameHeader.classList.remove('hidden');
    } else {
      gameHeader.classList.add('hidden');
    }
  }

  // --- Setup Round Questions ---
  function loadRoundQuestions() {
    const data = window.industryQuestions[currentIndustry];
    if (currentRound === 1) {
      activeQuestions = data.processing;
    } else {
      activeQuestions = data.recognition;
    }
  }

  // --- Game Flow Control ---
  function startChallenge() {
    currentIndustry = industrySelect.value;
    currentRound = 1;
    questionIndex = 0;
    responses = [];
    showScreen(screens.r1Intro);
  }

  function startRound1() {
    currentRound = 1;
    questionIndex = 0;
    loadRoundQuestions();
    showScreen(screens.gameplay);
    renderQuestion();
  }

  function startRound2() {
    currentRound = 2;
    questionIndex = 0;
    loadRoundQuestions();
    showScreen(screens.gameplay);
    renderQuestion();
  }

  // --- Render Question ---
  function renderQuestion() {
    if (questionIndex >= activeQuestions.length) {
      handleRoundCompletion();
      return;
    }

    const question = activeQuestions[questionIndex];
    
    // Update Header Indicators
    roundLabel.textContent = `Round ${currentRound}: ${currentRound === 1 ? 'Processing' : 'Recognition'}`;
    countLabel.textContent = `Question ${questionIndex + 1}/${activeQuestions.length}`;
    
    const progressPct = ((questionIndex) / activeQuestions.length) * 100;
    progressBar.style.width = `${progressPct}%`;

    // Render Question instruction if available, otherwise hide
    if (question.instruction) {
      cardInstruction.textContent = question.instruction;
      cardInstruction.classList.remove('hidden');
    } else {
      cardInstruction.classList.add('hidden');
    }

    if (question.prompt.includes('<')) {
      cardPrompt.innerHTML = question.prompt;
    } else {
      cardPrompt.innerHTML = question.prompt.replace(/\n/g, '<br>');
    }
    
    // Clear and Render Options
    optionsBox.innerHTML = '';
    
    // Adjust grid style based on option count
    if (question.options.length === 3) {
      optionsBox.className = 'options-container three-options';
    } else {
      optionsBox.className = 'options-container';
    }

    question.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-badge">${idx + 1}</span> <span>${opt}</span>`;
      btn.addEventListener('click', () => handleAnswer(opt));
      optionsBox.appendChild(btn);
    });

    // Start timing immediately when card is ready
    startTime = performance.now();
  }

  // --- Handle User Selection ---
  function handleAnswer(selectedVal) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;
    const question = activeQuestions[questionIndex];
    const isCorrect = selectedVal === question.answer;

    // Record Metrics
    responses.push({
      questionId: question.id,
      type: currentRound === 1 ? 'processing' : 'recognition',
      correct: isCorrect,
      responseTime: responseTime
    });

    // Move to next question
    questionIndex++;
    renderQuestion();
  }

  // --- Round Completion ---
  function handleRoundCompletion() {
    if (currentRound === 1) {
      // Transition to Round 2 Intro
      showScreen(screens.r2Intro);
    } else {
      // Transition to Results
      showResults();
    }
  }

  // --- Calculate and Show Results ---
  function showResults() {
    const r1Responses = responses.filter(r => r.type === 'processing');
    const r2Responses = responses.filter(r => r.type === 'recognition');

    // Calculate Averages & Accuracy
    const r1AvgTime = r1Responses.length ? (r1Responses.reduce((acc, curr) => acc + curr.responseTime, 0) / r1Responses.length) / 1000 : 0;
    const r1Accuracy = r1Responses.length ? (r1Responses.filter(r => r.correct).length / r1Responses.length) * 100 : 0;

    const r2AvgTime = r2Responses.length ? (r2Responses.reduce((acc, curr) => acc + curr.responseTime, 0) / r2Responses.length) / 1000 : 0;
    const r2Accuracy = r2Responses.length ? (r2Responses.filter(r => r.correct).length / r2Responses.length) * 100 : 0;

    // Render Stats
    document.getElementById('r1-time').textContent = `${r1AvgTime.toFixed(2)}s`;
    document.getElementById('r1-acc').textContent = `${Math.round(r1Accuracy)}%`;

    document.getElementById('r2-time').textContent = `${r2AvgTime.toFixed(2)}s`;
    document.getElementById('r2-acc').textContent = `${Math.round(r2Accuracy)}%`;

    const indName = window.industryQuestions[currentIndustry].name;
    document.getElementById('results-industry-subtitle').textContent = `${indName} Sector Challenge`;

    showScreen(screens.results);

    // Render comparison chart with slight delay to animate the bar width growth
    const maxTime = Math.max(r1AvgTime, r2AvgTime, 1.0); // Minimum scale of 1 second
    
    // Reset widths first to allow animate-in trigger
    const barR1 = document.getElementById('chart-bar-r1-time');
    const barR2 = document.getElementById('chart-bar-r2-time');
    barR1.style.width = '0%';
    barR2.style.width = '0%';
    barR1.textContent = '0s';
    barR2.textContent = '0s';

    setTimeout(() => {
      const r1Width = (r1AvgTime / maxTime) * 100;
      const r2Width = (r2AvgTime / maxTime) * 100;
      
      barR1.style.width = `${r1Width}%`;
      barR1.textContent = `${r1AvgTime.toFixed(2)}s`;

      barR2.style.width = `${r2Width}%`;
      barR2.textContent = `${r2AvgTime.toFixed(2)}s`;
    }, 100);
  }

  // --- Concept Demo Operations ---
  function showConceptDemo() {
    const data = demoData[currentIndustry];
    
    // Clear and build Raw list
    demoRawList.innerHTML = '';
    data.raw.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'raw-data-item';
      div.id = `demo-raw-item-${index}`;
      div.innerHTML = `<span>[Entry ${index + 1}]</span> <span>${item}</span>`;
      demoRawList.appendChild(div);
    });

    // Reset insight card
    demoInsightCard.textContent = data.insight;
    demoInsightCard.classList.remove('visible');

    // Reset loader
    demoBrainLoader.classList.remove('visible');
    demoLoaderFill.classList.remove('active');
    demoLoaderFill.style.width = '0%';

    // Enable animate button
    demoAnimateBtn.disabled = false;
    isDemoAnimating = false;

    showScreen(screens.demo);
  }

  function startDemoAnimation() {
    if (isDemoAnimating) return;
    isDemoAnimating = true;
    demoAnimateBtn.disabled = true;

    const data = demoData[currentIndustry];
    const totalItems = data.raw.length;

    // Reset state
    demoLoaderFill.style.width = '0%';
    demoInsightCard.classList.remove('visible');
    demoBrainLoader.classList.add('visible');
    demoLoaderFill.classList.add('active');

    // Highlight items sequentially representing data reading and analysis
    const intervalTime = 2000 / totalItems; // Divide 2s loader time by item count
    let itemIndex = 0;

    const interval = setInterval(() => {
      // Remove highlighting from previous item
      if (itemIndex > 0) {
        document.getElementById(`demo-raw-item-${itemIndex - 1}`).classList.remove('active');
      }
      
      if (itemIndex < totalItems) {
        document.getElementById(`demo-raw-item-${itemIndex}`).classList.add('active');
        itemIndex++;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    // When the loading completes
    setTimeout(() => {
      // Clear final item highlight
      if (totalItems > 0) {
        document.getElementById(`demo-raw-item-${totalItems - 1}`).classList.remove('active');
      }

      // Display the direct insight with card entry animation
      demoBrainLoader.classList.remove('visible');
      demoLoaderFill.classList.remove('active');
      demoInsightCard.classList.add('visible');
      
      isDemoAnimating = false;
      demoAnimateBtn.disabled = false;
    }, 2100);
  }

  // --- Keyboard Bindings ---
  document.addEventListener('keydown', (e) => {
    // Only capture keyboard inputs if gameplay screen is active
    if (screens.gameplay.classList.contains('hidden')) return;

    // Map keys '1', '2', '3', '4' to buttons
    const key = e.key;
    if (['1', '2', '3', '4'].includes(key)) {
      const optionButtons = optionsBox.querySelectorAll('.option-btn');
      const index = parseInt(key, 10) - 1;
      if (optionButtons[index]) {
        optionButtons[index].click();
      }
    }
  });

  // --- Button Event Listeners ---
  startBtn.addEventListener('click', startChallenge);
  r1StartBtn.addEventListener('click', startRound1);
  r2StartBtn.addEventListener('click', startRound2);
  
  resultsRestartBtn.addEventListener('click', () => {
    showScreen(screens.welcome);
  });

  conceptDemoBtn.addEventListener('click', showConceptDemo);
  
  demoAnimateBtn.addEventListener('click', startDemoAnimation);
  
  demoBackBtn.addEventListener('click', () => {
    if (!isDemoAnimating) showScreen(screens.results);
  });

  demoRestartBtn.addEventListener('click', () => {
    if (!isDemoAnimating) showScreen(screens.welcome);
  });
});
