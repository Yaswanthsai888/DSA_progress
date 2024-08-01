<script>
    // Function to save the state of checkboxes and notes to local storage
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

    // Function to load the state from local storage
    function loadState() {
        const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));
        const noteValues = JSON.parse(localStorage.getItem('noteValues'));

        if (checkboxStates) {
            document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
                checkbox.checked = checkboxStates[index] || false;
                // Update the visual state
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

    // Function to check the completion of weeks and reveal the next ones
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
</script>
