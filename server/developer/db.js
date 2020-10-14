'use strict';

const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createDeveloper = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    try {
        const {
            firstName,
            lastName,
            image,
            email,
            password,
            technologies: [],
            about,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');
        console.log("connected!");

        const r = await db.collection("developers").insertOne({
            firstName,
            lastName,
            image,
            email,
            password,
            technologies: [],
            about,
        });
        assert.strictEqual(1, r.insertedCount);

        res.status(201).json({ status: 201, data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};

const getDeveloper = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { email } = req.params;

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    db.collection("developers").findOne({ email }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
        console.log("disconnected!");
    });
};

const getDevelopers = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const developers = await db.collection("developers").find().toArray((err, result) => {
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

const deleteDeveloper = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    try {
        const { email } = req.params;

        const d = await db.collection("developers").deleteOne({ email });
        assert.strictEqual(1, d.deletedCount);

        res.status(204).json({ status: 204, email });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};

const updateDeveloper = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const { email } = req.params;

    try {
        const query = { email };
        const newValues = { $set: { ...req.body } };

        const u = await db.collection("developers").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        res.status(200).json({ status: 200, email });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
}

module.exports = { createDeveloper, getDeveloper, getDevelopers, deleteDeveloper, updateDeveloper };