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

const upload = multer({ dest: __dirname + '../../../client/public' + '/uploads' })

const createProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    let { email } = req.body;
    let { loggedEmail } = req.body;
    if (!email) {
        email = loggedEmail
    }
    const { name } = req.body;

    try {
        const {
            name,
            image,
            description,
            technologies,
            admin,
            isCompleted,
            developers,
            relatedUsers,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');

        let projectAlreadyExist = await db.collection("projects").findOne({ name })
        if (projectAlreadyExist) {
            res.status(404).json({ status: "projectExist", data: "Project already exist." });
            return;
        }

        const user = await db.collection("users").findOne({ email });
        const r = await db.collection("projects").insertOne({
            name,
            image: req.file.filename,
            description,
            technologies: JSON.parse(technologies),
            admin: user._id,
            developers: [],
            isCompleted: false,
            relatedUsers,
        });
        assert.strictEqual(1, r.insertedCount);

        const projectID = await db.collection("projects").findOne({ name });

        const projectTec = projectID.technologies;

        function getTec(obj) {
            let response = {};
            Object.keys(obj).forEach(key => {
                response[`technologies.${key}`] = obj[`${key}`]
            })
            return response;
        }

        const findUsers = await db.collection("users")
            .find(getTec(projectTec))
            .toArray();

        let usersIdsArray = findUsers.slice(0, 3).map(id => id._id);

        const query = { email };
        const newValues = { $set: { type: ['developer', 'project manager'], projectID: projectID._id } };
        const u = await db.collection("users").updateOne(query, newValues);

        const projectQuery = { name };
        const newProjectValues = { $set: { relatedUsers: usersIdsArray } };
        const up = await db.collection("projects").updateOne(projectQuery, newProjectValues);

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
    const mongo = require('mongodb');

    await client.connect();
    const db = client.db('freemvp');

    let projectObj = await db.collection("projects").findOne({ name });
    if (projectObj) {
        const objectId = await mongo.ObjectID(projectObj.admin);
        const findUser = await db.collection("users").findOne({ _id: objectId })

        res.status(200).json({ status: 'success', projectData: projectObj, userData: findUser })
    } else {
        res.status(404).json({ status: 'error', data: "Not Found" });
    }

    client.close();

};

const getProjects = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

    const projects = await db.collection("projects").find().toArray((err, result) => {
        if (result.length) {
            let start = Number(req.query.start) || 0;
            let limit = start + Number(req.query.limit) || 12;
            limit <= result.length ? limit : (limit = result.length);

            const data = result.slice(start, limit);
            res.status(200).json({ status: 'success', data: data });
        } else {
            res.status(500).json({ status: 'error', message: err.message });
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

const matchProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            name,
            email,

        } = req.body;

        console.log(name);
        await client.connect();
        const db = client.db('freemvp');

        let findMatchedUser = await db.collection("users").findOne({ email })
        console.log('findMatchedUser', findMatchedUser)
        const query = { name };
        const newValues = { $set: { ...req.body } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        res.status(200).json({ status: 'success', projectData: name, userData: email });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
    client.close();
}

//Project endpoint
router.post('/project', upload.single('image'), createProject)
router.get('/project/:name', getProject)
router.get('/projects', getProjects)
router.delete('/project/:name', deleteProject)
router.put('/project/:name', updateProject)
router.put('/project/matchproject', matchProject)

module.exports = router;