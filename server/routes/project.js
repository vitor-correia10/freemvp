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

const createProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    console.log(req.body);
    try {
        const {
            name,
            image,
            description,
            technologies,
            admin,
            developers,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');

        const r = await db.collection("projects").insertOne({
            name,
            image: req.file.path,
            description,
            technologies: JSON.parse(technologies),
            admin,
            developers,
        });
        assert.strictEqual(1, r.insertedCount);

        res.status(201).json({ status: "success", data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: "error", message: err.message });
    }
    client.close();
};

const getProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { name } = req.params;

    await client.connect();
    const db = client.db('freemvp');

    db.collection("projects").findOne({ name }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
    });
};

const getProjects = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

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
    });
};

const deleteProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

    try {
        const { name } = req.params;

        const d = await db.collection("projects").deleteOne({ name });
        assert.strictEqual(1, d.deletedCount);

        res.status(204).json({ status: 204 });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
};

const updateProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

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
}

//Project endpoint
router.post('/project', upload.single('image'), createProject)
router.get('/project/:name', getProject)
router.get('/project', getProjects)
router.delete('/project/:name', deleteProject)
router.put('/project/:name', updateProject)

module.exports = router;