/**
 * Core Application Logic for SPA Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current application state
    let currentSession = 1;
    const totalSessions = Object.keys(window.sessionsData).length;

    // DOM Elements
    const sessionContentArea = document.getElementById('sessionContentArea');
    const navLinks = document.querySelectorAll('.nav-link');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const toggleDataBtn = document.getElementById('toggleDataBtn');
    const tableContainer = document.getElementById('dataTableContainer');
    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');

    // Sidebar DOM Element (Mobile)
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    // Initial render of the Data Table (from data.js)
    if (typeof renderTable === 'function') {
        renderTable();
    }

    /**
     * Renders specific session into viewing area
     * @param {number} sessionNumber 
     */
    function loadSession(sessionNumber) {
        if (!window.sessionsData[sessionNumber]) return;

        if (typeof resetData === 'function') {
            resetData();
        }

        const sessionObj = window.sessionsData[sessionNumber];

        // Manage global data preview section visibility (Always show to allow dataset download)
        const globalDataPreview = document.getElementById('dataPreviewSection');
        if (globalDataPreview) {
            globalDataPreview.style.display = 'block';
            
            // Update Title and Download Link for Capstone
            const sectionTitle = globalDataPreview.querySelector('h4');
            const downloadBtn = globalDataPreview.querySelector('.btn-outline');
            
            if (sessionNumber === 8) {
                if (sectionTitle) sectionTitle.innerHTML = `<i class="ri-database-line"></i> Capstone Dataset Overview`;
                if (downloadBtn) {
                    downloadBtn.href = "Excel_Capstone_Data.xlsx";
                    downloadBtn.innerHTML = `<i class="ri-download-line"></i> Download Capstone Dataset`;
                }
            } else {
                if (sectionTitle) sectionTitle.innerHTML = `<i class="ri-database-line"></i> Sample Dataset Overview`;
                if (downloadBtn) {
                    downloadBtn.href = "training_dataset.csv";
                    downloadBtn.innerHTML = `<i class="ri-download-line"></i> Download Dataset`;
                }
            }
        }

        // Ensure smooth fade in animation triggers
        sessionContentArea.style.animation = 'none';
        sessionContentArea.offsetHeight; // trigger reflow
        sessionContentArea.style.animation = null;

        // Inject HTML
        let html = sessionObj.html;

        // Only add quiz invitation if it's not Session 8 (Capstone)
        if (sessionNumber !== 8) {
            html += `
                <div class="quiz-invitation">
                    <h4>Ready to test your knowledge?</h4>
                    <p>Take a quick quiz for Session ${sessionNumber} to see how much you've learned.</p>
                    <a href="../JCI/quiz.html?session=${sessionNumber}" class="btn-action btn-success">
                        <i class="ri-questionnaire-line"></i> Take Session ${sessionNumber} Quiz
                    </a>
                </div>
            `;
        }

        sessionContentArea.innerHTML = html;

        // Initialize specific interactive logic for that session
        if (typeof sessionObj.initLogic === 'function') {
            // Need a slight delay to ensure DOM is fully ready
            setTimeout(() => {
                sessionObj.initLogic();
            }, 50);
        }

        updateNavigationUI(sessionNumber);
        
        // Scroll to top of content on mobile specifically
        if (window.innerWidth <= 900) {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    }

    /**
     * Updates Sidebar links and Next/Prev button statuses
     */
    function updateNavigationUI(sessionNumber) {
        currentSession = sessionNumber;

        // Progress text and bar
        progressText.textContent = `Session ${currentSession} of ${totalSessions}`;
        const pct = (currentSession / totalSessions) * 100;
        progressBar.style.width = `${pct}%`;

        // Update Active Nav Link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.getAttribute('data-session')) === currentSession) {
                link.classList.add('active');
            }
        });

        // Update Buttons
        prevBtn.disabled = currentSession <= 1;
        
        if (currentSession >= totalSessions) {
            nextBtn.innerHTML = `Complete <i class="ri-check-line"></i>`;
            nextBtn.classList.remove('btn-outline');
            nextBtn.classList.add('btn-success');
        } else {
            nextBtn.innerHTML = `Next <i class="ri-arrow-right-s-line"></i>`;
            nextBtn.classList.remove('btn-success');
        }
    }

    // Toggle Data Visibility
    toggleDataBtn.addEventListener('click', () => {
        tableContainer.classList.toggle('hidden');
        if (tableContainer.classList.contains('hidden')) {
            toggleDataBtn.innerHTML = `<i class="ri-eye-line"></i> Show Data`;
        } else {
            toggleDataBtn.innerHTML = `<i class="ri-eye-off-line"></i> Hide Data`;
        }
    });

    // Sidebar link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const session = parseInt(e.currentTarget.getAttribute('data-session'));
            loadSession(session);
            closeMobileSidebar();
        });
    });

    // Next/Prev buttons
    prevBtn.addEventListener('click', () => {
        if (currentSession > 1) {
            loadSession(currentSession - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSession < totalSessions) {
            loadSession(currentSession + 1);
        } else {
            alert("Congratulations! You've reached the end of the tutorial.");
        }
    });

    // Responsive Sidebar Toggles
    function openMobileSidebar() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // stop page scroll
    }

    function closeMobileSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggleSidebarBtn) {
        toggleSidebarBtn.addEventListener('click', openMobileSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeMobileSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }

    // Attach to global window to allow cross-file access (like data.js functions needing highlight)
    // Setup a mini observer or util block for global use
    window.highlightRows = typeof highlightRows === 'function' ? highlightRows : () => {};
    window.highlightColumn = typeof highlightColumn === 'function' ? highlightColumn : () => {};

    // Initial Load
    loadSession(1);
});
