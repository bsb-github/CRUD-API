const express = require("express");
const {client} = require("./config");
const bodyParser = require("body-parser");
const todoRoute = require("./Routes/todoRoutes");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/", (req, res) => {
    client.connect().then((mongoClient) => {
      res.send({
        code: 0,
        message: "Connected successfully to server",       
      });
    });
   // res.sendStatus(403);
    });
app.use("/todo", todoRoute);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port "+PORT);
});