// DOM Elements
const toggleBtn = document.getElementById('toggle-color-btn');
const boxes = document.querySelectorAll('.color-box');
const btnIcon = toggleBtn.querySelector('.btn-icon'); // Get the icon element
const btnText = toggleBtn.querySelector('.btn-text'); // Get the text span

// State variable
let running = false;
let timeoutId = null; // To store the timeout ID for stopping

/**
 * Generates a random hex color code.
 * @returns {string} A random hex color code (e.g., #a3b1c6).
 */
function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Changes the background color of all boxes and schedules the next change if running.
 */
function changeColors() {
    // --- Console log to check if function is entered ---
    // console.log("changeColors called, running state:", running);

    if (!running) {
        // console.log("Stopping color changes.");
        return; // Stop the loop if running is false
    }

    boxes.forEach(box => {
        box.style.backgroundColor = getRandomHexColor();
    });

    // Schedule the next color change
    timeoutId = setTimeout(changeColors, 500); // Adjust interval (milliseconds) as needed
}

/**
 * Updates the button text, icon, and styles based on the running state.
 */
function updateButtonState() {
    if (running) {
        btnText.textContent = 'Stop Colors'; // Update only the text span
        btnIcon.className = 'fas fa-stop btn-icon'; // Change icon class
        toggleBtn.classList.add('running'); // Add class for red background (CSS)
    } else {
        btnText.textContent = 'Start Colors'; // Update only the text span
        btnIcon.className = 'fas fa-play btn-icon'; // Change icon class
        toggleBtn.classList.remove('running'); // Remove class for red background
    }
}

// --- Event Listener ---

toggleBtn.addEventListener('click', function() {
    // --- Console log to check if click is registered ---
    // console.log("Button clicked!");

    running = !running; // Toggle the running state
    // --- Console log to check the new running state ---
    // console.log("Running state toggled to:", running);

    updateButtonState(); // Update button appearance

    if (running) {
        // Clear any previous timeout just in case, then start
        clearTimeout(timeoutId);
        // --- Console log before starting ---
        // console.log("Starting color changes...");
        changeColors(); // Start the color changing loop
    } else {
        // Stop the loop by clearing the scheduled timeout
        // --- Console log when stopping ---
        // console.log("Clearing timeout...");
        clearTimeout(timeoutId);
    }
});

// --- Initial Setup ---
// Optional: Update button state on load if needed based on initial `running` value
// updateButtonState();