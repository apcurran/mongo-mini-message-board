"use strict";

require("dotenv").config({ path: "../.env" });

const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.DB_URI);

async function main() {
    try {
        await client.connect();

        const messageBoardDb = client.db("message_board");

        const messagesArr = [
            {
                name: "Bob",
                message: "Hello general",
                topic: "general",
                createdAt: new Date()
            },
            {
                name: "Bob",
                message: "Hello gaming",
                topic: "gaming",
                createdAt: new Date()
            },
            {
                name: "Bob",
                message: "Hello movies",
                topic: "movies",
                createdAt: new Date()
            },
            {
                name: "Bob",
                message: "Hello sports",
                topic: "sports",
                createdAt: new Date()
            }
        ];
        // prevents additional documents from being inserted if one fails
        const options = { ordered: true };

        const result = await messageBoardDb.collection("messages").insertMany(messagesArr, options);

        console.log(`${result.insertedCount} documents were inserted into db 'messages' collection`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

main();