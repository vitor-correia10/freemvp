"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;

express()
    .use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );
        next();
    })
    .use(morgan("tiny"))
    .use(express.static("public"))
    .use(express.static("uploads"))
    .use(bodyParser.json())
    .use(express.urlencoded({ extended: false }))
    .use("/", express.static(__dirname + "/"))
    .use(cors())

    .use(require("./routes/user"))
    .use(require("./routes/project"))

    // handle 404s
    .use((req, res) => res.status(404).type("txt").send("Error 404"))

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));