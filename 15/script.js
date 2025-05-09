document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskForm = document.getElementById('task-form');
    const newTaskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const emptyState = document.getElementById('empty-state');
    const themeToggle = document.getElementById('theme-toggle');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    initTheme();

    renderTasks();

    // Event Listeners
    taskForm.addEventListener('submit', addTask);
    themeToggle.addEventListener('click', toggleTheme);

    // Functions
    function addTask(e) {
        e.preventDefault();

        const taskText = newTaskInput.value.trim();
        if (!taskText) return;

        const newTask = {
            id: Date.now().toString(),
            text: taskText,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();

        newTaskInput.value = '';
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function toggleTaskCompletion(id) {
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';

        if (tasks.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;

            taskItem.innerHTML = `
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" id="task-${task.id}" 
              ${task.completed ? 'checked' : ''}>
            <label for="task-${task.id}" class="task-text">${task.text}</label>
          </div>
          <button class="delete-btn" aria-label="Delete task">
            <i class="fas fa-trash"></i>
          </button>
        `;

            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            taskList.appendChild(taskItem);
        });
    }
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('darkTheme');

        if (savedTheme !== null) {
            if (savedTheme === 'true') {
                document.body.classList.add('dark-theme');
            }
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-theme');
            }
        }
    }
});