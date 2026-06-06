/**
 * Questions Configuration for Cognitive Load Demonstration Game
 * Exposes window.industryQuestions containing simplified, symbol-based,
 * and arithmetic datasets for all technical levels.
 */

window.industryQuestions = {
  aviation: {
    name: "Aviation",
    processing: [
      {
        id: "av_proc_1",
        prompt: "🔴 + 🔵 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "av_proc_2",
        prompt: "12 + 18 = ?",
        options: ["28", "30", "32", "34"],
        answer: "30"
      },
      {
        id: "av_proc_3",
        prompt: "Delay A = 15 min\nDelay B = 25 min\nDelay C = 35 min\n\nWhat delay trend do you see?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "av_proc_4",
        prompt: "Fuel Indicator:\n120 ➔ 105 ➔ 90\n\nWhat is happening?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "av_proc_5",
        prompt: "Engine Temp:\n89° ➔ 93° ➔ 97° ➔ 101°\n\nWhat is happening?",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "av_proc_6",
        prompt: "Wind Speed:\n12 kts ➔ 18 kts ➔ 24 kts\n\nWhat is happening?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "av_proc_7",
        prompt: "Count the aircraft:\n✈️  ✈️  ✈️  ✈️  ✈️  ✈️",
        options: ["5", "6", "7", "8"],
        answer: "6"
      },
      {
        id: "av_proc_8",
        prompt: "Altitude: 8,000 ft\nTarget: 10,000 ft\n\nWhat is the difference?",
        options: ["1,000 ft", "2,000 ft", "3,000 ft", "4,000 ft"],
        answer: "2,000 ft"
      },
      {
        id: "av_proc_9",
        prompt: "Which symbol is different?\n✈️  ✈️  🚀  ✈️",
        options: ["✈️", "🚀", "All same", "None"],
        answer: "🚀"
      },
      {
        id: "av_proc_10",
        prompt: "Time: 14:00 + 1 hour 30 mins = ?",
        options: ["15:00", "15:15", "15:30", "15:45"],
        answer: "15:30"
      },
      {
        id: "av_proc_11",
        prompt: "🟡 + 🔴 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "av_proc_12",
        prompt: "Boarding: 10 seats booked of 12 total\n\nHow many empty seats are left?",
        options: ["1", "2", "3", "4"],
        answer: "2"
      },
      {
        id: "av_proc_13",
        prompt: "Pattern: ✈️  ☁️  ✈️  ☁️  ?",
        options: ["✈️", "☁️", "🚀", "☀️"],
        answer: "✈️"
      },
      {
        id: "av_proc_14",
        prompt: "Safety score:\nStore A: 90 | Store B: 94 | Store C: 86\n\nWhat is the average safety score?",
        options: ["88", "90", "92", "94"],
        answer: "90"
      },
      {
        id: "av_proc_15",
        prompt: "Next check: 100 hours\nHours run: 80 hours\n\nHow many hours remaining?",
        options: ["10 hours", "20 hours", "30 hours", "40 hours"],
        answer: "20 hours"
      }
    ],
    recognition: [
      {
        id: "av_rec_1",
        prompt: "🟣 Purple",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "av_rec_2",
        prompt: "30",
        options: ["20", "30", "40", "50"],
        answer: "30"
      },
      {
        id: "av_rec_3",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "av_rec_4",
        prompt: "Decreasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "av_rec_5",
        prompt: "Rising",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "av_rec_6",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "av_rec_7",
        prompt: "6",
        options: ["5", "6", "7", "8"],
        answer: "6"
      },
      {
        id: "av_rec_8",
        prompt: "2,000 ft",
        options: ["1,000 ft", "2,000 ft", "3,000 ft", "4,000 ft"],
        answer: "2,000 ft"
      },
      {
        id: "av_rec_9",
        prompt: "🚀 Rocket",
        options: ["✈️ Plane", "🚀 Rocket", "☁️ Cloud", "☀️ Sun"],
        answer: "🚀 Rocket"
      },
      {
        id: "av_rec_10",
        prompt: "15:30",
        options: ["15:00", "15:15", "15:30", "15:45"],
        answer: "15:30"
      },
      {
        id: "av_rec_11",
        prompt: "🟠 Orange",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "av_rec_12",
        prompt: "2",
        options: ["1", "2", "3", "4"],
        answer: "2"
      },
      {
        id: "av_rec_13",
        prompt: "✈️ Plane",
        options: ["✈️ Plane", "☁️ Cloud", "🚀 Rocket", "☀️ Sun"],
        answer: "✈️ Plane"
      },
      {
        id: "av_rec_14",
        prompt: "90",
        options: ["88", "90", "92", "94"],
        answer: "90"
      },
      {
        id: "av_rec_15",
        prompt: "20 hours",
        options: ["10 hours", "20 hours", "30 hours", "40 hours"],
        answer: "20 hours"
      }
    ]
  },
  finance: {
    name: "Finance",
    processing: [
      {
        id: "fin_proc_1",
        prompt: "🔴 + 🔵 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "fin_proc_2",
        prompt: "75 - 25 = ?",
        options: ["30", "40", "50", "60"],
        answer: "50"
      },
      {
        id: "fin_proc_3",
        prompt: "Stock price:\n$10 ➔ $12 ➔ $14 ➔ $16\n\nWhat trend is occurring?",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "fin_proc_4",
        prompt: "Net profits:\n$100 ➔ $80 ➔ $60\n\nWhat trend do you see?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "fin_proc_5",
        prompt: "Savings: $200\nSpend: $150\n\nHow much is remaining?",
        options: ["$30", "$40", "$50", "$60"],
        answer: "$50"
      },
      {
        id: "fin_proc_6",
        prompt: "Prices:\n2% ➔ 3% ➔ 4% ➔ 5%\n\nWhat is the trend?",
        options: ["Rising", "Falling", "Stable", "Deflation"],
        answer: "Rising"
      },
      {
        id: "fin_proc_7",
        prompt: "Count the coins:\n🪙  🪙  🪙  🪙",
        options: ["3", "4", "5", "6"],
        answer: "4"
      },
      {
        id: "fin_proc_8",
        prompt: "Which symbol is different?\n📈  📈  📉  📈",
        options: ["📈", "📉", "All same", "None"],
        answer: "📉"
      },
      {
        id: "fin_proc_9",
        prompt: "Share price: $50\nYou buy 2 shares\n\nWhat is the total cost?",
        options: ["$80", "$90", "$100", "$120"],
        answer: "$100"
      },
      {
        id: "fin_proc_10",
        prompt: "🟡 + 🔴 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "fin_proc_11",
        prompt: "Initial investment: $100\nFinal value: $120\n\nWhat is the total gain?",
        options: ["$10", "$15", "$20", "$25"],
        answer: "$20"
      },
      {
        id: "fin_proc_12",
        prompt: "Pattern: 💵  🪙  💵  🪙  ?",
        options: ["💵", "🪙", "💳", "💎"],
        answer: "💵"
      },
      {
        id: "fin_proc_13",
        prompt: "Earnings: $4\nTax: $1\n\nWhat is the net profit?",
        options: ["$2", "$3", "$4", "$5"],
        answer: "$3"
      },
      {
        id: "fin_proc_14",
        prompt: "Split $100 equally between 4 people\n\nHow much does each get?",
        options: ["$15", "$20", "$25", "$30"],
        answer: "$25"
      },
      {
        id: "fin_proc_15",
        prompt: "Budget: $50\nActual spent: $45\n\nHow much are you under budget?",
        options: ["$3", "$4", "$5", "$6"],
        answer: "$5"
      }
    ],
    recognition: [
      {
        id: "fin_rec_1",
        prompt: "🟣 Purple",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "fin_rec_2",
        prompt: "50",
        options: ["30", "40", "50", "60"],
        answer: "50"
      },
      {
        id: "fin_rec_3",
        prompt: "Rising",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "fin_rec_4",
        prompt: "Decreasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "fin_rec_5",
        prompt: "$50",
        options: ["$30", "$40", "$50", "$60"],
        answer: "$50"
      },
      {
        id: "fin_rec_6",
        prompt: "Rising",
        options: ["Rising", "Falling", "Stable", "Deflation"],
        answer: "Rising"
      },
      {
        id: "fin_rec_7",
        prompt: "4",
        options: ["3", "4", "5", "6"],
        answer: "4"
      },
      {
        id: "fin_rec_8",
        prompt: "📉 Chart Down",
        options: ["📈 Chart Up", "📉 Chart Down", "📊 Bar Chart", "💸 Money"],
        answer: "📉 Chart Down"
      },
      {
        id: "fin_rec_9",
        prompt: "$100",
        options: ["$80", "$90", "$100", "$120"],
        answer: "$100"
      },
      {
        id: "fin_rec_10",
        prompt: "🟠 Orange",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "fin_rec_11",
        prompt: "$20",
        options: ["$10", "$15", "$20", "$25"],
        answer: "$20"
      },
      {
        id: "fin_rec_12",
        prompt: "💵 Cash",
        options: ["💵 Cash", "🪙 Coin", "💳 Card", "💎 Gem"],
        answer: "💵 Cash"
      },
      {
        id: "fin_rec_13",
        prompt: "$3",
        options: ["$2", "$3", "$4", "$5"],
        answer: "$3"
      },
      {
        id: "fin_rec_14",
        prompt: "$25",
        options: ["$15", "$20", "$25", "$30"],
        answer: "$25"
      },
      {
        id: "fin_rec_15",
        prompt: "$5",
        options: ["$3", "$4", "$5", "$6"],
        answer: "$5"
      }
    ]
  },
  healthcare: {
    name: "Healthcare",
    processing: [
      {
        id: "hc_proc_1",
        prompt: "🔴 + 🔵 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "hc_proc_2",
        prompt: "12 + 18 = ?",
        options: ["28", "30", "32", "34"],
        answer: "30"
      },
      {
        id: "hc_proc_3",
        prompt: "Pulse Monitor:\n72 bpm ➔ 85 bpm ➔ 102 bpm\n\nWhat trend is occurring?",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "hc_proc_4",
        prompt: "SpO2 (Oxygen Levels):\n98% ➔ 95% ➔ 90%\n\nWhat is happening?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "hc_proc_5",
        prompt: "Patient Temp:\n98.6° ➔ 99.8° ➔ 101.2°\n\nWhat is happening?",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "hc_proc_6",
        prompt: "Breathing Rate:\n12 ➔ 16 ➔ 20\n\nWhat is happening?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "hc_proc_7",
        prompt: "Count the heart symbols:\n❤️  ❤️  ❤️  ❤️  ❤️  ❤️  ❤️",
        options: ["5", "6", "7", "8"],
        answer: "7"
      },
      {
        id: "hc_proc_8",
        prompt: "Prescribed: 150 mg\nAvailable: 50 mg per tablet\n\nHow many tablets should you administer?",
        options: ["1 tablet", "2 tablets", "3 tablets", "4 tablets"],
        answer: "3 tablets"
      },
      {
        id: "hc_proc_9",
        prompt: "Which symbol is different?\n🩺  🩺  💉  🩺",
        options: ["🩺", "💉", "All same", "None"],
        answer: "💉"
      },
      {
        id: "hc_proc_10",
        prompt: "Time: 12:00 + 3 hours 15 mins = ?",
        options: ["15:00", "15:15", "15:30", "15:45"],
        answer: "15:15"
      },
      {
        id: "hc_proc_11",
        prompt: "🟡 + 🔴 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "hc_proc_12",
        prompt: "Fluid Intake: 2200 mL\nFluid Output: 1800 mL\n\nWhat is the net fluid balance?",
        options: ["+200 mL", "+400 mL", "-400 mL", "Neutral"],
        answer: "+400 mL"
      },
      {
        id: "hc_proc_13",
        prompt: "Pattern: 🩺  ❤️  🩺  ❤️  ?",
        options: ["🩺", "❤️", "💉", "💊"],
        answer: "🩺"
      },
      {
        id: "hc_proc_14",
        prompt: "Patient Weight: 80 kg\nPatient Height: 2 m\n\nWhat is the BMI score? (Weight / Height^2)",
        options: ["18", "20", "22", "24"],
        answer: "20"
      },
      {
        id: "hc_proc_15",
        prompt: "Next dose: 8 hours\nTime since last: 6 hours\n\nHow many hours until next dose?",
        options: ["1 hour", "2 hours", "3 hours", "4 hours"],
        answer: "2 hours"
      }
    ],
    recognition: [
      {
        id: "hc_rec_1",
        prompt: "🟣 Purple",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "hc_rec_2",
        prompt: "30",
        options: ["20", "30", "40", "50"],
        answer: "30"
      },
      {
        id: "hc_rec_3",
        prompt: "Rising",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "hc_rec_4",
        prompt: "Decreasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "hc_rec_5",
        prompt: "Rising",
        options: ["Rising", "Falling", "Stable", "Fluctuating"],
        answer: "Rising"
      },
      {
        id: "hc_rec_6",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "hc_rec_7",
        prompt: "7",
        options: ["5", "6", "7", "8"],
        answer: "7"
      },
      {
        id: "hc_rec_8",
        prompt: "3 tablets",
        options: ["1 tablet", "2 tablets", "3 tablets", "4 tablets"],
        answer: "3 tablets"
      },
      {
        id: "hc_rec_9",
        prompt: "💉 Syringe",
        options: ["🩺 Stethoscope", "💉 Syringe", "💊 Pill", "❤️ Heart"],
        answer: "💉 Syringe"
      },
      {
        id: "hc_rec_10",
        prompt: "15:15",
        options: ["15:00", "15:15", "15:30", "15:45"],
        answer: "15:15"
      },
      {
        id: "hc_rec_11",
        prompt: "🟠 Orange",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "hc_rec_12",
        prompt: "+400 mL",
        options: ["+200 mL", "+400 mL", "-400 mL", "Neutral"],
        answer: "+400 mL"
      },
      {
        id: "hc_rec_13",
        prompt: "Stethoscope",
        options: ["Stethoscope", "Heart", "Syringe", "Pill"],
        answer: "Stethoscope"
      },
      {
        id: "hc_rec_14",
        prompt: "20",
        options: ["18", "20", "22", "24"],
        answer: "20"
      },
      {
        id: "hc_rec_15",
        prompt: "2 hours",
        options: ["1 hour", "2 hours", "3 hours", "4 hours"],
        answer: "2 hours"
      }
    ]
  },
  retail: {
    name: "Retail",
    processing: [
      {
        id: "ret_proc_1",
        prompt: "🔴 + 🔵 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "ret_proc_2",
        prompt: "12 + 18 = ?",
        options: ["28", "30", "32", "34"],
        answer: "30"
      },
      {
        id: "ret_proc_3",
        prompt: "Store Traffic:\n100 ➔ 150 ➔ 200\n\nWhat trend is occurring?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "ret_proc_4",
        prompt: "Customer Returns:\n2% ➔ 4% ➔ 6%\n\nWhat is the trend?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "ret_proc_5",
        prompt: "Total Sales: $500\nProduct Cost: $350\n\nWhat is the net profit?",
        options: ["$100", "$120", "$150", "$200"],
        answer: "$150"
      },
      {
        id: "ret_proc_6",
        prompt: "Conversion:\n1,000 visitors, 30 made purchases\n\nWhat is the conversion rate?",
        options: ["1%", "2%", "3%", "5%"],
        answer: "3%"
      },
      {
        id: "ret_proc_7",
        prompt: "Count the shopping bags:\n🛍️  🛍️  🛍️  🛍️  🛍️",
        options: ["4", "5", "6", "7"],
        answer: "5"
      },
      {
        id: "ret_proc_8",
        prompt: "Original Price: $80\nMarkup: $40\n\nWhat is the markup percentage? (Markup / Price)",
        options: ["25%", "40%", "50%", "60%"],
        answer: "50%"
      },
      {
        id: "ret_proc_9",
        prompt: "Which symbol is different?\n🛒  🛒  📦  🛒",
        options: ["🛒", "📦", "All same", "None"],
        answer: "📦"
      },
      {
        id: "ret_proc_10",
        prompt: "Original Price: $120\nDiscount: 25%\n\nWhat is the sale price?",
        options: ["$80", "$90", "$95", "$100"],
        answer: "$90"
      },
      {
        id: "ret_proc_11",
        prompt: "🟡 + 🔴 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "ret_proc_12",
        prompt: "Inventory Level:\n400 starting ➔ 150 sold ➔ 80 restocked\n\nWhat is the final stock?",
        options: ["310", "320", "330", "350"],
        answer: "330"
      },
      {
        id: "ret_proc_13",
        prompt: "Pattern: 🛒  🛍️  🛒  🛍️  ?",
        options: ["🛒", "🛍️", "📦", "🏷️"],
        answer: "🛒"
      },
      {
        id: "ret_proc_14",
        prompt: "A customer spends $30, $40, and $50 in three visits\n\nWhat is the average spend?",
        options: ["$35", "$40", "$45", "$50"],
        answer: "$40"
      },
      {
        id: "ret_proc_15",
        prompt: "Sales target: $50\nActual sales: $47\n\nWhat is the shortfall?",
        options: ["$2", "$3", "$4", "$5"],
        answer: "$3"
      }
    ],
    recognition: [
      {
        id: "ret_rec_1",
        prompt: "🟣 Purple",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "ret_rec_2",
        prompt: "30",
        options: ["20", "30", "40", "50"],
        answer: "30"
      },
      {
        id: "ret_rec_3",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "ret_rec_4",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "ret_rec_5",
        prompt: "$150",
        options: ["$100", "$120", "$150", "$200"],
        answer: "$150"
      },
      {
        id: "ret_rec_6",
        prompt: "3%",
        options: ["1%", "2%", "3%", "5%"],
        answer: "3%"
      },
      {
        id: "ret_rec_7",
        prompt: "5",
        options: ["4", "5", "6", "7"],
        answer: "5"
      },
      {
        id: "ret_rec_8",
        prompt: "50%",
        options: ["25%", "40%", "50%", "60%"],
        answer: "50%"
      },
      {
        id: "ret_rec_9",
        prompt: "📦 Box",
        options: ["🛒 Cart", "📦 Box", "🛍️ Bag", "🏷️ Tag"],
        answer: "📦 Box"
      },
      {
        id: "ret_rec_10",
        prompt: "$90",
        options: ["$80", "$90", "$95", "$100"],
        answer: "$90"
      },
      {
        id: "ret_rec_11",
        prompt: "🟠 Orange",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "ret_rec_12",
        prompt: "330",
        options: ["310", "320", "330", "350"],
        answer: "330"
      },
      {
        id: "ret_rec_13",
        prompt: "🛒 Cart",
        options: ["🛒 Cart", "🛍️ Bag", "📦 Box", "🏷️ Tag"],
        answer: "🛒 Cart"
      },
      {
        id: "ret_rec_14",
        prompt: "$40",
        options: ["$35", "$40", "$45", "$50"],
        answer: "$40"
      },
      {
        id: "ret_rec_15",
        prompt: "$3",
        options: ["$2", "$3", "$4", "$5"],
        answer: "$3"
      }
    ]
  },
  manufacturing: {
    name: "Manufacturing",
    processing: [
      {
        id: "mfg_proc_1",
        prompt: "🔴 + 🔵 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "mfg_proc_2",
        prompt: "12 + 18 = ?",
        options: ["28", "30", "32", "34"],
        answer: "30"
      },
      {
        id: "mfg_proc_3",
        prompt: "Defect count:\nHour 1: 2 ➔ Hour 2: 5 ➔ Hour 3: 9\n\nWhat trend is occurring?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "mfg_proc_4",
        prompt: "Conveyor speed:\n10 m/s ➔ 8 m/s ➔ 6 m/s\n\nWhat is the trend?",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "mfg_proc_5",
        prompt: "Cycle Time: 45s\nYou complete 8 cycles\n\nWhat is the total duration?",
        options: ["320s", "340s", "360s", "400s"],
        answer: "360s"
      },
      {
        id: "mfg_proc_6",
        prompt: "OEE Calculation:\n90% Availability * 90% Performance * 90% Quality\n\nWhat is the total OEE score?",
        options: ["70.0%", "72.9%", "81.0%", "90.0%"],
        answer: "72.9%"
      },
      {
        id: "mfg_proc_7",
        prompt: "Count the gear symbols:\n⚙️  ⚙️  ⚙️  ⚙️  ⚙️  ⚙️  ⚙️  ⚙️",
        options: ["6", "7", "8", "9"],
        answer: "8"
      },
      {
        id: "mfg_proc_8",
        prompt: "Running time: 105 hrs\nTarget limit: 120 hrs\n\nHow many hours remaining before maintenance?",
        options: ["10 hours", "15 hours", "20 hours", "25 hours"],
        answer: "15 hours"
      },
      {
        id: "mfg_proc_9",
        prompt: "Which symbol is different?\n⚙️  ⚙️  🔧  ⚙️",
        options: ["⚙️", "🔧", "All same", "None"],
        answer: "🔧"
      },
      {
        id: "mfg_proc_10",
        prompt: "Time: 08:00 + 4 hours 15 mins = ?",
        options: ["12:00", "12:15", "12:30", "12:45"],
        answer: "12:15"
      },
      {
        id: "mfg_proc_11",
        prompt: "🟡 + 🔴 = ?",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "mfg_proc_12",
        prompt: "Produced: 500 units\nScrapped: 25 units\n\nWhat is the scrap rate? (Scrap / Produced)",
        options: ["2%", "4%", "5%", "10%"],
        answer: "5%"
      },
      {
        id: "mfg_proc_13",
        prompt: "Pattern: ⚙️  🔧  ⚙️  🔧  ?",
        options: ["⚙️", "🔧", "📦", "🔨"],
        answer: "⚙️"
      },
      {
        id: "mfg_proc_14",
        prompt: "Defects per hour:\nHour A: 4 | Hour B: 6 | Hour C: 8\n\nWhat is the average hourly defects?",
        options: ["5", "6", "7", "8"],
        answer: "6"
      },
      {
        id: "mfg_proc_15",
        prompt: "Calibration target: 5.0V\nActual reading: 4.8V\n\nWhat is the absolute difference?",
        options: ["0.1V", "0.2V", "0.3V", "0.4V"],
        answer: "0.2V"
      }
    ],
    recognition: [
      {
        id: "mfg_rec_1",
        prompt: "🟣 Purple",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟡 Yellow"],
        answer: "🟣 Purple"
      },
      {
        id: "mfg_rec_2",
        prompt: "30",
        options: ["20", "30", "40", "50"],
        answer: "30"
      },
      {
        id: "mfg_rec_3",
        prompt: "Increasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Increasing"
      },
      {
        id: "mfg_rec_4",
        prompt: "Decreasing",
        options: ["Increasing", "Decreasing", "Stable", "Fluctuating"],
        answer: "Decreasing"
      },
      {
        id: "mfg_rec_5",
        prompt: "360s",
        options: ["320s", "340s", "360s", "400s"],
        answer: "360s"
      },
      {
        id: "mfg_rec_6",
        prompt: "72.9%",
        options: ["70.0%", "72.9%", "81.0%", "90.0%"],
        answer: "72.9%"
      },
      {
        id: "mfg_rec_7",
        prompt: "8",
        options: ["6", "7", "8", "9"],
        answer: "8"
      },
      {
        id: "mfg_rec_8",
        prompt: "15 hours",
        options: ["10 hours", "15 hours", "20 hours", "25 hours"],
        answer: "15 hours"
      },
      {
        id: "mfg_rec_9",
        prompt: "🔧 Wrench",
        options: ["⚙️ Gear", "🔧 Wrench", "🔨 Hammer", "📦 Box"],
        answer: "🔧 Wrench"
      },
      {
        id: "mfg_rec_10",
        prompt: "12:15",
        options: ["12:00", "12:15", "12:30", "12:45"],
        answer: "12:15"
      },
      {
        id: "mfg_rec_11",
        prompt: "🟠 Orange",
        options: ["🟢 Green", "🟣 Purple", "🟠 Orange", "🟤 Brown"],
        answer: "🟠 Orange"
      },
      {
        id: "mfg_rec_12",
        prompt: "5%",
        options: ["2%", "4%", "5%", "10%"],
        answer: "5%"
      },
      {
        id: "mfg_rec_13",
        prompt: "⚙️ Gear",
        options: ["⚙️ Gear", "🔧 Wrench", "📦 Box", "🔨 Hammer"],
        answer: "⚙️ Gear"
      },
      {
        id: "mfg_rec_14",
        prompt: "6",
        options: ["5", "6", "7", "8"],
        answer: "6"
      },
      {
        id: "mfg_rec_15",
        prompt: "0.2V",
        options: ["0.1V", "0.2V", "0.3V", "0.4V"],
        answer: "0.2V"
      }
    ]
  }
};
