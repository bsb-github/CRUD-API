const express = require("express");
const { getTodos, addTodo, updateTodo, deleteTodo } = require("../Controllers/todoController");
const todoRoute = express.Router();

todoRoute.get("/getTodos", getTodos);
todoRoute.post("/addTodo", addTodo);
todoRoute.put("/updateTodo", updateTodo);
todoRoute.delete("/deleteTodo", deleteTodo);

module.exports = todoRoute;