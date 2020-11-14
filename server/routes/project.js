'use strict';

const router = require("express").Router();

const { MongoClient } = require("mongodb");
const assert = require("assert");
const multer = require("multer");
const mongo = require('mongodb');

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
            workingDevelopers,
            pendingDevelopers,
            appliedToDevelopers,
            relatedUsers,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');

        let projectAlreadyExist = await db.collection("projects").findOne({ name })
        if (projectAlreadyExist) {
            res.status(404).json({ status: "projectExist", data: "Project already exists." });
            return;
        }

        const currentUser = await db.collection("users").findOne({ email });
        const r = await db.collection("projects").insertOne({
            name,
            image: req.file.filename,
            description,
            technologies: JSON.parse(technologies),
            admin: currentUser._id,
            workingDevelopers: [],
            pendingDevelopers: [],
            appliedToDevelopers: [],
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
        const technologiesQuery = getTec(projectTec);
        const userQuery = { _id: { $ne: mongo.ObjectID(currentUser._id) }, ...technologiesQuery }
        const qualifiedUsers = await db.collection("users").find(userQuery).toArray();

        let topQualifiedUsers = qualifiedUsers.slice(0, 3).map(id => id._id);

        const query = { email };
        const newValues = { $set: { type: ['developer', 'project manager'], projectID: projectID._id } };
        const u = await db.collection("users").updateOne(query, newValues);

        const projectQuery = { name };
        const newProjectValues = { $set: { relatedUsers: topQualifiedUsers } };
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
            let limit = start + Number(req.query.limit) || 15;
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

        await client.connect();
        const db = client.db('freemvp');

        let matchedUser = await db.collection("users").findOne({ email })
        let matchedProject = await db.collection("projects").findOne({ name })

        //update pendingDevelopers in projects
        matchedProject.pendingDevelopers.push(matchedUser._id);
        const query = { name };
        const newValues = { $set: { ...matchedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update appliedToProjects in users 
        matchedUser.appliedToProjects.push(matchedProject._id);
        const queryUser = { email };
        const newValuesUser = { $set: { ...matchedUser } };

        const uu = await db.collection("users").updateOne(queryUser, newValuesUser);
        assert.strictEqual(1, uu.matchedCount);
        assert.strictEqual(1, uu.modifiedCount);

        res.status(200).json({ status: 'success', projectData: matchedProject, userData: matchedUser });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
    client.close();
}

const approveProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            email,
            name,
        } = req.body;

        await client.connect();
        const db = client.db('freemvp');

        let currentUser = await db.collection("users").findOne({ email })
        let approvedProject = await db.collection("projects").findOne({ name })

        // update Developers in projects
        let updateAppliedDevelopersArray = approvedProject.appliedToDevelopers;
        approvedProject.workingDevelopers.push(currentUser._id);
        let updatePendingDevelopers = -1
        updateAppliedDevelopersArray.forEach(function (appliedDeveloperId, index) {
            if (appliedDeveloperId.toString() === currentUser._id.toString()) {
                updatePendingDevelopers = index
            }
        })

        if (updatePendingDevelopers !== -1) {
            updateAppliedDevelopersArray.splice(updatePendingDevelopers, 1);
        }

        const query = { name };
        const newValues = { $set: { ...approvedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update pendingProjects in users
        let updatePendingProjectsArray = currentUser.pendingProjects;
        currentUser.workingProjects.push(approvedProject._id);

        function getRelatedIds(array) {
            return array.map(id =>
                mongo.ObjectID(id)
            )
        }

        let findWorkingProjects = [];
        if (currentUser.workingProjects.length) {
            findWorkingProjects = await db.collection("projects")
                .find({ _id: { $in: getRelatedIds(currentUser.workingProjects) } })
                .toArray();
        }

        let updatePendingProjects = -1
        updatePendingProjectsArray.forEach(function (pendingProjectId, index) {
            if (pendingProjectId.toString() === approvedProject._id.toString()) {
                updatePendingProjects = index
            }
        })

        if (updatePendingProjects !== -1) {
            updatePendingProjectsArray.splice(updatePendingProjects, 1);
        }

        const queryUser = { email };
        const newValuesUser = { $set: { ...currentUser } };

        const uu = await db.collection("users").updateOne(queryUser, newValuesUser);
        assert.strictEqual(1, uu.matchedCount);
        assert.strictEqual(1, uu.modifiedCount);

        res.status(200).json({ status: 'success', userData: currentUser, workingProjectsData: findWorkingProjects });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
    client.close();
}

const rejectProject = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            email,
            name,
        } = req.body;

        await client.connect();
        const db = client.db('freemvp');

        let currentUser = await db.collection("users").findOne({ email })
        let rejectedProject = await db.collection("projects").findOne({ name })

        // update Developers in projects
        let updateAppliedDevelopersArray = rejectedProject.appliedToDevelopers;
        let updatePendingDevelopers = -1
        updateAppliedDevelopersArray.forEach(function (appliedDeveloperId, index) {
            if (appliedDeveloperId.toString() === currentUser._id.toString()) {
                updatePendingDevelopers = index
            }
        })

        if (updatePendingDevelopers !== -1) {
            updateAppliedDevelopersArray.splice(updatePendingDevelopers, 1);
        }

        const query = { name };
        const newValues = { $set: { ...rejectedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update pendingProjects in users
        let updatePendingProjectsArray = currentUser.pendingProjects;
        let updatePendingProjects = -1
        updatePendingProjectsArray.forEach(function (pendingProjectId, index) {
            if (pendingProjectId.toString() === rejectedProject._id.toString()) {
                updatePendingProjects = index
            }
        })

        if (updatePendingProjects !== -1) {
            updatePendingProjectsArray.splice(updatePendingProjects, 1);
        }

        const queryUser = { email };
        const newValuesUser = { $set: { ...currentUser } };

        const uu = await db.collection("users").updateOne(queryUser, newValuesUser);
        assert.strictEqual(1, uu.matchedCount);
        assert.strictEqual(1, uu.modifiedCount);

        res.status(200).json({ status: 'success', userData: currentUser });
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
router.put('/matchproject', matchProject)
router.put('/approveproject', approveProject)
router.put('/rejectproject', rejectProject)

module.exports = router;