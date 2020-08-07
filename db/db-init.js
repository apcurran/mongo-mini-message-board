"use strict";

const { MongoClient } = require("mongodb");

class Connection {
    static async connectToMongo() {
        if (this.db) return this.db;

        const client = await MongoClient.connect(process.env.DB_URI, { useUnifiedTopology: true });
        this.db = client.db("message_board");

        return this.db;
    }
}

Connection.db = null;

module.exports = { Connection };