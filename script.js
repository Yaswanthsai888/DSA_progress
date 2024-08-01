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
document.getElementById('reset-button').addEventListener('click', function() {
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

// Get the modal
var modal = document.getElementById("timetableModal");

// Get the button that opens the modal
var btn = document.getElementById("openTimetableBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Progress Bar Functionality
function updateProgress(progressPercentage) {
    var progressBar = document.getElementById("overall-progress");
    var progressText = document.getElementById("overall-progress-text");
    progressBar.style.width = progressPercentage + "%";
    progressText.textContent = "Overall Progress: " + progressPercentage + "%";
}

// Example usage: update the progress bar to 50%
updateProgress(50);
