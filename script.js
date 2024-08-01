document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    const weeks = [
        { header: 'week2-header', list: 'week2', note: 'week2-note' },
        { header: 'week3-header', list: 'week3', note: 'week3-note' },
        // Add more weeks as needed
        { header: 'week13-header', list: 'week13', note: 'week13-note' }
    ];

    tasks.forEach(task => {
        task.addEventListener('change', () => {
            if (task.checked) {
                task.parentElement.style.textDecoration = 'line-through';
            } else {
                task.parentElement.style.textDecoration = 'none';
            }

            checkWeekCompletion();
        });
    });

    function checkWeekCompletion() {
        weeks.forEach((week, index) => {
            const previousWeek = index === 0 ? document.querySelectorAll('.week1 .task') : document.querySelectorAll(`.week${index} .task`);
            const isPreviousWeekComplete = Array.from(previousWeek).every(task => task.checked);
            
            if (isPreviousWeekComplete) {
                document.getElementById(week.header).classList.remove('hidden');
                document.querySelector(`.${week.list}`).classList.remove('hidden');
                document.getElementById(week.note).classList.remove('hidden');
            }
        });
    }

    // Initial check to show week 2 if week 1 is already completed
    checkWeekCompletion();
});
