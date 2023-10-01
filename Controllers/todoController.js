const {client} = require("../config");

const collection = client.db("todo").collection("todos");
const getTodos = (req, res) => {
    client.connect().then((mongoClient) => {        
        collection.find({}).toArray().then((result) => {
            res.send({
                code: 0,
                message: "Todos retrieved successfully",
                data: result,
            });
        });
    });
}

const addTodo = (req, res) => {
    client.connect().then((mongoClient) => {        
        const randomId = Math.floor(Math.random() * 1000000);        
        const todo = {
            id: randomId,
            todo: req.body.todo,
        };
        collection.insertOne(todo).then((result) => {
            res.send({
                code: 0,
                message: "Todo added successfully",
                
            });
        });
});}
const updateTodo = (req, res) => {
    client.connect().then((mongoClient) => {
        const todo = {
            id: req.body.id,
            todo: req.body.todo,
        };
        collection.updateOne({id: todo.id}, {$set: todo}).then((result) => {
            if (result.modifiedCount === 0) {
                res.send({
                    code: 1,
                    message: "Todo not found",
                });
                
            }
            res.send({
                code: 0,
                message: "Todo updated successfully",
            });
        });
    });
}
const deleteTodo = (req, res) => {
    client.connect().then((mongoClient) => {
        const todo = {
            id: req.body.id,
        };
        collection.deleteOne({id: todo.id}).then((result) => {
            if (result.deletedCount === 0) {
                res.send({
                    code: 1,
                    message: "Todo not found",
                });
                
            }
            res.send({
                code: 0,
                message: "Todo deleted successfully",
            });
        });
    });

}
module.exports = {getTodos, addTodo, updateTodo, deleteTodo}