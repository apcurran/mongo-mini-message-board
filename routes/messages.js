"use strict";

const express = require("express");
const router = express.Router();
const sanitize = require("mongo-sanitize");

const { Connection } = require("../db/db-init");
const { reviseMessagesArrDates } = require("../utility/revise-messages-arr-dates");

router.get("/", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "general" }).toArray();
        const revisedMessages = reviseMessagesArrDates(messages);

        res.render("index", { title: "General Messages", messages: revisedMessages, topic: "general" });

    } catch (err) {
        console.error(err);
    }
});

// Topic routes
router.get("/topics/gaming", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "gaming" }).toArray();
        const revisedMessages = reviseMessagesArrDates(messages);

        res.render("index", { title: "Gaming", messages: revisedMessages, topic: "gaming" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/topics/movies", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "movies" }).toArray();
        const revisedMessages = reviseMessagesArrDates(messages);

        res.render("index", { title: "Movies", messages: revisedMessages, topic: "movies" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/topics/sports", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "sports" }).toArray();
        const revisedMessages = reviseMessagesArrDates(messages);

        res.render("index", { title: "Sports", messages: revisedMessages, topic: "sports" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/new-message", (req, res) => {
    const { topic } = req.query;

    res.render("new-message", { title: "New Message", topic: topic });
});

router.post("/new-message", async (req, res) => {
    const { name, message } = req.body;
    const { topic } = req.query;
    const newMessage = {
        name: sanitize(name),
        message: sanitize(message),
        topic: sanitize(topic),
        createdAt: new Date()
    };

    try {
        await Connection.db.collection("messages").insertOne(newMessage);
        
        res.redirect("/");

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;