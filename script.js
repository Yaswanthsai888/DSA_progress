<script>
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
            });
        }

        if (noteValues) {
            document.querySelectorAll('textarea.note').forEach((textarea, index) => {
                textarea.value = noteValues[index] || '';
            });
        }
    }

    // Reset progress and restart from week one
    document.getElementById('reset-button').addEventListener('click', function() {
        // Code to reset progress and restart from week one
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.querySelectorAll('textarea.note').forEach(textarea => textarea.value = '');
        document.querySelectorAll('.week').forEach(week => week.classList.add('hidden'));
        document.querySelectorAll('h2').forEach(header => header.classList.add('hidden'));
        document.getElementById('week1-header').classList.remove('hidden');
        document.querySelector('.week1').classList.remove('hidden');

        // Save the reset state
        saveState();
    });

    // Load the saved state when the page loads
    window.addEventListener('load', loadState);

    // Save state when user leaves the page
    window.addEventListener('beforeunload', saveState);
</script>
