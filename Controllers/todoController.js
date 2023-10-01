const {client} = require("../config");

const getTodos = (req, res) => {
    client.connect().then((mongoClient) => {
        const db = mongoClient.db("todo");
        const collection = db.collection("todos");
        collection.find({}).toArray((err, result) => {
            if (err) {
                res.send({
                    code: 1,
                    message: "Error retrieving todos",
                });
            } else {
                res.send({
                    code: 0,
                    message: "Todos retrieved successfully",
                    data: result,
                });
            }
        });
    });
}

const addTodo = (req, res) => {
    client.connect().then((mongoClient) => {
        const db = mongoClient.db("todo");
        const randomId = Math.floor(Math.random() * 1000000);
        const collection = db.collection("todos");
        const todo = {
            id: randomId,
            todo: req.body.todo,
        };
        collection.insertOne({todo}, (err, result) => {
            if (err) {
                res.send({
                    code: 1,
                    message: "Error adding todo",
                });
            } else {
                res.send({
                    code: 0,
                    message: "Todo added successfully",
                    data: result.ops[0],
                });
            }
        });
    });
}
const updateTodo = (req, res) => {
    client.connect().then((mongoClient) => {
        const db = mongoClient.db("todo");
        const collection = db.collection("todos");
        const todo = {
            id: req.body.id,
            todo: req.body.todo,
        };
        collection.updateOne({id: todo.id}, {$set: todo}, (err, result) => {
            if (err) {
                res.send({
                    code: 1,
                    message: "Error updating todo",
                });
            } else {
                res.send({
                    code: 0,
                    message: "Todo updated successfully",
                    data: result.ops[0],
                });
            }
        });
    });
}
const deleteTodo = (req, res) => {
    client.connect().then((mongoClient) => {
        const db = mongoClient.db("todo");
        const collection = db.collection("todos");
        const todo = {
            id: req.body.id,
            todo: req.body.todo,
        };
        collection.deleteOne({id: todo.id}, (err, result) => {
            if (err) {
                res.send({
                    code: 1,
                    message: "Error deleting todo",
                });
            } else {
                res.send({
                    code: 0,
                    message: "Todo deleted successfully",
                    data: result.ops[0],
                });
            }
        });
    });

}
module.exports = {getTodos, addTodo, updateTodo, deleteTodo}