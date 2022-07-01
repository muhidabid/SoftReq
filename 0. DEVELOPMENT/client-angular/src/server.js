"use strict";

// require express and bodyParser
const express = require("express");
const bodyParser = require("body-parser");
const { connectWithMongoDB } = require("../backend-express/config/db.js");

// create express app
const app = express();

// define port to run express app
const port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE - set CORS headers on our responses [https://enable-cors.org/server_expressjs.html]
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//------> Connect routes here:

// importing routers
const workspaceRoutes = require("../backend-express/api/routes/workspace-routes.js");
const projectRoutes = require("../backend-express/api/routes/project-routes.js");

// connecting endpoints to routess
app.use("/", [workspaceRoutes, projectRoutes]);
// app.use("/", workspaceRoutes);
// app.use("/", projectRoutes);

// -----------------------------

// Listen to server
connectWithMongoDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost: ${port}`);
  });
});

console.log("SOMETHING WORKS HERE");
