document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');

    window.addTask = function() {
        const taskInput = document.getElementById('new-task');
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = function() {
                li.style.textDecoration = 'line-through';
            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                taskList.removeChild(li);
            };

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
            taskInput.value = '';
        }
    };
});