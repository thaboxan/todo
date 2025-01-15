# Todo App

A simple Todo application built with Node.js, Express, MongoDB, and Mongoose.

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/todo-app.git

# Navigate to project directory
cd todo-app

# Install dependencies
npm install

# Create .env file
MONGODB_URI=your_mongodb_uri

# Start the server
npm start

# Project Structure
![alt text](image.png)

# API Endpoints
Get all todos
GET /api/todos

# Create a new todo
POST /api/todos

request body:
{
  "title": "New Todo",
  "description": "Todo description",
  "dueDate": "2023-12-31",
  "priority": "high"
}

Update a todo
DELETE /api/todos/:id

Architecture
The Todo app follows a simple MVC (Model-View-Controller) architecture:

Model: Defines the data structure and interacts with the database (Mongoose models).
View: The client-side code (HTML, CSS, JavaScript) that interacts with the user.
Controller: Handles the business logic and routes (Express routes).
Technologies Used
Node.js: JavaScript runtime for server-side programming.
Express: Web framework for Node.js.
MongoDB: NoSQL database for storing todos.
Mongoose: ODM for MongoDB and Node.js.
dotenv: Loads environment variables from a .env file.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Express
Mongoose
MongoDB
