/**
 * NAF Data-Driven Leadership Slide Presentation - Script File
 */

document.addEventListener("DOMContentLoaded", () => {
    // Presentation State
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    let autoplayInterval = null;
    let isAutoplayActive = false;
    let isLaserPointerActive = false;

    // Presenter Notes Data
    const presenterNotes = {
        0: "Slide 1: Cover Page. Good morning, Air Officers and Commanders. Welcome to the Executive Analytics Programme. Today, we will discuss Data-Driven Leadership. This presentation highlights how modern military aviation superiority relies as much on high-quality decisions powered by data as it does on airframe performance.",
        1: "Slide 2: Objectives. These are our focus areas. We will explore why data is a strategic resource, the transition from computerization to AI, and concrete aviation examples of predictive maintenance, fuel savings, and mission scheduling.",
        2: "Slide 3: Fourth Industrial Revolution. Outline how we reached today's digital era. 1st Revolution used steam, 2nd introduced mass production via electricity, 3rd automated computing, and 4th merges digital, physical, and cognitive systems. Highlight that today's NAF aircraft generate millions of data points; our success lies in processing them effectively.",
        3: "Slide 4: Data Sources. Look at this visual breakdown. A single sortie generates data across several channels: fuel telemetry, flight control systems, engine diagnostics, logistics, and personnel rosters. Click the aircraft parts to see what telemetry each area produces.",
        4: "Slide 5: Data Science. Define data science for executives. Clarify that leaders do not need to build algorithms, but must know how to ask the right questions and interpret statistical insights. Click the orbits to inspect the component disciplines.",
        5: "Slide 6: Oil Analogy. Explain the refining process. Just as crude oil is useless until extracted, cleaned, and refined into aviation turbine kerosene (ATK), raw data is useless until cleaned, structured, analyzed, and delivered to decision-makers.",
        6: "Slide 7: Data vs Info vs Intel. Use the helicopter fuel example. Data is the number '5,000 lbs'. Information puts context on it: 'The helicopter has 5,000 lbs of fuel remaining'. Intelligence integrates variables: 'Considering headwind and weather, the aircraft has 45 minutes of reserve remaining'.",
        7: "Slide 8: Value Chain. Show the path from telemetry to execution. Raw data becomes structured information, which leads to analysis, resulting in intelligence, enabling a commander's decision, which leads to mission success.",
        8: "Slide 9: F1 Analogy. Compare a squadron commander to a pit crew manager. The pilot, like the F1 driver, is busy operating the machine. The commander and analysts monitor telemetry in real-time to make predictive decisions. Switch tabs to see telemetry side-by-side.",
        9: "Slide 10: Use Cases. Detail how global air forces apply data. Highlight predictive maintenance: replacing parts before they fail mid-flight, saving costs and lives. Review logistics planning and safety risk indexes.",
        10: "Slide 11: Analytics Continuum. Detail the four stages. Descriptive tells us what happened. Diagnostic explains why. Predictive forecasts trends. Prescriptive recommends actions. Moving right increases decision value. Use the slider to explore.",
        11: "Slide 12: Analytics Types. Aviation examples. Descriptive: Monthly flight hours. Diagnostic: Analyzing why a squadron's availability dropped. Predictive: Forecasting hydraulic failures. Prescriptive: Automated recommendations on postponing flights based on risks.",
        12: "Slide 13: Leader Comparison. Compare traditional leaders (who rely solely on intuition or incomplete facts) with data-driven leaders (who augment intuition with evidence). Intuition is valuable, but data makes it more accurate.",
        13: "Slide 14: Cost of Poor Literacy. Outline risks. Poor data literacy leads to operational guesswork, wasted fuel, delayed detection of structural faults, and reduced combat readiness. Click segments of the wheel to inspect details.",
        14: "Slide 15: Fuel Simulation. Command Challenge. Let's run a tactical exercise. We have a fuel limit of 5,000 lbs. Compare Traditional Mode (making decisions with only basic descriptions) vs. Data-Driven Mode (viewing readiness, weather risk, and success calculations). Select missions, execute, and inspect the after-action report.",
        15: "Slide 16: Discussion Exercise. Break into pairs. Review a past operational decision made in your command. What data would you have wanted on a dashboard to make that decision cleaner, faster, or safer?",
        16: "Slide 17: Takeaways. Summarize. Data is a strategic military asset. A leader's job is not to generate data but to demand and act on refined intelligence. Better data leads to better decisions, resulting in successful missions."
    };

    // DOM Elements
    const prevBtn = document.getElementById("prev-slide");
    const nextBtn = document.getElementById("next-slide");
    const autoplayBtn = document.getElementById("autoplay-toggle");
    const fullscreenBtn = document.getElementById("fullscreen-toggle");
    const laserBtn = document.getElementById("laser-pointer-toggle");
    const notesBtn = document.getElementById("notes-toggle");
    const helpBtn = document.getElementById("help-toggle");
    
    const slideNumDisplay = document.getElementById("slide-num");
    const progressFill = document.querySelector(".progress-bar-fill");
    
    const sidebar = document.getElementById("sidebar-menu");
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebarClose = document.getElementById("sidebar-close");
    const sidebarList = document.getElementById("sidebar-list");
    
    const laserPointer = document.getElementById("laser-pointer");
    const container = document.querySelector(".presentation-container");
    
    const notesPanel = document.getElementById("notes-panel");
    const notesContent = document.querySelector(".notes-content");
    
    const helpModal = document.getElementById("help-modal");
    const helpClose = document.getElementById("help-close");

    // Initialize Slide Deck
    function initPresentation() {
        // Sync URL Hash on start
        const hash = window.location.hash;
        if (hash && hash.startsWith("#slide-")) {
            const slideIndex = parseInt(hash.replace("#slide-", ""), 10) - 1;
            if (slideIndex >= 0 && slideIndex < totalSlides) {
                currentSlide = slideIndex;
            }
        }
        
        // Build Sidebar Navigation items
        sidebarList.innerHTML = "";
        slides.forEach((slide, idx) => {
            const topic = slide.querySelector(".slide-topic")?.innerText || "Title Slide";
            const title = slide.querySelector(".slide-title")?.innerText || "Cover Page";
            
            const div = document.createElement("div");
            div.className = `sidebar-item ${idx === currentSlide ? "active" : ""}`;
            div.innerHTML = `<span style="font-weight: 800; color: var(--accent-cyan); margin-right: 8px;">${idx + 1}.</span> ${title}`;
            div.addEventListener("click", () => {
                goToSlide(idx);
                closeSidebar();
            });
            sidebarList.appendChild(div);
        });

        updateSlideState();
    }

    // Update state when changing slides
    function updateSlideState() {
        slides.forEach((slide, idx) => {
            if (idx === currentSlide) {
                slide.classList.add("active");
                
                // Adjust light/dark themes
                if (slide.classList.contains("theme-dark")) {
                    container.classList.add("theme-dark");
                } else {
                    container.classList.remove("theme-dark");
                }
            } else {
                slide.classList.remove("active");
            }
        });

        // Update progress bar
        const progressPct = ((currentSlide) / (totalSlides - 1)) * 100;
        progressFill.style.width = `${progressPct}%`;
        
        // Update numbers
        slideNumDisplay.innerText = `${currentSlide + 1} / ${totalSlides}`;

        // Sync URL Hash
        window.location.hash = `slide-${currentSlide + 1}`;

        // Update Sidebar active item
        const items = sidebarList.querySelectorAll(".sidebar-item");
        items.forEach((item, idx) => {
            if (idx === currentSlide) item.classList.add("active");
            else item.classList.remove("active");
        });

        // Load Presenter Notes
        notesContent.innerText = presenterNotes[currentSlide] || "No notes available for this slide.";

        // Run animations specific to the active slide
        triggerSlideAnimations(currentSlide);
    }

    // Trigger animations depending on which slide is shown
    function triggerSlideAnimations(index) {
        // Slide 2: Journey Path Progress
        if (index === 1) {
            setTimeout(() => {
                const activeStep = document.querySelector(".roadmap-step.active");
                if (activeStep) {
                    activeStep.click();
                }
            }, 600);
        }

        // Slide 3: 4IR Cards Stagger
        if (index === 2) {
            const cards = document.querySelectorAll(".timeline-card");
            cards.forEach((card, cidx) => {
                card.classList.remove("active");
                setTimeout(() => {
                    card.classList.add("active");
                }, cidx * 300);
            });
        }

        // Slide 4: Jet Hotspots Pulse
        if (index === 3) {
            const firstHotspot = document.querySelector(".aircraft-hotspot");
            if (firstHotspot) firstHotspot.click();
        }

        // Slide 5: Orbit Nodes
        if (index === 4) {
            // Set first node as active
            const node = document.querySelector(".orbit-node");
            if (node) node.click();
        }

        // Slide 6: Refinery Pipeline Nodes
        if (index === 5) {
            const nodes = document.querySelectorAll(".refinery-node");
            nodes.forEach((node, nidx) => {
                node.classList.remove("active");
                setTimeout(() => {
                    node.classList.add("active");
                }, nidx * 250);
            });
        }

        // Slide 7: Staircase highlight
        if (index === 6) {
            const stair = document.querySelector(".stair-1");
            if (stair) stair.click();
        }

        // Slide 9: F1 split screen tabs
        if (index === 8) {
            const tabBtn = document.querySelector(".telemetry-tab-btn");
            if (tabBtn) tabBtn.click();
        }

        // Slide 11: Analytics Continuum Slider
        if (index === 10) {
            const slider = document.getElementById("continuum-slider");
            if (slider) {
                slider.value = 0;
                slider.dispatchEvent(new Event("input"));
            }
        }

        // Slide 13: Leader gauge charts
        if (index === 12) {
            // Animating gauges/bars
            const fills = document.querySelectorAll(".leader-bar-fill");
            fills.forEach(fill => {
                const targetWidth = fill.getAttribute("data-value") + "%";
                fill.style.width = "0%";
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
            });
        }

        // Slide 14: Risk Wheel
        if (index === 13) {
            const wheelSvg = document.getElementById("wheel-svg");
            if (wheelSvg) {
                wheelSvg.style.transform = "rotate(0deg)";
                const firstSegment = document.querySelector('[data-segment="0"]');
                if (firstSegment) {
                    // Trigger click to show first readout
                    selectRiskSegment(0, "Decisions become guesswork", "Without data literacy, executives fail to interpret statistical indicators. They rely entirely on subjective opinions, converting high-stakes military deployments into a coin toss.");
                }
            }
        }

        // Slide 15: Simulator reset
        if (index === 14) {
            resetSimulator();
        }
    }

    // Navigation actions
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlideState();
        } else if (isAutoplayActive) {
            toggleAutoplay(); // Stop at the end
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlideState();
        }
    }

    function goToSlide(idx) {
        if (idx >= 0 && idx < totalSlides) {
            currentSlide = idx;
            updateSlideState();
        }
    }

    // Autoplay toggle
    function toggleAutoplay() {
        if (isAutoplayActive) {
            clearInterval(autoplayInterval);
            autoplayBtn.innerHTML = `<i class="ri-play-fill"></i>`;
            isAutoplayActive = false;
        } else {
            autoplayBtn.innerHTML = `<i class="ri-pause-fill"></i>`;
            isAutoplayActive = true;
            autoplayInterval = setInterval(() => {
                if (currentSlide < totalSlides - 1) {
                    nextSlide();
                } else {
                    goToSlide(0); // Loop back
                }
            }, 6000); // 6 seconds per slide
        }
    }

    // Fullscreen Toggle
    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            container.requestFullscreen().then(() => {
                fullscreenBtn.innerHTML = `<i class="ri-fullscreen-exit-fill"></i>`;
            }).catch(err => {
                console.error("Fullscreen error:", err);
            });
        } else {
            document.exitFullscreen().then(() => {
                fullscreenBtn.innerHTML = `<i class="ri-fullscreen-fill"></i>`;
            });
        }
    }

    // Sidebar drawer control
    function toggleSidebar() {
        sidebar.classList.toggle("open");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
    }

    // Laser pointer toggle
    function toggleLaserPointer() {
        isLaserPointerActive = !isLaserPointerActive;
        if (isLaserPointerActive) {
            laserBtn.classList.add("control-btn-active");
            laserBtn.style.backgroundColor = "var(--accent-blue)";
            container.classList.add("laser-pointer-active");
            laserPointer.style.display = "block";
            
            // Move event listener
            container.addEventListener("mousemove", updateLaserPosition);
        } else {
            laserBtn.classList.remove("control-btn-active");
            laserBtn.style.backgroundColor = "";
            container.classList.remove("laser-pointer-active");
            laserPointer.style.display = "none";
            
            container.removeEventListener("mousemove", updateLaserPosition);
        }
    }

    function updateLaserPosition(e) {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        laserPointer.style.left = `${x}px`;
        laserPointer.style.top = `${y}px`;
    }

    // Event Listeners for slide navigation buttons
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    autoplayBtn.addEventListener("click", toggleAutoplay);
    fullscreenBtn.addEventListener("click", toggleFullscreen);
    laserBtn.addEventListener("click", toggleLaserPointer);
    notesBtn.addEventListener("click", () => notesPanel.classList.toggle("active"));
    helpBtn.addEventListener("click", () => helpModal.classList.add("active"));
    helpClose.addEventListener("click", () => helpModal.classList.remove("active"));
    
    // Sidebar items
    menuToggle.addEventListener("click", toggleSidebar);
    sidebarClose.addEventListener("click", closeSidebar);

    // Keyboard controls
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
            e.preventDefault();
            nextSlide();
        } else if (e.key === "ArrowLeft" || e.key === "Backspace" || e.key === "PageUp") {
            e.preventDefault();
            prevSlide();
        } else if (e.key === "f" || e.key === "F") {
            e.preventDefault();
            toggleFullscreen();
        } else if (e.key === "l" || e.key === "L") {
            e.preventDefault();
            toggleLaserPointer();
        } else if (e.key === "n" || e.key === "N") {
            e.preventDefault();
            notesPanel.classList.toggle("active");
        } else if (e.key === "Escape") {
            helpModal.classList.remove("active");
            closeSidebar();
        }
    });

    // Touch Swiping support
    let touchStartX = 0;
    let touchEndX = 0;
    container.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextSlide(); // Swipe left -> next
        } else if (touchEndX > touchStartX + threshold) {
            prevSlide(); // Swipe right -> prev
        }
    }


    /* ==========================================================================
       INDIVIDUAL SLIDE INTERACTION HANDLERS
       ========================================================================== */

    // --- Slide 2: Today's Journey Roadmap ---
    const roadmapSteps = document.querySelectorAll(".roadmap-step");
    const roadmapProgress = document.getElementById("roadmap-progress");
    const roadmapTitle = document.getElementById("roadmap-desc-title");
    const roadmapText = document.getElementById("roadmap-desc-text");

    const roadmapData = {
        0: {
            title: "Phase 1: The Fourth Industrial Revolution (4IR)",
            text: "Explore how aviation technology evolved from computerization to high-volume sensor telemetry, cloud structures, and intelligent drone platforms."
        },
        1: {
            title: "Phase 2: Data as a Strategic Asset",
            text: "Understanding data pipelines. How data is collected, cleaned, and refined from avionics, weather networks, and maintenance logs into tactical value."
        },
        2: {
            title: "Phase 3: Executive Analytics Continuum",
            text: "Differentiating descriptive tracking (what happened) from predictive and prescriptive models that suggest flight cancellations, routing, or pre-emptive maintenance checks."
        },
        3: {
            title: "Phase 4: Data-Driven Leadership & Culture",
            text: "Synthesizing commanders' intuition with empirical evidence to minimize tactical risk, maximize sortie rates, and enforce accountability across squadrons."
        },
        4: {
            title: "Phase 5: Mission Success Integration",
            text: "Applying analytics to real-time operations, ensuring higher aircraft availability, reduced fuel waste, and optimized tactical mission outcomes."
        }
    };

    roadmapSteps.forEach((step, idx) => {
        step.addEventListener("click", () => {
            // Update active states
            roadmapSteps.forEach((s, sidx) => {
                s.classList.remove("active");
                if (sidx < idx) s.classList.add("completed");
                else s.classList.remove("completed");
            });
            step.classList.add("active");
            
            // Progress line width
            const pct = (idx / (roadmapSteps.length - 1)) * 100;
            roadmapProgress.style.width = `${pct}%`;
            
            // Update text
            roadmapTitle.innerText = roadmapData[idx].title;
            roadmapText.innerText = roadmapData[idx].text;
        });
    });


    // --- Slide 4: Jet Aircraft Hotspots ---
    const hotspots = document.querySelectorAll(".aircraft-hotspot");
    const aircraftTitle = document.getElementById("aircraft-readout-title");
    const aircraftData = document.getElementById("aircraft-readout-data");

    const aircraftReadouts = {
        "engine": {
            title: "Aircraft Sensors & Maintenance",
            desc: "Monitors internal turbine temperatures, exhaust gases, oil friction pressure, compressor speeds, and structural fuselage stress nodes to schedule preventative checkups."
        },
        "fuel": {
            title: "Fuel Usage & Logistics",
            desc: "Aggregates real-time tank measurements, fuel flow sensor alerts, and consumption curves to identify aerodynamics leaks and optimizes tanker supply chains."
        },
        "ops": {
            title: "Flight Operations & Personnel",
            desc: "Combines logs from air traffic controls, flight hours tracking, pilot rosters, and scheduling bounds to maximize fleet availability and reduce mission conflicts."
        },
        "safety": {
            title: "Safety Reports & Flight Logs",
            desc: "Synthesizes post-flight briefings, structural warning logs, pilot safety reports, and component wear rates to flag high-risk jets before sorties launch."
        },
        "weather": {
            title: "Weather Systems & Radar",
            desc: "Feeds barometric pressure, external temperature, wind coordinates, and storm path grids directly into route optimization tools."
        }
    };

    hotspots.forEach(spot => {
        spot.addEventListener("click", () => {
            hotspots.forEach(s => s.classList.remove("active"));
            spot.classList.add("active");
            
            const system = spot.getAttribute("data-system");
            const data = aircraftReadouts[system] || { title: "Telemetry Node Select", desc: "Select a highlighted region on the aircraft diagram to view the sensor arrays and telemetry reports." };
            
            aircraftTitle.innerText = data.title;
            aircraftData.innerText = data.desc;
            
            // Highlight the corresponding SVG arrow leading into the central dashboard
            const arrows = document.querySelectorAll(".telemetry-arrow");
            arrows.forEach(arrow => {
                arrow.classList.remove("active");
                if (arrow.getAttribute("data-arrow") === system) {
                    arrow.classList.add("active");
                }
            });
        });
    });


    // --- Slide 5: Data Science Orbit Nodes ---
    const orbitNodes = document.querySelectorAll(".orbit-node");
    const orbitOverlay = document.getElementById("orbit-overlay");
    const orbitOverlayTitle = document.getElementById("orbit-overlay-title");
    const orbitOverlayDesc = document.getElementById("orbit-overlay-desc");

    const orbitContent = {
        "data": {
            title: "1. Data Engineering",
            desc: "Constructing pipelines that ingest raw flight logs, avionics outputs, and weather feeds. Standardizes and stores messy data streams cleanly in centralized database repositories."
        },
        "technology": {
            title: "2. Cloud & Edge Computing",
            desc: "Providing database infrastructure, servers, and computing cores. Allows commanders to run heavy AI models on the cloud or directly on deployable tactical bases."
        },
        "statistics": {
            title: "3. Applied Mathematics & Statistics",
            desc: "Validating sensor trends. Uses statistical regression and predictive modeling to separate actual warning signs from sensor noise and minor atmospheric variables."
        },
        "business": {
            title: "4. Aviation Operations & Domain Expertise",
            desc: "The critical military layer. Ensures that mathematical models align with flight safety rules, aircraft engineering limits, and tactical air force deployment needs."
        },
        "ai": {
            title: "5. Artificial Intelligence & Machine Learning",
            desc: "Running predictive neural networks. Learns from thousands of past flights to forecast structural failures, optimize flight routes, and coordinate squadron loads."
        }
    };

    // Calculate node coordinates on the circle
    const numNodes = orbitNodes.length;
    const radius = 160; // radius of orbit-ring
    orbitNodes.forEach((node, idx) => {
        const angle = (idx * (2 * Math.PI / numNodes)) - (Math.PI / 2); // Start at top
        const x = Math.round(radius * Math.cos(angle));
        const y = Math.round(radius * Math.sin(angle));
        
        node.style.left = `calc(50% + ${x}px - 38px)`;
        node.style.top = `calc(50% + ${y}px - 38px)`;
        
        node.addEventListener("click", (e) => {
            e.stopPropagation();
            orbitNodes.forEach(n => n.classList.remove("active"));
            node.classList.add("active");
            
            const field = node.getAttribute("data-field");
            const data = orbitContent[field];
            
            orbitOverlayTitle.innerText = data.title;
            orbitOverlayDesc.innerText = data.desc;
            orbitOverlay.classList.add("active");
        });
    });
    
    // Close overlay on container click
    container.addEventListener("click", () => {
        orbitOverlay.classList.remove("active");
        orbitNodes.forEach(n => n.classList.remove("active"));
    });


    // --- Slide 7: 3D Staircase ---
    const stairs = document.querySelectorAll(".stair");
    const stairsReadoutTitle = document.getElementById("stairs-readout-title");
    const stairsReadoutExample = document.getElementById("stairs-readout-example");
    const stairsReadoutDesc = document.getElementById("stairs-readout-desc");

    const staircaseData = {
        0: {
            title: "Data (Raw Numbers)",
            example: "Value: 5,000 lbs",
            desc: "Raw, isolated elements without context. Just a numerical metric read from a fuel tank flow sensor node. Tells us a physical value but provides zero tactical understanding."
        },
        1: {
            title: "Information (Contextualized Meaning)",
            example: "Value: 'F-7Ni jet remaining fuel is 5,000 lbs'",
            desc: "Applying context to raw values. By mapping the number to a specific tail number and parameter, we know exactly what it measures. However, we still do not know if this is adequate for our flight plan."
        },
        2: {
            title: "Intelligence (Refined Actionable Insight)",
            example: "Value: 'The aircraft has 45 minutes of reserve fuel based on flight level wind speed'",
            desc: "Synthesizing factors: fuel burn rates, headwind drag, distance to runway, alternate landing coordinates, and air traffic delays. Provides the commander with a clear strategic choice."
        }
    };

    stairs.forEach((stair, idx) => {
        stair.addEventListener("click", () => {
            stairs.forEach(s => s.classList.remove("active"));
            stair.classList.add("active");
            
            const data = staircaseData[idx];
            stairsReadoutTitle.innerText = data.title;
            stairsReadoutExample.innerText = data.example;
            stairsReadoutDesc.innerText = data.desc;
        });
    });


    // --- Slide 9: F1 vs Air Force Telemetry ---
    const telemetryTabBtns = document.querySelectorAll(".telemetry-tab-btn");
    const telemetryTitle = document.getElementById("telemetry-title");
    const telemetryItems = document.querySelectorAll(".telemetry-item");

    const telemetryData = {
        "f1": {
            title: "FORMULA 1 LIVE PIT WALL TELEMETRY",
            items: [
                { label: "Tyre Wear Index", val: "L: 28% | R: 32%" },
                { label: "Fuel Remaining", val: "14.2 kg" },
                { label: "Brake Disc Temp", val: "680 °C" },
                { label: "Estimated Pit Window", val: "Lap 34" }
            ]
        },
        "naf": {
            title: "NAF SQUADRON OPERATIONS HUD",
            items: [
                { label: "Pre-Flight Hydraulic Risk", val: "0.02% (GREEN)" },
                { label: "Fuel Burn Anomaly", val: "-1.2% (OPTIMAL)" },
                { label: "Tail Number 038 Engine Temp", val: "720 °C (STEADY)" },
                { label: "Mission Completion Index", val: "94.2% (EXCELLENT)" }
            ]
        }
    };

    telemetryTabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            telemetryTabBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const type = btn.getAttribute("data-tab");
            const data = telemetryData[type];
            
            telemetryTitle.innerText = data.title;
            telemetryItems.forEach((item, idx) => {
                const label = item.querySelector(".telemetry-label");
                const val = item.querySelector(".telemetry-val");
                label.innerText = data.items[idx].label;
                val.innerText = data.items[idx].val;
            });
        });
    });


    // --- Slide 11: Analytics Continuum Slider ---
    const continuumSlider = document.getElementById("continuum-slider");
    const continuumTitle = document.getElementById("continuum-title");
    const continuumDesc = document.getElementById("continuum-desc");
    const continuumCurve = document.getElementById("continuum-curve-path");
    const continuumIndicator = document.getElementById("continuum-indicator-dot");

    const continuumData = {
        0: {
            title: "Stage 1: Descriptive Analytics ('What Happened?')",
            desc: "Combines monthly logs to detail historical outputs. Example: Monthly flight log totals showing Tail 032 completed 45 flight hours last month."
        },
        1: {
            title: "Stage 2: Diagnostic Analytics ('Why Did It Happen?')",
            desc: "Querying variables to find root causes. Example: Investigating why flight readiness dropped in June, discovering it was due to delayed engine spares delivery."
        },
        2: {
            title: "Stage 3: Predictive Analytics ('What Will Happen?')",
            desc: "Using historical patterns to project future warnings. Example: Analyzing engine vibration spikes to predict a fuel injector failure within 15 flight hours."
        },
        3: {
            title: "Stage 4: Prescriptive Analytics ('What Should We Do?')",
            desc: "Computing optimal decisions under resource constraints. Example: Automatically recommending flight scheduling adjustments to match mechanic shifts and maximize aircraft availability."
        }
    };

    if (continuumSlider) {
        continuumSlider.addEventListener("input", (e) => {
            const val = parseInt(e.target.value, 10);
            const data = continuumData[val];
            
            continuumTitle.innerText = data.title;
            continuumDesc.innerText = data.desc;
            
            // Move dot along the SVG path curve
            // We have a curve mapping from 0 to 3 in value.
            // SVG width is 450, height is 160. Path goes from left to right.
            const x = 30 + (val * 130);
            // Non-linear upward curve: y gets smaller (higher up) as x gets bigger
            const y = 150 - Math.pow(val, 2) * 13;
            
            continuumIndicator.setAttribute("cx", x);
            continuumIndicator.setAttribute("cy", y);
            
            // Adjust SVG line stroke dash-offset to show progress
            // Total length is approx 450
            const strokeOffset = 450 - (val * 150);
            continuumCurve.style.strokeDashoffset = strokeOffset;
        });
    }


    // --- Slide 14: Risk Wheel ---
    const wheelSvg = document.getElementById("wheel-svg");
    const wheelSegments = document.querySelectorAll(".wheel-segment");
    const riskTitle = document.getElementById("risk-title");
    const riskDesc = document.getElementById("risk-desc");

    const riskData = {
        0: {
            title: "Operational Guesswork",
            desc: "Decisions revert to subjective assumptions rather than empirical evidence. High-stakes squadron movements become gambling, increasing operational volatility."
        },
        1: {
            title: "Wasted Resources",
            desc: "Fuel loads, cargo routes, and repair schedules are calculated based on crude templates rather than real-time wear. Leads to severe logistics leaks."
        },
        2: {
            title: "Elevated Safety Risks",
            desc: "Sensor abnormalities are brushed aside as minor quirks rather than precursor warnings of structural failure. Directly results in preventable engine or cockpit failure mid-flight."
        },
        3: {
            title: "Delayed Discovery",
            desc: "Structural cracks or hydraulic failures are only identified during flight failures or teardown inspections, rather than predicted hours beforehand. Maximizes depot downtime."
        },
        4: {
            title: "Decreased Transparency",
            desc: "Squadron records and resource tracking remain locked in paper logs or siloed spreadsheets. Prevents headquarters from obtaining a single dashboard overview of fleet readiness."
        },
        5: {
            title: "Reduced Combat Readiness",
            desc: "Commanders cannot accurately measure which jets are fully capable of combat operations. Results in deployability failures when urgent sorties are declared."
        }
    };

    function selectRiskSegment(idx, title, desc) {
        riskTitle.innerText = title;
        riskDesc.innerText = desc;
        
        // Rotate SVG wheel so the selected segment is oriented at the top
        // Each segment is 60 degrees. Let's calculate rotation to bring it center-top (0 deg)
        // Segment 0 is at 0-60 deg, Segment 1 is at 60-120 deg...
        const targetRotation = -idx * 60;
        wheelSvg.style.transform = `rotate(${targetRotation}deg)`;
    }

    wheelSegments.forEach((seg) => {
        seg.addEventListener("click", (e) => {
            e.stopPropagation();
            const idx = parseInt(seg.getAttribute("data-segment"), 10);
            const data = riskData[idx];
            selectRiskSegment(idx, data.title, data.desc);
        });
    });


    // --- Slide 15: Command Fuel Simulator ---
    const simModeBtns = document.querySelectorAll(".sim-mode-btn");
    const missionCards = document.querySelectorAll(".sim-mission-card");
    const btnExecute = document.getElementById("sim-btn-execute");
    const fuelFill = document.getElementById("sim-fuel-fill");
    const fuelValLabel = document.getElementById("sim-fuel-val");
    const outputConsole = document.getElementById("sim-console");
    
    // Telemetry displays
    const teleAllocated = document.getElementById("sim-tele-allocated");
    const teleRemaining = document.getElementById("sim-tele-remaining");
    const telePriority = document.getElementById("sim-tele-priority");
    const teleSuccess = document.getElementById("sim-tele-success");

    let simMode = "traditional"; // traditional or data-driven
    let totalFuel = 5000;
    let allocatedFuel = 0;
    let selectedMissions = new Set();

    const missionDatabase = {
        "alpha": { name: "Mission Alpha (Tactical Recon)", fuel: 2000, priority: "High", successProb: 75, traditionalRisk: "UNKNOWN", dataRisk: "LOW" },
        "bravo": { name: "Mission Bravo (Combat Support)", fuel: 3500, priority: "Critical", successProb: 90, traditionalRisk: "UNKNOWN", dataRisk: "MEDIUM" },
        "charlie": { name: "Mission Charlie (Logistics Transport)", fuel: 1500, priority: "Medium", successProb: 45, traditionalRisk: "UNKNOWN", dataRisk: "HIGH" }
    };

    function resetSimulator() {
        allocatedFuel = 0;
        selectedMissions.clear();
        missionCards.forEach(c => {
            c.classList.remove("selected");
            c.classList.remove("disabled");
        });
        updateSimUI();
        outputConsole.innerHTML = '<div class="sim-output-line system">> SYSTEM INITIALIZED. WAITING FOR COMMAND SELECTIONS...</div>';
    }

    function updateSimUI() {
        const remaining = totalFuel - allocatedFuel;
        const remainingPct = (remaining / totalFuel) * 100;
        
        fuelFill.style.width = `${remainingPct}%`;
        fuelValLabel.innerText = `${remaining.toLocaleString()} lbs`;
        
        // Color transition based on fuel left
        if (remainingPct > 50) {
            fuelFill.style.background = "linear-gradient(90deg, #22c55e, #eab308)";
        } else if (remainingPct > 20) {
            fuelFill.style.background = "linear-gradient(90deg, #eab308, #f97316)";
        } else {
            fuelFill.style.background = "linear-gradient(90deg, #ef4444, #f97316)";
        }
        
        // Disable cards that exceed remaining fuel (only if not already selected)
        missionCards.forEach(card => {
            const id = card.getAttribute("data-mission");
            const reqFuel = missionDatabase[id].fuel;
            if (!selectedMissions.has(id) && reqFuel > remaining) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }
        });

        // Telemetry readouts
        teleAllocated.innerText = `${allocatedFuel.toLocaleString()} lbs`;
        teleRemaining.innerText = `${remaining.toLocaleString()} lbs`;
        
        // Determine aggregated priority and calculated success probabilities
        if (selectedMissions.size === 0) {
            telePriority.innerText = "N/A";
            teleSuccess.innerText = "0%";
            return;
        }

        let maxPriority = "Medium";
        let successSum = 0;
        
        selectedMissions.forEach(mid => {
            const mission = missionDatabase[mid];
            if (mission.priority === "Critical") maxPriority = "Critical";
            else if (mission.priority === "High" && maxPriority !== "Critical") maxPriority = "High";
            
            successSum += mission.successProb;
        });

        telePriority.innerText = maxPriority;
        
        const avgSuccess = Math.round(successSum / selectedMissions.size);
        
        if (simMode === "traditional") {
            teleSuccess.innerText = "EST. OK (LOW VIS)";
            teleSuccess.style.color = "#eab308";
        } else {
            teleSuccess.innerText = `${avgSuccess}%`;
            if (avgSuccess > 80) teleSuccess.style.color = "#22c55e";
            else if (avgSuccess > 50) teleSuccess.style.color = "#eab308";
            else teleSuccess.style.color = "#ef4444";
        }
    }

    simModeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            simModeBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            simMode = btn.getAttribute("data-mode");
            
            // Update cards visuals based on mode
            missionCards.forEach(card => {
                const id = card.getAttribute("data-mission");
                const m = missionDatabase[id];
                const riskSpan = card.querySelector(".mission-risk-span");
                
                if (simMode === "traditional") {
                    riskSpan.innerText = `Risk: ${m.traditionalRisk}`;
                    riskSpan.style.color = "#94a3b8";
                } else {
                    riskSpan.innerText = `Risk: ${m.dataRisk} (${m.successProb}% Prob)`;
                    if (m.dataRisk === "LOW") riskSpan.style.color = "#22c55e";
                    else if (m.dataRisk === "MEDIUM") riskSpan.style.color = "#eab308";
                    else riskSpan.style.color = "#ef4444";
                }
            });
            
            updateSimUI();
            
            outputConsole.innerHTML += `<div class="sim-output-line system">> TOGGLED COMMAND ANALYSIS MODE: ${simMode.toUpperCase()}</div>`;
            outputConsole.scrollTop = outputConsole.scrollHeight;
        });
    });

    missionCards.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.getAttribute("data-mission");
            const reqFuel = missionDatabase[id].fuel;

            if (selectedMissions.has(id)) {
                selectedMissions.delete(id);
                allocatedFuel -= reqFuel;
                card.classList.remove("selected");
            } else {
                if (allocatedFuel + reqFuel <= totalFuel) {
                    selectedMissions.add(id);
                    allocatedFuel += reqFuel;
                    card.classList.add("selected");
                } else {
                    outputConsole.innerHTML += `<div class="sim-output-line fail">> INSUFFICIENT FUEL FOR SELECTION: ${missionDatabase[id].name}</div>`;
                    outputConsole.scrollTop = outputConsole.scrollHeight;
                }
            }
            updateSimUI();
        });
    });

    if (btnExecute) {
        btnExecute.addEventListener("click", () => {
            if (selectedMissions.size === 0) {
                outputConsole.innerHTML += `<div class="sim-output-line fail">> RUNTIME WARNING: NO SORTIES SELECTED. DEFENSE GAP IN SECTOR.</div>`;
                outputConsole.scrollTop = outputConsole.scrollHeight;
                return;
            }

            outputConsole.innerHTML = `<div class="sim-output-line system">> SORTIES LAUNCHED. COMBAT DIRECTION NET ACTIVE...</div>`;
            btnExecute.disabled = true;

            let logLines = [];
            
            selectedMissions.forEach(mid => {
                const mission = missionDatabase[mid];
                logLines.push({ type: "system", text: `> Deploying ${mission.name}...` });
                logLines.push({ type: "system", text: `> Running telemetry checks. Consuming ${mission.fuel.toLocaleString()} lbs fuel...` });
                
                if (simMode === "traditional") {
                    // Random factors apply directly
                    const roll = Math.random() * 100;
                    // Lower success rates in traditional due to poor route/weather planning
                    if (roll < (mission.successProb - 25)) {
                        logLines.push({ type: "success", text: `> SUCCESS: ${mission.name} completed mission objectives. Jet returned.` });
                    } else {
                        logLines.push({ type: "fail", text: `> FAILURE: ${mission.name} encountered unexpected variables (Weather/Threats). Sortie aborted.` });
                    }
                } else {
                    // Higher success probability due to optimized execution
                    const roll = Math.random() * 100;
                    if (roll < mission.successProb) {
                        logLines.push({ type: "success", text: `> SUCCESS: ${mission.name} completed successfully. Telemetry reports engine thermal values nominal.` });
                    } else {
                        // Rare fail cases
                        logLines.push({ type: "fail", text: `> FAILURE: ${mission.name} failed due to combat action. Backup routes engaged.` });
                    }
                }
            });

            // Stagger print output log
            logLines.forEach((line, index) => {
                setTimeout(() => {
                    const div = document.createElement("div");
                    div.className = `sim-output-line ${line.type}`;
                    div.innerText = line.text;
                    outputConsole.appendChild(div);
                    outputConsole.scrollTop = outputConsole.scrollHeight;
                    
                    if (index === logLines.length - 1) {
                        btnExecute.disabled = false;
                        outputConsole.innerHTML += `<div class="sim-output-line system">> AAR COMPLETE. STAGE RESTORED.</div>`;
                        outputConsole.scrollTop = outputConsole.scrollHeight;
                    }
                }, index * 400);
            });
        });
    }


    // --- Slide 16: Discussion Exercise cards ---
    const discussionCards = document.querySelectorAll(".discussion-card");
    discussionCards.forEach(card => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    // --- Export Presentation Controls ---
    const downloadToggle = document.getElementById("download-toggle");
    const downloadClose = document.getElementById("download-close");
    const downloadModal = document.getElementById("download-modal");
    const btnExportPDF = document.getElementById("btn-export-pdf");
    const btnExportPPTX = document.getElementById("btn-export-pptx");

    if (downloadToggle) {
        downloadToggle.addEventListener("click", () => {
            downloadModal.classList.add("active");
        });
    }

    if (downloadClose) {
        downloadClose.addEventListener("click", () => {
            downloadModal.classList.remove("active");
        });
    }

    if (btnExportPDF) {
        btnExportPDF.addEventListener("click", () => {
            downloadModal.classList.remove("active");
            // Direct native print-to-pdf loader
            window.print();
        });
    }

    // PPTX Generator Slides Data
    const slidesData = [
        {
            title: "Data-Driven Leadership in Modern Aviation",
            subtitle: "Understanding Why Data Matters in Modern Aviation Management\nExecutive Analytics Programme",
            bullets: [
                "Presented by NAF Analytics Division",
                "Classification: Restricted Command Briefing",
                "\"Modern aviation superiority depends not only on aircraft and pilots, but also on the quality of decisions powered by data.\""
            ],
            isDark: true
        },
        {
            title: "Learning Objectives",
            subtitle: "By the end of today's session, participants will be able to:",
            bullets: [
                "Explain why data is a strategic asset in aviation.",
                "Differentiate Data, Information, and Intelligence.",
                "Understand the impact of the Fourth Industrial Revolution.",
                "Recognize how leading air forces use data.",
                "Appreciate the role of analytics in executive decision-making."
            ],
            isDark: false
        },
        {
            title: "The Fourth Industrial Revolution (4IR)",
            subtitle: "Aviation systems generate millions of data points daily.",
            bullets: [
                "1st Revolution: Steam Power & Mechanization",
                "2nd Revolution: Electricity & Mass Production",
                "3rd Revolution: Computers & Automation",
                "4th Revolution: Artificial Intelligence, Big Data, Cloud, IoT, Drones",
                "Success now depends on turning those data points into decisions."
            ],
            isDark: false
        },
        {
            title: "Why Data Matters in Modern Aviation",
            subtitle: "Without analytics, aviation data remains unused.",
            bullets: [
                "Data generated from: Aircraft sensors, Flight operations, Weather, Fuel, Maintenance, Personnel, Logistics, Safety",
                "Analytics improves: Safety, Readiness, Efficiency, Cost management, Mission success"
            ],
            isDark: false
        },
        {
            title: "What is Data Science?",
            subtitle: "Data Science supports better decisions.",
            bullets: [
                "Combines: Data, Technology, Statistics, Domain Knowledge, AI",
                "For Executives: You don't need to build the models—you need to understand the insights they produce."
            ],
            isDark: false
        },
        {
            title: "Data is the New Oil",
            subtitle: "Raw crude oil cannot power an aircraft, and raw data has little value.",
            bullets: [
                "Oil Path: Crude Oil -> Refinery -> Aviation Fuel -> Aircraft",
                "Data Path: Raw Data -> Cleaning -> Analysis -> Dashboard -> Decision",
                "Data becomes valuable only when refined into insight."
            ],
            isDark: false
        },
        {
            title: "Data vs Information vs Intelligence",
            subtitle: "Command example of helicopter fuel levels:",
            bullets: [
                "Data (Raw facts): Fuel Level = 5,000 lbs",
                "Information (Organized meaning): Helicopter has 5,000 lbs remaining",
                "Intelligence (Actionable insight): Aircraft can safely reach base with 45-min reserve, accounting for weather."
            ],
            isDark: false
        },
        {
            title: "From Data to Better Decisions",
            subtitle: "Data follows a structured journey:",
            bullets: [
                "Data Journey: Raw Data -> Information -> Analysis -> Intelligence -> Decision -> Operational Success",
                "Poor data leads to poor decisions. Good data leads to confident leadership."
            ],
            isDark: false
        },
        {
            title: "The Formula 1 Pit Crew Analogy",
            subtitle: "A driver focuses on driving. A Squadron Commander is like a Pit Manager.",
            bullets: [
                "F1 Analysts monitor: Tire pressure, fuel, brake temperature, weather, strategy.",
                "The driver wins because of both experience and live telemetry.",
                "Squadron Command cells monitor aircraft telemetry to guide sorties."
            ],
            isDark: false
        },
        {
            title: "How Leading Air Forces Use Data",
            subtitle: "Data enables proactive rather than reactive operations.",
            bullets: [
                "Predict aircraft failures before they occur to minimize depot downtime.",
                "Optimize maintenance schedules and spare parts logistics.",
                "Monitor fuel consumption, pilot readiness, and weather risk factors.",
                "Enhance mission planning and preemptively detect safety risks."
            ],
            isDark: false
        },
        {
            title: "The Analytics Continuum",
            subtitle: "Organizations mature through four stages to increase decision quality:",
            bullets: [
                "Descriptive: 'What happened?' (e.g. monthly flight hours)",
                "Diagnostic: 'Why did it happen?' (e.g. why fleet availability dropped)",
                "Predictive: 'What is likely to happen?' (e.g. forecast turbine failure)",
                "Prescriptive: 'What should we do?' (e.g. recommend postpone flight)"
            ],
            isDark: false
        },
        {
            title: "The Four Types of Analytics",
            subtitle: "Commanders must deploy both historical and future-focused analytics styles:",
            bullets: [
                "Descriptive: Monthly flight hours log.",
                "Diagnostic: Discovering why aircraft availability fell in June.",
                "Predictive: Real-time turbine fatigue modeling.",
                "Prescriptive: Automated routing around bad weather."
            ],
            isDark: false
        },
        {
            title: "Why Data-Driven Leaders Perform Better",
            subtitle: "Data makes command experience more effective.",
            bullets: [
                "Reduces uncertainty in planning, improving strategic margins.",
                "Allocates fuel, resources, and squadron capabilities efficiently.",
                "Improves flight safety and speeds response times during alerts.",
                "Builds trust and accountability through objective analytics evidence."
            ],
            isDark: false
        },
        {
            title: "The Cost of Poor Data Literacy",
            subtitle: "Operating without data capabilities introduces severe command risks:",
            bullets: [
                "Decisions become guesswork, leading to wasted resources.",
                "Safety risks increase and structural failures are discovered too late.",
                "Fleet readiness suffers due to lack of transparent command views."
            ],
            isDark: false
        },
        {
            title: "Case Study: Fuel Shortage Scenario",
            subtitle: "Command decision with fuel for only 1 of 3 missions:",
            bullets: [
                "Considerations: Mission priority, readiness, efficiency, weather, pilot, threat.",
                "Traditional Mode: Relies on assumptions, creating high failure risks.",
                "Data-Driven Mode: Integrates sensor feeds to choose the optimal sortie."
            ],
            isDark: false
        },
        {
            title: "Discussion Exercise",
            subtitle: "Commander Workshop Questions:",
            bullets: [
                "1. Recall an operational decision based mainly on experience. What was the outcome?",
                "2. What data (engine logs, fuel wear, weather) could have improved that decision?",
                "3. What dashboard metrics would you have wanted to see?"
            ],
            isDark: false
        },
        {
            title: "Key Takeaways",
            subtitle: "Today's lessons for NAF Leaders:",
            bullets: [
                "Data is a strategic asset that must be refined into intelligence.",
                "Analytics tools support—not replace—leadership intuition.",
                "Data literacy is now a mandatory leadership competency.",
                "\"Better Data -> Better Decisions -> Better Missions.\""
            ],
            isDark: true
        }
    ];

    function exportBriefingToPPTX() {
        let pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';

        slidesData.forEach((s) => {
            let slide = pptx.addSlide();
            
            if (s.isDark) {
                // Cover & End slide style - Navy Background
                slide.background = { color: '010F40' };
                
                // NAF Top Accent Bar
                slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 0.15, fill: { color: '00C7EB' } });
                
                // Add Title
                slide.addText(s.title, {
                    x: 0.8, y: 1.4, w: 11.5, h: 1.4,
                    fontSize: 34, color: 'FFFFFF', bold: true, fontFace: 'Arial'
                });
                
                // Add Subtitle
                slide.addText(s.subtitle, {
                    x: 0.8, y: 2.8, w: 11.5, h: 1.0,
                    fontSize: 16, color: '94A3B8', fontFace: 'Arial'
                });
                
                // Add Bullets
                let bulletY = 4.0;
                s.bullets.forEach((b) => {
                    slide.addText(b, {
                        x: 0.8, y: bulletY, w: 11.5, h: 0.6,
                        fontSize: 13, color: '00C7EB', fontFace: 'Arial', italic: b.startsWith('"')
                    });
                    bulletY += 0.7;
                });
            } else {
                // Content slide style - Light Background
                slide.background = { color: 'F4F7FC' };
                
                // Sidebar Structural Line
                slide.addShape(pptx.ShapeType.rect, { x: 0.5, y: 0.4, w: 0.08, h: 5.4, fill: { color: '010F40' } });
                
                // Slide Topic (Header indicator)
                slide.addText('NAF BRIEFING', {
                    x: 0.8, y: 0.4, w: 11.0, h: 0.3,
                    fontSize: 9, color: '226FF8', bold: true, fontFace: 'Arial', letterSpacing: 1.5
                });
                
                // Add Title
                slide.addText(s.title, {
                    x: 0.8, y: 0.7, w: 11.0, h: 0.8,
                    fontSize: 26, color: '010F40', bold: true, fontFace: 'Arial'
                });
                
                // Add Subtitle
                slide.addText(s.subtitle, {
                    x: 0.8, y: 1.6, w: 11.0, h: 0.5,
                    fontSize: 13, color: '475569', italic: true, fontFace: 'Arial'
                });
                
                // Add Bullets as PowerPoint bullet text block
                let bulletTexts = s.bullets.map(b => {
                    return { text: b, options: { fontSize: 13, color: '0F172A', fontFace: 'Arial', bullet: true, margin: [0, 0, 10, 0] } };
                });
                
                slide.addText(bulletTexts, {
                    x: 0.8, y: 2.2, w: 11.0, h: 3.5,
                    lineSpacing: 22
                });
            }
        });

        pptx.writeFile({ fileName: 'NAF_Data_Driven_Leadership.pptx' });
    }

    if (btnExportPPTX) {
        btnExportPPTX.addEventListener("click", () => {
            downloadModal.classList.remove("active");
            exportBriefingToPPTX();
        });
    }

    // Keyboard controls update to toggle download menu on 'd' or 'D'
    document.addEventListener("keydown", (e) => {
        if (e.key === "d" || e.key === "D") {
            e.preventDefault();
            downloadModal.classList.toggle("active");
        } else if (e.key === "Escape") {
            downloadModal.classList.remove("active");
        }
    });

    // Bootstrap variables on startup
    initPresentation();
});
