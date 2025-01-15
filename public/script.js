class TodoList {
  constructor() {
    // Initialize the todo list and other DOM elements
    this.todos = [];
    this.loadTodos(); // Load todos from the server
    this.setupEventListeners(); // Set up form and other event listeners
  }

  // Load todos from the API and render them
  async loadTodos() {
    showLoading();
    try {
      const response = await fetch("/api/todos"); // Fetch todos from the server
      this.todos = await response.json(); // Parse the response into JSON format
      this.renderTodos(); // Render the todos on the page
    } catch (error) {
      console.error("Error loading todos:", error); // Log errors, if any
    } finally {
      hideLoading();
    }
  }

  // Add a new todo item
  async addTodo(text) {
    try {
      const response = await fetch("/api/todos", {
        method: "POST", // Send a POST request to add a new todo
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({ text }), // Send the new todo's text
      });
      const newTodo = await response.json(); // Parse the response into JSON
      this.todos.unshift(newTodo); // Add the new todo to the beginning of the list
      this.renderTodos(); // Re-render the todos
    } catch (error) {
      console.error("Error adding todo:", error); // Log errors, if any
    }
  }

  // Toggle the completed status of a todo
  async toggleTodo(id, completed) {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT", // Send a PUT request to update the todo
        headers: {
          "Content-Type": "application/json", // Specify JSON content type
        },
        body: JSON.stringify({ completed }), // Send the updated completed status
      });
      const updatedTodo = await response.json(); // Parse the response into JSON
      // Update the todo in the local array
      this.todos = this.todos.map((todo) =>
        todo._id === id ? updatedTodo : todo
      );
      this.renderTodos(); // Re-render the todos
    } catch (error) {
      console.error("Error updating todo:", error); // Log errors, if any
    }
  }

  // Delete a todo item
  async deleteTodo(id) {
    try {
      await fetch(`/api/todos/${id}`, {
        method: "DELETE", // Send a DELETE request to remove the todo
      });
      // Remove the deleted todo from the local array
      this.todos = this.todos.filter((todo) => todo._id !== id);
      this.renderTodos(); // Re-render the todos
    } catch (error) {
      console.error("Error deleting todo:", error); // Log errors, if any
    }
  }

  // Render the todos on the page
  renderTodos() {
    const todoList = document.getElementById("todoList"); // Get the todo list container
    todoList.innerHTML = this.todos
      .map(
        (todo) => `
                <li class="todo-item ${todo.completed ? "completed" : ""}">
                    <input type="checkbox" 
                           ${todo.completed ? "checked" : ""} 
                           onchange="todoList.toggleTodo('${
                             todo._id
                           }', this.checked)">
                    <span>${todo.text}</span>
                    <button onclick="todoList.deleteTodo('${
                      todo._id
                    }')">Delete</button>
                </li>
            `
      )
      .join(""); // Generate HTML for each todo
  }

  // Set up event listeners for the form
  setupEventListeners() {
    const form = document.getElementById("todoForm"); // Get the form element
    form.onsubmit = (e) => {
      e.preventDefault(); // Prevent the default form submission
      const input = document.getElementById("todoInput"); // Get the input element
      if (input.value.trim()) {
        // Ensure the input is not empty
        this.addTodo(input.value.trim()); // Add a new todo
        input.value = ""; // Clear the input field
      }
    };
  }
}

// Initialize the todo list when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.todoList = new TodoList(); // Create a new TodoList instance
});
function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(async (position) => {
  try {
    const res = await fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    );
    if (!res.ok) {
      throw Error("Weather data not available");
    }
    const data = await res.json();
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("weather").innerHTML = `
              <img src=${iconUrl} />
              <p class="weather-temp">${Math.round(data.main.temp)}º</p>
              <p class="weather-city">${data.name}</p>
          `;
  } catch (err) {
    console.error(err);
  }
});

function showLoading() {
  document.querySelector(".loading-container").style.display = "flex";
}

function hideLoading() {
  document.querySelector(".loading-container").style.display = "none";
}
