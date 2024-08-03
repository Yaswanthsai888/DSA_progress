const totalSeconds = 178 * 24 * 60 * 60; // Convert days to seconds
const countdownElement = document.getElementById('countdown');
const resetButton = document.getElementById('resetButton');

function updateCountdown() {
    const startDate = new Date(localStorage.getItem('startDate') || new Date().toISOString());
    const now = new Date();
    const elapsedSeconds = Math.floor((now - new Date(startDate)) / 1000);
    let totalSecondsRemaining = totalSeconds - elapsedSeconds;

    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(totalSecondsRemaining / (24 * 60 * 60));
    const hours = Math.floor((totalSecondsRemaining % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSecondsRemaining % (60 * 60)) / 60);
    const seconds = totalSecondsRemaining % 60;

    // Update the countdown elements
    document.getElementById('days').textContent = String(days).padStart(3, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Check if countdown is finished
    if (totalSecondsRemaining > 0) {
        // Save start date to localStorage
        localStorage.setItem('startDate', startDate.toISOString());
        setTimeout(updateCountdown, 1000); // Update every second
    } else {
        // Clear localStorage when countdown finishes
        localStorage.removeItem('startDate');
    }
}

// Reset button functionality
resetButton.addEventListener('click', () => {
    localStorage.setItem('startDate', new Date().toISOString());
    updateCountdown();
});

// Initial call to start countdown
updateCountdown();


// Save state to local storage
function saveState() {
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    const notes = Array.from(document.querySelectorAll('textarea.note'));

    // Save checkbox states
    const checkboxStates = checkboxes.map(cb => cb.checked);
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));

    // Save notes values
    const noteValues = notes.map(note => note.value);
    localStorage.setItem('noteValues', JSON.stringify(noteValues));
}

// Load state from local storage
function loadState() {
    const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
    const noteValues = JSON.parse(localStorage.getItem('noteValues'));

    if (checkboxStates) {
        document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
            checkbox.checked = checkboxStates[index] || false;
            // Update visual state
            if (checkbox.checked) {
                checkbox.parentElement.style.textDecoration = 'line-through';
            } else {
                checkbox.parentElement.style.textDecoration = 'none';
            }
        });
    }

    if (noteValues) {
        document.querySelectorAll('textarea.note').forEach((textarea, index) => {
            textarea.value = noteValues[index] || '';
        });
    }
}

// Check the completion of weeks
function checkWeekCompletion() {
    const weeks = [
        { header: 'week2-header', list: 'week2', note: 'week2-note' },
        { header: 'week3-header', list: 'week3', note: 'week3-note' },
        { header: 'week4-header', list: 'week4', note: 'week4-note' },
        { header: 'week5-header', list: 'week5', note: 'week5-note' },
        { header: 'week6-header', list: 'week6', note: 'week6-note' },
        { header: 'week7-header', list: 'week7', note: 'week7-note' },
        { header: 'week8-header', list: 'week8', note: 'week8-note' },
        { header: 'week9-header', list: 'week9', note: 'week9-note' }
    ];

    weeks.forEach((week, index) => {
        const previousWeekTasks = document.querySelectorAll(`.week${index + 1} .task`);
        const isPreviousWeekComplete = Array.from(previousWeekTasks).every(task => task.checked);

        if (isPreviousWeekComplete) {
            document.getElementById(week.header).classList.remove('hidden');
            document.querySelector(`.${week.list}`).classList.remove('hidden');
            document.getElementById(week.note).classList.remove('hidden');
        }
    });
}

// Handle checkbox change events
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Update visual state
        if (this.checked) {
            this.parentElement.style.textDecoration = 'line-through';
        } else {
            this.parentElement.style.textDecoration = 'none';
        }
        // Save the state to local storage
        saveState();
        // Check week completion
        checkWeekCompletion();
    });
});

// Handle note input events
document.querySelectorAll('textarea.note').forEach(textarea => {
    textarea.addEventListener('input', function() {
        // Save the state to local storage
        saveState();
    });
});

// Reset button functionality
document.getElementById('resetButton').addEventListener('click', function() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.parentElement.style.textDecoration = 'none';
    });
    document.querySelectorAll('textarea.note').forEach(textarea => textarea.value = '');
    document.querySelectorAll('.week').forEach(week => week.classList.add('hidden'));
    document.querySelectorAll('h2').forEach(header => header.classList.add('hidden'));
    document.getElementById('week1-header').classList.remove('hidden');
    document.querySelector('.week1').classList.remove('hidden');

    // Clear local storage
    localStorage.removeItem('checkboxStates');
    localStorage.removeItem('noteValues');
});

// Load the saved state when the page loads
window.addEventListener('load', function() {
    loadState();
    checkWeekCompletion();
});

// Save the state when the user leaves the page
window.addEventListener('beforeunload', saveState);

document.addEventListener('DOMContentLoaded', (event) => {
    const openButton = document.getElementById('open-timetable-button');
    const modal = document.getElementById('timetable-modal');
    const closeButton = modal.querySelector('.close');

    openButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    updateProgress();

    document.getElementById('save-button').addEventListener('click', () => {
        saveProgress();
        updateProgress();
    });

    document.getElementById('reset-button').addEventListener('click', () => {
        resetProgress();
        updateProgress();
    });
});

function saveProgress() {
    document.querySelectorAll('.task').forEach(task => {
        localStorage.setItem(task.id, task.checked);
    });
    document.querySelectorAll('.note').forEach(note => {
        localStorage.setItem(note.id, note.value);
    });
    alert('Progress saved!');
}

function loadProgress() {
    document.querySelectorAll('.task').forEach(task => {
        task.checked = localStorage.getItem(task.id) === 'true';
    });
    document.querySelectorAll('.note').forEach(note => {
        note.value = localStorage.getItem(note.id) || '';
    });
}

function resetProgress() {
    document.querySelectorAll('.task').forEach(task => task.checked = false);
    document.querySelectorAll('.note').forEach(note => note.value = '');
    localStorage.clear();
    alert('Progress reset!');
}

function updateProgress() {
    updateWeeklyProgress('week1');
    updateWeeklyProgress('week2');
    updateOverallProgress();
}

function updateWeeklyProgress(weekId) {
    const weekTasks = document.querySelectorAll(`#${weekId} .task`);
    const completedTasks = Array.from(weekTasks).filter(task => task.checked).length;
    const totalTasks = weekTasks.length;
    const progressPercentage = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById(`${weekId}-progress`);
    const progressText = document.getElementById(`${weekId}-progress-text`);

    progressBar.style.width = `${progressPercentage}%`;
    progressText.textContent = `${weekId.replace('week', 'Week ')} Progress: ${Math.round(progressPercentage)}%`;
}

function updateOverallProgress() {
    const allTasks = document.querySelectorAll('.task');
    const completedTasks = Array.from(allTasks).filter(task => task.checked).length;
    const totalTasks = allTasks.length;
    const overallPercentage = (completedTasks / totalTasks) * 100;
    const overallProgressBar = document.getElementById('overall-progress');
    const overallProgressText = document.getElementById('overall-progress-text');

    overallProgressBar.style.width = `${overallPercentage}%`;
    overallProgressText.textContent = `Overall Progress: ${Math.round(overallPercentage)}%`;
}


