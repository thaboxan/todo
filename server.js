// Import required modules
const express = require('express'); // Express framework for building web applications
const mongoose = require('mongoose'); // Mongoose library for MongoDB interactions
const path = require('path'); // Path module for handling and transforming file paths
require('dotenv').config(); // Load environment variables from a .env file

// Create an Express application
const app = express();
const port = 3001; // Port number for the server

// Middleware
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.static('public')); // Serve static files from the "public" directory

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI) // Connect to MongoDB using the connection string in the .env file
    .then(() => console.log('Connected to MongoDB')) // Log success message on successful connection
    .catch(err => console.error('MongoDB connection error:', err)); // Log error if connection fails

// Todo Model
// Define the schema for a todo item
const todoSchema = new mongoose.Schema({
    text: {
        type: String, // The text of the todo item
        required: true // This field is mandatory
    },
    completed: {
        type: Boolean, // Indicates if the todo is completed
        default: false // Defaults to false (not completed)
    },
    createdAt: {
        type: Date, // The date the todo was created
        default: Date.now // Defaults to the current date and time
    }
});

// Create a model for the "Todo" collection
const Todo = mongoose.model('Todo', todoSchema);

// API Routes

// GET: Fetch all todos, sorted by creation date in descending order
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 }); // Retrieve todos sorted by most recent
        res.json(todos); // Send the todos as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' }); // Send error response if fetching fails
    }
});

// POST: Add a new todo
app.post('/api/todos', async (req, res) => {
    try {
        const newTodo = new Todo({
            text: req.body.text // Get the text of the todo from the request body
        });
        const savedTodo = await newTodo.save(); // Save the new todo to the database
        res.status(201).json(savedTodo); // Send the saved todo as a JSON response with a 201 status
    } catch (error) {
        res.status(500).json({ error: 'Error creating todo' }); // Send error response if creation fails
    }
});

// PUT: Update a todo's "completed" status by ID
app.put('/api/todos/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, // Find the todo by ID
            { completed: req.body.completed }, // Update the "completed" field
            { new: true } // Return the updated document
        );
        res.json(updatedTodo); // Send the updated todo as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error updating todo' }); // Send error response if update fails
    }
});

// DELETE: Delete a todo by ID
app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id); // Find and delete the todo by ID
        res.json({ message: 'Todo deleted' }); // Send a success message as a JSON response
    } catch (error) {
        res.status(500).json({ error: 'Error deleting todo' }); // Send error response if deletion fails
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`); // Log the URL where the server is running
});
