document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    const notes = document.querySelectorAll('.note');
    const resetButton = document.getElementById('reset-button');
    const weeks = [
        { header: 'week2-header', list: 'week2', note: 'week2-note' },
        { header: 'week3-header', list: 'week3', note: 'week3-note' },
        // Add more weeks as needed
        { header: 'week13-header', list: 'week13', note: 'week13-note' }
    ];

    // Load saved state from localStorage
    tasks.forEach(task => {
        const savedState = localStorage.getItem(task.id);
        if (savedState === 'true') {
            task.checked = true;
            task.parentElement.style.textDecoration = 'line-through';
        }

        task.addEventListener('change', () => {
            localStorage.setItem(task.id, task.checked);
            if (task.checked) {
                task.parentElement.style.textDecoration = 'line-through';
            } else {
                task.parentElement.style.textDecoration = 'none';
            }
            checkWeekCompletion();
        });
    });

    // Load saved notes from localStorage
    notes.forEach(note => {
        note.value = localStorage.getItem(note.id) || '';
        note.addEventListener('input', () => {
            localStorage.setItem(note.id, note.value);
        });
    });

    function checkWeekCompletion() {
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

    function resetProgress() {
        // Clear localStorage
        localStorage.clear();
        
        // Reset task and note states
        tasks.forEach(task => {
            task.checked = false;
            task.parentElement.style.textDecoration = 'none';
        });

        notes.forEach(note => {
            note.value = '';
        });

        // Hide week elements
        weeks.forEach(week => {
            document.getElementById(week.header).classList.add('hidden');
            document.querySelector(`.${week.list}`).classList.add('hidden');
            document.getElementById(week.note).classList.add('hidden');
        });

        // Reset to initial state (show week 1 elements if applicable)
        const initialWeekHeader = document.getElementById('week1-header');
        const initialWeekList = document.querySelector('.week1');
        const initialWeekNote = document.getElementById('week1-note');
        if (initialWeekHeader) initialWeekHeader.classList.remove('hidden');
        if (initialWeekList) initialWeekList.classList.remove('hidden');
        if (initialWeekNote) initialWeekNote.classList.remove('hidden');
    }

    // Attach reset button click event
    resetButton.addEventListener('click', resetProgress);

    // Initial check to handle visibility of week elements
    checkWeekCompletion();
});
