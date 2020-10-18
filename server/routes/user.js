'use strict';

const router = require("express").Router();

const { MongoClient } = require("mongodb");
const assert = require("assert");
const multer = require("multer");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const upload = multer({ dest: __dirname + '/uploads' })

const createUser = async (req, res, next) => {
    const client = await MongoClient(MONGO_URI, options);
    try {
        const {
            type,
            firstName,
            lastName,
            image,
            email,
            password,
            technologies,
            about,
            projectID,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');

        // db.collection("users").findOne({ email }, (err, previousUser) => {
        //     if (err) {
        //         res.status(500).json({ status: 500, data: "Server  error" });
        //     } else if (previousUser) {
        //         res.status(404).json({ status: 404, data: "User already exist." })
        //     }

        // });
        const r = await db.collection("users").insertOne({
            type,
            firstName,
            lastName,
            image: req.file.path,
            email,
            password,
            technologies: JSON.parse(technologies),
            about,
            projectID,
        });
        assert.strictEqual(1, r.insertedCount);

        res.status(201).json({ status: "success", data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: "error", message: err.message });
    }
    client.close();

};

const getUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { email } = req.params;

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    db.collection("users").findOne({ email }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
        console.log("disconnected!");
    });
};

const getUsers = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const users = await db.collection("users").find().toArray((err, result) => {
        if (result.length) {
            let start = Number(req.query.start) || 0;
            let limit = start + Number(req.query.limit) || 10;
            limit <= result.length ? limit : (limit = result.length);

            const data = result.slice(start, limit);
            res.status(200).json({ status: 200, data: data });
        } else {
            res.status(500).json({ status: 500, message: err.message });
        }
        client.close();
        console.log("disconnected!");
    });
};

const deleteUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    try {
        const { email } = req.params;

        const d = await db.collection("users").deleteOne({ email });
        assert.strictEqual(1, d.deletedCount);

        res.status(204).json({ status: 204, email });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};

const updateUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const { email } = req.params;

    try {
        const query = { email };
        const newValues = { $set: { ...req.body } };

        const u = await db.collection("users").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        res.status(200).json({ status: 200, email });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
}

//user endpoint
router.post('/user', upload.single('image'), createUser)
router.get('/user/:email', getUser)
router.get('/user', getUsers)
router.delete('/user/:email', deleteUser)
router.put('/user/:email', updateUser)

module.exports = router;