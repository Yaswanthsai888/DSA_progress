document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.task');
    
    tasks.forEach(task => {
        task.addEventListener('change', () => {
            if (task.checked) {
                task.parentElement.style.textDecoration = 'line-through';
            } else {
                task.parentElement.style.textDecoration = 'none';
            }
        });
    });
});
