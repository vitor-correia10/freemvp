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

const createUser = async (req, res) => {
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
            relatedProjects,
            workingProjects,
            pendingProjects,
            appliedToProjects,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');

        let userAlreadyExist = await db.collection("users").findOne({ email })
        if (userAlreadyExist) {
            res.status(404).json({ status: "userExist", data: "User already exists." });
            return;
        }

        const r = await db.collection("users").insertOne({
            type: ['developer'],
            firstName,
            lastName,
            image: req.file.filename,
            email,
            password,
            technologies: JSON.parse(technologies),
            about,
            projectID,
            relatedProjects,
            workingProjects: [],
            pendingProjects: [],
            appliedToProjects: [],
        });
        assert.strictEqual(1, r.insertedCount);

        let findUser = await db.collection("users").findOne({ email });

        const userTec = findUser.technologies;

        function getTec(obj) {
            let response = {};
            Object.keys(obj).forEach(key => {
                response[`technologies.${key}`] = obj[`${key}`]
            })
            return response;
        }

        const findProjects = await db.collection("projects")
            .find(getTec(userTec))
            .toArray();

        let projectsIdsArray = findProjects.slice(0, 3).map(id => id._id);

        const query = { email };
        const newValues = { $set: { relatedProjects: projectsIdsArray } };
        const u = await db.collection("users").updateOne(query, newValues);

        res.status(201).json({ status: "success", data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: "error", message: err.message });
    }
    client.close();

};

const login = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { email } = req.body;
    const { password } = req.body;

    await client.connect();
    const db = client.db('freemvp');

    let findUser = await db.collection("users").findOne({ email });
    if (findUser) {
        if (findUser.password == password) {
            findUser.password = "";
            const projectId = findUser.projectID;

            const relatedProjectsArray = findUser.relatedProjects;

            const objectId = mongo.ObjectID(projectId);
            let findProject = await db.collection("projects").findOne({ _id: objectId })
            let findRelatedProject = [];
            let findRelatedUser = [];

            function getRelatedIds(array) {
                return array.map(id =>
                    mongo.ObjectID(id)
                )
            }

            if (relatedProjectsArray) {

                findRelatedProject = await db.collection("projects")
                    .find({ _id: { $in: getRelatedIds(relatedProjectsArray) } })
                    .toArray();
            }

            if (findProject) {
                const relatedUsersArray = findProject.relatedUsers;
                findRelatedUser = await db.collection("users")
                    .find({ _id: { $in: getRelatedIds(relatedUsersArray) } })
                    .toArray();
            }

            if (findProject != null) {
                res.status(200).json({
                    status: "success", data:
                    {
                        findUser,
                        findProject,
                        findRelatedProject,
                        findRelatedUser,
                    }
                })
            } else (
                res.status(200).json({ status: "success", data: { findUser, findRelatedProject } })
            )


        } else {
            res.status(404).json({ status: "invalid", message: "Invalid data" })
        }
    } else {
        res.status(404).json({ status: "noUser", data: "User Not Found" });
        return
    }

    client.close();
};

const getUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { email } = req.params;

    await client.connect();
    const db = client.db('freemvp');

    db.collection("users").findOne({ email }, (err, result) => {
        result
            ? res.status(200).json({ status: 200, data: result })
            : res.status(404).json({ status: 404, data: "Not Found" });

        client.close();
    });
};

const getUserByEmail = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    const { email } = req.params;

    await client.connect();
    const db = client.db('freemvp');

    let userObj = await db.collection("users").findOne({ email });
    if (userObj) {
        const objectId = await mongo.ObjectID(userObj.projectID);
        const findProject = await db.collection("projects").findOne({ _id: objectId })

        res.status(200).json({
            status: 'success', userData: userObj, projectData: findProject
        })
    } else {
        res.status(404).json({ status: 'error', data: "Not Found" });
    }

    client.close();

};

const getUsers = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

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
    });
};

const deleteUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

    try {
        const { email } = req.params;

        const d = await db.collection("users").deleteOne({ email });
        assert.strictEqual(1, d.deletedCount);

        res.status(204).json({ status: 204, email });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
    client.close();
};

const updateUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            // type,
            id,
            firstName,
            lastName,
            image,
            email,
            // password,
            technologies,
            about,
            // projectID,
        } = req.body;

        await client.connect();
        const db = client.db('freemvp');

        const query = { email };
        const newValues = {
            $set: {
                id,
                // type,
                firstName,
                lastName,
                image,
                email,
                // password,
                technologies,
                about,
                // projectID,
            }
        };

        const u = await db.collection("users").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);
        res.status(200).json({ status: "success", data: req.body });

    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ status: "error", data: req.body, message: err.message });
    }
    client.close();
}

const matchUser = async (req, res) => {
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
        matchedProject.appliedToDevelopers.push(matchedUser._id);
        const query = { name };
        const newValues = { $set: { ...matchedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update pendingProjects in users 
        matchedUser.pendingProjects.push(matchedProject._id);
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

const approveUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            email,
            name,
        } = req.body;

        await client.connect();
        const db = client.db('freemvp');

        let approvedUser = await db.collection("users").findOne({ email })
        let selectedProject = await db.collection("projects").findOne({ name })

        // update Developers in projects
        let updatePendingDevelopersArray = selectedProject.pendingDevelopers;
        selectedProject.developers.push(approvedUser._id);
        let updatePendingDevelopers = -1
        updatePendingDevelopersArray.forEach(function (pendingDeveloperId, index) {
            if (pendingDeveloperId.toString() === approvedUser._id.toString()) {
                updatePendingDevelopers = index
            }
        })

        if (updatePendingDevelopers !== -1) {
            updatePendingDevelopersArray.splice(updatePendingDevelopers, 1);
        }

        const query = { name };
        const newValues = { $set: { ...selectedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update pendingProjects in users
        let updateAppliedToProjectsArray = approvedUser.appliedToProjects;
        approvedUser.workingProjects.push(selectedProject._id);
        let updateAppliedToProjects = -1
        updateAppliedToProjectsArray.forEach(function (pendingDeveloperId, index) {
            if (pendingDeveloperId.toString() === selectedProject._id.toString()) {
                updateAppliedToProjects = index
            }
        })

        if (updateAppliedToProjects !== -1) {
            updateAppliedToProjectsArray.splice(updateAppliedToProjects, 1);
        }

        const queryUser = { email };
        const newValuesUser = { $set: { ...approvedUser } };

        const uu = await db.collection("users").updateOne(queryUser, newValuesUser);
        assert.strictEqual(1, uu.matchedCount);
        assert.strictEqual(1, uu.modifiedCount);

        res.status(200).json({ status: 'success', projectData: selectedProject });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
    client.close();
}

const rejectUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    try {
        const {
            email,
            name,
        } = req.body;

        await client.connect();
        const db = client.db('freemvp');

        let rejectedUser = await db.collection("users").findOne({ email })
        let selectedProject = await db.collection("projects").findOne({ name })

        // update Developers in projects
        let updatePendingDevelopersArray = selectedProject.pendingDevelopers;

        let updatePendingDevelopers = -1
        updatePendingDevelopersArray.forEach(function (pendingDeveloperId, index) {
            if (pendingDeveloperId.toString() === rejectedUser._id.toString()) {
                updatePendingDevelopers = index
            }
        })

        if (updatePendingDevelopers !== -1) {
            updatePendingDevelopersArray.splice(updatePendingDevelopers, 1);
        }

        const query = { name };
        const newValues = { $set: { ...selectedProject } };

        const u = await db.collection("projects").updateOne(query, newValues);
        assert.strictEqual(1, u.matchedCount);
        assert.strictEqual(1, u.modifiedCount);

        //update pendingProjects in users
        let updateAppliedToProjectsArray = rejectedUser.appliedToProjects;

        let updateAppliedToProjects = -1
        updateAppliedToProjectsArray.forEach(function (pendingDeveloperId, index) {
            if (pendingDeveloperId.toString() === selectedProject._id.toString()) {
                updateAppliedToProjects = index
            }
        })

        if (updateAppliedToProjects !== -1) {
            updateAppliedToProjectsArray.splice(updateAppliedToProjects, 1);
        }

        const queryUser = { email };
        const newValuesUser = { $set: { ...rejectedUser } };

        const uu = await db.collection("users").updateOne(queryUser, newValuesUser);
        assert.strictEqual(1, uu.matchedCount);
        assert.strictEqual(1, uu.modifiedCount);

        res.status(200).json({ status: 'success', projectData: selectedProject });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
    client.close();
}

const getPendingDevelopers = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db('freemvp');

    try {
        const {
            pendingDevelopersIds,
            pendingProjectsIds,
        } = req.body;

        let findPendingDevelopers = [];
        let findPendingProjects = [];

        function getRelatedIds(array) {
            return array.map(id =>
                mongo.ObjectID(id)
            )
        }

        if (pendingDevelopersIds) {
            findPendingDevelopers = await db.collection("users")
                .find({ _id: { $in: getRelatedIds(pendingDevelopersIds) } })
                .toArray();
        }

        if (pendingProjectsIds) {
            findPendingProjects = await db.collection("projects")
                .find({ _id: { $in: getRelatedIds(pendingProjectsIds) } })
                .toArray();
        }

        res.status(200).json({ status: 'success', devData: findPendingDevelopers, projectData: findPendingProjects });
    } catch {
        res.status(500).json({ status: 'error', message: err.message });
    }

    client.close();
};


//user endpoint
router.post('/user', upload.single('image'), createUser)
router.post('/login', login)
router.post('/form-project-2', upload.single('image'), createUser)
router.get('/user', getUser)
router.get('/user/:email', getUserByEmail)
router.get('/user', getUsers)
router.post('/pendingdevelopers', getPendingDevelopers)
router.delete('/user', deleteUser)
router.put('/user/edit', updateUser)
router.put('/matchuser', matchUser)
router.put('/approveuser', approveUser)
router.put('/rejectuser', rejectUser)

module.exports = router;