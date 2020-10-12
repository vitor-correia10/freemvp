'use strict';

const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    try {
        const {
            name,
            image,
            description,
            technologies,
            // contact: {
            //     email,
            //     password,
            //     phone,
            //     country,
            //     province,
            // }
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');
        console.log("connected!");

        const r = await db.collection("projects").insertOne({
            name,
            image,
            description,
            technologies,
            // contact: {
            //     email,
            //     password,
            //     phone,
            //     country,
            //     province,
            // }
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

const getProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { name } = req.params;

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    db.collection("projects").findOne({ name }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
        console.log("disconnected!");
    });
};

const getProjects = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const projects = await db.collection("projects").find().toArray((err, result) => {
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

const deleteProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    try {
        const { name } = req.params;

        const d = await db.collection("projects").deleteOne({ name });
        assert.strictEqual(1, d.deletedCount);

        res.status(204).json({ status: 204 });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
};

const updateProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');
    console.log("connected!");

    const { name } = req.params;

    try {
        const query = { name };
        const newValues = { $set: { ...req.body } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        res.status(200).json({ status: 200, name });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
    console.log("disconnected!");
}

module.exports = { createProject, getProject, getProjects, deleteProject, updateProject };