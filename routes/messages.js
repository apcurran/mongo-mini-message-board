"use strict";

const express = require("express");
const router = express.Router();
const { Connection } = require("../db/db-init");
const sanitizeHtml = require("sanitize-html");
const formatDate = require("../utility/format-date");

router.get("/", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "general" }).toArray();
        
        res.render("index", { title: "General Messages", messages: messages, topic: "general" });

    } catch (err) {
        console.error(err);
    }
});

// Topic routes
router.get("/topics/gaming", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "gaming" }).toArray();

        res.render("index", { title: "Gaming", messages: messages, topic: "gaming" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/topics/movies", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "movies" }).toArray();

        res.render("index", { title: "Movies", messages: messages, topic: "movies" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/topics/sports", async (req, res) => {
    try {
        const messages = await Connection.db.collection("messages").find({ topic: "sports" }).toArray();

        res.render("index", { title: "Sports", messages: messages, topic: "sports" });

    } catch (err) {
        console.error(err);
    }
});

router.get("/new-message", (req, res) => {
    const { topic } = req.query;

    res.render("new-message", { title: "New Message", topic: topic });
});

router.post("/new-message", async (req, res) => {
    const { name, message, topic } = req.body;
    const newMessage = {
        name: sanitizeHtml(name),
        message: sanitizeHtml(message),
        topic: topic,
        createdAt: formatDate(new Date())
    };

    try {
        await Connection.db.collection("messages").insertOne(newMessage);
        
        res.redirect("/");

    } catch (err) {
        console.error(err);
    }
});

module.exports = router;