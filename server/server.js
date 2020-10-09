"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

const {
    createProject,
} = require("./project/createProject");

const {
    createUser,
} = require("./developer/createUser");

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))
    .use(cors())

    .post('/project', createProject)
    .post('/developer', createUser)

    // handle 404s
    .use((req, res) => res.status(404).type("txt").send("Error 404"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));