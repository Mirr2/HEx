const http = require("http");
const express = require("express");
const path = require("path");

const app = express();

const port = 3000;

app.get("/ping", (req, res) => {
    res.send("pong");
    console.log("ping pong");
});


http.createServer(app).listen(port, () => {
  console.log(`app listening at ${port}`);
});