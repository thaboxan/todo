

class TodoList {
    constructor() {
        this.todos = [];
        this.loadTodos();
        this.setupEventListeners();
    }

    async loadTodos() {
        try {
            const response = await fetch('/api/todos');            class TodoList {
                constructor() {
                    if (TodoList.instance) {
                        return TodoList.instance;
                    }
                    TodoList.instance = this;
                    
                    this.todos = [];
                    this.form = document.getElementById('todoForm');                    class TodoList {
                        constructor() {
                            if (TodoList.instance) {
                                return TodoList.instance;
                            }
                            TodoList.instance = this;
                            
                            this.todos = [];
                            this.form = document.getElementById('todoForm');
                            this.input = document.getElementById('todoInput');
                            this.list = document.getElementById('todoList');
                            this.timeDisplay = document.getElementById('timeDisplay');
                            
                            this.loadTodos();
                            this.setupEventListeners();
                            this.startClock();
                        }
                    
                        startClock() {
                            const updateTime = () => {
                                const now = new Date();
                                const timeString = now.toLocaleTimeString('en-US', { 
                                    hour: '2-digit', 
                                    minute: '2-digit',
                                    second: '2-digit'
                                });
                                this.timeDisplay.textContent = timeString;
                            };
                            
                            updateTime();
                            setInterval(updateTime, 1000);
                        }
                    
                        // ...existing code...
                    }
                    this.input = document.getElementById('todoInput');
                    this.list = document.getElementById('todoList');
                    
                    this.loadTodos();
                    this.setupEventListeners();
                }
            
                setupEventListeners() {
                    // Remove existing listeners first
                    this.form.replaceWith(this.form.cloneNode(true));
                    this.form = document.getElementById('todoForm');
                    
                    this.form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        const text = this.input.value.trim();
                        if (text) {
                            this.addTodo(text);
                            this.input.value = '';
                        }
                    });
                }
            
                // ...existing code...
            }
            
            // Single initialization
            window.todoList = window.todoList || new TodoList();
            this.todos = await response.json();
            this.renderTodos();
        } catch (error) {
            console.error('Error loading todos:', error);
        }
    }

    async addTodo(text) {
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            const newTodo = await response.json();
            this.todos.unshift(newTodo);
            this.renderTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodo(id, completed) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ completed })
            });
            const updatedTodo = await response.json();
            this.todos = this.todos.map(todo => 
                todo._id === id ? updatedTodo : todo
            );
            this.renderTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    async deleteTodo(id) {
        try {
            await fetch(`/api/todos/${id}`, {
                method: 'DELETE'
            });
            this.todos = this.todos.filter(todo => todo._id !== id);
            this.renderTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = this.todos
            .map(todo => `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <input type="checkbox" 
                           ${todo.completed ? 'checked' : ''} 
                           onchange="todoList.toggleTodo('${todo._id}', this.checked)">
                    <span>${todo.text}</span>
                    <button onclick="todoList.deleteTodo('${todo._id}')">Delete</button>
                </li>
            `).join('');
    }

    setupEventListeners() {
        const form = document.getElementById('todoForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            const input = document.getElementById('todoInput');
            if (input.value.trim()) {
                this.addTodo(input.value.trim());
                input.value = '';
            }
        };
    }
}

// Initialize the todo list when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.todoList = new TodoList();
});