const express = require("express")
const mongoose = require('mongoose');

// App
const app = express()
app.use(express.json())


// DB
mongoose.connect("mongodb+srv://codewithrafiq:12344321@demoproject.pxp9n8y.mongodb.net/testdb?retryWrites=true&w=majority")
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    }
})
const Todo = mongoose.model("todos", TodoSchema)


// // Routes

// Create Todo
app.post("/api/create-todo", async (req, res) => {
    const { title } = req.body;
    const todo = await Todo.create({title:title})
    res.json(todo)
})

// Get all Todos
app.get("/api/all-todos", async (req, res) => {
    const todos = await Todo.find({})
    res.json(todos)
})



// Update Todo
app.put("/api/update-todo/:id", async (req, res) => {
    const id = req.params.id
    const { title } = await req.body
    const todo = await Todo.updateOne({ _id: id }, {
        $set: {
            title:title
        }
    })
    res.json({
        "message":"Todo is Update !"
    })
})


// Delete Todo 
app.delete("/api/delete-todo/:id", async (req, res) => {
    const id = req.params.id;
    const todo = await Todo.deleteOne({ _id: id })
    console.log("todo--->", todo);
    res.json({
        message: 'Todo is Deleted',
        id:id
    })
})



// Server
app.listen(3000, () => {
    console.log("Server is running on localhost:3000");
})