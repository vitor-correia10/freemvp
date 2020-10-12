"use strict";

const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

//Project
const {
    createProject,
} = require("./project/db");

//Developer
const {
    createDeveloper,
    getDeveloper,
    getDevelopers,
    deleteDeveloper,
    updateDeveloper,
} = require("./developer/db")

express()
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))
    .use(cors())

    //Developer endpoint
    .post('/developer', createDeveloper)
    .get('/developer/:email', getDeveloper)
    .get('/developer', getDevelopers)
    .delete('/developer/:email', deleteDeveloper)
    .put('/developer/:email', updateDeveloper)

    //Project endpoint
    .post('/project', createProject)


    // handle 404s
    .use((req, res) => res.status(404).type("txt").send("Error 404"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));