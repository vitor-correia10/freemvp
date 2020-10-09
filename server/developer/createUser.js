const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const createUser = async (req, res) => {
    const client = await MongoClient(MONGO_URI, options);
    try {
        const {
            firstName,
            lastName,
            image,
            about,
            technology,
        } = req.body;

        await client.connect();

        const db = client.db('freemvp');
        console.log("connected!");

        const r = await db.collection("developers").insertOne({
            firstName,
            lastName,
            image,
            about,
            technology,
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

module.exports = { createUser };